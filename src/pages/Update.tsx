import { useState } from "react";
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
  const [savingMovie, setSavingMovie] = useState(false);
  const [savingActor, setSavingActor] = useState(false);

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

      const { error } = await supabase.from("movies").insert(payload);
      if (error) throw error;

      toast.success("Movie saved successfully!");
      setMovieForm(defaultMovie);
      setSelectedGenres([]);
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
    toast.info("Form cleared");
  };

  const handleClearActor = () => {
    setActorForm(defaultActor);
    toast.info("Form cleared");
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