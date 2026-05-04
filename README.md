# 🎬 Movie & Actor Database

A relational database schema for managing movies, actors, awards, social links, and curated social walls.

---

## 📦 Tables Overview

| Table | Description |
|---|---|
| `movies` | Core movie records with metadata, financials, and ratings |
| `actors` | Actor profiles with biographical and career information |
| `movie_cast` | Join table linking actors to movies with their role |
| `awards` | Award records tied to movies and/or actors |
| `social_links` | Social media profile links per actor |
| `social_wall` | Curated wall featuring an actor alongside up to 4 movies |

---

## 🗂️ Schema

### `movies`

| Column | Type | Description |
|---|---|---|
| `id` | `uuid` | Primary key |
| `title` | `text` | Movie title |
| `director` | `text` | Director's name |
| `year` | `integer` | Release year |
| `duration` | `text` | Runtime (e.g. "2h 15m") |
| `language` | `text` | Primary language |
| `synopsis` | `text` | Short plot summary |
| `budget_cr` | `numeric` | Budget in crores |
| `box_office_cr` | `numeric` | Box office collection in crores |
| `poster_url` | `text` | URL to movie poster image |
| `trailer_url` | `text` | URL to trailer |
| `imdb_id` | `text` | IMDb identifier |
| `imdb_url` | `text` | IMDb page URL |
| `genres` | `ARRAY` | Array of genre strings |
| `rating` | `numeric` | Movie rating score |
| `created_at` | `timestamptz` | Record creation timestamp |
| `updated_at` | `timestamptz` | Record update timestamp |

---

### `actors`

| Column | Type | Description |
|---|---|---|
| `id` | `uuid` | Primary key |
| `name` | `text` | Full name |
| `nationality` | `text` | Country of nationality |
| `date_of_birth` | `date` | Date of birth |
| `place_of_birth` | `text` | Birthplace |
| `gender` | `text` | Gender |
| `height_cm` | `integer` | Height in centimetres |
| `primary_role` | `text` | Primary role (e.g. Actor, Director) |
| `active_from` | `integer` | Year career began |
| `active_to` | `integer` | Year career ended (null if active) |
| `biography` | `text` | Long-form biography |
| `photo_url` | `text` | URL to actor photo |
| `imdb_id` | `text` | IMDb identifier |
| `created_at` | `timestamptz` | Record creation timestamp |
| `updated_at` | `timestamptz` | Record update timestamp |

---

### `movie_cast`

Join table connecting actors to movies.

| Column | Type | Description |
|---|---|---|
| `id` | `uuid` | Primary key |
| `movie_id` | `uuid` | FK → `movies.id` |
| `actor_id` | `uuid` | FK → `actors.id` |
| `role` | `text` | Character name or role description |
| `created_at` | `timestamptz` | Record creation timestamp |

---

### `awards`

| Column | Type | Description |
|---|---|---|
| `id` | `uuid` | Primary key |
| `movie_id` | `uuid` | FK → `movies.id` (nullable) |
| `actor_id` | `uuid` | FK → `actors.id` (nullable) |
| `name` | `text` | Award name (e.g. Filmfare, BAFTA) |
| `category` | `text` | Award category (e.g. Best Actor) |
| `year` | `integer` | Year of award |
| `result` | `text` | Outcome (e.g. Won, Nominated) |

---

### `social_links`

| Column | Type | Description |
|---|---|---|
| `id` | `uuid` | Primary key |
| `actor_id` | `uuid` | FK → `actors.id` |
| `platform` | `text` | Platform name (e.g. Instagram, Twitter) |
| `url` | `text` | Profile URL |

---

### `social_wall`

A curated wall entry featuring an actor alongside up to 4 movies.

| Column | Type | Description |
|---|---|---|
| `id` | `uuid` | Primary key |
| `user_name` | `text` | Wall owner's username |
| `actor_id` | `uuid` | FK → `actors.id` |
| `movie_1_id` | `uuid` | FK → `movies.id` |
| `movie_2_id` | `uuid` | FK → `movies.id` (nullable) |
| `movie_3_id` | `uuid` | FK → `movies.id` (nullable) |
| `movie_4_id` | `uuid` | FK → `movies.id` (nullable) |
| `created_at` | `timestamptz` | Record creation timestamp |

---

## 🔗 Relationships

```
movies ──< movie_cast >── actors
movies ──< awards
actors ──< awards
actors ──< social_links
actors ──< social_wall
movies ──< social_wall (via movie_1_id … movie_4_id)
```

- A **movie** can have many **cast members**; an **actor** can appear in many **movies** (many-to-many via `movie_cast`)
- **Awards** can reference a movie, an actor, or both
- Each **actor** can have multiple **social links** across platforms
- A **social wall** entry is pinned to one actor and features up to 4 movies

---

## 🚀 Getting Started

1. Run the schema migrations to create all tables
2. Seed `movies` and `actors` first (no foreign key dependencies)
3. Populate `movie_cast` to link actors and movies
4. Add `awards`, `social_links`, and `social_wall` entries as needed

---

## 📝 Notes

- All monetary values (`budget_cr`, `box_office_cr`) are stored in **Indian Rupees (crores)**
- `active_to` is `null` for currently active actors
- `genres` is stored as a PostgreSQL array — query with `ANY` or `@>` operators
- `movie_2_id` through `movie_4_id` on `social_wall` are optional (nullable)
