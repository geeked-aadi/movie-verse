import { X, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Movie } from "@/data/mockData";

interface TrailerModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function TrailerModal({ movie, onClose }: TrailerModalProps) {
  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 animate-scale-in">
        <div className="relative w-full max-w-3xl rounded-xl border border-border bg-card shadow-2xl shadow-primary/10 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <div>
              <h2 className="text-lg font-bold text-primary">{movie.title}</h2>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Play className="h-3 w-3 fill-primary text-primary" /> Official Trailer
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Video */}
          <div className="aspect-video w-full bg-background">
            {movie.trailerUrl ? (
              <iframe
                src={movie.trailerUrl + "?autoplay=1&rel=0"}
                title={`${movie.title} - Official Trailer`}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <p className="text-muted-foreground text-sm">Trailer not available</p>
              </div>
            )}
          </div>

          {/* Footer info */}
          <div className="flex items-center gap-3 border-t border-border px-5 py-3">
            <img
              src={movie.poster}
              alt={movie.title}
              className="h-12 w-8 rounded object-cover"
            />
            <div className="text-xs text-muted-foreground">
              <p className="text-foreground font-medium">{movie.title} ({movie.year})</p>
              <p>Directed by {movie.director} • {movie.duration}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
