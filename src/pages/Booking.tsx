import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Loader2, Clock, X, Check, ChevronRight, Film, Calendar, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import PiracyFooter from "@/components/PiracyFooter";
import { supabase } from "@/lib/supabase";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Screening {
  id: string;
  movie_id: string;
  screen_number: number;
  show_date: string;
  show_time: string;
  price_regular: number;
  price_premium: number;
  movies: { title: string; poster_url: string };
}

interface Seat {
  id: string;
  row_label: string;
  col_number: number;
  seat_type: "regular" | "premium";
  status: "available" | "held" | "booked";
  held_by: string | null;
  held_until: string | null;
}

type Step = "select-screening" | "select-seats" | "checkout" | "confirmed";

// ── Session ID (persisted per browser tab) ────────────────────────────────────
function getSessionId(): string {
  let sid = sessionStorage.getItem("booking_session");
  if (!sid) {
    sid = crypto.randomUUID();
    sessionStorage.setItem("booking_session", sid);
  }
  return sid;
}

const SESSION_ID = getSessionId();
const HOLD_MINUTES = 5;

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatTime(t: string) {
  const [h, m] = t.split(":");
  const hour = parseInt(h);
  return `${hour % 12 || 12}:${m} ${hour >= 12 ? "PM" : "AM"}`;
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

// ── Step 1: Select Screening ──────────────────────────────────────────────────
function SelectScreening({
  movieTitle,
  onSelect,
}: {
  movieTitle?: string;
  onSelect: (s: Screening) => void;
}) {
  const [screenings, setScreenings] = useState<Screening[]>([]);
  const [loading, setLoading] = useState(true);

 // REPLACE the entire fetch function inside SelectScreening
useEffect(() => {
  async function fetch() {
    const { data } = await supabase
      .from("screenings")
      .select("*, movies(title, poster_url)")
      .gte("show_date", new Date().toISOString().split("T")[0])
      .order("show_date")
      .order("show_time");

    // Filter out any rows where the movie join returned null
    // then optionally filter by movieTitle on the client side
    const valid = ((data as any[]) ?? []).filter((s) => s.movies !== null);
    const filtered = movieTitle
      ? valid.filter((s) =>
          s.movies.title.toLowerCase().includes(movieTitle.toLowerCase())
        )
      : valid;

    setScreenings(filtered);
    setLoading(false);
  }
  fetch();
}, [movieTitle]);
  if (loading) return (
    <div className="flex items-center justify-center py-24 gap-2 text-muted-foreground">
      <Loader2 className="h-5 w-5 animate-spin" /><span>Loading shows...</span>
    </div>
  );

  // Group by movie
  const byMovie: Record<string, Screening[]> = {};
  screenings.forEach((s) => {
    const key = s.movies.title;
    if (!byMovie[key]) byMovie[key] = [];
    byMovie[key].push(s);
  });

  return (
    <div className="space-y-8">
      {Object.entries(byMovie).map(([title, shows]) => (
        <div key={title} className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="flex items-center gap-4 p-4 border-b border-border">
            {shows[0].movies.poster_url && (
              <img src={shows[0].movies.poster_url} alt={title} className="h-16 w-11 rounded object-cover shrink-0" />
            )}
            <div>
              <h3 className="font-semibold text-foreground">{title}</h3>
              <p className="text-xs text-muted-foreground">{formatDate(shows[0].show_date)}</p>
            </div>
          </div>
          <div className="p-4 flex flex-wrap gap-3">
            {shows.map((s) => (
              <button
                key={s.id}
                onClick={() => onSelect(s)}
                className="flex flex-col items-center rounded-lg border border-border bg-panel px-5 py-3 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  {formatTime(s.show_time)}
                </span>
                <span className="text-[10px] text-muted-foreground mt-0.5">Screen {s.screen_number}</span>
                <div className="flex gap-1.5 mt-1.5">
                  <Badge variant="outline" className="text-[9px] px-1 py-0 border-green-500/40 text-green-400">₹{s.price_regular}</Badge>
                  <Badge variant="outline" className="text-[9px] px-1 py-0 border-primary/40 text-primary">₹{s.price_premium}</Badge>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
      {screenings.length === 0 && (
        <p className="text-center text-muted-foreground py-12">No screenings available.</p>
      )}
    </div>
  );
}

// ── Step 2: Select Seats ──────────────────────────────────────────────────────
function SelectSeats({
  screening,
  onConfirm,
  onBack,
}: {
  screening: Screening;
  onConfirm: (seats: Seat[]) => void;
  onBack: () => void;
}) {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [holding, setHolding] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchSeats = useCallback(async () => {
    // Release expired holds first
    await supabase.rpc("release_expired_holds");

    const { data } = await supabase
      .from("seats")
      .select("*")
      .eq("screening_id", screening.id)
      .order("row_label")
      .order("col_number");
    setSeats((data as Seat[]) ?? []);
    setLoading(false);
  }, [screening.id]);

  useEffect(() => {
    fetchSeats();
    // Poll every 5s to reflect other users' holds
    pollRef.current = setInterval(fetchSeats, 5000);
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [fetchSeats]);

  const toggleSeat = (seat: Seat) => {
    if (seat.status === "booked") return;
    if (seat.status === "held" && seat.held_by !== SESSION_ID) return;
    setSelected((prev) =>
      prev.includes(seat.id) ? prev.filter((id) => id !== seat.id) : [...prev, seat.id]
    );
  };

  const handleHoldAndProceed = async () => {
    if (selected.length === 0) { toast.error("Please select at least one seat"); return; }
    setHolding(true);

    // Re-fetch to validate — never trust frontend state
    await supabase.rpc("release_expired_holds");
    const { data: freshSeats } = await supabase
      .from("seats")
      .select("*")
      .in("id", selected);

    const unavailable = (freshSeats as Seat[]).filter(
      (s) => s.status !== "available" && !(s.status === "held" && s.held_by === SESSION_ID)
    );

    if (unavailable.length > 0) {
      toast.error(`${unavailable.length} seat(s) are no longer available. Please reselect.`);
      setSelected([]);
      await fetchSeats();
      setHolding(false);
      return;
    }

    // Hold all selected seats atomically
    const holdUntil = new Date(Date.now() + HOLD_MINUTES * 60 * 1000).toISOString();
    const { error } = await supabase
      .from("seats")
      .update({ status: "held", held_by: SESSION_ID, held_until: holdUntil })
      .in("id", selected)
      .eq("status", "available"); // only update if still available (concurrency guard)

    if (error) {
      toast.error("Failed to hold seats. Please try again.");
      setHolding(false);
      return;
    }

    // Verify all were actually held by us (concurrency check)
    const { data: heldSeats } = await supabase
      .from("seats")
      .select("*")
      .in("id", selected)
      .eq("held_by", SESSION_ID);

    if (!heldSeats || heldSeats.length !== selected.length) {
      toast.error("Some seats were taken by another user. Please reselect.");
      // Release any we did manage to hold
      await supabase.from("seats").update({ status: "available", held_by: null, held_until: null })
        .in("id", selected).eq("held_by", SESSION_ID);
      setSelected([]);
      await fetchSeats();
      setHolding(false);
      return;
    }

    toast.success(`${selected.length} seat(s) held for ${HOLD_MINUTES} minutes!`);
    onConfirm(heldSeats as Seat[]);
    setHolding(false);
  };

  // Group seats by row
  const rows: Record<string, Seat[]> = {};
  seats.forEach((s) => {
    if (!rows[s.row_label]) rows[s.row_label] = [];
    rows[s.row_label].push(s);
  });

  const selectedSeats = seats.filter((s) => selected.includes(s.id));
  const total = selectedSeats.reduce((sum, s) =>
    sum + (s.seat_type === "premium" ? screening.price_premium : screening.price_regular), 0
  );

  const getSeatStyle = (seat: Seat) => {
    if (seat.status === "booked") return "bg-muted border-muted cursor-not-allowed opacity-50";
    if (seat.status === "held" && seat.held_by !== SESSION_ID) return "bg-yellow-500/20 border-yellow-500/40 cursor-not-allowed";
    if (selected.includes(seat.id)) return "bg-primary border-primary text-primary-foreground cursor-pointer scale-105";
    if (seat.seat_type === "premium") return "bg-purple-500/10 border-purple-500/40 hover:border-purple-400 cursor-pointer";
    return "bg-panel border-border hover:border-primary/60 cursor-pointer";
  };

  if (loading) return (
    <div className="flex items-center justify-center py-24 gap-2 text-muted-foreground">
      <Loader2 className="h-5 w-5 animate-spin" /><span>Loading seats...</span>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Screen indicator */}
      <div className="text-center space-y-2">
        <div className="mx-auto w-3/4 h-2 rounded-full bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
        <p className="text-xs text-muted-foreground tracking-widest uppercase">Screen</p>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground flex-wrap">
        {[
          { color: "bg-panel border-border", label: "Available" },
          { color: "bg-purple-500/10 border-purple-500/40", label: "Premium" },
          { color: "bg-primary border-primary", label: "Selected" },
          { color: "bg-yellow-500/20 border-yellow-500/40", label: "Held" },
          { color: "bg-muted border-muted opacity-50", label: "Booked" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className={`h-4 w-4 rounded border ${color}`} />
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* Seat grid */}
      <div className="overflow-x-auto pb-2">
        <div className="mx-auto w-max">
          {Object.entries(rows).map(([row, rowSeats]) => (
            <div key={row} className="flex items-center gap-1.5 mb-1.5">
              <span className="w-5 text-xs text-muted-foreground text-center shrink-0">{row}</span>
              <div className="flex gap-1.5">
                {rowSeats.map((seat) => (
                  <button
                    key={seat.id}
                    onClick={() => toggleSeat(seat)}
                    disabled={seat.status === "booked" || (seat.status === "held" && seat.held_by !== SESSION_ID)}
                    className={`h-8 w-8 rounded-md border text-[10px] font-medium transition-all ${getSeatStyle(seat)}`}
                    title={`${seat.row_label}${seat.col_number} — ${seat.seat_type} — ${seat.status}`}
                  >
                    {seat.col_number}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary bar */}
      <div className="rounded-xl border border-border bg-card p-4 flex items-center justify-between gap-4 flex-wrap">
        <div>
          {selected.length > 0 ? (
            <div className="space-y-0.5">
              <p className="text-sm font-semibold text-foreground">
                {selected.length} seat{selected.length > 1 ? "s" : ""} selected
              </p>
              <p className="text-xs text-muted-foreground">
                {selectedSeats.map((s) => `${s.row_label}${s.col_number}`).join(", ")}
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Select seats to continue</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          {selected.length > 0 && (
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Total</p>
              <p className="text-lg font-bold text-primary">₹{total}</p>
            </div>
          )}
          <Button
            onClick={handleHoldAndProceed}
            disabled={selected.length === 0 || holding}
            className="gold-gradient text-primary-foreground font-semibold hover:opacity-90"
          >
            {holding ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Holding...</> : <>Proceed <ChevronRight className="ml-1 h-4 w-4" /></>}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ── Step 3: Checkout ──────────────────────────────────────────────────────────
function Checkout({
  screening,
  heldSeats,
  onConfirmed,
  onCancel,
}: {
  screening: Screening;
  heldSeats: Seat[];
  onConfirmed: (bookingId: string) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [paying, setPaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(HOLD_MINUTES * 60);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = heldSeats.reduce((sum, s) =>
    sum + (s.seat_type === "premium" ? screening.price_premium : screening.price_regular), 0
  );

  // Countdown timer
  useEffect(() => {
    // Calculate time left from actual held_until
    if (heldSeats[0]?.held_until) {
      const expiry = new Date(heldSeats[0].held_until).getTime();
      const updateTimer = () => {
        const left = Math.max(0, Math.floor((expiry - Date.now()) / 1000));
        setTimeLeft(left);
        if (left === 0) {
          clearInterval(timerRef.current!);
          toast.error("Time expired! Your seats have been released.");
          onCancel();
        }
      };
      updateTimer();
      timerRef.current = setInterval(updateTimer, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const handlePay = async () => {
    if (!name.trim()) { toast.error("Please enter your name"); return; }
    if (!phone.trim() || phone.length < 10) { toast.error("Please enter a valid phone number"); return; }
    setPaying(true);

    // Validate seats are still held by us before confirming
    const { data: freshSeats } = await supabase
      .from("seats")
      .select("*")
      .in("id", heldSeats.map((s) => s.id))
      .eq("held_by", SESSION_ID)
      .eq("status", "held");

    if (!freshSeats || freshSeats.length !== heldSeats.length) {
      toast.error("Your hold has expired. Please start again.");
      setPaying(false);
      onCancel();
      return;
    }

    // Create booking record
    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .insert({
        screening_id: screening.id,
        seat_ids: heldSeats.map((s) => s.id),
        session_id: SESSION_ID,
        user_name: name.trim(),
        user_phone: phone.trim(),
        total_amount: total,
        status: "confirmed",
      })
      .select("id")
      .single();

    if (bookingError) {
      toast.error("Booking failed. Please try again.");
      setPaying(false);
      return;
    }

    // Mark seats as booked
    const { error: seatError } = await supabase
      .from("seats")
      .update({ status: "booked", held_by: null, held_until: null, booked_by: SESSION_ID })
      .in("id", heldSeats.map((s) => s.id))
      .eq("held_by", SESSION_ID);

    if (seatError) {
      toast.error("Failed to confirm seats.");
      setPaying(false);
      return;
    }

    clearInterval(timerRef.current!);
    toast.success("Booking confirmed!");
    onConfirmed(booking.id);
    setPaying(false);
  };

  const handleCancel = async () => {
    // Release held seats
    await supabase
      .from("seats")
      .update({ status: "available", held_by: null, held_until: null })
      .in("id", heldSeats.map((s) => s.id))
      .eq("held_by", SESSION_ID);
    clearInterval(timerRef.current!);
    onCancel();
  };

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const timerUrgent = timeLeft < 60;

  return (
    <div className="max-w-md mx-auto space-y-5">
      {/* Timer */}
      <div className={`flex items-center justify-center gap-2 rounded-xl border p-3 ${timerUrgent ? "border-destructive/50 bg-destructive/10" : "border-border bg-panel"}`}>
        <Clock className={`h-4 w-4 ${timerUrgent ? "text-destructive" : "text-primary"}`} />
        <span className={`text-sm font-semibold ${timerUrgent ? "text-destructive" : "text-foreground"}`}>
          Complete payment in {mins}:{secs.toString().padStart(2, "0")}
        </span>
      </div>

      {/* Booking summary */}
      <div className="rounded-xl border border-border bg-card p-4 space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Booking Summary</h3>
        <div className="flex items-center gap-3">
          {screening.movies.poster_url && (
            <img src={screening.movies.poster_url} alt={screening.movies.title} className="h-14 w-10 rounded object-cover shrink-0" />
          )}
          <div>
            <p className="text-sm font-medium text-foreground">{screening.movies.title}</p>
            <p className="text-xs text-muted-foreground">{formatDate(screening.show_date)} • {formatTime(screening.show_time)}</p>
            <p className="text-xs text-muted-foreground">Screen {screening.screen_number}</p>
          </div>
        </div>
        <div className="border-t border-border pt-3 space-y-1.5">
          {heldSeats.map((s) => (
            <div key={s.id} className="flex justify-between text-xs">
              <span className="text-muted-foreground">
                Seat {s.row_label}{s.col_number}
                <Badge variant="outline" className={`ml-1.5 text-[9px] px-1 py-0 ${s.seat_type === "premium" ? "border-purple-500/40 text-purple-400" : "border-green-500/40 text-green-400"}`}>
                  {s.seat_type}
                </Badge>
              </span>
              <span className="text-foreground font-medium">
                ₹{s.seat_type === "premium" ? screening.price_premium : screening.price_regular}
              </span>
            </div>
          ))}
          <div className="flex justify-between text-sm font-semibold pt-1 border-t border-border">
            <span className="text-foreground">Total</span>
            <span className="text-primary">₹{total}</span>
          </div>
        </div>
      </div>

      {/* User details */}
      <div className="rounded-xl border border-border bg-card p-4 space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Your Details</h3>
        <div className="space-y-2">
          <div>
            <label className="text-xs text-muted-foreground">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className="bg-panel border-border text-foreground h-9 text-sm mt-1" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Phone</label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10-digit phone number" maxLength={10} className="bg-panel border-border text-foreground h-9 text-sm mt-1" />
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={handleCancel} className="flex-1 border-border text-muted-foreground hover:border-destructive hover:text-destructive">
          <X className="mr-2 h-4 w-4" /> Cancel
        </Button>
        <Button onClick={handlePay} disabled={paying} className="flex-1 gold-gradient text-primary-foreground font-semibold hover:opacity-90">
          {paying ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Confirming...</> : <>Pay ₹{total} <ChevronRight className="ml-1 h-4 w-4" /></>}
        </Button>
      </div>
    </div>
  );
}

// ── Step 4: Confirmed ─────────────────────────────────────────────────────────
function Confirmed({
  bookingId,
  screening,
  seats,
  userName,
}: {
  bookingId: string;
  screening: Screening;
  seats: Seat[];
  userName: string;
}) {
  const navigate = useNavigate();
  const total = seats.reduce((sum, s) =>
    sum + (s.seat_type === "premium" ? screening.price_premium : screening.price_regular), 0
  );

  return (
    <div className="max-w-md mx-auto text-center space-y-6">
      <div className="flex flex-col items-center gap-3">
        <div className="h-16 w-16 rounded-full bg-green-500/20 border-2 border-green-500/40 flex items-center justify-center">
          <Check className="h-8 w-8 text-green-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Booking Confirmed!</h2>
          <p className="text-sm text-muted-foreground mt-1">Have a great time, {userName}!</p>
        </div>
      </div>

      <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4 space-y-3 text-left">
        <div className="flex items-center gap-3">
          {screening.movies.poster_url && (
            <img src={screening.movies.poster_url} alt={screening.movies.title} className="h-16 w-11 rounded object-cover shrink-0" />
          )}
          <div>
            <p className="font-semibold text-foreground">{screening.movies.title}</p>
            <p className="text-xs text-muted-foreground">{formatDate(screening.show_date)}</p>
            <p className="text-xs text-muted-foreground">{formatTime(screening.show_time)} • Screen {screening.screen_number}</p>
          </div>
        </div>
        <div className="border-t border-border pt-3">
          <p className="text-xs text-muted-foreground mb-1">Seats</p>
          <div className="flex flex-wrap gap-1.5">
            {seats.map((s) => (
              <Badge key={s.id} variant="outline" className="border-green-500/40 text-green-400 text-xs">
                {s.row_label}{s.col_number}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex justify-between text-sm font-semibold border-t border-border pt-3">
          <span className="text-foreground">Amount Paid</span>
          <span className="text-primary">₹{total}</span>
        </div>
        <p className="text-[10px] text-muted-foreground">Booking ID: {bookingId}</p>
      </div>

      <Button onClick={() => navigate("/movies")} className="w-full gold-gradient text-primary-foreground font-semibold hover:opacity-90">
        Browse More Movies
      </Button>
    </div>
  );
}

// ── Main Booking Page ─────────────────────────────────────────────────────────
export default function Booking() {
  const [searchParams] = useSearchParams();
  const movieTitle = searchParams.get("movie") ?? undefined;

  const [step, setStep] = useState<Step>("select-screening");
  const [screening, setScreening] = useState<Screening | null>(null);
  const [heldSeats, setHeldSeats] = useState<Seat[]>([]);
  const [bookingId, setBookingId] = useState<string>("");
  const [confirmedName, setConfirmedName] = useState<string>("");

  const stepLabels: { key: Step; label: string; icon: React.ReactNode }[] = [
    { key: "select-screening", label: "Show", icon: <Film className="h-3.5 w-3.5" /> },
    { key: "select-seats", label: "Seats", icon: <Monitor className="h-3.5 w-3.5" /> },
    { key: "checkout", label: "Checkout", icon: <Calendar className="h-3.5 w-3.5" /> },
    { key: "confirmed", label: "Confirmed", icon: <Check className="h-3.5 w-3.5" /> },
  ];

  const stepIndex = stepLabels.findIndex((s) => s.key === step);

  return (
    <div className="min-h-screen pt-16 flex flex-col">
      <div className="mx-auto max-w-4xl px-4 py-8 flex-1 w-full">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Book Tickets</h1>
          {movieTitle && <p className="text-muted-foreground text-sm mt-1">Showing results for "{movieTitle}"</p>}
        </div>

        {/* Stepper */}
        {step !== "confirmed" && (
          <div className="flex items-center mb-8">
            {stepLabels.filter((s) => s.key !== "confirmed").map((s, i) => (
              <div key={s.key} className="flex items-center flex-1 last:flex-none">
                <div className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors
                  ${stepIndex >= i
                    ? "bg-primary/20 text-primary border border-primary/40"
                    : "bg-panel text-muted-foreground border border-border"
                  }`}>
                  {s.icon}{s.label}
                </div>
                {i < 2 && (
                  <div className={`flex-1 h-px mx-2 ${stepIndex > i ? "bg-primary/40" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Screening info bar */}
        {screening && step !== "select-screening" && step !== "confirmed" && (
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 mb-6 text-sm">
            {screening.movies.poster_url && (
              <img src={screening.movies.poster_url} alt={screening.movies.title} className="h-10 w-7 rounded object-cover shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">{screening.movies.title}</p>
              <p className="text-xs text-muted-foreground">{formatDate(screening.show_date)} • {formatTime(screening.show_time)} • Screen {screening.screen_number}</p>
            </div>
            {step === "select-seats" && (
              <button onClick={() => setStep("select-screening")} className="text-xs text-primary hover:underline shrink-0">Change</button>
            )}
          </div>
        )}

        {/* Steps */}
        {step === "select-screening" && (
          <SelectScreening
            movieTitle={movieTitle}
            onSelect={(s) => { setScreening(s); setStep("select-seats"); }}
          />
        )}

        {step === "select-seats" && screening && (
          <SelectSeats
            screening={screening}
            onConfirm={(seats) => { setHeldSeats(seats); setStep("checkout"); }}
            onBack={() => setStep("select-screening")}
          />
        )}

        {step === "checkout" && screening && (
          <Checkout
            screening={screening}
            heldSeats={heldSeats}
            onConfirmed={(id) => {
              setBookingId(id);
              setStep("confirmed");
            }}
            onCancel={() => {
              setHeldSeats([]);
              setStep("select-seats");
            }}
          />
        )}

        {step === "confirmed" && screening && (
          <Confirmed
            bookingId={bookingId}
            screening={screening}
            seats={heldSeats}
            userName={confirmedName}
          />
        )}
      </div>
      <PiracyFooter />
    </div>
  );
}