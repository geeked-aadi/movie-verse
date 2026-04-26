import { useState } from "react";
import { X, Star, Clock, Globe, Film, Trophy, Ticket, Database, Play, MapPin, Ruler, Calendar, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TrailerModal from "@/components/TrailerModal";
import type { Movie, Actor, Award } from "@/data/mockData";

interface DetailPanelProps {
  type: "movie" | "actor" | "award";
  data: Movie | Actor | Award | null;
  onClose: () => void;
}

export default function DetailPanel({ type, data, onClose }: DetailPanelProps) {
  if (!data) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-16 bottom-0 z-50 w-full max-w-md overflow-y-auto border-l border-border bg-card animate-slide-in-right">
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
    </>
  );
}

function SQLQuerySection() {
  return (
    <div className="rounded-lg border border-border bg-panel p-4 space-y-3">
      <h3 className="text-sm font-semibold text-primary flex items-center gap-2">
        <Database className="h-4 w-4" /> SQL Query Execution
      </h3>
      <div className="min-h-[120px] rounded-md border border-dashed border-border bg-background/50 p-3 flex items-center justify-center">
        <p className="text-xs text-muted-foreground text-center">SQL query results will be displayed here</p>
      </div>
    </div>
  );
}

function MovieDetail({ movie, onClose }: { movie: Movie; onClose: () => void }) {
  const navigate = useNavigate();
  const [showTrailer, setShowTrailer] = useState(false);

  const handleBookTickets = () => {
    onClose();
    navigate(`/booking?movie=${encodeURIComponent(movie.title)}`);
  };

  return (
    <>
      {movie.poster ? (
        <img src={movie.poster} alt={movie.title} className="w-full max-h-80 rounded-lg object-contain mx-auto" />
      ) : (
        <div className="w-full max-h-80 h-48 rounded-lg bg-panel flex items-center justify-center">
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

      <div>
        <h3 className="text-sm font-semibold text-foreground mb-2">Cast</h3>
        {movie.cast.length > 0 ? (
          <div className="space-y-1">
            {movie.cast.map((c) => (
              <div key={c.name} className="flex justify-between text-sm">
                <span className="text-foreground">{c.name}</span>
                <span className="text-muted-foreground">{c.role}</span>
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
          movie.awards.map((a) => (
            <p key={a} className="text-sm text-muted-foreground">• {a}</p>
          ))
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
          <Button
            onClick={() => setShowTrailer(true)}
            variant="outline"
            className="flex-1 border-primary/30 text-primary hover:bg-primary/10 font-semibold"
          >
            <Play className="mr-2 h-4 w-4 fill-primary" /> Watch Trailer
          </Button>
        )}
      </div>

      <SQLQuerySection />
      {showTrailer && <TrailerModal movie={movie} onClose={() => setShowTrailer(false)} />}
    </>
  );
}

function ActorDetail({ actor }: { actor: Actor }) {
  return (
    <>
      <div className="flex items-center gap-4">
        {actor.photo ? (
          <img src={actor.photo} alt={actor.name} className="h-24 w-24 rounded-full object-cover object-top border-2 border-primary" />
        ) : (
          <div className="h-24 w-24 rounded-full bg-panel border-2 border-border flex items-center justify-center">
            <span className="text-xs text-muted-foreground">No photo</span>
          </div>
        )}
        <div>
          <Badge variant="secondary" className="mb-1 bg-accent/10 text-accent-foreground border-accent/20 text-xs">
            {actor.primaryRole}
          </Badge>
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
        {actor.placeOfBirth && actor.placeOfBirth !== "N/A" && (
          <div className="flex items-start gap-2 rounded-md bg-muted/30 p-2.5">
            <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Place of Birth</p>
              <p className="text-xs text-foreground font-medium">{actor.placeOfBirth}</p>
            </div>
          </div>
        )}
        {actor.height && actor.height !== "N/A" && (
          <div className="flex items-start gap-2 rounded-md bg-muted/30 p-2.5">
            <Ruler className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Height</p>
              <p className="text-xs text-foreground font-medium">{actor.height}</p>
            </div>
          </div>
        )}
        {actor.activeYears && actor.activeYears !== "N/A" && (
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

      <div>
        <h3 className="text-sm font-semibold text-foreground mb-2">Known For</h3>
        {actor.knownFor.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {actor.knownFor.map((m) => (
              <Badge key={m} variant="secondary" className="bg-info/10 text-info border-info/20">{m}</Badge>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No information available.</p>
        )}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground mb-2">Filmography</h3>
        {actor.filmography.length > 0 ? (
          <div className="space-y-2">
            {actor.filmography.map((f) => (
              <div key={f.title} className="flex items-center justify-between rounded-md bg-panel p-2 text-sm">
                <div>
                  <span className="text-foreground font-medium">{f.title}</span>
                  <span className="ml-2 text-muted-foreground">({f.year})</span>
                </div>
                <span className="text-muted-foreground">{f.role}</span>
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
                  className={a.result === "Won"
                    ? "bg-green-500/15 text-green-400 border-green-500/30 hover:bg-green-500/20"
                    : "bg-yellow-500/15 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/20"}
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

      <SQLQuerySection />
    </>
  );
}

function AwardDetail({ award }: { award: Award }) {
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
      <div className="flex items-center gap-3">
        {award.moviePoster && (
          <img src={award.moviePoster} alt={award.movieTitle} className="h-20 w-14 rounded object-cover" />
        )}
        <div>
          <p className="text-foreground font-semibold">{award.movieTitle}</p>
          <p className="text-sm text-muted-foreground flex items-center gap-1"><Film className="h-3.5 w-3.5" /> Associated Movie</p>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-2">Other Nominees</h3>
        {award.nominees.length > 0 ? (
          award.nominees.map((n) => (
            <p key={n} className="text-sm text-muted-foreground">• {n}</p>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No nominees information available.</p>
        )}
      </div>
      <SQLQuerySection />
    </>
  );
}