import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MovieCard from "@/components/MovieCard";
import DetailPanel from "@/components/DetailPanel";
import { movies, type Movie } from "@/data/mockData";

const allGenres = [...new Set(movies.flatMap((m) => m.genre))].sort();
const allLanguages = [...new Set(movies.map((m) => m.language))].sort();

export default function Movies() {
  const [selected, setSelected] = useState<Movie | null>(null);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");
  const [language, setLanguage] = useState("all");
  const [sort, setSort] = useState("rating");

  const filtered = useMemo(() => {
    let result = movies.filter((m) => {
      const matchSearch = m.title.toLowerCase().includes(search.toLowerCase());
      const matchGenre = genre === "all" || m.genre.includes(genre);
      const matchLang = language === "all" || m.language === language;
      return matchSearch && matchGenre && matchLang;
    });
    switch (sort) {
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "year": result.sort((a, b) => b.year - a.year); break;
      case "az": result.sort((a, b) => a.title.localeCompare(b.title)); break;
    }
    return result;
  }, [search, genre, language, sort]);

  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Movies</h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8 rounded-lg border border-border bg-card p-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search movies..."
              className="pl-9 bg-panel border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <Select value={genre} onValueChange={setGenre}>
            <SelectTrigger className="w-36 bg-panel border-border text-foreground">
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">All Genres</SelectItem>
              {allGenres.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-36 bg-panel border-border text-foreground">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">All Languages</SelectItem>
              {allLanguages.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-36 bg-panel border-border text-foreground">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="year">Year</SelectItem>
              <SelectItem value="az">A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {filtered.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onClick={setSelected} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No movies found matching your filters.</p>
        )}
      </div>
      {selected && <DetailPanel type="movie" data={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
