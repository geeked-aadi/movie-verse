import { Star, Users } from "lucide-react";
import { Link } from "react-router-dom";

const teamMembers = ["Aditya Aradhya", "Amrutesh", "Eshwari", "Brahmi"];

export default function Index() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12">
          {/* Left: Title */}
          <div className="flex-1 space-y-6">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-primary leading-tight">
              Movie Recommendation System
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Discover, explore, and manage your favorite movies, actors, and awards — all in one place.
            </p>
            <Link
              to="/movies"
              className="inline-block gold-gradient text-primary-foreground font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Explore Movies →
            </Link>
          </div>

          {/* Right: Team Members */}
          <div className="w-full md:w-80 rounded-xl border border-border bg-card p-6 space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold text-lg">
              <Users className="h-5 w-5" />
              Team Members
            </div>
            <div className="space-y-3">
              {teamMembers.map((name, i) => (
                <div key={name} className="flex items-center gap-3 rounded-lg bg-panel p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full gold-gradient text-primary-foreground font-bold text-sm">
                    {i + 1}
                  </div>
                  <span className="text-foreground font-medium">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-bold text-primary font-serif italic text-sm">MovieVerse</span>
            </div>
            <p>© 2026 MovieVerse. All rights reserved. Piracy is a crime.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
