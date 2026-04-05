import { useState, useMemo } from "react";
import { Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import DetailPanel from "@/components/DetailPanel";
import PiracyFooter from "@/components/PiracyFooter";
import { awards, type Award } from "@/data/mockData";

const allBodies = [...new Set(awards.map((a) => a.body))].sort();
const allYears = [...new Set(awards.map((a) => a.year))].sort((a, b) => b - a);

export default function Awards() {
  const [selected, setSelected] = useState<Award | null>(null);
  const [body, setBody] = useState("all");
  const [year, setYear] = useState("all");
  const [wonOnly, setWonOnly] = useState(false);

  const filtered = useMemo(() => {
    return awards.filter((a) => {
      const matchBody = body === "all" || a.body === body;
      const matchYear = year === "all" || a.year === Number(year);
      const matchWon = !wonOnly || a.won;
      return matchBody && matchYear && matchWon;
    });
  }, [body, year, wonOnly]);

  return (
    <div className="min-h-screen pt-16 flex flex-col">
      <div className="mx-auto max-w-7xl px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold mb-6">Awards</h1>

        <div className="flex flex-wrap items-center gap-3 mb-8 rounded-lg border border-border bg-card p-4">
          <Select value={body} onValueChange={setBody}>
            <SelectTrigger className="w-48 bg-panel border-border text-foreground"><SelectValue placeholder="Award Body" /></SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">All Award Bodies</SelectItem>
              {allBodies.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
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
                  <img src={award.moviePoster} alt={award.movieTitle} className="h-10 w-7 rounded object-cover" />
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
          <p className="text-center text-muted-foreground py-12">No awards found matching your filters.</p>
        )}
      </div>
      <PiracyFooter />
      {selected && <DetailPanel type="award" data={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
