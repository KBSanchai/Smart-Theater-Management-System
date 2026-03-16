import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Star, Clock, Globe, Search, Edit2, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { movies as initialMovies, Movie } from "@/data/mock-data";
import AppLayout from "@/components/layout/AppLayout";
import { toast } from "sonner";

export default function Movies() {
  const [movieList, setMovieList] = useState<Movie[]>(initialMovies);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    title: "", genre: "", duration: "", language: "English", rating: "", description: "", poster: "",
  });

  const filtered = movieList.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase()) ||
    m.genre.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!form.title || !form.genre) {
      toast.error("Title and Genre are required");
      return;
    }
    const newMovie: Movie = {
      id: Date.now().toString(),
      title: form.title,
      genre: form.genre,
      duration: Number(form.duration) || 120,
      language: form.language,
      rating: Number(form.rating) || 0,
      description: form.description,
      poster: form.poster || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
      releaseDate: new Date().toISOString().split("T")[0],
    };
    setMovieList([newMovie, ...movieList]);
    setForm({ title: "", genre: "", duration: "", language: "English", rating: "", description: "", poster: "" });
    setDialogOpen(false);
    toast.success("Movie added successfully!");
  };

  const handleDelete = (id: string) => {
    setMovieList(movieList.filter((m) => m.id !== id));
    toast.success("Movie removed");
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-gradient-gold">Movies</h1>
            <p className="text-muted-foreground mt-1">{movieList.length} movies in catalog</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus size={16} /> Add Movie
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border max-w-md">
              <DialogHeader>
                <DialogTitle className="font-display text-gradient-gold">Add New Movie</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 mt-2">
                <div>
                  <Label>Title</Label>
                  <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Movie title" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Genre</Label>
                    <Input value={form.genre} onChange={(e) => setForm({ ...form, genre: e.target.value })} placeholder="e.g. Action" />
                  </div>
                  <div>
                    <Label>Duration (min)</Label>
                    <Input type="number" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="120" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Language</Label>
                    <Input value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })} />
                  </div>
                  <div>
                    <Label>Rating</Label>
                    <Input type="number" step="0.1" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} placeholder="8.5" />
                  </div>
                </div>
                <div>
                  <Label>Poster URL</Label>
                  <Input value={form.poster} onChange={(e) => setForm({ ...form, poster: e.target.value })} placeholder="https://..." />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Brief description..." rows={3} />
                </div>
                <Button onClick={handleAdd} className="w-full">Add Movie</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search movies..."
            className="pl-9"
          />
        </div>

        {/* Movie Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((movie, i) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="bg-card border-border overflow-hidden group hover:glow-gold transition-shadow">
                <div className="flex h-48">
                  <img src={movie.poster} alt={movie.title} className="w-32 h-full object-cover" />
                  <CardContent className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display font-bold text-lg leading-tight">{movie.title}</h3>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        <Badge variant="secondary" className="text-xs">{movie.genre}</Badge>
                        <Badge variant="outline" className="text-xs gap-1">
                          <Clock size={10} /> {movie.duration}m
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{movie.description}</p>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-primary fill-primary" />
                        <span className="text-sm font-semibold">{movie.rating}</span>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Edit2 size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => handleDelete(movie.id)}>
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
