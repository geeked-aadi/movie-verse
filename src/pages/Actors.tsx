import { useState } from "react";
import { Trophy, MapPin, Calendar, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import DetailPanel from "@/components/DetailPanel";
import PiracyFooter from "@/components/PiracyFooter";
import { actors, type Actor } from "@/data/mockData";

export default function Actors() {
  const [selected, setSelected] = useState<Actor | null>(null);
  const [search, setSearch] = useState("");

  const filtered = actors.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.primaryRole.toLowerCase().includes(search.toLowerCase()) ||
    a.nationality.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-16 flex flex-col">
      <div className="mx-auto max-w-7xl px-4 py-8 flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold">Actors</h1>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search actors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filtered.map((actor) => (
            <div
              key={actor.id}
              onClick={() => setSelected(actor)}
              className="group cursor-pointer flex flex-col items-center rounded-lg border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
            >
              <div className="relative mb-3">
                <img src={actor.photo} alt={actor.name} className="h-28 w-28 rounded-full object-cover object-top border-2 border-border transition-colors group-hover:border-primary" loading="lazy" />
                <Badge className="absolute -bottom-1 left-1/2 -translate-x-1/2 gold-gradient text-primary-foreground text-[10px] px-1.5 py-0">
                  <Trophy className="mr-0.5 h-2.5 w-2.5" /> {actor.awardsCount}
                </Badge>
              </div>
              <h3 className="text-sm font-semibold text-foreground text-center group-hover:text-primary transition-colors">{actor.name}</h3>
              <Badge variant="outline" className="mt-1 text-[10px] px-1.5 py-0 border-primary/30 text-primary">
                {actor.primaryRole}
              </Badge>
              <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span className="truncate max-w-[120px]">{actor.placeOfBirth.split(",")[0]}</span>
              </div>
              <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{actor.activeYears}</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">{actor.height}</p>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No actors found matching "{search}"</p>
        )}
      </div>
      <PiracyFooter />
      {selected && <DetailPanel type="actor" data={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
