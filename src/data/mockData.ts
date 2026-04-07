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
import parasitePoster from "@/assets/parasite.webp";
import interstellarPoster from "@/assets/interstellar.jpg";
import karateKidPoster from "@/assets/karate_kid.webp";
import theMegPoster from "@/assets/the_meg.webp";
import tvdPoster from "@/assets/tvd.jpg";
import bhootPoster from "@/assets/bhoot_and_friends2.jpg";
import zodiacPoster from "@/assets/zodiac.jpg";
import christianBalePhoto from "@/assets/christian_bale.jpg";
import puneethRajkumarPhoto from "@/assets/puneeth_rajkumar.webp";
import kanganaRanautPhoto from "@/assets/kangana_ranaut.jpg";
import yashPhoto from "@/assets/yash.jpg";
import cateBlanchettPhoto from "@/assets/cate_blanchett.jpg";
import priyankaChopraPhoto from "@/assets/priyanka_chopra.jpg";
import deepikaPadukonePhoto from "@/assets/deepika_padukone.jpg";
import rishabShettyPhoto from "@/assets/rishab_shetty.jpg";
import srkPhoto from "@/assets/srk.jpg";
import sevenPoster from "@/assets/seven.jpg";
import whiplashPoster from "@/assets/whiplash.webp";
import dhamaalPoster from "@/assets/dhamaal.jpg";
import golmaalPoster from "@/assets/golmaal.jpg";
import andhadhunPoster from "@/assets/andhadhun.jpg";
import rustomPoster from "@/assets/rustom.jpg";
import baramulla2Poster from "@/assets/baramulla2.jpg";
import strangerThingsPoster from "@/assets/stranger_things.jpg";
import manojBajpayeePhoto from "@/assets/manoj_bajpayee.jpg";
import vidyaBalanPhoto from "@/assets/vidya_balan.webp";
import emmaWatsonPhoto from "@/assets/emma_watson.webp";
import leonardoDiCaprioPhoto from "@/assets/leonardo_dicaprio.webp";

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
    director: "Aditya Dhar", duration: "3h 55min", language: "Hindi",
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
    id: 6, title: "Stranger Things", year: 2016, genre: ["Drama", "Fantasy", "Horror"], rating: 8.7,
    director: "The Duffer Brothers", duration: "Series", language: "English",
    synopsis: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces.",
    poster: strangerThingsPoster, heroImage: strangerThingsPoster,
    budget: "₹249 Cr/season", boxOffice: "N/A",
    cast: [{ name: "Millie Bobby Brown", role: "Eleven" }, { name: "Finn Wolfhard", role: "Mike Wheeler" }],
    awards: ["SAG Award - Outstanding Ensemble", "Emmy - Outstanding Drama (Nominated)"],
  },
  {
    id: 20, title: "The Family Man", year: 2019, genre: ["Action", "Thriller", "Drama"], rating: 8.6,
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
    director: "Aditya Suhas Jambhale", duration: "Series", language: "Hindi",
    synopsis: "A gripping thriller set in the conflict zone of Baramulla, exploring the lives caught between duty and survival.",
    poster: baramulla2Poster, heroImage: baramulla2Poster,
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
    id: 16, title: "Whiplash", year: 2014, genre: ["Drama", "Music"], rating: 8.5,
    director: "Damien Chazelle", duration: "1h 47min", language: "English",
    synopsis: "A promising young drummer enrolls at a cutthroat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing.",
    poster: whiplashPoster, heroImage: whiplashPoster,
    budget: "₹27 Cr", boxOffice: "₹407 Cr",
    cast: [{ name: "Miles Teller", role: "Andrew Neiman" }, { name: "J.K. Simmons", role: "Terence Fletcher" }],
    awards: ["Best Supporting Actor - Academy Awards", "Best Film Editing - Academy Awards", "Best Sound Mixing - Academy Awards"],
  },
  {
    id: 17, title: "Dhamaal", year: 2007, genre: ["Comedy", "Adventure"], rating: 7.0,
    director: "Indra Kumar", duration: "2h 36min", language: "Hindi",
    synopsis: "Four crazy friends overhear a dying criminal reveal the location of hidden treasure and embark on a hilarious race to find it first.",
    poster: dhamaalPoster, heroImage: dhamaalPoster,
    budget: "₹22 Cr", boxOffice: "₹54 Cr",
    cast: [{ name: "Sanjay Dutt", role: "Inspector Kabir" }, { name: "Arshad Warsi", role: "Adi" }, { name: "Riteish Deshmukh", role: "Roy" }, { name: "Javed Jaffrey", role: "Manav" }],
    awards: [],
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
    id: 101, title: "Seven", year: 1995, genre: ["Crime", "Drama", "Mystery"], rating: 8.6,
    director: "David Fincher", duration: "2h 7min", language: "English",
    synopsis: "Two detectives hunt a serial killer who uses the seven deadly sins as his motives.",
    poster: sevenPoster, heroImage: sevenPoster,
    budget: "₹274 Cr", boxOffice: "₹2,714 Cr",
    cast: [{ name: "Brad Pitt", role: "Detective David Mills" }, { name: "Morgan Freeman", role: "Detective William Somerset" }],
    awards: ["Best Film Editing - Academy Awards (Nominated)"],
  },
  {
    id: 102, title: "Andhadhun", year: 2018, genre: ["Crime", "Thriller", "Comedy"], rating: 8.3,
    director: "Sriram Raghavan", duration: "2h 19min", language: "Hindi",
    synopsis: "A series of mysterious events change the life of a blind pianist, who must now report a crime that he should technically know nothing of.",
    poster: andhadhunPoster, heroImage: andhadhunPoster,
    budget: "₹32 Cr", boxOffice: "₹456 Cr",
    cast: [{ name: "Ayushmann Khurrana", role: "Akash" }, { name: "Tabu", role: "Simi" }, { name: "Radhika Apte", role: "Sophie" }],
    awards: ["Best Hindi Film - National Film Awards", "Filmfare Award - Best Film"],
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
    id: 104, title: "Rustom", year: 2016, genre: ["Crime", "Drama", "Thriller"], rating: 6.5,
    director: "Tinu Suresh Desai", duration: "2h 28min", language: "Hindi",
    synopsis: "A naval officer is accused of murdering his wife's lover. Inspired by true events, the trial becomes the most talked-about case in the country.",
    poster: rustomPoster, heroImage: rustomPoster,
    budget: "₹45 Cr", boxOffice: "₹218 Cr",
    cast: [{ name: "Akshay Kumar", role: "Rustom Pavri" }, { name: "Ileana D'Cruz", role: "Cynthia Pavri" }],
    awards: ["National Film Award - Best Film on Social Issues"],
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
    id: 106, title: "Golmaal: Fun Unlimited", year: 2006, genre: ["Comedy", "Drama"], rating: 7.1,
    director: "Rohit Shetty", duration: "2h 27min", language: "Hindi",
    synopsis: "Two groups of mischievous boys try to outsmart each other while living in a blind couple's house, leading to hilarious chaos.",
    poster: golmaalPoster, heroImage: golmaalPoster,
    budget: "₹13 Cr", boxOffice: "₹52 Cr",
    cast: [{ name: "Ajay Devgan", role: "Gopal" }, { name: "Arshad Warsi", role: "Laxman 1" }, { name: "Tusshar Kapoor", role: "Lucky" }, { name: "Sharman Joshi", role: "Laxman 2" }],
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
    id: 6, name: "Manoj Bajpayee", nationality: "Indian", dob: "1969-04-23", age: 55, gender: "Male",
    biography: "Manoj Bajpayee is one of the finest Indian actors, known for his extraordinary performances in Gangs of Wasseypur, The Family Man, and Satya. A National Award winner, he is celebrated for his method acting and versatility.",
    photo: manojBajpayeePhoto,
    awardsCount: 12,
    knownFor: ["The Family Man", "Gangs of Wasseypur", "Satya", "Aligarh"],
    filmography: [
      { title: "The Family Man", year: 2019, role: "Srikant Tiwari" },
      { title: "Gangs of Wasseypur", year: 2012, role: "Sardar Khan" },
      { title: "Satya", year: 1998, role: "Bhiku Mhatre" },
      { title: "Aligarh", year: 2015, role: "Prof. Siras" },
    ],
    awards: ["National Film Award - Best Actor", "Padma Shri", "Filmfare Award - Best Actor (Critics)"],
  },
  {
    id: 7, name: "Vidya Balan", nationality: "Indian", dob: "1978-01-01", age: 46, gender: "Female",
    biography: "Vidya Balan is a powerhouse Indian actress known for her strong female-centric roles. She has been a trailblazer in Bollywood with films like The Dirty Picture, Kahaani, and Tumhari Sulu.",
    photo: vidyaBalanPhoto,
    awardsCount: 9,
    knownFor: ["Kahaani", "The Dirty Picture", "Tumhari Sulu", "Shakuntala Devi"],
    filmography: [
      { title: "Kahaani", year: 2012, role: "Vidya Bagchi" },
      { title: "The Dirty Picture", year: 2011, role: "Silk Smitha" },
      { title: "Tumhari Sulu", year: 2017, role: "Sulochana" },
      { title: "Shakuntala Devi", year: 2020, role: "Shakuntala Devi" },
    ],
    awards: ["National Film Award - Best Actress", "Padma Shri", "Filmfare Award - Best Actress"],
  },
  {
    id: 8, name: "Emma Stone", nationality: "American", dob: "1988-11-06", age: 36, gender: "Female",
    biography: "Emma Stone is an American actress and two-time Academy Award winner known for her roles in La La Land, Poor Things, and The Amazing Spider-Man. She is one of the highest-paid actresses in the world.",
    photo: emmaWatsonPhoto,
    awardsCount: 10,
    knownFor: ["La La Land", "Poor Things", "The Amazing Spider-Man", "Easy A"],
    filmography: [
      { title: "Poor Things", year: 2023, role: "Bella Baxter" },
      { title: "La La Land", year: 2016, role: "Mia Dolan" },
      { title: "The Amazing Spider-Man", year: 2012, role: "Gwen Stacy" },
      { title: "Easy A", year: 2010, role: "Olive Penderghast" },
    ],
    awards: ["Best Actress - Academy Awards (La La Land)", "Best Actress - Academy Awards (Poor Things)", "BAFTA - Best Actress"],
  },
  {
    id: 9, name: "Leonardo DiCaprio", nationality: "American", dob: "1974-11-11", age: 50, gender: "Male",
    biography: "Leonardo DiCaprio is one of the most acclaimed actors of his generation. From Titanic to The Revenant, he has delivered iconic performances and is also a dedicated environmental activist.",
    photo: leonardoDiCaprioPhoto,
    awardsCount: 15,
    knownFor: ["Inception", "Titanic", "The Revenant", "The Wolf of Wall Street"],
    filmography: [
      { title: "Killers of the Flower Moon", year: 2023, role: "Ernest Burkhart" },
      { title: "Don't Look Up", year: 2021, role: "Dr. Randall Mindy" },
      { title: "The Revenant", year: 2015, role: "Hugh Glass" },
      { title: "Inception", year: 2010, role: "Dom Cobb" },
      { title: "Titanic", year: 1997, role: "Jack Dawson" },
    ],
    awards: ["Best Actor - Academy Awards (The Revenant)", "Golden Globe - Best Actor", "SAG Award - Best Actor"],
  },
  {
    id: 10, name: "Ravi Sharma", nationality: "Indian", dob: "1983-12-20", age: 41, gender: "Male",
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
  { id: 11, name: "SAG Award", category: "Outstanding Performance - Cast", year: 2024, body: "SAG Awards", movieTitle: "Stranger Things", moviePoster: strangerThingsPoster, won: false, nominees: ["The Vampire Diaries", "The Family Man"] },
  { id: 12, name: "National Film Award", category: "Best Feature Film", year: 2024, body: "National Film Awards", movieTitle: "Kantara", moviePoster: kantaraPoster, won: true, nominees: ["Dhurandhar: The Revenge", "Baramulla"] },
  { id: 13, name: "Padma Shri", category: "Distinguished Service in Arts", year: 2024, body: "Padma Shri", movieTitle: "Kantara", moviePoster: kantaraPoster, won: true, nominees: ["Manoj Bajpayee", "Rishab Shetty", "Ranveer Singh"] },
  { id: 14, name: "Padma Shri", category: "Excellence in Cinema", year: 2023, body: "Padma Shri", movieTitle: "The Family Man", moviePoster: familyManPoster, won: true, nominees: ["Manoj Bajpayee", "Shah Rukh Khan"] },
  { id: 15, name: "Filmfare Award", category: "Best Film", year: 2024, body: "Filmfare Awards", movieTitle: "Kantara", moviePoster: kantaraPoster, won: true, nominees: ["Dhurandhar: The Revenge", "The Family Man", "Baramulla"] },
  { id: 16, name: "Filmfare Award", category: "Best Actor", year: 2024, body: "Filmfare Awards", movieTitle: "Dhurandhar: The Revenge", moviePoster: dhurandharPoster, won: true, nominees: ["Rishab Shetty", "Manoj Bajpayee"] },
  { id: 17, name: "Filmfare Award", category: "Best Director", year: 2023, body: "Filmfare Awards", movieTitle: "The Family Man", moviePoster: familyManPoster, won: true, nominees: ["Rishab Shetty", "Aditya Dhar"] },
  { id: 18, name: "Padma Shri", category: "Contribution to Indian Cinema", year: 2025, body: "Padma Shri", movieTitle: "Dhurandhar: The Revenge", moviePoster: dhurandharPoster, won: true, nominees: ["Ranveer Singh", "Deepika Padukone"] },
];
