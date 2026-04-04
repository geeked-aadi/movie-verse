import { useState } from "react";
import { Star, Play, Ticket, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MovieCard from "@/components/MovieCard";
import DetailPanel from "@/components/DetailPanel";
import { movies, type Movie } from "@/data/mockData";
import { Link } from "react-router-dom";

export default function Index() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const hero = movies[1]; // Echoes of Silence

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Banner */}
      <section className="relative h-[520px] overflow-hidden">
        <img src={hero.heroImage} alt={hero.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-4 pb-12">
          <div className="max-w-lg space-y-4">
            <div className="flex items-center gap-2">
              <Badge className="gold-gradient text-primary-foreground text-xs">Featured</Badge>
              <span className="flex items-center gap-1 text-sm font-semibold text-primary">
                <Star className="h-4 w-4 fill-primary" /> {hero.rating}
              </span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">{hero.title}</h1>
            <div className="flex flex-wrap gap-2">
              {hero.genre.map((g) => (
                <Badge key={g} variant="secondary" className="bg-info/10 text-info border-info/20">{g}</Badge>
              ))}
              <span className="text-sm text-muted-foreground">{hero.year} • {hero.duration}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{hero.synopsis}</p>
            <div className="flex gap-3">
              <Button className="gold-gradient text-primary-foreground font-semibold hover:opacity-90">
                <Play className="mr-2 h-4 w-4" /> Watch Trailer
              </Button>
              <Button variant="outline" className="border-border text-foreground hover:border-primary hover:text-primary">
                <Ticket className="mr-2 h-4 w-4" /> Book Tickets
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Movie Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Trending Now</h2>
          <Link to="/movies" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {movies.slice(0, visibleCount).map((movie) => (
            <MovieCard key={movie.id} movie={movie} onClick={setSelectedMovie} />
          ))}
        </div>
        {visibleCount < movies.length && (
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              onClick={() => setVisibleCount((c) => Math.min(c + 6, movies.length))}
              className="border-border text-muted-foreground hover:border-primary hover:text-primary"
            >
              Load More
            </Button>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Star className="h-5 w-5 fill-primary text-primary" />
                <span className="font-bold text-primary">CineVault</span>
              </div>
              <p className="text-xs text-muted-foreground">Your ultimate movie companion for discovering, rating, and booking films.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Explore</h4>
              <div className="space-y-1 text-xs text-muted-foreground">
                <Link to="/movies" className="block hover:text-primary">Movies</Link>
                <Link to="/actors" className="block hover:text-primary">Actors</Link>
                <Link to="/awards" className="block hover:text-primary">Awards</Link>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Company</h4>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p className="hover:text-primary cursor-pointer">About</p>
                <p className="hover:text-primary cursor-pointer">Contact</p>
                <p className="hover:text-primary cursor-pointer">Careers</p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Legal</h4>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p className="hover:text-primary cursor-pointer">Privacy Policy</p>
                <p className="hover:text-primary cursor-pointer">Terms of Service</p>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-4 text-center text-xs text-muted-foreground">
            © 2024 CineVault. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Detail Panel */}
      {selectedMovie && (
        <DetailPanel type="movie" data={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}
