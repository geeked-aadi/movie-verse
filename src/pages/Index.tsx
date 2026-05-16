import { Link } from "react-router-dom";
import PiracyFooter from "@/components/PiracyFooter";
import PixelSnow from "@/components/PixelSnow";

export default function Index() {
  return (
    <div className="min-h-screen pt-16 flex flex-col">
      <section className="relative flex-1 flex items-center justify-center">
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
        <div className="mx-auto max-w-7xl px-4 w-full relative z-10 pointer-events-none flex justify-center">
          <div className="space-y-6 max-w-3xl pointer-events-auto flex flex-col items-center text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-primary leading-tight drop-shadow-md">
              Movie Recommendation System
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed drop-shadow-md">
              Your gateway to the ultimate cinematic experience. Discover, explore, and book tickets for the latest blockbusters and timeless classics.
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
