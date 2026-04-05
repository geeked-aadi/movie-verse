import { Star } from "lucide-react";

export default function PiracyFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-1 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
            <span className="font-bold text-primary font-serif italic text-xs">MovieVerse</span>
          </div>
          <p>© 2026 MovieVerse. All rights reserved. Piracy is a crime.</p>
        </div>
      </div>
    </footer>
  );
}
