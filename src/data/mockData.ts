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
import manojBajpayeePhoto from "@/assets/manoj_bajpayee2.jpg";
import vidyaBalanPhoto from "@/assets/vidya_balan.webp";
import emmaWatsonPhoto from "@/assets/emma_watson.webp";
import leonardoDiCaprioPhoto from "@/assets/leonardo_dicaprio.webp";
import aliaBhattPhoto from "@/assets/alia_bhatt.webp";
import ranbirKapoorPhoto from "@/assets/ranbir_kapoor.jpg";
import amitabhBachchanPhoto from "@/assets/amitabh_bachchan.jpg";
import tomHanksPhoto from "@/assets/tom_hanks.jpg";
import merylStreepPhoto from "@/assets/meryl_streep.jpg";
import akshayKumarPhoto from "@/assets/akshay_kumar.webp";
import matrixPoster from "@/assets/matrix.jpg";
import tumbbadPoster from "@/assets/tumbbad.webp";
import forrestGumpPoster from "@/assets/forrest_gump.webp";

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
  trailerUrl?: string;
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
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 2, title: "(500) Days of Summer", year: 2009, genre: ["Romance", "Comedy", "Drama"], rating: 7.7,
    director: "Marc Webb", duration: "1h 35min", language: "English",
    synopsis: "An offbeat romantic comedy about a woman who doesn't believe true love exists, and the young man who falls for her.",
    poster: days500Poster, heroImage: days500Poster,
    budget: "₹62 Cr", boxOffice: "₹498 Cr",
    cast: [{ name: "Joseph Gordon-Levitt", role: "Tom Hansen" }, { name: "Zooey Deschanel", role: "Summer Finn" }],
    awards: ["Best First Feature - Independent Spirit Awards"],
    trailerUrl: "https://www.youtube.com/embed/PsD0NpFSADM",
  },
  {
    id: 3, title: "Pirates of the Caribbean", year: 2003, genre: ["Adventure", "Fantasy", "Action"], rating: 8.0,
    director: "Gore Verbinski", duration: "2h 23min", language: "English",
    synopsis: "Blacksmith Will Turner teams up with eccentric pirate Captain Jack Sparrow to save his love from cursed pirates.",
    poster: piratesPoster, heroImage: piratesPoster,
    budget: "₹1,162 Cr", boxOffice: "₹5,428 Cr",
    cast: [{ name: "Johnny Depp", role: "Captain Jack Sparrow" }, { name: "Orlando Bloom", role: "Will Turner" }, { name: "Keira Knightley", role: "Elizabeth Swann" }],
    awards: ["Best Actor - SAG (Nominated)", "Best Makeup - Academy Awards (Nominated)"],
    trailerUrl: "https://www.youtube.com/embed/naQr0uTrH_s",
  },
  {
    id: 4, title: "Mad Max: Fury Road", year: 2015, genre: ["Action", "Adventure", "Sci-Fi"], rating: 8.1,
    director: "George Miller", duration: "2h", language: "English",
    synopsis: "In a post-apocalyptic wasteland, Max teams up with Furiosa to flee a tyrannical warlord and his army.",
    poster: madMaxPoster, heroImage: madMaxPoster,
    budget: "₹1,245 Cr", boxOffice: "₹3,113 Cr",
    cast: [{ name: "Tom Hardy", role: "Max Rockatansky" }, { name: "Charlize Theron", role: "Imperator Furiosa" }],
    awards: ["Best Film Editing - Academy Awards", "Best Costume Design - Academy Awards", "Best Production Design - Academy Awards"],
    trailerUrl: "https://www.youtube.com/embed/hEJnMQG9ev8",
  },
  {
    id: 5, title: "Zathura: A Space Adventure", year: 2005, genre: ["Sci-Fi", "Adventure", "Family"], rating: 6.2,
    director: "Jon Favreau", duration: "1h 41min", language: "English",
    synopsis: "Two young brothers are drawn into an intergalactic adventure when their house is hurled through space by a magical board game.",
    poster: zathuraPoster, heroImage: zathuraPoster,
    budget: "₹540 Cr", boxOffice: "₹531 Cr",
    cast: [{ name: "Josh Hutcherson", role: "Walter" }, { name: "Jonah Bobo", role: "Danny" }, { name: "Dax Shepard", role: "Astronaut" }],
    awards: [],
    trailerUrl: "https://www.youtube.com/embed/ek0tCSRJbGI",
  },
  {
    id: 6, title: "Stranger Things", year: 2016, genre: ["Drama", "Fantasy", "Horror"], rating: 8.7,
    director: "The Duffer Brothers", duration: "Series", language: "English",
    synopsis: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces.",
    poster: strangerThingsPoster, heroImage: strangerThingsPoster,
    budget: "₹249 Cr/season", boxOffice: "N/A",
    cast: [{ name: "Millie Bobby Brown", role: "Eleven" }, { name: "Finn Wolfhard", role: "Mike Wheeler" }],
    awards: ["SAG Award - Outstanding Ensemble", "Emmy - Outstanding Drama (Nominated)"],
    trailerUrl: "https://www.youtube.com/embed/b9EkMc79ZSU",
  },
  {
    id: 20, title: "The Family Man", year: 2019, genre: ["Action", "Thriller", "Drama"], rating: 8.6,
    director: "Raj & DK", duration: "Series", language: "Hindi",
    synopsis: "A middle-class man secretly works as an intelligence officer for the National Investigation Agency.",
    poster: familyManPoster, heroImage: familyManPoster,
    budget: "₹83 Cr", boxOffice: "N/A",
    cast: [{ name: "Manoj Bajpayee", role: "Srikant Tiwari" }, { name: "Priyamani", role: "Suchitra Tiwari" }],
    awards: ["Best Web Series - Filmfare OTT Awards"],
    trailerUrl: "https://www.youtube.com/embed/KdH8Ym2HGN0",
  },
  {
    id: 7, title: "John Wick", year: 2014, genre: ["Action", "Thriller", "Crime"], rating: 7.4,
    director: "Chad Stahelski", duration: "1h 41min", language: "English",
    synopsis: "An ex-hitman comes out of retirement to track down the gangsters that killed his dog and took everything from him.",
    poster: johnWickPoster, heroImage: johnWickPoster,
    budget: "₹166 Cr", boxOffice: "₹714 Cr",
    cast: [{ name: "Keanu Reeves", role: "John Wick" }, { name: "Michael Nyqvist", role: "Viggo Tarasov" }],
    awards: [],
    trailerUrl: "https://www.youtube.com/embed/C0BMx-qxsP4",
  },
  {
    id: 8, title: "Kantara", year: 2022, genre: ["Action", "Drama", "Thriller"], rating: 8.4,
    director: "Rishab Shetty", duration: "2h 28min", language: "Kannada",
    synopsis: "A Kambala champion locks horns with an upright forest officer in a land dispute, unraveling a mythological mystery.",
    poster: kantaraPoster, heroImage: kantaraPoster,
    budget: "₹25 Cr", boxOffice: "₹996 Cr",
    cast: [{ name: "Rishab Shetty", role: "Shiva" }, { name: "Sapthami Gowda", role: "Leela" }],
    awards: ["Best Feature Film - National Film Awards"],
    trailerUrl: "https://www.youtube.com/embed/GFVh4PFp3TM",
  },
  {
    id: 9, title: "Kung Fu Hustle", year: 2004, genre: ["Action", "Comedy", "Fantasy"], rating: 7.7,
    director: "Stephen Chow", duration: "1h 39min", language: "Cantonese",
    synopsis: "In 1940s Shanghai, a wannabe gangster aspires to join the notorious Axe Gang while residents of a slum fight back.",
    poster: kungfuHustlePoster, heroImage: kungfuHustlePoster,
    budget: "₹166 Cr", boxOffice: "₹847 Cr",
    cast: [{ name: "Stephen Chow", role: "Sing" }, { name: "Yuen Wah", role: "Landlord" }],
    awards: ["Best Film - Hong Kong Film Awards"],
    trailerUrl: "https://www.youtube.com/embed/i1tHu0F3VSo",
  },
  {
    id: 10, title: "Baramulla", year: 2024, genre: ["Thriller", "Drama"], rating: 7.5,
    director: "Aditya Suhas Jambhale", duration: "Series", language: "Hindi",
    synopsis: "A gripping thriller set in the conflict zone of Baramulla, exploring the lives caught between duty and survival.",
    poster: baramulla2Poster, heroImage: baramulla2Poster,
    budget: "₹66 Cr", boxOffice: "N/A",
    cast: [{ name: "Unknown", role: "Lead" }],
    awards: [],
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 11, title: "The Karate Kid", year: 1984, genre: ["Drama", "Family", "Sport"], rating: 7.3,
    director: "John G. Avildsen", duration: "2h 6min", language: "English",
    synopsis: "A martial arts master teaches a bullied teen to defend himself and compete in a tournament.",
    poster: karateKidPoster, heroImage: karateKidPoster,
    budget: "₹66 Cr", boxOffice: "₹755 Cr",
    cast: [{ name: "Ralph Macchio", role: "Daniel LaRusso" }, { name: "Pat Morita", role: "Mr. Miyagi" }],
    awards: ["Best Supporting Actor - Academy Awards (Nominated)"],
    trailerUrl: "https://www.youtube.com/embed/Bg21M2zwG9Q",
  },
  {
    id: 12, title: "The Meg", year: 2018, genre: ["Action", "Sci-Fi", "Horror"], rating: 5.6,
    director: "Jon Turteltaub", duration: "1h 53min", language: "English",
    synopsis: "A deep-sea submersible is attacked by a massive creature, forcing a rescue diver to confront a 75-foot prehistoric shark.",
    poster: theMegPoster, heroImage: theMegPoster,
    budget: "₹1,079 Cr", boxOffice: "₹4,399 Cr",
    cast: [{ name: "Jason Statham", role: "Jonas Taylor" }, { name: "Li Bingbing", role: "Suyin" }],
    awards: [],
    trailerUrl: "https://www.youtube.com/embed/udm5jUA-2bs",
  },
  {
    id: 13, title: "Bhoot and Friends", year: 2010, genre: ["Comedy", "Horror", "Family"], rating: 5.8,
    director: "Ashu Trikha", duration: "1h 50min", language: "Hindi",
    synopsis: "A group of kids befriend a friendly ghost and go on an exciting adventure together.",
    poster: bhootPoster, heroImage: bhootPoster,
    budget: "₹17 Cr", boxOffice: "₹42 Cr",
    cast: [{ name: "Ishaan Khattar", role: "Lead Kid" }],
    awards: [],
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 14, title: "The Vampire Diaries", year: 2009, genre: ["Drama", "Fantasy", "Horror"], rating: 7.7,
    director: "Kevin Williamson", duration: "Series", language: "English",
    synopsis: "The lives, loves, dangers and disasters in the town of Mystic Falls, Virginia involving vampires, werewolves and witches.",
    poster: tvdPoster, heroImage: tvdPoster,
    budget: "₹25 Cr/ep", boxOffice: "N/A",
    cast: [{ name: "Nina Dobrev", role: "Elena Gilbert" }, { name: "Paul Wesley", role: "Stefan Salvatore" }, { name: "Ian Somerhalder", role: "Damon Salvatore" }],
    awards: ["People's Choice Award - Favorite Sci-Fi/Fantasy Show"],
    trailerUrl: "https://www.youtube.com/embed/uFPOb_p0tEo",
  },
  {
    id: 16, title: "Whiplash", year: 2014, genre: ["Drama", "Music"], rating: 8.5,
    director: "Damien Chazelle", duration: "1h 47min", language: "English",
    synopsis: "A promising young drummer enrolls at a cutthroat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing.",
    poster: whiplashPoster, heroImage: whiplashPoster,
    budget: "₹27 Cr", boxOffice: "₹407 Cr",
    cast: [{ name: "Miles Teller", role: "Andrew Neiman" }, { name: "J.K. Simmons", role: "Terence Fletcher" }],
    awards: ["Best Supporting Actor - Academy Awards", "Best Film Editing - Academy Awards", "Best Sound Mixing - Academy Awards"],
    trailerUrl: "https://www.youtube.com/embed/7d_jQycdQGo",
  },
  {
    id: 17, title: "Dhamaal", year: 2007, genre: ["Comedy", "Adventure"], rating: 7.0,
    director: "Indra Kumar", duration: "2h 36min", language: "Hindi",
    synopsis: "Four crazy friends overhear a dying criminal reveal the location of hidden treasure and embark on a hilarious race to find it first.",
    poster: dhamaalPoster, heroImage: dhamaalPoster,
    budget: "₹22 Cr", boxOffice: "₹54 Cr",
    cast: [{ name: "Sanjay Dutt", role: "Inspector Kabir" }, { name: "Arshad Warsi", role: "Adi" }, { name: "Riteish Deshmukh", role: "Roy" }, { name: "Javed Jaffrey", role: "Manav" }],
    awards: [],
    trailerUrl: "https://www.youtube.com/embed/rKDJsHCCYDw",
  },
  {
    id: 18, title: "Zodiac", year: 2007, genre: ["Crime", "Drama", "Mystery"], rating: 7.7,
    director: "David Fincher", duration: "2h 37min", language: "English",
    synopsis: "Between 1968 and 1983, a San Francisco cartoonist becomes an amateur detective obsessed with tracking down the Zodiac Killer.",
    poster: zodiacPoster, heroImage: zodiacPoster,
    budget: "₹540 Cr", boxOffice: "₹697 Cr",
    cast: [{ name: "Jake Gyllenhaal", role: "Robert Graysmith" }, { name: "Robert Downey Jr.", role: "Paul Avery" }, { name: "Mark Ruffalo", role: "Inspector David Toschi" }],
    awards: [],
    trailerUrl: "https://www.youtube.com/embed/yNncHPl1UEA",
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
    trailerUrl: "https://www.youtube.com/embed/znmZoVkCjpI",
  },
  {
    id: 102, title: "Andhadhun", year: 2018, genre: ["Crime", "Thriller", "Comedy"], rating: 8.3,
    director: "Sriram Raghavan", duration: "2h 19min", language: "Hindi",
    synopsis: "A series of mysterious events change the life of a blind pianist, who must now report a crime that he should technically know nothing of.",
    poster: andhadhunPoster, heroImage: andhadhunPoster,
    budget: "₹32 Cr", boxOffice: "₹456 Cr",
    cast: [{ name: "Ayushmann Khurrana", role: "Akash" }, { name: "Tabu", role: "Simi" }, { name: "Radhika Apte", role: "Sophie" }],
    awards: ["Best Hindi Film - National Film Awards", "Filmfare Award - Best Film"],
    trailerUrl: "https://www.youtube.com/embed/2iVYI1GLP_4",
  },
  {
    id: 103, title: "Interstellar", year: 2014, genre: ["Sci-Fi", "Drama"], rating: 8.6,
    director: "Christopher Nolan", duration: "2h 49min", language: "English",
    synopsis: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster: interstellarPoster, heroImage: interstellarPoster,
    budget: "₹1,370 Cr", boxOffice: "₹5,619 Cr",
    cast: [{ name: "Matthew McConaughey", role: "Cooper" }, { name: "Anne Hathaway", role: "Brand" }],
    awards: ["Best Visual Effects - Academy Awards"],
    trailerUrl: "https://www.youtube.com/embed/zSWdZVtXT7E",
  },
  {
    id: 104, title: "Rustom", year: 2016, genre: ["Crime", "Drama", "Thriller"], rating: 6.5,
    director: "Tinu Suresh Desai", duration: "2h 28min", language: "Hindi",
    synopsis: "A naval officer is accused of murdering his wife's lover. Inspired by true events, the trial becomes the most talked-about case in the country.",
    poster: rustomPoster, heroImage: rustomPoster,
    budget: "₹45 Cr", boxOffice: "₹218 Cr",
    cast: [{ name: "Akshay Kumar", role: "Rustom Pavri" }, { name: "Ileana D'Cruz", role: "Cynthia Pavri" }],
    awards: ["National Film Award - Best Film on Social Issues"],
    trailerUrl: "https://www.youtube.com/embed/7YnhjHhbKQY",
  },
  {
    id: 105, title: "Parasite", year: 2019, genre: ["Drama", "Thriller"], rating: 8.5,
    director: "Bong Joon-ho", duration: "2h 12min", language: "Korean",
    synopsis: "Greed and class discrimination threaten a symbiotic relationship between a wealthy family and a destitute one.",
    poster: parasitePoster, heroImage: parasitePoster,
    budget: "₹91 Cr", boxOffice: "₹2,183 Cr",
    cast: [{ name: "Song Kang-ho", role: "Kim Ki-taek" }, { name: "Choi Woo-shik", role: "Kim Ki-woo" }],
    awards: ["Best Picture - Academy Awards", "Best Director - Academy Awards"],
    trailerUrl: "https://www.youtube.com/embed/5xH0HfJHsaY",
  },
  {
    id: 106, title: "Golmaal: Fun Unlimited", year: 2006, genre: ["Comedy", "Drama"], rating: 7.1,
    director: "Rohit Shetty", duration: "2h 27min", language: "Hindi",
    synopsis: "Two groups of mischievous boys try to outsmart each other while living in a blind couple's house, leading to hilarious chaos.",
    poster: golmaalPoster, heroImage: golmaalPoster,
    budget: "₹13 Cr", boxOffice: "₹52 Cr",
    cast: [{ name: "Ajay Devgan", role: "Gopal" }, { name: "Arshad Warsi", role: "Laxman 1" }],
    awards: [],
    trailerUrl: "https://www.youtube.com/embed/IKUQEM7tKPg",
  },
  // Additional recommended movies for better genre-based matching
  {
    id: 201, title: "The Godfather", year: 1972, genre: ["Crime", "Drama"], rating: 9.2,
    director: "Francis Ford Coppola", duration: "2h 55min", language: "English",
    synopsis: "The aging patriarch of an organized crime dynasty transfers control to his reluctant youngest son.",
    poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg", heroImage: "",
    budget: "₹50 Cr", boxOffice: "₹2,250 Cr",
    cast: [{ name: "Marlon Brando", role: "Don Vito Corleone" }, { name: "Al Pacino", role: "Michael Corleone" }],
    awards: ["Best Picture - Academy Awards", "Best Actor - Academy Awards"],
    trailerUrl: "https://www.youtube.com/embed/UaVTIH8mujA",
  },
  {
    id: 202, title: "Spirited Away", year: 2001, genre: ["Animation", "Adventure", "Fantasy"], rating: 8.6,
    director: "Hayao Miyazaki", duration: "2h 5min", language: "Japanese",
    synopsis: "During her family's move, a young girl enters a world ruled by gods, witches, and spirits where humans are changed into beasts.",
    poster: "https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg", heroImage: "",
    budget: "₹155 Cr", boxOffice: "₹2,740 Cr",
    cast: [{ name: "Rumi Hiiragi", role: "Chihiro" }, { name: "Miyu Irino", role: "Haku" }],
    awards: ["Best Animated Feature - Academy Awards", "Golden Bear - Berlin Film Festival"],
    trailerUrl: "https://www.youtube.com/embed/ByXuk9QqQkk",
  },
  {
    id: 203, title: "The Matrix", year: 1999, genre: ["Action", "Sci-Fi"], rating: 8.7,
    director: "The Wachowskis", duration: "2h 16min", language: "English",
    synopsis: "A computer hacker learns about the true nature of his reality and his role in the war against its controllers.",
    poster: matrixPoster, heroImage: "",
    budget: "₹520 Cr", boxOffice: "₹3,738 Cr",
    cast: [{ name: "Keanu Reeves", role: "Neo" }, { name: "Laurence Fishburne", role: "Morpheus" }],
    awards: ["Best Visual Effects - Academy Awards", "Best Film Editing - Academy Awards"],
    trailerUrl: "https://www.youtube.com/embed/vKQi3bBA1y8",
  },
  {
    id: 204, title: "Dangal", year: 2016, genre: ["Drama", "Sports", "Biography"], rating: 8.4,
    director: "Nitesh Tiwari", duration: "2h 41min", language: "Hindi",
    synopsis: "Former wrestler Mahavir Singh Phogat trains his daughters to become India's first world-class female wrestlers.",
    poster: "https://m.media-amazon.com/images/M/MV5BMTQ4MzQzMzM2Nl5BMl5BanBnXkFtZTgwMTQ1NzU3MDI@._V1_.jpg", heroImage: "",
    budget: "₹70 Cr", boxOffice: "₹2,024 Cr",
    cast: [{ name: "Aamir Khan", role: "Mahavir Singh Phogat" }, { name: "Fatima Sana Shaikh", role: "Geeta Phogat" }],
    awards: ["Filmfare Award - Best Film", "National Film Award - Best Action Direction"],
    trailerUrl: "https://www.youtube.com/embed/x_7YlGv9u1g",
  },
  {
    id: 205, title: "Gladiator", year: 2000, genre: ["Action", "Drama", "Adventure"], rating: 8.5,
    director: "Ridley Scott", duration: "2h 35min", language: "English",
    synopsis: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family.",
    poster: "https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg", heroImage: "",
    budget: "₹912 Cr", boxOffice: "₹3,810 Cr",
    cast: [{ name: "Russell Crowe", role: "Maximus" }, { name: "Joaquin Phoenix", role: "Commodus" }],
    awards: ["Best Picture - Academy Awards", "Best Actor - Academy Awards"],
    trailerUrl: "https://www.youtube.com/embed/owK1qxDselE",
  },
  {
    id: 206, title: "3 Idiots", year: 2009, genre: ["Comedy", "Drama"], rating: 8.4,
    director: "Rajkumar Hirani", duration: "2h 50min", language: "Hindi",
    synopsis: "Two friends search for their long-lost companion, recounting their college days and adventures along the way.",
    poster: "https://m.media-amazon.com/images/M/MV5BNTkyOGVjMGEtNmQzZi00NzFlLTlhOWQtODYyMDc2ZGJmYzFhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg", heroImage: "",
    budget: "₹55 Cr", boxOffice: "₹460 Cr",
    cast: [{ name: "Aamir Khan", role: "Rancho" }, { name: "R. Madhavan", role: "Farhan" }, { name: "Sharman Joshi", role: "Raju" }],
    awards: ["Filmfare Award - Best Film", "National Film Award - Best Popular Film"],
    trailerUrl: "https://www.youtube.com/embed/K0eDlFX9GMc",
  },
  {
    id: 207, title: "The Conjuring", year: 2013, genre: ["Horror", "Mystery", "Thriller"], rating: 7.5,
    director: "James Wan", duration: "1h 52min", language: "English",
    synopsis: "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.",
    poster: "https://m.media-amazon.com/images/M/MV5BMTM3NjA1NDMyMV5BMl5BanBnXkFtZTcwMDQzNDMzOQ@@._V1_.jpg", heroImage: "",
    budget: "₹164 Cr", boxOffice: "₹2,630 Cr",
    cast: [{ name: "Vera Farmiga", role: "Lorraine Warren" }, { name: "Patrick Wilson", role: "Ed Warren" }],
    awards: [],
    trailerUrl: "https://www.youtube.com/embed/k10ETZ41q5o",
  },
  {
    id: 208, title: "Forrest Gump", year: 1994, genre: ["Drama", "Romance"], rating: 8.8,
    director: "Robert Zemeckis", duration: "2h 22min", language: "English",
    synopsis: "The presidencies of Kennedy and Johnson through Vietnam and Watergate, as seen through the eyes of an Alabama man with a low IQ.",
    poster: forrestGumpPoster, heroImage: "",
    budget: "₹460 Cr", boxOffice: "₹5,700 Cr",
    cast: [{ name: "Tom Hanks", role: "Forrest Gump" }, { name: "Robin Wright", role: "Jenny Curran" }],
    awards: ["Best Picture - Academy Awards", "Best Actor - Academy Awards", "Best Director - Academy Awards"],
    trailerUrl: "https://www.youtube.com/embed/bLvqoHBptjg",
  },
  {
    id: 209, title: "Tumbbad", year: 2018, genre: ["Horror", "Fantasy", "Drama"], rating: 8.2,
    director: "Rahi Anil Barve", duration: "1h 44min", language: "Hindi",
    synopsis: "A mythological story about a village cursed by a goddess. A greedy ancestor builds a shrine for the first born and his descendants look for the hidden treasure.",
    poster: tumbbadPoster, heroImage: "",
    budget: "₹5 Cr", boxOffice: "₹36 Cr",
    cast: [{ name: "Sohum Shah", role: "Vinayak Rao" }, { name: "Jyoti Malshe", role: "Vinayak's Mother" }],
    awards: ["Filmfare Award - Best Art Direction"],
    trailerUrl: "https://www.youtube.com/embed/sN75MPxgvX8",
  },
  {
    id: 210, title: "Jurassic Park", year: 1993, genre: ["Action", "Adventure", "Sci-Fi"], rating: 8.2,
    director: "Steven Spielberg", duration: "2h 7min", language: "English",
    synopsis: "A pragmatic paleontologist touring an almost complete theme park is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose.",
    poster: "https://m.media-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_.jpg", heroImage: "",
    budget: "₹520 Cr", boxOffice: "₹8,360 Cr",
    cast: [{ name: "Sam Neill", role: "Dr. Alan Grant" }, { name: "Laura Dern", role: "Dr. Ellie Sattler" }],
    awards: ["Best Visual Effects - Academy Awards", "Best Sound - Academy Awards"],
    trailerUrl: "https://www.youtube.com/embed/QWBKEmWWL38",
  },
  {
    id: 211, title: "Phir Hera Pheri", year: 2006, genre: ["Comedy", "Drama"], rating: 7.6,
    director: "Neeraj Vora", duration: "2h 35min", language: "Hindi",
    synopsis: "Raju, Shyam, and Baburao get into another misadventure when they invest in a get-rich-quick scheme that goes hilariously wrong.",
    poster: phirHeraPheriPhoto, heroImage: "",
    budget: "₹25 Cr", boxOffice: "₹75 Cr",
    cast: [{ name: "Akshay Kumar", role: "Raju" }, { name: "Paresh Rawal", role: "Baburao" }, { name: "Suniel Shetty", role: "Shyam" }],
    awards: ["Stardust Award - Best Comedy Film"],
    trailerUrl: "https://www.youtube.com/embed/eiMScIkehmw",
  },
  {
    id: 212, title: "Arrival", year: 2016, genre: ["Sci-Fi", "Drama", "Mystery"], rating: 7.9,
    director: "Denis Villeneuve", duration: "1h 56min", language: "English",
    synopsis: "A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.",
    poster: "https://m.media-amazon.com/images/M/MV5BMTExMzU0ODcxNDheQTJeQWpwZ15BbWU4MDE1OTI4MzAy._V1_.jpg", heroImage: "",
    budget: "₹384 Cr", boxOffice: "₹1,580 Cr",
    cast: [{ name: "Amy Adams", role: "Dr. Louise Banks" }, { name: "Jeremy Renner", role: "Ian Donnelly" }],
    awards: ["Best Sound Editing - Academy Awards"],
    trailerUrl: "https://www.youtube.com/embed/tFMo3UJ4B4g",
  },
];

export const actors: Actor[] = [
  {
    id: 1, name: "Christian Bale", nationality: "British-American", dob: "1974-01-30", age: 50, gender: "Male",
    biography: "Christian Bale is a British-American actor known for his incredible physical transformations and intense method acting. He is acclaimed for his roles in The Dark Knight trilogy, American Psycho, The Machinist, and Ford v Ferrari.",
    photo: christianBalePhoto,
    awardsCount: 8,
    knownFor: ["The Dark Knight", "American Psycho", "The Machinist", "Ford v Ferrari"],
    filmography: [
      { title: "The Dark Knight", year: 2008, role: "Bruce Wayne / Batman" },
      { title: "American Psycho", year: 2000, role: "Patrick Bateman" },
      { title: "The Machinist", year: 2004, role: "Trevor Reznik" },
      { title: "Ford v Ferrari", year: 2019, role: "Ken Miles" },
    ],
    awards: ["Best Supporting Actor - Academy Awards (The Fighter)", "Golden Globe - Best Actor", "SAG Award"],
  },
  {
    id: 2, name: "Puneeth Rajkumar", nationality: "Indian", dob: "1975-03-17", age: 46, gender: "Male",
    biography: "Puneeth Rajkumar, fondly known as 'Appu' and 'Power Star', was one of Kannada cinema's most beloved actors. Son of legendary actor Dr. Rajkumar, he was known for his energy, dance moves, and philanthropic work.",
    photo: puneethRajkumarPhoto,
    awardsCount: 10,
    knownFor: ["Yuvarathnaa", "James", "Raajakumara", "Anjani Putra"],
    filmography: [
      { title: "James", year: 2022, role: "James" },
      { title: "Yuvarathnaa", year: 2021, role: "Arjun" },
      { title: "Raajakumara", year: 2017, role: "Appu" },
      { title: "Anjani Putra", year: 2017, role: "Anjani Putra" },
    ],
    awards: ["Karnataka State Film Award - Best Actor", "Filmfare South - Best Actor", "National Film Award - Best Child Actor"],
  },
  {
    id: 3, name: "Kangana Ranaut", nationality: "Indian", dob: "1987-03-23", age: 37, gender: "Female",
    biography: "Kangana Ranaut is an acclaimed Indian actress known for her bold personality and powerful performances. She has won multiple National Film Awards and is celebrated for roles in Queen, Tanu Weds Manu, and Manikarnika.",
    photo: kanganaRanautPhoto,
    awardsCount: 11,
    knownFor: ["Queen", "Tanu Weds Manu", "Manikarnika", "Thalaivii"],
    filmography: [
      { title: "Queen", year: 2014, role: "Rani Mehra" },
      { title: "Tanu Weds Manu Returns", year: 2015, role: "Tanu / Kusum" },
      { title: "Manikarnika", year: 2019, role: "Rani Laxmibai" },
      { title: "Thalaivii", year: 2021, role: "J. Jayalalithaa" },
    ],
    awards: ["National Film Award - Best Actress (3 times)", "Filmfare Award - Best Actress", "Padma Shri"],
  },
  {
    id: 4, name: "Yash", nationality: "Indian", dob: "1986-01-08", age: 38, gender: "Male",
    biography: "Yash is an Indian actor who became a pan-India superstar with the KGF franchise. Known as 'Rocking Star', he is one of the biggest names in Kannada and Indian cinema.",
    photo: yashPhoto,
    awardsCount: 7,
    knownFor: ["KGF: Chapter 1", "KGF: Chapter 2", "Mr. and Mrs. Ramachari", "Googly"],
    filmography: [
      { title: "KGF: Chapter 2", year: 2022, role: "Rocky" },
      { title: "KGF: Chapter 1", year: 2018, role: "Rocky" },
      { title: "Mr. and Mrs. Ramachari", year: 2014, role: "Ramachari" },
      { title: "Googly", year: 2013, role: "Sharath" },
    ],
    awards: ["Filmfare South - Best Actor", "SIIMA Award - Best Actor", "Karnataka State Film Award"],
  },
  {
    id: 5, name: "Cate Blanchett", nationality: "Australian", dob: "1969-05-14", age: 55, gender: "Female",
    biography: "Cate Blanchett is an Australian actress and one of the most decorated performers of her generation. She has won two Academy Awards and is known for her roles in The Lord of the Rings, Blue Jasmine, and Tár.",
    photo: cateBlanchettPhoto,
    awardsCount: 14,
    knownFor: ["The Lord of the Rings", "Blue Jasmine", "Tár", "Carol"],
    filmography: [
      { title: "Tár", year: 2022, role: "Lydia Tár" },
      { title: "Blue Jasmine", year: 2013, role: "Jasmine" },
      { title: "The Lord of the Rings", year: 2001, role: "Galadriel" },
      { title: "Carol", year: 2015, role: "Carol Aird" },
    ],
    awards: ["Best Actress - Academy Awards (Blue Jasmine)", "Best Supporting Actress - Academy Awards (The Aviator)", "BAFTA - Best Actress"],
  },
  {
    id: 6, name: "Priyanka Chopra", nationality: "Indian", dob: "1982-07-18", age: 42, gender: "Female",
    biography: "Priyanka Chopra Jonas is an Indian actress, singer, and producer who has become a global icon. From Bollywood blockbusters to Hollywood projects like Quantico, she is one of India's most recognized faces worldwide.",
    photo: priyankaChopraPhoto,
    awardsCount: 12,
    knownFor: ["Barfi!", "Mary Kom", "Bajirao Mastani", "Quantico"],
    filmography: [
      { title: "Barfi!", year: 2012, role: "Jhilmil" },
      { title: "Mary Kom", year: 2014, role: "Mary Kom" },
      { title: "Bajirao Mastani", year: 2015, role: "Kashibai" },
      { title: "The White Tiger", year: 2021, role: "Pinky Madam" },
    ],
    awards: ["National Film Award - Best Actress", "Filmfare Award - Best Actress", "Padma Shri"],
  },
  {
    id: 7, name: "Deepika Padukone", nationality: "Indian", dob: "1986-01-05", age: 38, gender: "Female",
    biography: "Deepika Padukone is one of India's highest-paid actresses, known for her stunning performances in Padmaavat, Piku, and Chennai Express. She is also a mental health advocate and global fashion icon.",
    photo: deepikaPadukonePhoto,
    awardsCount: 10,
    knownFor: ["Padmaavat", "Piku", "Chennai Express", "Bajirao Mastani"],
    filmography: [
      { title: "Padmaavat", year: 2018, role: "Rani Padmavati" },
      { title: "Piku", year: 2015, role: "Piku Banerjee" },
      { title: "Chennai Express", year: 2013, role: "Meenamma" },
      { title: "Bajirao Mastani", year: 2015, role: "Mastani" },
    ],
    awards: ["Filmfare Award - Best Actress (3 times)", "IIFA Award - Best Actress", "Time 100 Most Influential"],
  },
  {
    id: 8, name: "Rishab Shetty", nationality: "Indian", dob: "1983-11-09", age: 41, gender: "Male",
    biography: "Rishab Shetty is an Indian actor, director, and writer who gained massive recognition with Kantara. A multifaceted talent in Kannada cinema, he is known for his rooted storytelling and powerful screen presence.",
    photo: rishabShettyPhoto,
    awardsCount: 8,
    knownFor: ["Kantara", "Bell Bottom", "Kirik Party", "Sarkari Hi. Pra. Shaale"],
    filmography: [
      { title: "Kantara", year: 2022, role: "Shiva" },
      { title: "Bell Bottom", year: 2019, role: "Divakara" },
      { title: "Sarkari Hi. Pra. Shaale", year: 2018, role: "Director/Writer" },
    ],
    awards: ["National Film Award - Best Feature Film (Kantara)", "Karnataka State Award - Best Director", "Filmfare South - Best Actor"],
  },
  {
    id: 9, name: "Shah Rukh Khan", nationality: "Indian", dob: "1965-11-02", age: 59, gender: "Male",
    biography: "Shah Rukh Khan, known as the 'King of Bollywood', is one of the most successful film stars in the world. With iconic films spanning three decades, he has won countless hearts with his charm and versatility.",
    photo: srkPhoto,
    awardsCount: 20,
    knownFor: ["Dilwale Dulhania Le Jayenge", "Pathaan", "Jawan", "Swades"],
    filmography: [
      { title: "Pathaan", year: 2023, role: "Pathaan" },
      { title: "Jawan", year: 2023, role: "Vikram Rathore" },
      { title: "Dilwale Dulhania Le Jayenge", year: 1995, role: "Raj Malhotra" },
      { title: "Swades", year: 2004, role: "Mohan Bhargava" },
    ],
    awards: ["Filmfare Award - Best Actor (8 times)", "Padma Shri", "Ordre des Arts et des Lettres"],
  },
  {
    id: 10, name: "Manoj Bajpayee", nationality: "Indian", dob: "1969-04-23", age: 55, gender: "Male",
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
    id: 11, name: "Vidya Balan", nationality: "Indian", dob: "1978-01-01", age: 46, gender: "Female",
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
    id: 12, name: "Emma Watson", nationality: "British", dob: "1990-04-15", age: 34, gender: "Female",
    biography: "Emma Watson is a British actress and activist best known for her role as Hermione Granger in the Harry Potter franchise. She is also a UN Women Goodwill Ambassador and advocate for gender equality.",
    photo: emmaWatsonPhoto,
    awardsCount: 8,
    knownFor: ["Harry Potter", "Beauty and the Beast", "The Perks of Being a Wallflower", "Little Women"],
    filmography: [
      { title: "Harry Potter and the Deathly Hallows", year: 2011, role: "Hermione Granger" },
      { title: "Beauty and the Beast", year: 2017, role: "Belle" },
      { title: "Little Women", year: 2019, role: "Meg March" },
      { title: "The Perks of Being a Wallflower", year: 2012, role: "Sam" },
    ],
    awards: ["MTV Movie Award - Best Female Performance", "British Artist of the Year", "Teen Choice Award"],
  },
  {
    id: 13, name: "Leonardo DiCaprio", nationality: "American", dob: "1974-11-11", age: 50, gender: "Male",
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
    id: 14, name: "Alia Bhatt", nationality: "Indian", dob: "1993-03-15", age: 31, gender: "Female",
    biography: "Alia Bhatt is one of the most talented and versatile actresses in Indian cinema. Known for her powerful performances in Highway, Raazi, and Gangubai Kathiawadi, she has established herself as a leading star.",
    photo: aliaBhattPhoto,
    awardsCount: 9,
    knownFor: ["Raazi", "Gangubai Kathiawadi", "Highway", "Gully Boy"],
    filmography: [
      { title: "Gangubai Kathiawadi", year: 2022, role: "Gangubai" },
      { title: "RRR", year: 2022, role: "Sita" },
      { title: "Raazi", year: 2018, role: "Sehmat Khan" },
      { title: "Highway", year: 2014, role: "Veera Tripathi" },
    ],
    awards: ["Filmfare Award - Best Actress (multiple)", "IIFA Award - Best Actress", "National Film Award - Special Jury"],
  },
  {
    id: 15, name: "Ranbir Kapoor", nationality: "Indian", dob: "1982-09-28", age: 42, gender: "Male",
    biography: "Ranbir Kapoor is an Indian actor from the legendary Kapoor family. Known for his nuanced performances in Rockstar, Barfi!, and Animal, he is one of Bollywood's most talented leading men.",
    photo: ranbirKapoorPhoto,
    awardsCount: 8,
    knownFor: ["Rockstar", "Barfi!", "Animal", "Sanju"],
    filmography: [
      { title: "Animal", year: 2023, role: "Ranvijay Singh" },
      { title: "Brahmastra", year: 2022, role: "Shiva" },
      { title: "Sanju", year: 2018, role: "Sanjay Dutt" },
      { title: "Barfi!", year: 2012, role: "Murphy 'Barfi' Johnson" },
    ],
    awards: ["Filmfare Award - Best Actor (multiple)", "IIFA Award - Best Actor", "Star Screen Award"],
  },
  {
    id: 16, name: "Amitabh Bachchan", nationality: "Indian", dob: "1942-10-11", age: 82, gender: "Male",
    biography: "Amitabh Bachchan, the 'Shahenshah of Bollywood', is one of the most influential actors in the history of Indian cinema. With a career spanning over five decades, he remains an iconic figure globally.",
    photo: amitabhBachchanPhoto,
    awardsCount: 25,
    knownFor: ["Sholay", "Deewar", "Don", "Piku"],
    filmography: [
      { title: "Piku", year: 2015, role: "Bhaskor Banerjee" },
      { title: "Black", year: 2005, role: "Debraj Sahai" },
      { title: "Sholay", year: 1975, role: "Jai" },
      { title: "Deewar", year: 1975, role: "Vijay Verma" },
    ],
    awards: ["National Film Award - Best Actor (4 times)", "Padma Vibhushan", "Dadasaheb Phalke Award"],
  },
  {
    id: 17, name: "Tom Hanks", nationality: "American", dob: "1956-07-09", age: 68, gender: "Male",
    biography: "Tom Hanks is an American actor and filmmaker regarded as one of the greatest actors of all time. Known for Forrest Gump, Cast Away, and Saving Private Ryan, he has won two consecutive Academy Awards.",
    photo: tomHanksPhoto,
    awardsCount: 18,
    knownFor: ["Forrest Gump", "Cast Away", "Saving Private Ryan", "The Green Mile"],
    filmography: [
      { title: "A Man Called Otto", year: 2022, role: "Otto Anderson" },
      { title: "Forrest Gump", year: 1994, role: "Forrest Gump" },
      { title: "Cast Away", year: 2000, role: "Chuck Noland" },
      { title: "Saving Private Ryan", year: 1998, role: "Captain Miller" },
    ],
    awards: ["Best Actor - Academy Awards (2 times)", "Presidential Medal of Freedom", "Kennedy Center Honors"],
  },
  {
    id: 18, name: "Meryl Streep", nationality: "American", dob: "1949-06-22", age: 75, gender: "Female",
    biography: "Meryl Streep is widely regarded as the greatest actress of her generation. With a record 21 Academy Award nominations and 3 wins, she is the most decorated actress in Hollywood history.",
    photo: merylStreepPhoto,
    awardsCount: 22,
    knownFor: ["The Devil Wears Prada", "Sophie's Choice", "Mamma Mia!", "The Iron Lady"],
    filmography: [
      { title: "Don't Look Up", year: 2021, role: "President Orlean" },
      { title: "The Iron Lady", year: 2011, role: "Margaret Thatcher" },
      { title: "The Devil Wears Prada", year: 2006, role: "Miranda Priestly" },
      { title: "Sophie's Choice", year: 1982, role: "Sophie" },
    ],
    awards: ["Best Actress - Academy Awards (3 times)", "Presidential Medal of Freedom", "Golden Globe Cecil B. DeMille Award"],
  },
  {
    id: 19, name: "Akshay Kumar", nationality: "Indian", dob: "1967-09-09", age: 57, gender: "Male",
    biography: "Akshay Kumar is one of the most prolific and commercially successful actors in Indian cinema. Known for his action roles and patriotic films, he has delivered numerous blockbusters across genres.",
    photo: akshayKumarPhoto,
    awardsCount: 13,
    knownFor: ["Rustom", "Hera Pheri", "Airlift", "Padman"],
    filmography: [
      { title: "Rustom", year: 2016, role: "Rustom Pavri" },
      { title: "Airlift", year: 2016, role: "Ranjit Katyal" },
      { title: "Hera Pheri", year: 2000, role: "Raju" },
      { title: "Padman", year: 2018, role: "Lakshmikant Chauhan" },
    ],
    awards: ["National Film Award - Best Actor", "Padma Shri", "Filmfare Award - Best Actor"],
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
