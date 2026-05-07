import { Star } from "lucide-react";

const teamMembers = [ "Amrutesh", "Eshwari", "Brahmi","Aditya Aradhya"];

export default function PiracyFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="grid grid-cols-[auto_1fr_auto] items-center text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="font-bold text-primary text-sm tracking-wide" style={{ fontFamily: "'Englebert', cursive" }}>MovieVerse</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-0.5 text-center">
            <p className="text-muted-foreground leading-none">Made by team</p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {teamMembers.map((member, index) => (
                <span key={member} className="text-muted-foreground leading-none">
                  {index > 0 ? "• " : ""}
                  {member}
                </span>
              ))}
            </div>
          </div>
          <div />
        </div>
      </div>
    </footer>
  );
}
