import { motion } from "framer-motion";
import { CalendarDays, Clock, Monitor, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { shows, movies } from "@/data/mock-data";
import AppLayout from "@/components/layout/AppLayout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Shows() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-gradient-gold">Showtimes</h1>
          <p className="text-muted-foreground mt-1">Today's scheduled shows</p>
        </div>

        <div className="grid gap-4">
          {shows.map((show, i) => {
            const movie = movies.find((m) => m.id === show.movieId);
            if (!movie) return null;
            return (
              <motion.div
                key={show.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="bg-card border-border hover:glow-gold transition-shadow">
                  <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <img src={movie.poster} alt={movie.title} className="w-16 h-24 rounded object-cover" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-bold text-lg">{movie.title}</h3>
                      <div className="flex flex-wrap gap-2 mt-1.5 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Monitor size={14} /> {show.screenName}</span>
                        <span className="flex items-center gap-1"><Clock size={14} /> {show.time}</span>
                        <span className="flex items-center gap-1"><CalendarDays size={14} /> {show.date}</span>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs gap-1">
                          <DollarSign size={10} /> Standard: ${show.price}
                        </Badge>
                        <Badge className="text-xs gap-1">
                          <DollarSign size={10} /> VIP: ${show.vipPrice}
                        </Badge>
                      </div>
                    </div>
                    <Link to={`/booking?movie=${movie.id}&show=${show.id}`}>
                      <Button size="sm">Book Now</Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
