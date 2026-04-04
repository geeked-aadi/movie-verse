import { useState } from "react";
import { Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import DetailPanel from "@/components/DetailPanel";
import { actors, type Actor } from "@/data/mockData";

export default function Actors() {
  const [selected, setSelected] = useState<Actor | null>(null);

  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Actors</h1>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {actors.map((actor) => (
            <div
              key={actor.id}
              onClick={() => setSelected(actor)}
              className="group cursor-pointer flex flex-col items-center rounded-lg border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
            >
              <div className="relative mb-3">
                <img
                  src={actor.photo}
                  alt={actor.name}
                  className="h-28 w-28 rounded-full object-cover border-2 border-border transition-colors group-hover:border-primary"
                  loading="lazy"
                />
                <Badge className="absolute -bottom-1 left-1/2 -translate-x-1/2 gold-gradient text-primary-foreground text-[10px] px-1.5 py-0">
                  <Trophy className="mr-0.5 h-2.5 w-2.5" /> {actor.awardsCount}
                </Badge>
              </div>
              <h3 className="text-sm font-semibold text-foreground text-center group-hover:text-primary transition-colors">
                {actor.name}
              </h3>
              <p className="text-xs text-muted-foreground">{actor.nationality}</p>
              <p className="text-xs text-muted-foreground">Age {actor.age}</p>
            </div>
          ))}
        </div>
      </div>
      {selected && <DetailPanel type="actor" data={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
