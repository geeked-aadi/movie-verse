import { useState } from "react";
import { X, Star, Clock, Globe, Film, Trophy, Ticket, Database, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TrailerModal from "@/components/TrailerModal";
import { movies, recommendedMovies, type Movie, type Actor, type Award } from "@/data/mockData";

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

  const handleBookTickets = () => {
    onClose();
    navigate(`/booking?movie=${encodeURIComponent(movie.title)}`);
  };

  return (
    <>
      <img src={movie.poster} alt={movie.title} className="w-full max-h-80 rounded-lg object-contain mx-auto" />
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Directed by {movie.director}</p>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{movie.duration}</span>
          <span className="flex items-center gap-1"><Globe className="h-3.5 w-3.5" />{movie.language}</span>
          <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-primary text-primary" />{movie.rating}</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {movie.genre.map((g) => (
          <Badge key={g} variant="secondary" className="bg-info/10 text-info border-info/20">{g}</Badge>
        ))}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-1">Synopsis</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{movie.synopsis}</p>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-2">Cast</h3>
        <div className="space-y-1">
          {movie.cast.map((c) => (
            <div key={c.name} className="flex justify-between text-sm">
              <span className="text-foreground">{c.name}</span>
              <span className="text-muted-foreground">{c.role}</span>
            </div>
          ))}
        </div>
      </div>
      {movie.awards.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1">
            <Trophy className="h-4 w-4 text-primary" /> Awards
          </h3>
          {movie.awards.map((a) => (
            <p key={a} className="text-sm text-muted-foreground">• {a}</p>
          ))}
        </div>
      )}
      <div className="flex gap-2 text-sm text-muted-foreground">
        <span>Budget: {movie.budget}</span>
        <span>•</span>
        <span>Box Office: {movie.boxOffice}</span>
      </div>
      <Button onClick={handleBookTickets} className="w-full gold-gradient text-primary-foreground font-semibold hover:opacity-90">
        <Ticket className="mr-2 h-4 w-4" /> Book Tickets
      </Button>
      <SQLQuerySection />
    </>
  );
}

function ActorDetail({ actor }: { actor: Actor }) {
  return (
    <>
      <div className="flex items-center gap-4">
        <img src={actor.photo} alt={actor.name} className="h-24 w-24 rounded-full object-cover object-top border-2 border-primary" />
        <div>
          <p className="text-sm text-muted-foreground">{actor.nationality} • {actor.gender}</p>
          <p className="text-sm text-muted-foreground">Age {actor.age}</p>
          <Badge variant="secondary" className="mt-1 bg-primary/10 text-primary border-primary/20">
            <Trophy className="mr-1 h-3 w-3" /> {actor.awardsCount} Awards
          </Badge>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-1">Biography</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{actor.biography}</p>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-2">Known For</h3>
        <div className="flex flex-wrap gap-2">
          {actor.knownFor.map((m) => (
            <Badge key={m} variant="secondary" className="bg-info/10 text-info border-info/20">{m}</Badge>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-2">Filmography</h3>
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
      </div>
      {actor.awards.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1">
            <Trophy className="h-4 w-4 text-primary" /> Awards
          </h3>
          {actor.awards.map((a) => (
            <p key={a} className="text-sm text-muted-foreground">• {a}</p>
          ))}
        </div>
      )}
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
        <img src={award.moviePoster} alt={award.movieTitle} className="h-20 w-14 rounded object-cover" />
        <div>
          <p className="text-foreground font-semibold">{award.movieTitle}</p>
          <p className="text-sm text-muted-foreground flex items-center gap-1"><Film className="h-3.5 w-3.5" /> Associated Movie</p>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-2">Other Nominees</h3>
        {award.nominees.map((n) => (
          <p key={n} className="text-sm text-muted-foreground">• {n}</p>
        ))}
      </div>
      <SQLQuerySection />
    </>
  );
}
