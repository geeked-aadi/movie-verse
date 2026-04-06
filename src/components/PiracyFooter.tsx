import { Star } from "lucide-react";

export default function PiracyFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="font-bold text-primary text-sm tracking-wide" style={{ fontFamily: "'Georgia', 'Palatino Linotype', serif", fontStyle: "italic" }}>MovieVerse</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary transition-colors">About</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
          </div>
          <p>© 2026 MovieVerse. All rights reserved. Piracy is a crime.</p>
        </div>
      </div>
    </footer>
  );
}
