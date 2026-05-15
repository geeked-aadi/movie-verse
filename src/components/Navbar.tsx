import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Star } from "lucide-react";
import { Input } from "@/components/ui/input";

const navLinks = [
  { label: "Movies", path: "/movies" },
  { label: "Actors", path: "/actors" },
  { label: "Awards", path: "/awards" },
  { label: "Book Tickets", path: "/booking" },
  { label: "Social Wall", path: "/social" },
  { label: "Update", path: "/update" },
];

interface NavbarProps {
  onSearch?: (query: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <Star className="h-6 w-6 fill-primary text-primary" />
          <span className="text-xl font-bold text-primary tracking-wide" style={{ fontFamily: "'Englebert', cursive" }}>MovieVerse</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive =
              location.pathname === link.path ||
              (link.path === "/" && location.pathname === "/");
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <form onSubmit={handleSearch} className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies, actors..."
              className="h-9 w-56 border-border bg-panel pl-9 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
            />
          </form>
        </div>
      </div>
    </nav>
  );
}
