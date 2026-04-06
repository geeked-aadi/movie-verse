import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { toast } from "sonner";
import PiracyFooter from "@/components/PiracyFooter";

const genres = ["Action","Adventure","Comedy","Crime","Drama","Fantasy","History","Horror","Mystery","Romance","Sci-Fi","Thriller","War"];
const languages = ["English","French","Japanese","Arabic","Spanish","Korean","Hindi","German","Kannada","Cantonese"];

export default function Update() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const toggleGenre = (g: string) => {
    setSelectedGenres((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    );
  };

  const handleSave = () => toast.success("Saved successfully!");
  const handleClear = () => {
    setSelectedGenres([]);
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

          <TabsContent value="movie" className="space-y-4">
            <div className="rounded-lg border border-border bg-card p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label className="text-foreground">Title</Label><Input className="bg-panel border-border text-foreground" /></div>
                <div><Label className="text-foreground">Director</Label><Input className="bg-panel border-border text-foreground" /></div>
                <div><Label className="text-foreground">Year</Label><Input type="number" className="bg-panel border-border text-foreground" /></div>
                <div><Label className="text-foreground">Duration</Label><Input placeholder="e.g. 2h 15min" className="bg-panel border-border text-foreground" /></div>
              </div>
              <div>
                <Label className="text-foreground">Language</Label>
                <Select>
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
              <div><Label className="text-foreground">Synopsis</Label><Textarea className="bg-panel border-border text-foreground min-h-[100px]" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label className="text-foreground">Budget (₹ Cr)</Label><Input placeholder="₹100 Cr" className="bg-panel border-border text-foreground" /></div>
                <div><Label className="text-foreground">Box Office (₹ Cr)</Label><Input placeholder="₹500 Cr" className="bg-panel border-border text-foreground" /></div>
              </div>
              <div><Label className="text-foreground">Poster URL</Label><Input placeholder="https://..." className="bg-panel border-border text-foreground" /></div>
              <div className="flex gap-3 pt-2">
                <Button onClick={handleSave} className="gold-gradient text-primary-foreground font-semibold hover:opacity-90">Save Movie</Button>
                <Button variant="outline" onClick={handleClear} className="border-border text-muted-foreground hover:border-primary hover:text-primary">Clear</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="actor" className="space-y-4">
            <div className="rounded-lg border border-border bg-card p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label className="text-foreground">Name</Label><Input className="bg-panel border-border text-foreground" /></div>
                <div><Label className="text-foreground">Nationality</Label><Input className="bg-panel border-border text-foreground" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label className="text-foreground">Date of Birth</Label><Input type="date" className="bg-panel border-border text-foreground" /></div>
                <div>
                  <Label className="text-foreground">Gender</Label>
                  <Select>
                    <SelectTrigger className="bg-panel border-border text-foreground"><SelectValue placeholder="Select gender" /></SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div><Label className="text-foreground">Biography</Label><Textarea className="bg-panel border-border text-foreground min-h-[100px]" /></div>
              <div><Label className="text-foreground">Photo URL</Label><Input placeholder="https://..." className="bg-panel border-border text-foreground" /></div>
              <div className="flex gap-3 pt-2">
                <Button onClick={handleSave} className="gold-gradient text-primary-foreground font-semibold hover:opacity-90">Save Actor</Button>
                <Button variant="outline" onClick={handleClear} className="border-border text-muted-foreground hover:border-primary hover:text-primary">Clear</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <PiracyFooter />
    </div>
  );
}
