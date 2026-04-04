export interface Movie {
  id: number;
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
}

export interface Actor {
  id: number;
  name: string;
  nationality: string;
  dob: string;
  age: number;
  gender: string;
  biography: string;
  photo: string;
  awardsCount: number;
  knownFor: string[];
  filmography: { title: string; year: number; role: string }[];
  awards: string[];
}

export interface Award {
  id: number;
  name: string;
  category: string;
  year: number;
  body: string;
  movieTitle: string;
  moviePoster: string;
  won: boolean;
  nominees: string[];
}

export const movies: Movie[] = [
  {
    id: 1, title: "The Dark Horizon", year: 2024, genre: ["Sci-Fi", "Thriller"], rating: 8.7,
    director: "Elena Voss", duration: "2h 28min", language: "English",
    synopsis: "In a future where memories can be traded, a rogue detective uncovers a conspiracy that threatens to erase humanity's collective past.",
    poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1920&h=800&fit=crop",
    budget: "$180M", boxOffice: "$920M",
    cast: [{ name: "Marcus Chen", role: "Detective Kai" }, { name: "Sophia Laurent", role: "Dr. Mira" }],
    awards: ["Best Visual Effects - Academy Awards", "Best Score - Golden Globes"],
  },
  {
    id: 2, title: "Echoes of Silence", year: 2024, genre: ["Drama", "Mystery"], rating: 9.1,
    director: "James Okafor", duration: "2h 15min", language: "English",
    synopsis: "A deaf musician discovers she can hear the thoughts of others, leading her into a world of dangerous secrets.",
    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=800&fit=crop",
    budget: "$45M", boxOffice: "$310M",
    cast: [{ name: "Aria Patel", role: "Maya" }, { name: "Luca Moretti", role: "Vincent" }],
    awards: ["Best Picture - Academy Awards", "Best Actress - Cannes"],
  },
  {
    id: 3, title: "Crimson Tide Rising", year: 2023, genre: ["Action", "War"], rating: 8.2,
    director: "Viktor Sato", duration: "2h 42min", language: "English",
    synopsis: "During a forgotten war, a submarine crew must decide between following orders and saving innocent lives.",
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1920&h=800&fit=crop",
    budget: "$200M", boxOffice: "$780M",
    cast: [{ name: "David Okonkwo", role: "Captain Reed" }, { name: "Yuki Tanaka", role: "Lt. Hara" }],
    awards: ["Best Sound - Academy Awards"],
  },
  {
    id: 4, title: "Garden of Stars", year: 2024, genre: ["Romance", "Fantasy"], rating: 8.5,
    director: "Clara Dubois", duration: "1h 58min", language: "French",
    synopsis: "Two strangers meet in a magical garden where time flows differently, falling in love across centuries.",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=800&fit=crop",
    budget: "$60M", boxOffice: "$420M",
    cast: [{ name: "Sophia Laurent", role: "Elise" }, { name: "Ravi Sharma", role: "Arjun" }],
    awards: ["Best Cinematography - BAFTA"],
  },
  {
    id: 5, title: "The Last Algorithm", year: 2023, genre: ["Sci-Fi", "Drama"], rating: 8.9,
    director: "Nina Petrov", duration: "2h 10min", language: "English",
    synopsis: "An AI researcher creates a sentient program that questions the nature of consciousness and free will.",
    poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&h=800&fit=crop",
    budget: "$95M", boxOffice: "$550M",
    cast: [{ name: "Marcus Chen", role: "Dr. Alan Price" }, { name: "Aria Patel", role: "ARIA" }],
    awards: ["Best Original Screenplay - Academy Awards", "Best Director - Venice"],
  },
  {
    id: 6, title: "Midnight in Marrakech", year: 2024, genre: ["Thriller", "Drama"], rating: 7.8,
    director: "Hassan El-Amin", duration: "2h 05min", language: "Arabic",
    synopsis: "A journalist investigating corruption in North Africa becomes entangled in a web of deceit.",
    poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1920&h=800&fit=crop",
    budget: "$35M", boxOffice: "$180M",
    cast: [{ name: "Luca Moretti", role: "Marco" }, { name: "Yuki Tanaka", role: "Yuki" }],
    awards: [],
  },
  {
    id: 7, title: "Velocity", year: 2023, genre: ["Action", "Sci-Fi"], rating: 7.5,
    director: "Rex Donovan", duration: "2h 18min", language: "English",
    synopsis: "A test pilot breaks the speed of light and finds herself in a parallel universe where physics works differently.",
    poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=600&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=1920&h=800&fit=crop",
    budget: "$250M", boxOffice: "$1.1B",
    cast: [{ name: "Sophia Laurent", role: "Cmdr. Nova" }, { name: "David Okonkwo", role: "Control" }],
    awards: ["Best VFX - BAFTA"],
  },
  {
    id: 8, title: "The Painter's Daughter", year: 2024, genre: ["Drama", "History"], rating: 8.3,
    director: "Akiko Yamamoto", duration: "2h 35min", language: "Japanese",
    synopsis: "Set in 1920s Tokyo, a young woman defies tradition to pursue her passion for Western oil painting.",
    poster: "https://images.unsplash.com/photo-1460881680858-30d872d5b530?w=400&h=600&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1460881680858-30d872d5b530?w=1920&h=800&fit=crop",
    budget: "$40M", boxOffice: "$290M",
    cast: [{ name: "Yuki Tanaka", role: "Hanako" }, { name: "Ravi Sharma", role: "Thomas" }],
    awards: ["Best Foreign Language Film - Golden Globes"],
  },
  {
    id: 9, title: "Shadow Protocol", year: 2023, genre: ["Action", "Thriller"], rating: 7.9,
    director: "Viktor Sato", duration: "2h 22min", language: "English",
    synopsis: "A burned spy must go rogue to stop a shadowy organization from triggering global chaos.",
    poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=1920&h=800&fit=crop",
    budget: "$150M", boxOffice: "$650M",
    cast: [{ name: "David Okonkwo", role: "Agent Cross" }, { name: "Marcus Chen", role: "Ghost" }],
    awards: ["Best Stunts - SAG"],
  },
  {
    id: 10, title: "Beneath the Waves", year: 2024, genre: ["Adventure", "Drama"], rating: 8.6,
    director: "Elena Voss", duration: "2h 12min", language: "English",
    synopsis: "A marine biologist discovers an ancient underwater civilization that holds the key to saving Earth's oceans.",
    poster: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=400&h=600&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=1920&h=800&fit=crop",
    budget: "$130M", boxOffice: "$580M",
    cast: [{ name: "Aria Patel", role: "Dr. Lena Shore" }, { name: "Luca Moretti", role: "Captain Nero" }],
    awards: ["Best Cinematography - Academy Awards"],
  },
  {
    id: 11, title: "Neon Nights", year: 2023, genre: ["Crime", "Thriller"], rating: 8.0,
    director: "Rex Donovan", duration: "1h 55min", language: "English",
    synopsis: "In a neon-drenched city, a nightclub owner is drawn into a dangerous game of cat and mouse with the mob.",
    poster: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=400&h=600&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=1920&h=800&fit=crop",
    budget: "$55M", boxOffice: "$320M",
    cast: [{ name: "Ravi Sharma", role: "Dante" }, { name: "Sophia Laurent", role: "Violet" }],
    awards: [],
  },
  {
    id: 12, title: "The Iron Garden", year: 2024, genre: ["Fantasy", "Adventure"], rating: 8.4,
    director: "Clara Dubois", duration: "2h 40min", language: "English",
    synopsis: "A cursed blacksmith must forge a legendary weapon to free a kingdom trapped in eternal winter.",
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=600&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&h=800&fit=crop",
    budget: "$175M", boxOffice: "$830M",
    cast: [{ name: "Marcus Chen", role: "Kael" }, { name: "Yuki Tanaka", role: "Queen Iris" }],
    awards: ["Best Production Design - Academy Awards", "Best Costume Design - BAFTA"],
  },
];

export const actors: Actor[] = [
  {
    id: 1, name: "Marcus Chen", nationality: "American", dob: "1985-03-15", age: 39, gender: "Male",
    biography: "Marcus Chen is a versatile actor known for his intense dramatic roles and commanding screen presence. Trained at Juilliard, he made his breakthrough in independent cinema before transitioning to blockbuster features.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    awardsCount: 5,
    knownFor: ["The Dark Horizon", "The Last Algorithm", "The Iron Garden"],
    filmography: [
      { title: "The Dark Horizon", year: 2024, role: "Detective Kai" },
      { title: "The Last Algorithm", year: 2023, role: "Dr. Alan Price" },
      { title: "The Iron Garden", year: 2024, role: "Kael" },
    ],
    awards: ["Best Actor - Venice 2023", "SAG Award - Outstanding Performance 2024"],
  },
  {
    id: 2, name: "Sophia Laurent", nationality: "French", dob: "1990-07-22", age: 34, gender: "Female",
    biography: "Sophia Laurent is a French actress celebrated for her ethereal beauty and emotional depth. She began her career in French art-house cinema and has since become an international star.",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face",
    awardsCount: 7,
    knownFor: ["Echoes of Silence", "Garden of Stars", "Velocity"],
    filmography: [
      { title: "Echoes of Silence", year: 2024, role: "Dr. Mira" },
      { title: "Garden of Stars", year: 2024, role: "Elise" },
      { title: "Velocity", year: 2023, role: "Cmdr. Nova" },
    ],
    awards: ["Best Actress - Cannes 2024", "César Award 2023", "BAFTA Rising Star 2022"],
  },
  {
    id: 3, name: "Aria Patel", nationality: "Indian", dob: "1992-11-08", age: 32, gender: "Female",
    biography: "Aria Patel is an Indian-British actress who has taken Hollywood by storm with her nuanced performances and ability to transform into any character.",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    awardsCount: 4,
    knownFor: ["Echoes of Silence", "The Last Algorithm", "Beneath the Waves"],
    filmography: [
      { title: "Echoes of Silence", year: 2024, role: "Maya" },
      { title: "The Last Algorithm", year: 2023, role: "ARIA" },
      { title: "Beneath the Waves", year: 2024, role: "Dr. Lena Shore" },
    ],
    awards: ["Best Actress - Academy Awards 2024", "Filmfare Award 2023"],
  },
  {
    id: 4, name: "David Okonkwo", nationality: "Nigerian-British", dob: "1980-01-30", age: 44, gender: "Male",
    biography: "David Okonkwo brings gravitas and intensity to every role. A trained Shakespearean actor, he seamlessly moves between stage and screen.",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
    awardsCount: 6,
    knownFor: ["Crimson Tide Rising", "Shadow Protocol", "Velocity"],
    filmography: [
      { title: "Crimson Tide Rising", year: 2023, role: "Captain Reed" },
      { title: "Shadow Protocol", year: 2023, role: "Agent Cross" },
      { title: "Velocity", year: 2023, role: "Control" },
    ],
    awards: ["Olivier Award 2022", "Best Supporting Actor - BAFTA 2023"],
  },
  {
    id: 5, name: "Yuki Tanaka", nationality: "Japanese", dob: "1988-05-14", age: 36, gender: "Female",
    biography: "Yuki Tanaka is a Japanese actress and filmmaker known for her powerful portrayals of complex women. She directs and produces through her own production company.",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face",
    awardsCount: 3,
    knownFor: ["Crimson Tide Rising", "The Painter's Daughter", "The Iron Garden"],
    filmography: [
      { title: "Crimson Tide Rising", year: 2023, role: "Lt. Hara" },
      { title: "The Painter's Daughter", year: 2024, role: "Hanako" },
      { title: "The Iron Garden", year: 2024, role: "Queen Iris" },
    ],
    awards: ["Japan Academy Prize 2024", "Best Actress - Tokyo IFF 2023"],
  },
  {
    id: 6, name: "Luca Moretti", nationality: "Italian", dob: "1987-09-03", age: 37, gender: "Male",
    biography: "Luca Moretti is an Italian heartthrob with serious acting chops. Known for his charismatic screen presence and ability to switch between comedy and drama effortlessly.",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    awardsCount: 2,
    knownFor: ["Echoes of Silence", "Midnight in Marrakech", "Beneath the Waves"],
    filmography: [
      { title: "Echoes of Silence", year: 2024, role: "Vincent" },
      { title: "Midnight in Marrakech", year: 2024, role: "Marco" },
      { title: "Beneath the Waves", year: 2024, role: "Captain Nero" },
    ],
    awards: ["David di Donatello 2023"],
  },
  {
    id: 7, name: "Ravi Sharma", nationality: "Indian", dob: "1983-12-20", age: 41, gender: "Male",
    biography: "Ravi Sharma is one of India's most acclaimed actors, known for his method acting approach and his ability to disappear into roles completely.",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face",
    awardsCount: 8,
    knownFor: ["Garden of Stars", "Neon Nights", "The Painter's Daughter"],
    filmography: [
      { title: "Garden of Stars", year: 2024, role: "Arjun" },
      { title: "Neon Nights", year: 2023, role: "Dante" },
      { title: "The Painter's Daughter", year: 2024, role: "Thomas" },
    ],
    awards: ["National Film Award 2023", "Best Actor - IIFA 2024", "Filmfare Lifetime Achievement"],
  },
];

export const awards: Award[] = [
  { id: 1, name: "Academy Award", category: "Best Picture", year: 2024, body: "Academy Awards", movieTitle: "Echoes of Silence", moviePoster: movies[1].poster, won: true, nominees: ["The Dark Horizon", "The Last Algorithm", "Garden of Stars", "Beneath the Waves"] },
  { id: 2, name: "Academy Award", category: "Best Director", year: 2024, body: "Academy Awards", movieTitle: "The Last Algorithm", moviePoster: movies[4].poster, won: true, nominees: ["Elena Voss", "James Okafor", "Clara Dubois"] },
  { id: 3, name: "Academy Award", category: "Best Visual Effects", year: 2024, body: "Academy Awards", movieTitle: "The Dark Horizon", moviePoster: movies[0].poster, won: true, nominees: ["Velocity", "The Iron Garden", "Beneath the Waves"] },
  { id: 4, name: "Academy Award", category: "Best Actress", year: 2024, body: "Academy Awards", movieTitle: "Echoes of Silence", moviePoster: movies[1].poster, won: true, nominees: ["Sophia Laurent", "Yuki Tanaka"] },
  { id: 5, name: "Golden Globe", category: "Best Motion Picture - Drama", year: 2024, body: "Golden Globes", movieTitle: "Echoes of Silence", moviePoster: movies[1].poster, won: true, nominees: ["The Dark Horizon", "The Last Algorithm", "Crimson Tide Rising"] },
  { id: 6, name: "BAFTA", category: "Best Film", year: 2024, body: "BAFTA", movieTitle: "Echoes of Silence", moviePoster: movies[1].poster, won: false, nominees: ["The Dark Horizon", "Garden of Stars"] },
  { id: 7, name: "BAFTA", category: "Best Cinematography", year: 2024, body: "BAFTA", movieTitle: "Garden of Stars", moviePoster: movies[3].poster, won: true, nominees: ["Beneath the Waves", "The Iron Garden"] },
  { id: 8, name: "Cannes", category: "Palme d'Or", year: 2024, body: "Cannes Film Festival", movieTitle: "Echoes of Silence", moviePoster: movies[1].poster, won: false, nominees: ["Midnight in Marrakech", "The Painter's Daughter"] },
  { id: 9, name: "Golden Globe", category: "Best Foreign Language Film", year: 2024, body: "Golden Globes", movieTitle: "The Painter's Daughter", moviePoster: movies[7].poster, won: true, nominees: ["Midnight in Marrakech", "Garden of Stars"] },
  { id: 10, name: "Academy Award", category: "Best Original Screenplay", year: 2023, body: "Academy Awards", movieTitle: "The Last Algorithm", moviePoster: movies[4].poster, won: true, nominees: ["Shadow Protocol", "Neon Nights"] },
  { id: 11, name: "SAG Award", category: "Outstanding Performance - Cast", year: 2024, body: "SAG Awards", movieTitle: "Crimson Tide Rising", moviePoster: movies[2].poster, won: false, nominees: ["Echoes of Silence", "The Iron Garden"] },
  { id: 12, name: "Academy Award", category: "Best Production Design", year: 2024, body: "Academy Awards", movieTitle: "The Iron Garden", moviePoster: movies[11].poster, won: true, nominees: ["The Dark Horizon", "Garden of Stars"] },
];
