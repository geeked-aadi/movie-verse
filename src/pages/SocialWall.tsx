import { useState, useEffect, useRef } from "react";
import { Search, X, Plus, Loader2, Film, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import PiracyFooter from "@/components/PiracyFooter";
import { supabase } from "@/lib/supabase";

interface MovieOption {
  id: string;
  title: string;
  year: number;
  poster_url: string;
}

interface ActorOption {
  id: string;
  name: string;
  photo_url: string;
}

interface WallEntry {
  id: string;
  user_name: string;
  created_at: string;
  movies: (MovieOption | null)[];
  actor: ActorOption | null;
}

function SearchDropdown<T extends { id: string }>({
  placeholder,
  icon,
  onSearch,
  onSelect,
  renderResult,
  renderSelected,
  selected,
  onClear,
}: {
  placeholder: string;
  icon?: React.ReactNode;
  onSearch: (q: string) => Promise<T[]>;
  onSelect: (item: T) => void;
  renderResult: (item: T) => React.ReactNode;
  renderSelected: (item: T) => React.ReactNode;
  selected: T | null;
  onClear: () => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<T[]>([]);
  const [searching, setSearching] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function outside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", outside);
    return () => document.removeEventListener("mousedown", outside);
  }, []);

  useEffect(() => {
    if (!query.trim()) { setResults([]); setOpen(false); return; }
    const t = setTimeout(async () => {
      setSearching(true);
      setResults(await onSearch(query));
      setOpen(true);
      setSearching(false);
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  if (selected) {
    return (
      <div className="flex items-center justify-between rounded-lg border border-primary/40 bg-panel px-3 py-2">
        {renderSelected(selected)}
        <button onClick={onClear} className="ml-2 shrink-0 text-muted-foreground hover:text-destructive transition-colors">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span>}
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder={placeholder}
          className={`bg-panel border-border text-foreground text-sm h-9 ${icon ? "pl-9" : "pl-3"}`}
        />
        {searching && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 animate-spin text-muted-foreground" />}
      </div>
      {open && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-lg border border-border bg-card shadow-xl overflow-hidden max-h-48 overflow-y-auto">
          {results.map((item) => (
            <button
              key={item.id}
              onClick={() => { onSelect(item); setQuery(""); setOpen(false); }}
              className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-primary/10 transition-colors text-left"
            >
              {renderResult(item)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function AddModal({ onAdded, onClose }: { onAdded: () => void; onClose: () => void }) {
  const [name, setName] = useState("");
  const [movies, setMovies] = useState<(MovieOption | null)[]>([null, null, null, null]);
  const [actor, setActor] = useState<ActorOption | null>(null);
  const [saving, setSaving] = useState(false);
  const [searchingSlot, setSearchingSlot] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MovieOption[]>([]);
  const [searching, setSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchingSlot !== null) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [searchingSlot]);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const t = setTimeout(async () => {
      setSearching(true);
      const { data } = await supabase
        .from("movies")
        .select("id, title, year, poster_url")
        .ilike("title", `%${query}%`)
        .limit(8);
      setResults(data ?? []);
      setSearching(false);
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  const searchActors = async (q: string): Promise<ActorOption[]> => {
    const { data } = await supabase.from("actors").select("id, name, photo_url").ilike("name", `%${q}%`).limit(6);
    return data ?? [];
  };

  const handleSubmit = async () => {
    if (!name.trim()) { toast.error("Please enter your name"); return; }
    if (movies.some((m) => !m)) { toast.error("Please select all 4 movies"); return; }
    setSaving(true);
    try {
      const { error } = await supabase.from("social_wall").insert({
        user_name: name.trim(),
        movie_1_id: movies[0]!.id,
        movie_2_id: movies[1]!.id,
        movie_3_id: movies[2]!.id,
        movie_4_id: movies[3]!.id,
        actor_id: actor?.id ?? null,
      });
      if (error) throw error;
      toast.success("Posted to the wall!");
      onAdded();
      onClose();
    } catch (err: any) {
      toast.error(err.message ?? "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-xl border border-border bg-card shadow-2xl p-5 space-y-4">

        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-foreground">Share Your Picks</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">Your Name</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name..."
            className="bg-panel border-border text-foreground h-9 text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs text-muted-foreground">Top 4 Movies — click a slot to pick</label>
          <div className="grid grid-cols-4 gap-2">
            {movies.map((movie, i) => (
              <button
                key={i}
                onClick={() => setSearchingSlot(searchingSlot === i ? null : i)}
                className={`relative rounded-xl overflow-hidden border-2 transition-all focus:outline-none
                  ${searchingSlot === i
                    ? "border-primary shadow-lg shadow-primary/20 scale-[1.03]"
                    : movie
                    ? "border-transparent hover:border-primary/50"
                    : "border-dashed border-border hover:border-primary/40 bg-panel"
                  }`}
                style={{ aspectRatio: "2/3" }}
              >
                {movie ? (
                  <>
                    <img src={movie.poster_url} alt={movie.title} className="h-full w-full object-cover" />
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setMovies((prev) => prev.map((x, j) => j === i ? null : x));
                        if (searchingSlot === i) setSearchingSlot(null);
                      }}
                      className="absolute top-1 right-1 rounded-full bg-background/70 p-0.5 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <X className="h-3 w-3 text-foreground" />
                    </div>
                    <div className="absolute bottom-1 left-1 rounded bg-background/70 px-1 py-0.5">
                      <span className="text-[9px] font-bold text-foreground">{i + 1}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full gap-1 p-1">
                    <Film className="h-5 w-5 text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground">{i + 1}</span>
                  </div>
                )}
              </button>
            ))}
          </div>

          {searchingSlot !== null && (
            <div className="space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`Search for movie ${searchingSlot + 1}...`}
                  className="pl-9 bg-panel border-border text-foreground h-9 text-sm"
                />
                {searching && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 animate-spin text-muted-foreground" />}
              </div>
              {results.length > 0 && (
                <div className="rounded-lg border border-border bg-card overflow-hidden max-h-44 overflow-y-auto">
                  {results.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        setMovies((prev) => prev.map((x, j) => j === searchingSlot ? m : x));
                        setSearchingSlot(null);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-primary/10 transition-colors text-left"
                    >
                      {m.poster_url
                        ? <img src={m.poster_url} alt={m.title} className="h-10 w-7 rounded object-cover shrink-0" />
                        : <div className="h-10 w-7 rounded bg-muted shrink-0" />}
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{m.title}</p>
                        <p className="text-xs text-muted-foreground">{m.year}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">
            Favourite Actor <span className="text-muted-foreground/60">(optional)</span>
          </label>
          <SearchDropdown<ActorOption>
            placeholder="Search actors..."
            icon={<User className="h-3.5 w-3.5" />}
            onSearch={searchActors}
            onSelect={setActor}
            onClear={() => setActor(null)}
            selected={actor}
            renderResult={(a) => (
              <>
                {a.photo_url
                  ? <img src={a.photo_url} alt={a.name} className="h-8 w-8 rounded-full object-cover object-top shrink-0" />
                  : <div className="h-8 w-8 rounded-full bg-muted shrink-0" />}
                <p className="text-sm font-medium text-foreground">{a.name}</p>
              </>
            )}
            renderSelected={(a) => (
              <div className="flex items-center gap-2">
                {a.photo_url
                  ? <img src={a.photo_url} alt={a.name} className="h-7 w-7 rounded-full object-cover object-top shrink-0" />
                  : <div className="h-7 w-7 rounded-full bg-muted shrink-0" />}
                <p className="text-xs font-medium text-foreground">{a.name}</p>
              </div>
            )}
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={saving}
          className="w-full gold-gradient text-primary-foreground font-semibold hover:opacity-90"
        >
          {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Posting...</> : "Post to Wall"}
        </Button>
      </div>
    </div>
  );
}

function WallCard({ entry }: { entry: WallEntry }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-3 hover:border-primary/40 transition-all">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full gold-gradient flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
          {entry.user_name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{entry.user_name}</p>
          <p className="text-[10px] text-muted-foreground">
            {new Date(entry.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {entry.movies.map((movie, i) =>
          movie ? (
            <div
              key={i}
              className="rounded-lg overflow-hidden border border-border relative group"
              style={{ aspectRatio: "2/3" }}
            >
              <img
                src={movie.poster_url}
                alt={movie.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-[11px] font-semibold text-foreground truncate">{movie.title}</p>
                <p className="text-[10px] text-muted-foreground">{movie.year}</p>
              </div>
            </div>
          ) : (
            <div
              key={i}
              className="rounded-lg border border-dashed border-border bg-panel flex items-center justify-center"
              style={{ aspectRatio: "2/3" }}
            >
              <Film className="h-5 w-5 text-muted-foreground" />
            </div>
          )
        )}
      </div>

      {entry.actor && (
        <div className="flex items-center gap-2 rounded-lg border border-border bg-panel px-3 py-2">
          {entry.actor.photo_url
            ? <img src={entry.actor.photo_url} alt={entry.actor.name} className="h-7 w-7 rounded-full object-cover object-top shrink-0" />
            : <div className="h-7 w-7 rounded-full bg-muted shrink-0 flex items-center justify-center">
                <User className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
          }
          <div>
            <p className="text-[10px] text-muted-foreground">Favourite Actor</p>
            <p className="text-xs font-medium text-foreground">{entry.actor.name}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SocialWall() {
  const [entries, setEntries] = useState<WallEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchEntries = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("social_wall")
        .select(`
          id, user_name, created_at,
          movie_1:movie_1_id ( id, title, year, poster_url ),
          movie_2:movie_2_id ( id, title, year, poster_url ),
          movie_3:movie_3_id ( id, title, year, poster_url ),
          movie_4:movie_4_id ( id, title, year, poster_url ),
          actor:actor_id ( id, name, photo_url )
        `)
        .order("created_at", { ascending: false });
      if (error) throw error;
      setEntries((data ?? []).map((row: any) => ({
        id: row.id,
        user_name: row.user_name,
        created_at: row.created_at,
        movies: [row.movie_1, row.movie_2, row.movie_3, row.movie_4],
        actor: row.actor ?? null,
      })));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEntries(); }, []);

  return (
    <div className="min-h-screen pt-16 flex flex-col">
      <div className="mx-auto max-w-4xl px-4 py-8 flex-1 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Social Wall</h1>
            <p className="text-muted-foreground text-sm mt-1">See what the community is watching</p>
          </div>
          <Button
            onClick={() => setShowModal(true)}
            className="gold-gradient text-primary-foreground font-semibold hover:opacity-90 gap-2"
          >
            <Plus className="h-4 w-4" /> Share Picks
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24 text-muted-foreground gap-2">
            <Loader2 className="h-5 w-5 animate-spin" /><span>Loading wall...</span>
          </div>
        ) : error ? (
          <p className="text-center text-destructive py-12">Failed to load: {error}</p>
        ) : entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-muted-foreground">
            <Film className="h-10 w-10" />
            <p className="text-sm">No entries yet. Be the first to share!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {entries.map((entry) => <WallCard key={entry.id} entry={entry} />)}
          </div>
        )}
      </div>

      {showModal && <AddModal onAdded={fetchEntries} onClose={() => setShowModal(false)} />}
      <PiracyFooter />
    </div>
  );
}