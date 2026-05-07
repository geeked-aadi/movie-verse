import { Link } from "react-router-dom";
import PiracyFooter from "@/components/PiracyFooter";

export default function Index() {
  return (
    <div className="min-h-screen pt-16 flex flex-col">
      <section className="mx-auto max-w-7xl px-4 py-20 flex-1">
        <div className="space-y-6 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-primary leading-tight">
            Movie Recommendation System
          </h1>
          <p className="text-base text-muted-foreground max-w-lg leading-relaxed">
            Discover, explore, and book your favorite movies. Browse through our curated collection of films across genres, languages, and eras. Your ultimate movie companion.
          </p>
          <Link
            to="/movies"
            className="inline-block gold-gradient text-primary-foreground font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Explore Movies →
          </Link>
        </div>
      </section>
      <PiracyFooter />
    </div>
  );
}
