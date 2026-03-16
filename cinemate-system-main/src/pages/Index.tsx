import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Film, Ticket, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { movies } from "@/data/mock-data";
import heroCinema from "@/assets/hero-cinema.jpg";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-gold flex items-center justify-center">
              <Film size={18} className="text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-gradient-gold">CineVault</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">Dashboard</Button>
            </Link>
            <Link to="/booking">
              <Button size="sm" className="gap-2">
                <Ticket size={16} /> Book Now
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <img
          src={heroCinema}
          alt="Cinema auditorium"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center max-w-3xl mx-auto px-4"
        >
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 text-gradient-gold leading-tight">
            Smart Theater Management
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 mb-8 max-w-xl mx-auto">
            The ultimate platform to manage movies, screens, showtimes, and bookings — all in one cinematic experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="gap-2 text-base px-8">
                Enter Dashboard <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/booking">
              <Button size="lg" variant="outline" className="gap-2 text-base px-8">
                <Ticket size={18} /> Book Tickets
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Now Showing */}
      <section className="container py-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-display text-3xl font-bold text-gradient-gold">Now Showing</h2>
          <Link to="/movies" className="text-primary hover:underline text-sm flex items-center gap-1">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {movies.map((movie, i) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <Link to={`/booking?movie=${movie.id}`} className="group block">
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-3 shadow-cinema">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-background/80 backdrop-blur rounded px-2 py-0.5">
                    <Star size={12} className="text-primary fill-primary" />
                    <span className="text-xs font-semibold">{movie.rating}</span>
                  </div>
                </div>
                <h3 className="text-sm font-semibold truncate">{movie.title}</h3>
                <p className="text-xs text-muted-foreground">{movie.genre} • {movie.duration}m</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container text-center text-sm text-muted-foreground">
          © 2026 CineVault — Smart Theater Management System
        </div>
      </footer>
    </div>
  );
}
