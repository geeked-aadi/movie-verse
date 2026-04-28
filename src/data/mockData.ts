// Only type definitions remain — all data has been moved to Supabase

export interface Movie {
  id: number | string;
  title: string;
  year: number;
  genre: string[];
  rating: number;
  director: string;
  duration: string;
  language: string;
  synopsis: string;
  poster: string;
  heroImage: string;
  budget: string;
  boxOffice: string;
  cast: { name: string; role: string }[];
  awards: string[];
  trailerUrl?: string;
}

export interface ActorAward {
  name: string;
  category: string;
  year: number;
  result: "Won" | "Nominated";
}

export interface Actor {
  id: number | string;
  name: string;
  nationality: string;
  dob: string;
  age: number;
  gender: string;
  biography: string;
  photo: string;
  awardsCount: number;
  primaryRole: string;
  placeOfBirth: string;
  height: string;
  activeYears: string;
  socialLinks: { platform: string; url: string }[];
  knownFor: string[];
  filmography: { title: string; year: number; role: string }[];
  awards: ActorAward[];
}

export interface Award {
  id: number | string;
  name: string;
  category: string;
  year: number;
  body: string;        // kept for DetailPanel compatibility, mapped from category
  movieTitle: string;
  moviePoster: string;
  won: boolean;
  nominees: string[];
}