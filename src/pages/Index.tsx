import { Link } from "react-router-dom";
import PiracyFooter from "@/components/PiracyFooter";
import PixelSnow from "@/components/PixelSnow";

export default function Index() {
  return (
    <div className="min-h-screen pt-16 flex flex-col">
      <section className="relative flex-1 flex items-center">
        {/* PixelSnow Background */}
        <div className="absolute inset-0 z-0">
          <PixelSnow 
            color="#F5C518"
            flakeSize={0.01}
            minFlakeSize={1.25}
            pixelResolution={200}
            speed={1.25}
            density={0.3}
            direction={125}
            brightness={1}
          />
        </div>
        
        {/* Content */}
        <div className="mx-auto max-w-7xl px-4 py-20 w-full relative z-10 pointer-events-none">
          <div className="space-y-6 max-w-3xl pointer-events-auto">
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
        </div>
      </section>
      <PiracyFooter />
    </div>
  );
}
