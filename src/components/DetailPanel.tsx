import { useState, useEffect } from "react";
import { X, Star, Clock, Globe, Film, Trophy, Ticket, Play, MapPin, Ruler, Calendar, ExternalLink, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TrailerModal from "@/components/TrailerModal";
import type { Movie, Actor, Award } from "@/data/mockData";
import { supabase } from "@/lib/supabase";

interface DetailPanelProps {
  type: "movie" | "actor" | "award";
  data: Movie | Actor | Award | null;
  onClose: () => void;
}

export default function DetailPanel({ type, data, onClose }: DetailPanelProps) {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-border bg-card shadow-2xl shadow-black/40">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card p-4">
          <h2 className="text-lg font-bold text-primary">
            {type === "movie" && (data as Movie).title}
            {type === "actor" && (data as Actor).name}
            {type === "award" && (data as Award).name}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-4 space-y-6">
          {type === "movie" && <MovieDetail movie={data as Movie} onClose={onClose} />}
          {type === "actor" && <ActorDetail actor={data as Actor} />}
          {type === "award" && <AwardDetail award={data as Award} />}
        </div>
      </div>
    </div>
  );
}

// ── Movie Detail ─────────────────────────────────────────────────────────────
interface CastMember { name: string; role: string; photo: string; actor_id: string; }

function MovieDetail({ movie, onClose }: { movie: Movie; onClose: () => void }) {
  const navigate = useNavigate();
  const [showTrailer, setShowTrailer] = useState(false);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [castLoading, setCastLoading] = useState(true);
  const [selectedActor, setSelectedActor] = useState<Actor | null>(null);

  useEffect(() => {
    async function fetchCast() {
      setCastLoading(true);
      const { data } = await supabase
        .from("movie_cast")
        .select(`role, actor_id, actors ( name, photo_url )`)
        .eq("movie_id", movie.id as string);

      if (data) {
        setCast(data.map((row: any) => ({
          actor_id: row.actor_id,
          name: row.actors?.name ?? "Unknown",
          photo: row.actors?.photo_url ?? "",
          role: row.role ?? "N/A",
        })));
      }
      setCastLoading(false);
    }
    fetchCast();
  }, [movie.id]);

  const handleBookTickets = () => {
    onClose();
    navigate(`/booking?movie=${encodeURIComponent(movie.title)}`);
  };

  // If an actor card is clicked inside movie detail, show actor popup
  if (selectedActor) {
    return (
      <ActorDetail
        actor={selectedActor}
        onBack={() => setSelectedActor(null)}
      />
    );
  }

  return (
    <>
      {movie.poster ? (
        <img src={movie.poster} alt={movie.title} className="w-full max-h-72 rounded-lg object-contain mx-auto" />
      ) : (
        <div className="w-full h-48 rounded-lg bg-panel flex items-center justify-center">
          <p className="text-sm text-muted-foreground">No poster available</p>
        </div>
      )}

      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Directed by {movie.director}</p>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{movie.duration}</span>
          <span className="flex items-center gap-1"><Globe className="h-3.5 w-3.5" />{movie.language}</span>
          {movie.rating > 0 && (
            <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-primary text-primary" />{movie.rating}</span>
          )}
        </div>
      </div>

      {movie.genre.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {movie.genre.map((g) => (
            <Badge key={g} variant="secondary" className="bg-info/10 text-info border-info/20">{g}</Badge>
          ))}
        </div>
      )}

      {movie.synopsis && (
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-1">Synopsis</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{movie.synopsis}</p>
        </div>
      )}

      {/* Cast */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-2">Cast</h3>
        {castLoading ? (
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading cast…
          </div>
        ) : cast.length > 0 ? (
          <div className="grid grid-cols-3 gap-2">
            {cast.map((c) => (
              <div
                key={c.actor_id}
                onClick={() => fetchAndSetActor(c.actor_id, setSelectedActor)}
                className="group cursor-pointer flex flex-col items-center rounded-lg border border-border bg-panel p-2 hover:border-primary/40 transition-all"
              >
                {c.photo ? (
                  <img src={c.photo} alt={c.name} className="h-14 w-14 rounded-full object-cover object-top border border-border group-hover:border-primary transition-colors" />
                ) : (
                  <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-[10px] text-muted-foreground">No photo</span>
                  </div>
                )}
                <p className="text-xs font-medium text-foreground text-center mt-1.5 group-hover:text-primary transition-colors truncate w-full text-center">{c.name}</p>
                <p className="text-[10px] text-muted-foreground truncate w-full text-center">{c.role}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No cast information available.</p>
        )}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1">
          <Trophy className="h-4 w-4 text-primary" /> Awards
        </h3>
        {movie.awards.length > 0 ? (
          movie.awards.map((a) => <p key={a} className="text-sm text-muted-foreground">• {a}</p>)
        ) : (
          <p className="text-sm text-muted-foreground">No awards information available.</p>
        )}
      </div>

      <div className="flex gap-2 text-sm text-muted-foreground">
        {movie.budget !== "N/A" && <span>Budget: {movie.budget}</span>}
        {movie.budget !== "N/A" && movie.boxOffice !== "N/A" && <span>•</span>}
        {movie.boxOffice !== "N/A" && <span>Box Office: {movie.boxOffice}</span>}
      </div>

      <div className="flex gap-2">
        <Button onClick={handleBookTickets} className="flex-1 gold-gradient text-primary-foreground font-semibold hover:opacity-90">
          <Ticket className="mr-2 h-4 w-4" /> Book Tickets
        </Button>
        {movie.trailerUrl && (
          <Button onClick={() => setShowTrailer(true)} variant="outline" className="flex-1 border-primary/30 text-primary hover:bg-primary/10 font-semibold">
            <Play className="mr-2 h-4 w-4 fill-primary" /> Watch Trailer
          </Button>
        )}
      </div>

      {showTrailer && <TrailerModal movie={movie} onClose={() => setShowTrailer(false)} />}
    </>
  );
}

// ── Actor Detail ─────────────────────────────────────────────────────────────
interface FilmographyEntry { title: string; year: number; role: string; movie_id: string; poster: string; }

async function fetchAndSetActor(actorId: string, setActor: (a: Actor) => void) {
  const { data } = await supabase
    .from("actors")
    .select(`*, social_links ( platform, url )`)
    .eq("id", actorId)
    .single();

  if (data) {
    const birthYear = data.date_of_birth ? new Date(data.date_of_birth).getFullYear() : null;
    const age = birthYear ? new Date().getFullYear() - birthYear : 0;
    setActor({
      id: data.id,
      name: data.name,
      nationality: data.nationality ?? "N/A",
      dob: data.date_of_birth ?? "",
      age,
      gender: data.gender ?? "N/A",
      biography: data.biography ?? "",
      photo: data.photo_url ?? "",
      awardsCount: 0,
      primaryRole: data.primary_role ?? "Actor",
      placeOfBirth: data.place_of_birth ?? "N/A",
      height: data.height_cm ? `${data.height_cm} cm` : "N/A",
      activeYears: data.active_from ? `${data.active_from}–${data.active_to ?? "Present"}` : "N/A",
      socialLinks: Array.isArray(data.social_links) ? data.social_links : [],
      knownFor: [],
      filmography: [],
      awards: [],
    });
  }
}

function ActorDetail({ actor, onBack }: { actor: Actor; onBack?: () => void }) {
  const [filmography, setFilmography] = useState<FilmographyEntry[]>([]);
  const [filmoLoading, setFilmoLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    async function fetchFilmography() {
      setFilmoLoading(true);
      const { data } = await supabase
        .from("movie_cast")
        .select(`role, movie_id, movies ( title, year, poster_url )`)
        .eq("actor_id", actor.id as string);

      if (data) {
        setFilmography(data.map((row: any) => ({
          movie_id: row.movie_id,
          title: row.movies?.title ?? "Unknown",
          year: row.movies?.year ?? 0,
          role: row.role ?? "N/A",
          poster: row.movies?.poster_url ?? "",
        })));
      }
      setFilmoLoading(false);
    }
    fetchFilmography();
  }, [actor.id]);

  if (selectedMovie) {
    return <MovieDetail movie={selectedMovie} onClose={() => setSelectedMovie(null)} />;
  }

  return (
    <>
      {onBack && (
        <button onClick={onBack} className="text-xs text-primary hover:underline mb-2 flex items-center gap-1">
          ← Back to movie
        </button>
      )}

      <div className="flex items-center gap-4">
        {actor.photo ? (
          <img src={actor.photo} alt={actor.name} className="h-24 w-24 rounded-full object-cover object-top border-2 border-primary" />
        ) : (
          <div className="h-24 w-24 rounded-full bg-panel border-2 border-border flex items-center justify-center">
            <span className="text-xs text-muted-foreground">No photo</span>
          </div>
        )}
        <div>
          <Badge variant="secondary" className="mb-1 bg-accent/10 text-accent-foreground border-accent/20 text-xs">{actor.primaryRole}</Badge>
          <p className="text-sm text-muted-foreground">{actor.nationality} • {actor.gender}</p>
          <p className="text-sm text-muted-foreground">Age {actor.age}</p>
          {actor.awardsCount > 0 && (
            <Badge variant="secondary" className="mt-1 bg-primary/10 text-primary border-primary/20">
              <Trophy className="mr-1 h-3 w-3" /> {actor.awardsCount} Awards
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {actor.placeOfBirth !== "N/A" && (
          <div className="flex items-start gap-2 rounded-md bg-muted/30 p-2.5">
            <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Place of Birth</p>
              <p className="text-xs text-foreground font-medium">{actor.placeOfBirth}</p>
            </div>
          </div>
        )}
        {actor.height !== "N/A" && (
          <div className="flex items-start gap-2 rounded-md bg-muted/30 p-2.5">
            <Ruler className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Height</p>
              <p className="text-xs text-foreground font-medium">{actor.height}</p>
            </div>
          </div>
        )}
        {actor.activeYears !== "N/A" && (
          <div className="flex items-start gap-2 rounded-md bg-muted/30 p-2.5">
            <Calendar className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Active Years</p>
              <p className="text-xs text-foreground font-medium">{actor.activeYears}</p>
            </div>
          </div>
        )}
        {actor.socialLinks.length > 0 && (
          <div className="flex items-start gap-2 rounded-md bg-muted/30 p-2.5">
            <ExternalLink className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Social</p>
              <div className="flex flex-wrap gap-1.5 mt-0.5">
                {actor.socialLinks.map((link) => (
                  <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline font-medium">
                    {link.platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {actor.biography && (
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-1">Biography</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{actor.biography}</p>
        </div>
      )}

      {/* Filmography */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-2">Filmography</h3>
        {filmoLoading ? (
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading filmography…
          </div>
        ) : filmography.length > 0 ? (
          <div className="grid grid-cols-3 gap-2">
            {filmography.map((f) => (
              <div
                key={f.movie_id}
                onClick={() => fetchAndSetMovie(f.movie_id, setSelectedMovie)}
                className="group cursor-pointer rounded-lg border border-border bg-panel overflow-hidden hover:border-primary/40 transition-all"
              >
                <div className="aspect-[2/3] overflow-hidden">
                  {f.poster ? (
                    <img src={f.poster} alt={f.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="h-full w-full bg-muted flex items-center justify-center">
                      <Film className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="p-1.5">
                  <p className="text-[11px] font-medium text-foreground truncate group-hover:text-primary transition-colors">{f.title}</p>
                  <p className="text-[10px] text-muted-foreground">{f.year}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{f.role}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No filmography available.</p>
        )}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1">
          <Trophy className="h-4 w-4 text-primary" /> Awards
        </h3>
        {actor.awards.length > 0 ? (
          <div className="space-y-2">
            {actor.awards.map((a, i) => (
              <div key={i} className="flex items-center justify-between rounded-md bg-panel p-2.5 text-sm">
                <div>
                  <p className="text-foreground font-medium">{a.name}</p>
                  <p className="text-xs text-muted-foreground">{a.category} • {a.year}</p>
                </div>
                <Badge
                  className={a.result === "won"
                    ? "bg-green-500/15 text-green-400 border-green-500/30"
                    : "bg-yellow-500/15 text-yellow-400 border-yellow-500/30"}
                  variant="outline"
                >
                  {a.result}
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No awards information available.</p>
        )}
      </div>

    </>
  );
}

// ── Helper to fetch a full movie by ID ───────────────────────────────────────
async function fetchAndSetMovie(movieId: string, setMovie: (m: Movie) => void) {
  const { data } = await supabase
    .from("movies")
    .select("*")
    .eq("id", movieId)
    .single();

  if (data) {
    setMovie({
      id: data.id,
      title: data.title,
      year: data.year ?? 0,
      genre: Array.isArray(data.genres) ? data.genres : [],
      rating: data.rating ?? 0,
      director: data.director ?? "Unknown",
      duration: data.duration ?? "N/A",
      language: data.language ?? "N/A",
      synopsis: data.synopsis ?? "",
      poster: data.poster_url ?? "",
      heroImage: data.poster_url ?? "",
      budget: data.budget_cr != null ? `₹${data.budget_cr} Cr` : "N/A",
      boxOffice: data.box_office_cr != null ? `₹${data.box_office_cr} Cr` : "N/A",
      cast: [],
      awards: [],
      trailerUrl: data.trailer_url ?? undefined,
    });
  }
}

// ── Award Detail ─────────────────────────────────────────────────────────────
function AwardDetail({ award }: { award: Award }) {
  const [linkedMovie, setLinkedMovie] = useState<Movie | null>(null);
  const [linkedActor, setLinkedActor] = useState<Actor | null>(null);

  if (linkedMovie) {
    return <MovieDetail movie={linkedMovie} onClose={() => setLinkedMovie(null)} />;
  }
  if (linkedActor) {
    return <ActorDetail actor={linkedActor} onBack={() => setLinkedActor(null)} />;
  }

  return (
    <>
      <div className="flex items-center gap-3">
        <Trophy className={`h-10 w-10 ${award.won ? "text-primary" : "text-warning"}`} />
        <div>
          <p className="text-foreground font-semibold">{award.category}</p>
          <p className="text-sm text-muted-foreground">{award.body} • {award.year}</p>
        </div>
      </div>

      <Badge className={award.won ? "gold-gradient text-primary-foreground" : "bg-warning/10 text-warning border-warning/20"}>
        {award.won ? "Won" : "Nominated"}
      </Badge>

      {/* Linked movie */}
      {award.moviePoster || award.movieTitle !== "N/A" ? (
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1">
            <Film className="h-4 w-4 text-primary" /> Associated Movie
          </h3>
          <div
            onClick={() => fetchAndSetMovie(award.id as string, setLinkedMovie)}
            className="group cursor-pointer flex items-center gap-3 rounded-lg border border-border bg-panel p-3 hover:border-primary/40 transition-all"
          >
            {award.moviePoster ? (
              <img src={award.moviePoster} alt={award.movieTitle} className="h-16 w-11 rounded object-cover" />
            ) : (
              <div className="h-16 w-11 rounded bg-muted flex items-center justify-center">
                <Film className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
            <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{award.movieTitle}</p>
          </div>
        </div>
      ) : null}

      <div>
        <h3 className="text-sm font-semibold text-foreground mb-2">Other Nominees</h3>
        {award.nominees.length > 0 ? (
          award.nominees.map((n) => <p key={n} className="text-sm text-muted-foreground">• {n}</p>)
        ) : (
          <p className="text-sm text-muted-foreground">No nominees information available.</p>
        )}
      </div>

    </>
  );
}