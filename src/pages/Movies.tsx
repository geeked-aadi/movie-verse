import { useState, useMemo, useEffect } from "react";
import { Search, Loader2, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import MovieCard from "@/components/MovieCard";
import DetailPanel from "@/components/DetailPanel";
import PiracyFooter from "@/components/PiracyFooter";
import type { Movie } from "@/data/mockData";
import { supabase } from "@/lib/supabase";

function rowToMovie(row: Record<string, any>): Movie {
  return {
    id: row.id,
    title: row.title,
    year: row.year ?? 0,
    genre: Array.isArray(row.genres) ? row.genres : [],
    rating: row.rating ?? 0,
    director: row.director ?? "Unknown",
    duration: row.duration ?? "N/A",
    language: row.language ?? "N/A",
    synopsis: row.synopsis ?? "",
    poster: row.poster_url ?? "",
    heroImage: row.poster_url ?? "",
    budget: row.budget_cr != null ? `₹${row.budget_cr} Cr` : "N/A",
    boxOffice: row.box_office_cr != null ? `₹${row.box_office_cr} Cr` : "N/A",
    budgetRaw: row.budget_cr ?? null,
    boxOfficeRaw: row.box_office_cr ?? null,
    cast: [],
    awards: [],
    trailerUrl: row.trailer_url ?? undefined,
  };
}

type SortKey = "rating" | "year" | "az" | "boxOffice" | "budget" | "genre";
type SortOrder = "asc" | "desc";

export default function Movies() {
  const [dbMovies, setDbMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Movie | null>(null);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");
  const [language, setLanguage] = useState("all");
  const [sort, setSort] = useState<SortKey>("rating");
  const [order, setOrder] = useState<SortOrder>("desc");

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from("movies")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        setDbMovies(data ? data.map(rowToMovie) : []);
      } catch (err: any) {
        console.error("Failed to fetch movies:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  const allGenres = useMemo(
    () => [...new Set(dbMovies.flatMap((m) => m.genre))].sort(),
    [dbMovies]
  );
  const allLanguages = useMemo(
    () => [...new Set(dbMovies.map((m) => m.language))].sort(),
    [dbMovies]
  );

  const filtered = useMemo(() => {
    let result = dbMovies.filter((m) => {
      const matchSearch = m.title.toLowerCase().includes(search.toLowerCase());
      const matchGenre = genre === "all" || m.genre.includes(genre);
      const matchLang = language === "all" || m.language === language;
      return matchSearch && matchGenre && matchLang;
    });

    const dir = order === "asc" ? 1 : -1;

    switch (sort) {
      case "rating":
        result = [...result].sort((a, b) => dir * (a.rating - b.rating));
        break;
      case "year":
        result = [...result].sort((a, b) => dir * (a.year - b.year));
        break;
      case "az":
        result = [...result].sort((a, b) => dir * a.title.localeCompare(b.title));
        break;
      case "boxOffice":
        result = [...result].sort((a, b) => dir * ((a.boxOfficeRaw ?? -1) - (b.boxOfficeRaw ?? -1)));
        break;
      case "budget":
        result = [...result].sort((a, b) => dir * ((a.budgetRaw ?? -1) - (b.budgetRaw ?? -1)));
        break;
      case "genre":
        result = [...result].sort((a, b) => dir * (a.genre[0] ?? "").localeCompare(b.genre[0] ?? ""));
        break;
    }

    return result;
  }, [dbMovies, search, genre, language, sort, order]);

  // When switching to A-Z sort, default order to asc; numeric sorts default to desc
  function handleSortChange(val: SortKey) {
    setSort(val);
    if (val === "az" || val === "genre") {
      setOrder("asc");
    } else {
      setOrder("desc");
    }
  }

  return (
    <div className="min-h-screen pt-16 flex flex-col">
      <div className="mx-auto max-w-7xl px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold mb-6">Movies</h1>

        <div className="flex flex-wrap gap-3 mb-8 rounded-lg border border-border bg-card p-4">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search movies..."
              className="pl-9 bg-panel border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Genre filter */}
          <Select value={genre} onValueChange={setGenre}>
            <SelectTrigger className="w-36 bg-panel border-border text-foreground">
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">All Genres</SelectItem>
              {allGenres.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
            </SelectContent>
          </Select>

          {/* Language filter */}
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-36 bg-panel border-border text-foreground">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">All Languages</SelectItem>
              {allLanguages.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
            </SelectContent>
          </Select>

          {/* Sort by */}
          <Select value={sort} onValueChange={(v) => handleSortChange(v as SortKey)}>
            <SelectTrigger className="w-40 bg-panel border-border text-foreground">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="year">Year</SelectItem>
              <SelectItem value="az">A–Z</SelectItem>
              <SelectItem value="boxOffice">Box Office</SelectItem>
              <SelectItem value="budget">Budget</SelectItem>
              <SelectItem value="genre">Genre</SelectItem>
            </SelectContent>
          </Select>

          {/* Asc / Desc toggle */}
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 bg-panel border-border text-foreground hover:bg-muted h-10 px-3"
            onClick={() => setOrder((o) => (o === "asc" ? "desc" : "asc"))}
            title={order === "asc" ? "Ascending" : "Descending"}
          >
            <ArrowUpDown className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-wide">
              {order === "asc" ? "Asc" : "Desc"}
            </span>
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24 text-muted-foreground gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Loading movies…</span>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-24">
            <p className="text-sm text-destructive">Failed to load movies: {error}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {filtered.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onClick={setSelected} />
              ))}
            </div>
            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground py-12">
                No movies found matching your filters.
              </p>
            )}
          </>
        )}
      </div>

      <PiracyFooter />
      {selected && <DetailPanel type="movie" data={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}