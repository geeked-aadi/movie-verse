import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Clock, Armchair, Ticket, Loader2 } from "lucide-react";
import PiracyFooter from "@/components/PiracyFooter";
import type { Movie } from "@/data/mockData";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const cities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow"];
const theaters = ["PVR Cinemas", "INOX Movies", "Cinépolis", "Carnival Cinemas", "Rajhans Cinemas"];
const showtimes = ["10:00 AM", "1:15 PM", "4:30 PM", "7:45 PM", "10:30 PM"];

const ROWS = 8;
const COLS = 10;
const rowLabels = "ABCDEFGH".split("");

function rowToMovie(row: Record<string, unknown>): Movie {
  return {
    id: (row.id as string | number | undefined) ?? crypto.randomUUID(),
    title: (row.title as string | undefined) ?? "Unknown",
    year: (row.year as number | undefined) ?? 0,
    genre: Array.isArray(row.genres) ? (row.genres as string[]) : [],
    rating: (row.rating as number | undefined) ?? 0,
    director: (row.director as string | undefined) ?? "Unknown",
    duration: (row.duration as string | undefined) ?? "N/A",
    language: (row.language as string | undefined) ?? "N/A",
    synopsis: (row.synopsis as string | undefined) ?? "",
    poster: (row.poster_url as string | undefined) ?? "",
    heroImage: (row.poster_url as string | undefined) ?? "",
    budget: row.budget_cr != null ? `₹${String(row.budget_cr)} Cr` : "N/A",
    boxOffice: row.box_office_cr != null ? `₹${String(row.box_office_cr)} Cr` : "N/A",
    cast: [],
    awards: [],
    trailerUrl: (row.trailer_url as string | undefined) ?? undefined,
  };
}

function generateSeats() {
  const seats: string[][] = [];
  for (let r = 0; r < ROWS; r++) {
    const row: string[] = [];
    for (let c = 0; c < COLS; c++) {
      row.push(Math.random() < 0.2 ? "booked" : "available");
    }
    seats.push(row);
  }
  return seats;
}

export default function Booking() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const movieTitle = searchParams.get("movie") || "";
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [loadingMovie, setLoadingMovie] = useState(true);
  const [movieError, setMovieError] = useState<string | null>(null);
  const movie = allMovies.find((m) => m.title === movieTitle);

  const [step, setStep] = useState(1);
  const [city, setCity] = useState("");
  const [theater, setTheater] = useState("");
  const [showtime, setShowtime] = useState("");
  const [seatMap] = useState(generateSeats);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const ticketPrice = 250;

  const toggleSeat = (row: number, col: number) => {
    if (seatMap[row][col] === "booked") return;
    const seatId = `${rowLabels[row]}${col + 1}`;
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((s) => s !== seatId) : [...prev, seatId]
    );
  };

  const handleConfirm = () => {
    toast.success("🎬 Tickets Booked Successfully!", {
      description: `${selectedSeats.length} ticket(s) for ${movieTitle} at ${theater}, ${city}`,
    });
    navigate("/movies");
  };

  useEffect(() => {
    async function fetchMovies() {
      setLoadingMovie(true);
      setMovieError(null);
      try {
        const { data, error } = await supabase
          .from("movies")
          .select("*");
        if (error) throw error;
        setAllMovies(data ? data.map((row) => rowToMovie(row as Record<string, unknown>)) : []);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        console.error("Failed to fetch movies for booking:", message);
        setMovieError(message);
      } finally {
        setLoadingMovie(false);
      }
    }
    fetchMovies();
  }, []);

  if (loadingMovie) {
    return (
      <div className="min-h-screen pt-16 flex flex-col items-center justify-center gap-2 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        <p>Loading movie details…</p>
      </div>
    );
  }

  if (movieError) {
    return (
      <div className="min-h-screen pt-16 flex flex-col items-center justify-center">
        <p className="text-sm text-destructive">Failed to load movies: {movieError}</p>
        <Button variant="outline" onClick={() => navigate("/movies")} className="mt-4">Go Back</Button>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen pt-16 flex flex-col items-center justify-center">
        <p className="text-muted-foreground">Movie not found.</p>
        <Button variant="outline" onClick={() => navigate("/movies")} className="mt-4">Go Back</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 flex flex-col">
      <div className="mx-auto max-w-4xl px-4 py-8 flex-1">
        <Button variant="ghost" onClick={() => navigate("/movies")} className="mb-4 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Movies
        </Button>

        <div className="flex items-center gap-4 mb-8 rounded-lg border border-border bg-card p-4">
          <img src={movie.poster} alt={movie.title} className="h-24 w-16 rounded object-cover" />
          <div>
            <h1 className="text-xl font-bold text-primary">{movie.title}</h1>
            <p className="text-sm text-muted-foreground">{movie.genre.join(", ")} • {movie.duration} • {movie.language}</p>
          </div>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center gap-2 mb-8">
          {["City & Theater", "Showtime", "Seats", "Confirm"].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${step > i + 1 ? "bg-success text-success-foreground" : step === i + 1 ? "gold-gradient text-primary-foreground" : "bg-panel text-muted-foreground"}`}>
                {i + 1}
              </div>
              <span className={`text-sm hidden sm:inline ${step === i + 1 ? "text-primary font-medium" : "text-muted-foreground"}`}>{label}</span>
              {i < 3 && <div className="w-8 h-px bg-border" />}
            </div>
          ))}
        </div>

        {/* Step 1: City & Theater */}
        {step === 1 && (
          <div className="rounded-lg border border-border bg-card p-6 space-y-6">
            <h2 className="text-lg font-bold flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" /> Select City & Theater</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-foreground mb-2 block">City</label>
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger className="bg-panel border-border text-foreground"><SelectValue placeholder="Select city" /></SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-foreground mb-2 block">Theater</label>
                <Select value={theater} onValueChange={setTheater}>
                  <SelectTrigger className="bg-panel border-border text-foreground"><SelectValue placeholder="Select theater" /></SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {theaters.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={() => setStep(2)} disabled={!city || !theater} className="gold-gradient text-primary-foreground font-semibold hover:opacity-90">
              Continue
            </Button>
          </div>
        )}

        {/* Step 2: Showtime */}
        {step === 2 && (
          <div className="rounded-lg border border-border bg-card p-6 space-y-6">
            <h2 className="text-lg font-bold flex items-center gap-2"><Clock className="h-5 w-5 text-primary" /> Select Showtime</h2>
            <p className="text-sm text-muted-foreground">{theater}, {city}</p>
            <div className="flex flex-wrap gap-3">
              {showtimes.map((t) => (
                <button
                  key={t}
                  onClick={() => setShowtime(t)}
                  className={`rounded-lg border px-5 py-3 text-sm font-medium transition-all ${showtime === t ? "border-primary bg-primary/10 text-primary" : "border-border bg-panel text-muted-foreground hover:border-primary/40"}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="border-border text-muted-foreground">Back</Button>
              <Button onClick={() => setStep(3)} disabled={!showtime} className="gold-gradient text-primary-foreground font-semibold hover:opacity-90">Continue</Button>
            </div>
          </div>
        )}

        {/* Step 3: Seat Selection */}
        {step === 3 && (
          <div className="rounded-lg border border-border bg-card p-6 space-y-6">
            <h2 className="text-lg font-bold flex items-center gap-2"><Armchair className="h-5 w-5 text-primary" /> Select Seats</h2>
            <p className="text-sm text-muted-foreground">{theater}, {city} • {showtime}</p>

            {/* Screen */}
            <div className="text-center mb-4">
              <div className="mx-auto w-3/4 h-2 rounded-full bg-primary/30 mb-1" />
              <p className="text-xs text-muted-foreground">SCREEN</p>
            </div>

            {/* Seat Grid */}
            <div className="flex flex-col items-center gap-1.5">
              {seatMap.map((row, ri) => (
                <div key={ri} className="flex items-center gap-1.5">
                  <span className="w-5 text-xs text-muted-foreground text-right">{rowLabels[ri]}</span>
                  {row.map((seat, ci) => {
                    const seatId = `${rowLabels[ri]}${ci + 1}`;
                    const isSelected = selectedSeats.includes(seatId);
                    const isBooked = seat === "booked";
                    return (
                      <button
                        key={ci}
                        onClick={() => toggleSeat(ri, ci)}
                        disabled={isBooked}
                        className={`h-7 w-7 rounded text-[10px] font-medium transition-all ${
                          isBooked
                            ? "bg-destructive/30 text-destructive cursor-not-allowed"
                            : isSelected
                            ? "gold-gradient text-primary-foreground scale-105"
                            : "bg-success/20 text-success hover:bg-success/30"
                        }`}
                      >
                        {ci + 1}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5"><div className="h-4 w-4 rounded bg-success/20" /> Available</div>
              <div className="flex items-center gap-1.5"><div className="h-4 w-4 rounded gold-gradient" /> Selected</div>
              <div className="flex items-center gap-1.5"><div className="h-4 w-4 rounded bg-destructive/30" /> Booked</div>
            </div>

            {selectedSeats.length > 0 && (
              <div className="rounded-lg bg-panel p-3 text-sm">
                <span className="text-foreground font-medium">Selected: </span>
                <span className="text-primary">{selectedSeats.sort().join(", ")}</span>
                <span className="text-muted-foreground ml-2">({selectedSeats.length} × ₹{ticketPrice} = ₹{selectedSeats.length * ticketPrice})</span>
              </div>
            )}

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(2)} className="border-border text-muted-foreground">Back</Button>
              <Button onClick={() => setStep(4)} disabled={selectedSeats.length === 0} className="gold-gradient text-primary-foreground font-semibold hover:opacity-90">Continue</Button>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <div className="rounded-lg border border-border bg-card p-6 space-y-6">
            <h2 className="text-lg font-bold flex items-center gap-2"><Ticket className="h-5 w-5 text-primary" /> Booking Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Movie</span>
                <span className="text-foreground font-medium">{movie.title}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">City</span>
                <span className="text-foreground">{city}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Theater</span>
                <span className="text-foreground">{theater}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Showtime</span>
                <span className="text-foreground">{showtime}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Seats</span>
                <span className="text-primary font-medium">{selectedSeats.sort().join(", ")}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-foreground font-bold">Total Amount</span>
                <span className="text-primary font-bold text-lg">₹{selectedSeats.length * ticketPrice}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(3)} className="border-border text-muted-foreground">Back</Button>
              <Button onClick={handleConfirm} className="gold-gradient text-primary-foreground font-semibold hover:opacity-90 flex-1">
                <Ticket className="mr-2 h-4 w-4" /> Confirm Booking
              </Button>
            </div>
          </div>
        )}
      </div>
      <PiracyFooter />
    </div>
  );
}
