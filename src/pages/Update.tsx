import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import PiracyFooter from "@/components/PiracyFooter";
import { supabase } from "@/lib/supabase";

const genres = ["Action","Adventure","Comedy","Crime","Drama","Fantasy","History","Horror","Mystery","Romance","Sci-Fi","Thriller","War"];
const languages = ["English","French","Japanese","Arabic","Spanish","Korean","Hindi","German","Kannada","Cantonese"];

interface MovieForm {
  title: string;
  director: string;
  year: string;
  duration: string;
  language: string;
  synopsis: string;
  budget_cr: string;
  box_office_cr: string;
  poster_url: string;
}

interface ActorForm {
  name: string;
  nationality: string;
  date_of_birth: string;
  gender: string;
  biography: string;
  photo_url: string;
}

interface ExistingActor {
  id: string;
  name: string;
}

interface SelectedMovieActor {
  actor_id: string;
  name: string;
  role: string;
}

const defaultMovie: MovieForm = {
  title: "", director: "", year: "", duration: "",
  language: "", synopsis: "", budget_cr: "", box_office_cr: "", poster_url: "",
};

const defaultActor: ActorForm = {
  name: "", nationality: "", date_of_birth: "", gender: "", biography: "", photo_url: "",
};

export default function Update() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [movieForm, setMovieForm] = useState<MovieForm>(defaultMovie);
  const [actorForm, setActorForm] = useState<ActorForm>(defaultActor);
  const [actorOptions, setActorOptions] = useState<ExistingActor[]>([]);
  const [selectedMovieActors, setSelectedMovieActors] = useState<SelectedMovieActor[]>([]);
  const [actorSearch, setActorSearch] = useState("");
  const [selectedActor, setSelectedActor] = useState<ExistingActor | null>(null);
  const [actorRole, setActorRole] = useState("");
  const [loadingActors, setLoadingActors] = useState(false);
  const [savingMovie, setSavingMovie] = useState(false);
  const [savingActor, setSavingActor] = useState(false);

  useEffect(() => {
    async function fetchActors() {
      const query = actorSearch.trim();
      if (query.length < 1) {
        setActorOptions([]);
        setLoadingActors(false);
        return;
      }

      setLoadingActors(true);
      const { data, error } = await supabase
        .from("actors")
        .select("id, name")
        .ilike("name", `%${query}%`)
        .order("name")
        .limit(20);

      if (error) {
        toast.error("Failed to load actors");
        setLoadingActors(false);
        return;
      }

      setActorOptions((data as ExistingActor[]) ?? []);
      setLoadingActors(false);
    }

    const timeoutId = setTimeout(fetchActors, 250);
    return () => clearTimeout(timeoutId);
  }, [actorSearch]);

  const toggleGenre = (g: string) => {
    setSelectedGenres((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    );
  };

  const handleMovieChange = (field: keyof MovieForm, value: string) => {
    setMovieForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleActorChange = (field: keyof ActorForm, value: string) => {
    setActorForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveMovie = async () => {
    if (!movieForm.title.trim()) {
      toast.error("Title is required");
      return;
    }
    setSavingMovie(true);
    try {
      const payload = {
        title: movieForm.title.trim(),
        director: movieForm.director || null,
        year: movieForm.year ? parseInt(movieForm.year) : null,
        duration: movieForm.duration || null,
        language: movieForm.language || null,
        synopsis: movieForm.synopsis || null,
        budget_cr: movieForm.budget_cr ? parseFloat(movieForm.budget_cr) : null,
        box_office_cr: movieForm.box_office_cr ? parseFloat(movieForm.box_office_cr) : null,
        poster_url: movieForm.poster_url || null,
        genres: selectedGenres.length > 0 ? selectedGenres : null,
      };

      // After successful movie insert, you get back the new movie's id:
      const { data: inserted, error } = await supabase
      .from("movies")
      .insert(payload)
      .select("id")
      .single();
      if (error) throw error;

      if (selectedMovieActors.length > 0) {
        // Safety guard: keep only one entry per actor before inserting cast rows.
        const uniqueActors = selectedMovieActors.filter(
          (item, index, arr) => arr.findIndex((a) => a.actor_id === item.actor_id) === index
        );

        const castPayload = uniqueActors.map((item) => ({
          movie_id: inserted.id,
          actor_id: item.actor_id,
          role: item.role || null,
        }));

        const { error: castError } = await supabase
          .from("movie_cast")
          .insert(castPayload);

        if (castError) throw castError;
      }

      toast.success(
        selectedMovieActors.length > 0
          ? `Movie saved with ${selectedMovieActors.length} actor(s)!`
          : "Movie saved successfully!"
      );
      setMovieForm(defaultMovie);
      setSelectedGenres([]);
      setSelectedMovieActors([]);
      setActorSearch("");
      setSelectedActor(null);
      setActorRole("");
    } catch (err: any) {
      toast.error(err.message || "Failed to save movie");
    } finally {
      setSavingMovie(false);
    }
  };

  const handleSaveActor = async () => {
    if (!actorForm.name.trim()) {
      toast.error("Name is required");
      return;
    }
    setSavingActor(true);
    try {
      const payload = {
        name: actorForm.name.trim(),
        nationality: actorForm.nationality || null,
        date_of_birth: actorForm.date_of_birth || null,
        gender: actorForm.gender || null,
        biography: actorForm.biography || null,
        photo_url: actorForm.photo_url || null,
      };

      const { error } = await supabase.from("actors").insert(payload);
      if (error) throw error;

      toast.success("Actor saved successfully!");
      setActorForm(defaultActor);
    } catch (err: any) {
      toast.error(err.message || "Failed to save actor");
    } finally {
      setSavingActor(false);
    }
  };

  const handleClearMovie = () => {
    setMovieForm(defaultMovie);
    setSelectedGenres([]);
    setSelectedMovieActors([]);
    setActorSearch("");
    setSelectedActor(null);
    setActorRole("");
    toast.info("Form cleared");
  };

  const handleClearActor = () => {
    setActorForm(defaultActor);
    toast.info("Form cleared");
  };

  const handleAddActorToMovie = () => {
    if (!selectedActor) {
      toast.error("Please search and select an actor");
      return;
    }

    const alreadyAdded = selectedMovieActors.some((a) => a.actor_id === selectedActor.id);
    if (alreadyAdded) {
      toast.error("Actor already added to this movie");
      return;
    }

    setSelectedMovieActors((prev) => [
      ...prev,
      { actor_id: selectedActor.id, name: selectedActor.name, role: actorRole.trim() },
    ]);
    setSelectedActor(null);
    setActorSearch("");
    setActorOptions([]);
    setActorRole("");
  };

  const handleRemoveActorFromMovie = (actorId: string) => {
    setSelectedMovieActors((prev) => prev.filter((a) => a.actor_id !== actorId));
  };

  return (
    <div className="min-h-screen pt-16 flex flex-col">
      <div className="mx-auto max-w-3xl px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold mb-6">Update Database</h1>
        <Tabs defaultValue="movie">
          <TabsList className="bg-panel border border-border mb-6">
            <TabsTrigger value="movie" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Movie</TabsTrigger>
            <TabsTrigger value="actor" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Actor</TabsTrigger>
          </TabsList>

          {/* ── MOVIE TAB ── */}
          <TabsContent value="movie" className="space-y-4">
            <div className="rounded-lg border border-border bg-card p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-foreground">Title *</Label>
                  <Input value={movieForm.title} onChange={(e) => handleMovieChange("title", e.target.value)} className="bg-panel border-border text-foreground" />
                </div>
                <div>
                  <Label className="text-foreground">Director</Label>
                  <Input value={movieForm.director} onChange={(e) => handleMovieChange("director", e.target.value)} className="bg-panel border-border text-foreground" />
                </div>
                <div>
                  <Label className="text-foreground">Year</Label>
                  <Input type="number" value={movieForm.year} onChange={(e) => handleMovieChange("year", e.target.value)} className="bg-panel border-border text-foreground" />
                </div>
                <div>
                  <Label className="text-foreground">Duration</Label>
                  <Input placeholder="e.g. 2h 15min" value={movieForm.duration} onChange={(e) => handleMovieChange("duration", e.target.value)} className="bg-panel border-border text-foreground" />
                </div>
              </div>

              <div>
                <Label className="text-foreground">Language</Label>
                <Select value={movieForm.language} onValueChange={(v) => handleMovieChange("language", v)}>
                  <SelectTrigger className="bg-panel border-border text-foreground"><SelectValue placeholder="Select language" /></SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {languages.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-foreground mb-2 block">Genres</Label>
                <div className="flex flex-wrap gap-2">
                  {genres.map((g) => (
                    <Badge
                      key={g}
                      variant="secondary"
                      onClick={() => toggleGenre(g)}
                      className={`cursor-pointer transition-colors ${selectedGenres.includes(g) ? "gold-gradient text-primary-foreground" : "bg-panel text-muted-foreground border-border hover:border-primary/40"}`}
                    >
                      {g}
                      {selectedGenres.includes(g) && <X className="ml-1 h-3 w-3" />}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-foreground">Synopsis</Label>
                <Textarea value={movieForm.synopsis} onChange={(e) => handleMovieChange("synopsis", e.target.value)} className="bg-panel border-border text-foreground min-h-[100px]" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-foreground">Budget (₹ Cr)</Label>
                  <Input placeholder="e.g. 100" value={movieForm.budget_cr} onChange={(e) => handleMovieChange("budget_cr", e.target.value)} className="bg-panel border-border text-foreground" />
                </div>
                <div>
                  <Label className="text-foreground">Box Office (₹ Cr)</Label>
                  <Input placeholder="e.g. 500" value={movieForm.box_office_cr} onChange={(e) => handleMovieChange("box_office_cr", e.target.value)} className="bg-panel border-border text-foreground" />
                </div>
              </div>

              <div>
                <Label className="text-foreground">Poster URL</Label>
                <Input placeholder="https://..." value={movieForm.poster_url} onChange={(e) => handleMovieChange("poster_url", e.target.value)} className="bg-panel border-border text-foreground" />
              </div>

              <div className="space-y-3">
                <Label className="text-foreground">Add Actors (from database)</Label>
                {selectedMovieActors.length > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {selectedMovieActors.length} actor(s) added to this movie.
                  </p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3">
                  <div className="space-y-2">
                    <Input
                      placeholder="Search actor from DB..."
                      value={actorSearch}
                      onChange={(e) => {
                        setActorSearch(e.target.value);
                        setSelectedActor(null);
                      }}
                      className="bg-panel border-border text-foreground"
                    />
                    {loadingActors && <p className="text-xs text-muted-foreground">Searching actors...</p>}
                    {!loadingActors && actorSearch.trim().length > 0 && actorOptions.length > 0 && (
                      <div className="max-h-36 overflow-y-auto rounded-md border border-border bg-panel p-1 space-y-1">
                        {actorOptions.map((actor) => (
                          <button
                            key={actor.id}
                            type="button"
                            onClick={() => {
                              setSelectedActor(actor);
                              setActorSearch(actor.name);
                              setActorOptions([]);
                            }}
                            className="w-full text-left rounded px-2 py-1.5 text-sm text-foreground hover:bg-primary/10"
                          >
                            {actor.name}
                          </button>
                        ))}
                      </div>
                    )}
                    {!loadingActors && actorSearch.trim().length > 0 && actorOptions.length === 0 && (
                      <p className="text-xs text-muted-foreground">No actors found.</p>
                    )}
                  </div>

                  <Input
                    placeholder="Role in movie (optional)"
                    value={actorRole}
                    onChange={(e) => setActorRole(e.target.value)}
                    className="bg-panel border-border text-foreground"
                  />

                  <Button
                    type="button"
                    onClick={handleAddActorToMovie}
                    variant="outline"
                    className="border-border text-muted-foreground hover:border-primary hover:text-primary"
                  >
                    Add Actor
                  </Button>
                </div>

                {selectedMovieActors.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedMovieActors.map((item) => (
                      <Badge key={item.actor_id} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        {item.name}{item.role ? ` (${item.role})` : ""}
                        <button
                          type="button"
                          onClick={() => handleRemoveActorFromMovie(item.actor_id)}
                          className="ml-2 inline-flex items-center"
                          aria-label={`Remove ${item.name}`}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <Button onClick={handleSaveMovie} disabled={savingMovie} className="gold-gradient text-primary-foreground font-semibold hover:opacity-90">
                  {savingMovie ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : "Save Movie"}
                </Button>
                <Button variant="outline" onClick={handleClearMovie} className="border-border text-muted-foreground hover:border-primary hover:text-primary">Clear</Button>
              </div>
            </div>
          </TabsContent>

          {/* ── ACTOR TAB ── */}
          <TabsContent value="actor" className="space-y-4">
            <div className="rounded-lg border border-border bg-card p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-foreground">Name *</Label>
                  <Input value={actorForm.name} onChange={(e) => handleActorChange("name", e.target.value)} className="bg-panel border-border text-foreground" />
                </div>
                <div>
                  <Label className="text-foreground">Nationality</Label>
                  <Input value={actorForm.nationality} onChange={(e) => handleActorChange("nationality", e.target.value)} className="bg-panel border-border text-foreground" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-foreground">Date of Birth</Label>
                  <Input type="date" value={actorForm.date_of_birth} onChange={(e) => handleActorChange("date_of_birth", e.target.value)} className="bg-panel border-border text-foreground" />
                </div>
                <div>
                  <Label className="text-foreground">Gender</Label>
                  <Select value={actorForm.gender} onValueChange={(v) => handleActorChange("gender", v)}>
                    <SelectTrigger className="bg-panel border-border text-foreground"><SelectValue placeholder="Select gender" /></SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-foreground">Biography</Label>
                <Textarea value={actorForm.biography} onChange={(e) => handleActorChange("biography", e.target.value)} className="bg-panel border-border text-foreground min-h-[100px]" />
              </div>

              <div>
                <Label className="text-foreground">Photo URL</Label>
                <Input placeholder="https://..." value={actorForm.photo_url} onChange={(e) => handleActorChange("photo_url", e.target.value)} className="bg-panel border-border text-foreground" />
              </div>

              <div className="flex gap-3 pt-2">
                <Button onClick={handleSaveActor} disabled={savingActor} className="gold-gradient text-primary-foreground font-semibold hover:opacity-90">
                  {savingActor ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : "Save Actor"}
                </Button>
                <Button variant="outline" onClick={handleClearActor} className="border-border text-muted-foreground hover:border-primary hover:text-primary">Clear</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <PiracyFooter />
    </div>
  );
}