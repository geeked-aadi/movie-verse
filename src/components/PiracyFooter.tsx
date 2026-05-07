import { Star } from "lucide-react";

const teamMembers = ["Aditya Aradhya", "Amrutesh", "Eshwari", "Brahmi"];

export default function PiracyFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="font-bold text-primary text-sm tracking-wide" style={{ fontFamily: "'Englebert', cursive" }}>MovieVerse</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {teamMembers.map((member, index) => (
              <span key={member} className="text-muted-foreground">
                {index > 0 ? "• " : ""}
                {member}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
