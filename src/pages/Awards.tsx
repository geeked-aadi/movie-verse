import { useState, useMemo, useEffect } from "react";
import { Trophy, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import DetailPanel from "@/components/DetailPanel";
import PiracyFooter from "@/components/PiracyFooter";
import type { Award } from "@/data/mockData";
import { supabase } from "@/lib/supabase";

function rowToAward(row: Record<string, any>): Award {
  return {
    id: row.id,
    name: row.name ?? "Unknown",
    category: row.category ?? "Uncategorized",
    year: row.year ?? 0,
    body: row.category ?? "Unknown",       // no body column — use category as label
    movieTitle: row.movies?.title ?? "N/A",
    moviePoster: row.movies?.poster_url ?? "",
    won: row.result === "won",
    nominees: [],                           // no nominees column in schema
  };
}

export default function Awards() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Award | null>(null);
  const [category, setCategory] = useState("all");
  const [year, setYear] = useState("all");
  const [wonOnly, setWonOnly] = useState(false);

  useEffect(() => {
    async function fetchAwards() {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
        .from("awards")
        .select(`
          *,
          movies ( title, poster_url ),
          actors ( name, photo_url )
        `)
        .order("year", { ascending: false });

        if (error) throw error;
        setAwards(data ? data.map((row) => rowToAward(row as Record<string, any>)) : []);
      } catch (err: any) {
        console.error("Failed to fetch awards:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAwards();
  }, []);

  const allCategories = useMemo(
    () => [...new Set(awards.map((a) => a.category))].sort(),
    [awards]
  );
  const allYears = useMemo(
    () => [...new Set(awards.map((a) => a.year))].sort((a, b) => b - a),
    [awards]
  );

  const filtered = useMemo(() => {
    return awards.filter((a) => {
      const matchCategory = category === "all" || a.category === category;
      const matchYear = year === "all" || a.year === Number(year);
      const matchWon = !wonOnly || a.won;
      return matchCategory && matchYear && matchWon;
    });
  }, [awards, category, year, wonOnly]);

  return (
    <div className="min-h-screen pt-16 flex flex-col">
      <div className="mx-auto max-w-7xl px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold mb-6">Awards</h1>

        <div className="flex flex-wrap items-center gap-3 mb-8 rounded-lg border border-border bg-card p-4">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-48 bg-panel border-border text-foreground"><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">All Categories</SelectItem>
              {allCategories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-32 bg-panel border-border text-foreground"><SelectValue placeholder="Year" /></SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">All Years</SelectItem>
              {allYears.map((y) => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2 ml-auto">
            <Switch id="won-toggle" checked={wonOnly} onCheckedChange={setWonOnly} />
            <Label htmlFor="won-toggle" className="text-sm text-muted-foreground cursor-pointer">Won only</Label>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24 text-muted-foreground gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Loading awards…</span>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-24">
            <p className="text-sm text-destructive">Failed to load awards: {error}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((award) => (
                <div
                  key={award.id}
                  onClick={() => setSelected(award)}
                  className="group cursor-pointer flex gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                >
                  <Trophy className={`h-10 w-10 shrink-0 mt-1 ${award.won ? "text-primary" : "text-warning"}`} />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{award.name}</h3>
                    <p className="text-xs text-muted-foreground">{award.category}</p>
                    <p className="text-xs text-muted-foreground">{award.year}</p>
                    <div className="mt-2 flex items-center gap-2">
                      {award.moviePoster ? (
                        <img src={award.moviePoster} alt={award.movieTitle} className="h-10 w-7 rounded object-cover" />
                      ) : (
                        <div className="h-10 w-7 rounded bg-panel" />
                      )}
                      <span className="text-xs text-foreground truncate">{award.movieTitle}</span>
                    </div>
                  </div>
                  <Badge className={`self-start shrink-0 text-[10px] ${award.won ? "gold-gradient text-primary-foreground" : "bg-warning/10 text-warning border-warning/20"}`}>
                    {award.won ? "Won" : "Nominated"}
                  </Badge>
                </div>
              ))}
            </div>
            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground py-12">
                {awards.length === 0 ? "No awards in the database yet." : "No awards found matching your filters."}
              </p>
            )}
          </>
        )}
      </div>
      <PiracyFooter />
      {selected && <DetailPanel type="award" data={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}