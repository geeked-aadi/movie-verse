import dhurandharPoster from "@/assets/dhurandhar.jpg";
import days500Poster from "@/assets/500days.webp";
import familyManPoster from "@/assets/family_man.jpg";
import kantaraPoster from "@/assets/kantara.webp";
import zathuraPoster from "@/assets/zathura.jpg";
import baramullaPoster from "@/assets/baramulla.jpg";
import kungfuHustlePoster from "@/assets/kungfu_hustle.webp";
import johnWickPoster from "@/assets/john_wick.webp";
import madMaxPoster from "@/assets/mad_max.webp";
import piratesPoster from "@/assets/pirates.webp";
import inceptionPoster from "@/assets/inception.webp";
import parasitePoster from "@/assets/parasite.webp";
import interstellarPoster from "@/assets/interstellar.jpg";
import karateKidPoster from "@/assets/karate_kid.webp";
import theMegPoster from "@/assets/the_meg.webp";
import tvdPoster from "@/assets/tvd.jpg";
import bhootPoster from "@/assets/bhoot_and_friends.jpg";
import zodiacPoster from "@/assets/zodiac.jpg";
import sevenPoster from "@/assets/seven.jpg";
import whiplashPoster from "@/assets/whiplash.webp";

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
    id: 1, title: "Dhurandhar: The Revenge", year: 2026, genre: ["Action", "Thriller"], rating: 8.5,
    director: "Aditya Dhar", duration: "2h 30min", language: "Hindi",
    synopsis: "An intense revenge saga where a warrior rises from the ashes to reclaim his honor and fight against injustice in a brutal world.",
    poster: dhurandharPoster, heroImage: dhurandharPoster,
    budget: "₹415 Cr", boxOffice: "₹2,075 Cr",
    cast: [{ name: "Ranveer Singh", role: "Dhurandhar" }, { name: "Jyoti Deshpande", role: "Producer" }],
    awards: [],
  },
  {
    id: 2, title: "(500) Days of Summer", year: 2009, genre: ["Romance", "Comedy", "Drama"], rating: 7.7,
    director: "Marc Webb", duration: "1h 35min", language: "English",
    synopsis: "An offbeat romantic comedy about a woman who doesn't believe true love exists, and the young man who falls for her.",
    poster: days500Poster, heroImage: days500Poster,
    budget: "₹62 Cr", boxOffice: "₹498 Cr",
    cast: [{ name: "Joseph Gordon-Levitt", role: "Tom Hansen" }, { name: "Zooey Deschanel", role: "Summer Finn" }],
    awards: ["Best First Feature - Independent Spirit Awards"],
  },
  {
    id: 3, title: "Pirates of the Caribbean", year: 2003, genre: ["Adventure", "Fantasy", "Action"], rating: 8.0,
    director: "Gore Verbinski", duration: "2h 23min", language: "English",
    synopsis: "Blacksmith Will Turner teams up with eccentric pirate Captain Jack Sparrow to save his love from cursed pirates.",
    poster: piratesPoster, heroImage: piratesPoster,
    budget: "₹1,162 Cr", boxOffice: "₹5,428 Cr",
    cast: [{ name: "Johnny Depp", role: "Captain Jack Sparrow" }, { name: "Orlando Bloom", role: "Will Turner" }, { name: "Keira Knightley", role: "Elizabeth Swann" }],
    awards: ["Best Actor - SAG (Nominated)", "Best Makeup - Academy Awards (Nominated)"],
  },
  {
    id: 4, title: "Mad Max: Fury Road", year: 2015, genre: ["Action", "Adventure", "Sci-Fi"], rating: 8.1,
    director: "George Miller", duration: "2h", language: "English",
    synopsis: "In a post-apocalyptic wasteland, Max teams up with Furiosa to flee a tyrannical warlord and his army.",
    poster: madMaxPoster, heroImage: madMaxPoster,
    budget: "₹1,245 Cr", boxOffice: "₹3,113 Cr",
    cast: [{ name: "Tom Hardy", role: "Max Rockatansky" }, { name: "Charlize Theron", role: "Imperator Furiosa" }],
    awards: ["Best Film Editing - Academy Awards", "Best Costume Design - Academy Awards", "Best Production Design - Academy Awards"],
  },
  {
    id: 5, title: "Zathura: A Space Adventure", year: 2005, genre: ["Sci-Fi", "Adventure", "Family"], rating: 6.2,
    director: "Jon Favreau", duration: "1h 41min", language: "English",
    synopsis: "Two young brothers are drawn into an intergalactic adventure when their house is hurled through space by a magical board game.",
    poster: zathuraPoster, heroImage: zathuraPoster,
    budget: "₹540 Cr", boxOffice: "₹531 Cr",
    cast: [{ name: "Josh Hutcherson", role: "Walter" }, { name: "Jonah Bobo", role: "Danny" }, { name: "Dax Shepard", role: "Astronaut" }],
    awards: [],
  },
  {
    id: 6, title: "The Family Man", year: 2019, genre: ["Action", "Thriller", "Drama"], rating: 8.6,
    director: "Raj & DK", duration: "Series", language: "Hindi",
    synopsis: "A middle-class man secretly works as an intelligence officer for the National Investigation Agency.",
    poster: familyManPoster, heroImage: familyManPoster,
    budget: "₹83 Cr", boxOffice: "N/A",
    cast: [{ name: "Manoj Bajpayee", role: "Srikant Tiwari" }, { name: "Priyamani", role: "Suchitra Tiwari" }],
    awards: ["Best Web Series - Filmfare OTT Awards"],
  },
  {
    id: 7, title: "John Wick", year: 2014, genre: ["Action", "Thriller", "Crime"], rating: 7.4,
    director: "Chad Stahelski", duration: "1h 41min", language: "English",
    synopsis: "An ex-hitman comes out of retirement to track down the gangsters that killed his dog and took everything from him.",
    poster: johnWickPoster, heroImage: johnWickPoster,
    budget: "₹166 Cr", boxOffice: "₹714 Cr",
    cast: [{ name: "Keanu Reeves", role: "John Wick" }, { name: "Michael Nyqvist", role: "Viggo Tarasov" }],
    awards: [],
  },
  {
    id: 8, title: "Kantara", year: 2022, genre: ["Action", "Drama", "Thriller"], rating: 8.4,
    director: "Rishab Shetty", duration: "2h 28min", language: "Kannada",
    synopsis: "A Kambala champion locks horns with an upright forest officer in a land dispute, unraveling a mythological mystery.",
    poster: kantaraPoster, heroImage: kantaraPoster,
    budget: "₹25 Cr", boxOffice: "₹996 Cr",
    cast: [{ name: "Rishab Shetty", role: "Shiva" }, { name: "Sapthami Gowda", role: "Leela" }],
    awards: ["Best Feature Film - National Film Awards"],
  },
  {
    id: 9, title: "Kung Fu Hustle", year: 2004, genre: ["Action", "Comedy", "Fantasy"], rating: 7.7,
    director: "Stephen Chow", duration: "1h 39min", language: "Cantonese",
    synopsis: "In 1940s Shanghai, a wannabe gangster aspires to join the notorious Axe Gang while residents of a slum fight back.",
    poster: kungfuHustlePoster, heroImage: kungfuHustlePoster,
    budget: "₹166 Cr", boxOffice: "₹847 Cr",
    cast: [{ name: "Stephen Chow", role: "Sing" }, { name: "Yuen Wah", role: "Landlord" }],
    awards: ["Best Film - Hong Kong Film Awards"],
  },
  {
    id: 10, title: "Baramulla", year: 2024, genre: ["Thriller", "Drama"], rating: 7.5,
    director: "Various", duration: "Series", language: "Hindi",
    synopsis: "A gripping thriller set in the conflict zone of Baramulla, exploring the lives caught between duty and survival.",
    poster: baramullaPoster, heroImage: baramullaPoster,
    budget: "₹66 Cr", boxOffice: "N/A",
    cast: [{ name: "Unknown", role: "Lead" }],
    awards: [],
  },
  {
    id: 11, title: "The Karate Kid", year: 1984, genre: ["Drama", "Family", "Sport"], rating: 7.3,
    director: "John G. Avildsen", duration: "2h 6min", language: "English",
    synopsis: "A martial arts master teaches a bullied teen to defend himself and compete in a tournament.",
    poster: karateKidPoster, heroImage: karateKidPoster,
    budget: "₹66 Cr", boxOffice: "₹755 Cr",
    cast: [{ name: "Ralph Macchio", role: "Daniel LaRusso" }, { name: "Pat Morita", role: "Mr. Miyagi" }],
    awards: ["Best Supporting Actor - Academy Awards (Nominated)"],
  },
  {
    id: 12, title: "The Meg", year: 2018, genre: ["Action", "Sci-Fi", "Horror"], rating: 5.6,
    director: "Jon Turteltaub", duration: "1h 53min", language: "English",
    synopsis: "A deep-sea submersible is attacked by a massive creature, forcing a rescue diver to confront a 75-foot prehistoric shark.",
    poster: theMegPoster, heroImage: theMegPoster,
    budget: "₹1,079 Cr", boxOffice: "₹4,399 Cr",
    cast: [{ name: "Jason Statham", role: "Jonas Taylor" }, { name: "Li Bingbing", role: "Suyin" }],
    awards: [],
  },
  {
    id: 13, title: "Bhoot and Friends", year: 2010, genre: ["Comedy", "Horror", "Family"], rating: 5.8,
    director: "Ashu Trikha", duration: "1h 50min", language: "Hindi",
    synopsis: "A group of kids befriend a friendly ghost and go on an exciting adventure together.",
    poster: bhootPoster, heroImage: bhootPoster,
    budget: "₹17 Cr", boxOffice: "₹42 Cr",
    cast: [{ name: "Ishaan Khattar", role: "Lead Kid" }],
    awards: [],
  },
  {
    id: 14, title: "The Vampire Diaries", year: 2009, genre: ["Drama", "Fantasy", "Horror"], rating: 7.7,
    director: "Kevin Williamson", duration: "Series", language: "English",
    synopsis: "The lives, loves, dangers and disasters in the town of Mystic Falls, Virginia involving vampires, werewolves and witches.",
    poster: tvdPoster, heroImage: tvdPoster,
    budget: "₹25 Cr/ep", boxOffice: "N/A",
    cast: [{ name: "Nina Dobrev", role: "Elena Gilbert" }, { name: "Paul Wesley", role: "Stefan Salvatore" }, { name: "Ian Somerhalder", role: "Damon Salvatore" }],
    awards: ["People's Choice Award - Favorite Sci-Fi/Fantasy Show"],
  },
  {
    id: 15, title: "Stranger Things", year: 2016, genre: ["Drama", "Fantasy", "Horror"], rating: 8.7,
    director: "The Duffer Brothers", duration: "Series", language: "English",
    synopsis: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces.",
    poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1920&h=800&fit=crop",
    budget: "₹249 Cr/season", boxOffice: "N/A",
    cast: [{ name: "Millie Bobby Brown", role: "Eleven" }, { name: "Finn Wolfhard", role: "Mike Wheeler" }],
    awards: ["SAG Award - Outstanding Ensemble", "Emmy - Outstanding Drama (Nominated)"],
  },
  {
    id: 16, title: "Whiplash", year: 2014, genre: ["Drama", "Music"], rating: 8.5,
    director: "Damien Chazelle", duration: "1h 47min", language: "English",
    synopsis: "A promising young drummer enrolls at a cutthroat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing.",
    poster: whiplashPoster, heroImage: whiplashPoster,
    budget: "₹27 Cr", boxOffice: "₹407 Cr",
    cast: [{ name: "Miles Teller", role: "Andrew Neiman" }, { name: "J.K. Simmons", role: "Terence Fletcher" }],
    awards: ["Best Supporting Actor - Academy Awards", "Best Film Editing - Academy Awards", "Best Sound Mixing - Academy Awards"],
  },
  {
    id: 17, title: "Seven", year: 1995, genre: ["Crime", "Drama", "Mystery"], rating: 8.6,
    director: "David Fincher", duration: "2h 7min", language: "English",
    synopsis: "Two detectives hunt a serial killer who uses the seven deadly sins as his motives.",
    poster: sevenPoster, heroImage: sevenPoster,
    budget: "₹274 Cr", boxOffice: "₹2,714 Cr",
    cast: [{ name: "Brad Pitt", role: "Detective David Mills" }, { name: "Morgan Freeman", role: "Detective William Somerset" }],
    awards: ["Best Film Editing - Academy Awards (Nominated)"],
  },
  {
    id: 18, title: "Zodiac", year: 2007, genre: ["Crime", "Drama", "Mystery"], rating: 7.7,
    director: "David Fincher", duration: "2h 37min", language: "English",
    synopsis: "Between 1968 and 1983, a San Francisco cartoonist becomes an amateur detective obsessed with tracking down the Zodiac Killer.",
    poster: zodiacPoster, heroImage: zodiacPoster,
    budget: "₹540 Cr", boxOffice: "₹697 Cr",
    cast: [{ name: "Jake Gyllenhaal", role: "Robert Graysmith" }, { name: "Robert Downey Jr.", role: "Paul Avery" }, { name: "Mark Ruffalo", role: "Inspector David Toschi" }],
    awards: [],
  },
];

export const recommendedMovies: Movie[] = [
  {
    id: 101, title: "Inception", year: 2010, genre: ["Sci-Fi", "Action"], rating: 8.8,
    director: "Christopher Nolan", duration: "2h 28min", language: "English",
    synopsis: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
    poster: inceptionPoster, heroImage: inceptionPoster,
    budget: "₹1,328 Cr", boxOffice: "₹6,939 Cr",
    cast: [{ name: "Leonardo DiCaprio", role: "Dom Cobb" }],
    awards: ["Best Cinematography - Academy Awards"],
  },
  {
    id: 102, title: "The Shawshank Redemption", year: 1994, genre: ["Drama"], rating: 9.3,
    director: "Frank Darabont", duration: "2h 22min", language: "English",
    synopsis: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=800&fit=crop",
    budget: "₹208 Cr", boxOffice: "₹481 Cr",
    cast: [{ name: "Tim Robbins", role: "Andy Dufresne" }, { name: "Morgan Freeman", role: "Red" }],
    awards: ["Best Picture - Academy Awards (Nominated)"],
  },
  {
    id: 103, title: "Interstellar", year: 2014, genre: ["Sci-Fi", "Drama"], rating: 8.6,
    director: "Christopher Nolan", duration: "2h 49min", language: "English",
    synopsis: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster: interstellarPoster, heroImage: interstellarPoster,
    budget: "₹1,370 Cr", boxOffice: "₹5,619 Cr",
    cast: [{ name: "Matthew McConaughey", role: "Cooper" }, { name: "Anne Hathaway", role: "Brand" }],
    awards: ["Best Visual Effects - Academy Awards"],
  },
  {
    id: 104, title: "The Dark Knight", year: 2008, genre: ["Action", "Crime", "Drama"], rating: 9.0,
    director: "Christopher Nolan", duration: "2h 32min", language: "English",
    synopsis: "The menace known as The Joker wreaks havoc on Gotham City, forcing Batman to confront chaos itself.",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=800&fit=crop",
    budget: "₹1,536 Cr", boxOffice: "₹8,300 Cr",
    cast: [{ name: "Christian Bale", role: "Batman" }, { name: "Heath Ledger", role: "Joker" }],
    awards: ["Best Supporting Actor - Academy Awards"],
  },
  {
    id: 105, title: "Parasite", year: 2019, genre: ["Drama", "Thriller"], rating: 8.5,
    director: "Bong Joon-ho", duration: "2h 12min", language: "Korean",
    synopsis: "Greed and class discrimination threaten a symbiotic relationship between a wealthy family and a destitute one.",
    poster: parasitePoster, heroImage: parasitePoster,
    budget: "₹91 Cr", boxOffice: "₹2,183 Cr",
    cast: [{ name: "Song Kang-ho", role: "Kim Ki-taek" }, { name: "Choi Woo-shik", role: "Kim Ki-woo" }],
    awards: ["Best Picture - Academy Awards", "Best Director - Academy Awards"],
  },
  {
    id: 106, title: "Fight Club", year: 1999, genre: ["Drama", "Thriller"], rating: 8.8,
    director: "David Fincher", duration: "2h 19min", language: "English",
    synopsis: "An insomniac office worker and a soap salesman form an underground fight club that evolves into something much more.",
    poster: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=400&h=600&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=1920&h=800&fit=crop",
    budget: "₹523 Cr", boxOffice: "₹838 Cr",
    cast: [{ name: "Brad Pitt", role: "Tyler Durden" }, { name: "Edward Norton", role: "The Narrator" }],
    awards: [],
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
  { id: 1, name: "Academy Award", category: "Best Picture", year: 2024, body: "Academy Awards", movieTitle: "Whiplash", moviePoster: whiplashPoster, won: true, nominees: ["John Wick", "Kantara", "Mad Max: Fury Road", "(500) Days of Summer"] },
  { id: 2, name: "Academy Award", category: "Best Director", year: 2024, body: "Academy Awards", movieTitle: "Mad Max: Fury Road", moviePoster: madMaxPoster, won: true, nominees: ["David Fincher", "Damien Chazelle", "Marc Webb"] },
  { id: 3, name: "Academy Award", category: "Best Visual Effects", year: 2024, body: "Academy Awards", movieTitle: "Zathura", moviePoster: zathuraPoster, won: true, nominees: ["John Wick", "Pirates of the Caribbean", "The Meg"] },
  { id: 4, name: "Academy Award", category: "Best Actor", year: 2024, body: "Academy Awards", movieTitle: "Whiplash", moviePoster: whiplashPoster, won: true, nominees: ["Keanu Reeves", "Rishab Shetty"] },
  { id: 5, name: "Golden Globe", category: "Best Motion Picture - Drama", year: 2024, body: "Golden Globes", movieTitle: "Kantara", moviePoster: kantaraPoster, won: true, nominees: ["John Wick", "Seven", "Zodiac"] },
  { id: 6, name: "BAFTA", category: "Best Film", year: 2024, body: "BAFTA", movieTitle: "Seven", moviePoster: sevenPoster, won: false, nominees: ["Zodiac", "Whiplash"] },
  { id: 7, name: "BAFTA", category: "Best Cinematography", year: 2024, body: "BAFTA", movieTitle: "Mad Max: Fury Road", moviePoster: madMaxPoster, won: true, nominees: ["Kantara", "Pirates of the Caribbean"] },
  { id: 8, name: "Cannes", category: "Palme d'Or", year: 2024, body: "Cannes Film Festival", movieTitle: "(500) Days of Summer", moviePoster: days500Poster, won: false, nominees: ["Dhurandhar: The Revenge", "Baramulla"] },
  { id: 9, name: "Golden Globe", category: "Best Foreign Language Film", year: 2024, body: "Golden Globes", movieTitle: "Kantara", moviePoster: kantaraPoster, won: true, nominees: ["Kung Fu Hustle", "The Family Man"] },
  { id: 10, name: "Academy Award", category: "Best Original Screenplay", year: 2023, body: "Academy Awards", movieTitle: "Seven", moviePoster: sevenPoster, won: true, nominees: ["Zodiac", "Whiplash"] },
  { id: 11, name: "SAG Award", category: "Outstanding Performance - Cast", year: 2024, body: "SAG Awards", movieTitle: "Stranger Things", moviePoster: movies[14]?.poster || "", won: false, nominees: ["The Vampire Diaries", "The Family Man"] },
  { id: 12, name: "National Film Award", category: "Best Feature Film", year: 2024, body: "National Film Awards", movieTitle: "Kantara", moviePoster: kantaraPoster, won: true, nominees: ["Dhurandhar: The Revenge", "Baramulla"] },
  { id: 13, name: "Padma Shri", category: "Distinguished Service in Arts", year: 2024, body: "Padma Shri", movieTitle: "Kantara", moviePoster: kantaraPoster, won: true, nominees: ["Manoj Bajpayee", "Rishab Shetty", "Ranveer Singh"] },
  { id: 14, name: "Padma Shri", category: "Excellence in Cinema", year: 2023, body: "Padma Shri", movieTitle: "The Family Man", moviePoster: familyManPoster, won: true, nominees: ["Manoj Bajpayee", "Shah Rukh Khan"] },
  { id: 15, name: "Filmfare Award", category: "Best Film", year: 2024, body: "Filmfare Awards", movieTitle: "Kantara", moviePoster: kantaraPoster, won: true, nominees: ["Dhurandhar: The Revenge", "The Family Man", "Baramulla"] },
  { id: 16, name: "Filmfare Award", category: "Best Actor", year: 2024, body: "Filmfare Awards", movieTitle: "Dhurandhar: The Revenge", moviePoster: dhurandharPoster, won: true, nominees: ["Rishab Shetty", "Manoj Bajpayee"] },
  { id: 17, name: "Filmfare Award", category: "Best Director", year: 2023, body: "Filmfare Awards", movieTitle: "The Family Man", moviePoster: familyManPoster, won: true, nominees: ["Rishab Shetty", "Aditya Dhar"] },
  { id: 18, name: "Padma Shri", category: "Contribution to Indian Cinema", year: 2025, body: "Padma Shri", movieTitle: "Dhurandhar: The Revenge", moviePoster: dhurandharPoster, won: true, nominees: ["Ranveer Singh", "Deepika Padukone"] },
];
