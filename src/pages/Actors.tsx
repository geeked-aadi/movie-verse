import { useState, useEffect, useMemo } from "react";
import { MapPin, Calendar, Search, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import DetailPanel from "@/components/DetailPanel";
import PiracyFooter from "@/components/PiracyFooter";
import type { Actor } from "@/data/mockData";
import { supabase } from "@/lib/supabase";

function rowToActor(row: Record<string, any>): Actor {
  const birthYear = row.date_of_birth ? new Date(row.date_of_birth).getFullYear() : null;
  const age = birthYear ? new Date().getFullYear() - birthYear : 0;
  const activeYears = row.active_from
    ? `${row.active_from}–${row.active_to ?? "Present"}`
    : "N/A";

  return {
    id: row.id,
    name: row.name,
    nationality: row.nationality ?? "N/A",
    dob: row.date_of_birth ?? "",
    age,
    gender: row.gender ?? "N/A",
    biography: row.biography ?? "",
    photo: row.photo_url ?? "",
    awardsCount: 0,
    primaryRole: row.primary_role ?? "Actor",
    placeOfBirth: row.place_of_birth ?? "N/A",
    height: row.height_cm ? `${row.height_cm} cm` : "N/A",
    activeYears,
    socialLinks: [],
    knownFor: [],
    filmography: [],
    awards: [],
  };
}

export default function Actors() {
  const [dbActors, setDbActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Actor | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchActors() {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from("actors")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        setDbActors(data ? data.map(rowToActor) : []);
      } catch (err: any) {
        console.error("Failed to fetch actors:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchActors();
  }, []);

  const filtered = useMemo(() =>
    dbActors.filter((a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.primaryRole.toLowerCase().includes(search.toLowerCase()) ||
      a.nationality.toLowerCase().includes(search.toLowerCase())
    ),
    [dbActors, search]
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

        {loading ? (
          <div className="flex items-center justify-center py-24 text-muted-foreground gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Loading actors…</span>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-24">
            <p className="text-sm text-destructive">Failed to load actors: {error}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {filtered.map((actor) => (
                <div
                  key={actor.id}
                  onClick={() => setSelected(actor)}
                  className="group cursor-pointer flex flex-col items-center rounded-lg border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
                >
                  <div className="relative mb-3">
                    {actor.photo ? (
                      <img
                        src={actor.photo}
                        alt={actor.name}
                        className="h-28 w-28 rounded-full object-cover object-top border-2 border-border transition-colors group-hover:border-primary"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-28 w-28 rounded-full bg-panel border-2 border-border flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">No photo</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold text-foreground text-center group-hover:text-primary transition-colors">
                    {actor.name}
                  </h3>
                  <Badge variant="outline" className="mt-1 text-[10px] px-1.5 py-0 border-primary/30 text-primary">
                    {actor.primaryRole}
                  </Badge>
                  {actor.placeOfBirth !== "N/A" && (
                    <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate max-w-[120px]">{actor.placeOfBirth.split(",")[0]}</span>
                    </div>
                  )}
                  {actor.activeYears !== "N/A" && (
                    <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{actor.activeYears}</span>
                    </div>
                  )}
                  {actor.height !== "N/A" && (
                    <p className="text-[10px] text-muted-foreground mt-1">{actor.height}</p>
                  )}
                </div>
              ))}
            </div>
            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground py-12">
                {search ? `No actors found matching "${search}"` : "No actors in the database yet."}
              </p>
            )}
          </>
        )}
      </div>
      <PiracyFooter />
      {selected && <DetailPanel type="actor" data={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}