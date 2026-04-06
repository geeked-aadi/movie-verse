import { useState } from "react";
import { Star, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Movie } from "@/data/mockData";

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  const [liked, setLiked] = useState(false);

  return (
    <div
      onClick={() => onClick(movie)}
      className="group cursor-pointer overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          className={`absolute right-2 top-2 rounded-full bg-background/60 p-1.5 backdrop-blur-sm transition-all group-hover:opacity-100 ${liked ? "opacity-100 text-destructive" : "opacity-0 text-muted-foreground hover:text-destructive"}`}
        >
          <Heart className={`h-4 w-4 transition-all ${liked ? "fill-destructive text-destructive scale-110" : ""}`} />
        </button>
        <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-background/70 px-2 py-0.5 text-xs font-semibold backdrop-blur-sm">
          <Star className="h-3 w-3 fill-primary text-primary" />
          <span className="text-foreground">{movie.rating}</span>
        </div>
      </div>
      <div className="p-3 space-y-1.5">
        <h3 className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
          {movie.title}
        </h3>
        <p className="text-xs text-muted-foreground">{movie.year}</p>
        <div className="flex flex-wrap gap-1">
          {movie.genre.slice(0, 2).map((g) => (
            <Badge key={g} variant="secondary" className="text-[10px] px-1.5 py-0 bg-info/10 text-info border-info/20">
              {g}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
