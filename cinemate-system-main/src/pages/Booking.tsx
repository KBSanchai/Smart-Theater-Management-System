import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Monitor, Ticket, DollarSign, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { movies, shows } from "@/data/mock-data";
import AppLayout from "@/components/layout/AppLayout";
import { toast } from "sonner";

type SeatStatus = "available" | "booked" | "selected" | "vip-available" | "vip-selected";

interface Seat {
  id: string;
  row: string;
  number: number;
  status: SeatStatus;
  price: number;
}

function generateSeats(standardPrice: number, vipPrice: number): Seat[] {
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const seatsPerRow = 12;
  const bookedSeats = new Set(["A3", "A4", "B7", "C2", "C3", "D5", "E8", "E9", "F1", "G6", "G7", "H10"]);

  return rows.flatMap((row) =>
    Array.from({ length: seatsPerRow }, (_, i) => {
      const num = i + 1;
      const id = `${row}${num}`;
      const isVip = row === "G" || row === "H";
      const isBooked = bookedSeats.has(id);
      return {
        id,
        row,
        number: num,
        status: isBooked ? "booked" : isVip ? "vip-available" : "available",
        price: isVip ? vipPrice : standardPrice,
      } as Seat;
    })
  );
}

const seatColors: Record<SeatStatus, string> = {
  available: "bg-seat-available hover:bg-seat-available/80 cursor-pointer",
  booked: "bg-muted cursor-not-allowed opacity-40",
  selected: "bg-seat-selected shadow-gold cursor-pointer",
  "vip-available": "bg-seat-vip hover:bg-seat-vip/80 cursor-pointer",
  "vip-selected": "bg-seat-selected shadow-gold cursor-pointer",
};

export default function Booking() {
  const [searchParams] = useSearchParams();
  const movieId = searchParams.get("movie") || movies[0].id;
  const showId = searchParams.get("show") || shows.find((s) => s.movieId === movieId)?.id || shows[0].id;

  const movie = movies.find((m) => m.id === movieId) || movies[0];
  const show = shows.find((s) => s.id === showId) || shows[0];

  const [seats, setSeats] = useState<Seat[]>(() => generateSeats(show.price, show.vipPrice));
  const [booked, setBooked] = useState(false);

  const selectedSeats = seats.filter((s) => s.status === "selected" || s.status === "vip-selected");
  const total = selectedSeats.reduce((sum, s) => sum + s.price, 0);

  const toggleSeat = (seatId: string) => {
    setSeats((prev) =>
      prev.map((s) => {
        if (s.id !== seatId) return s;
        if (s.status === "booked") return s;
        if (s.status === "available") return { ...s, status: "selected" };
        if (s.status === "selected") return { ...s, status: "available" };
        if (s.status === "vip-available") return { ...s, status: "vip-selected" };
        if (s.status === "vip-selected") return { ...s, status: "vip-available" };
        return s;
      })
    );
  };

  const handleBook = () => {
    if (selectedSeats.length === 0) {
      toast.error("Select at least one seat");
      return;
    }
    setBooked(true);
    toast.success(`Booking confirmed! ${selectedSeats.length} seat(s) for $${total}`);
  };

  const rows = useMemo(() => {
    const grouped: Record<string, Seat[]> = {};
    seats.forEach((s) => {
      if (!grouped[s.row]) grouped[s.row] = [];
      grouped[s.row].push(s);
    });
    return Object.entries(grouped);
  }, [seats]);

  return (
    <AppLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Movie info */}
        <Card className="bg-card border-border overflow-hidden">
          <CardContent className="p-4 flex gap-4">
            <img src={movie.poster} alt={movie.title} className="w-20 h-28 rounded object-cover" />
            <div>
              <h1 className="font-display text-2xl font-bold text-gradient-gold">{movie.title}</h1>
              <p className="text-muted-foreground text-sm mt-1">{movie.genre} • {movie.duration}m • {movie.language}</p>
              <div className="flex gap-2 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Monitor size={14} /> {show.screenName}</span>
                <span>•</span>
                <span>{show.time}, {show.date}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {booked ? (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <Card className="bg-card border-primary/30 glow-gold">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Check size={32} className="text-primary" />
                </div>
                <h2 className="font-display text-2xl font-bold text-gradient-gold mb-2">Booking Confirmed!</h2>
                <p className="text-muted-foreground">
                  {selectedSeats.length} seat(s): {selectedSeats.map((s) => s.id).join(", ")}
                </p>
                <p className="text-2xl font-bold mt-3">${total}</p>
                <p className="text-xs text-muted-foreground mt-1">Booking ID: CV-{Date.now().toString(36).toUpperCase()}</p>
                <Button className="mt-6" onClick={() => { setBooked(false); setSeats(generateSeats(show.price, show.vipPrice)); }}>
                  Book More Tickets
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <>
            {/* Screen */}
            <div className="text-center">
              <div className="mx-auto w-3/4 h-2 bg-gradient-gold rounded-full mb-1 shadow-gold" />
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-6">Screen</p>
            </div>

            {/* Seat Map */}
            <div className="flex flex-col items-center gap-1.5">
              {rows.map(([row, rowSeats]) => (
                <div key={row} className="flex items-center gap-1.5">
                  <span className="w-6 text-xs text-muted-foreground text-right">{row}</span>
                  <div className="flex gap-1">
                    {rowSeats.map((seat) => (
                      <motion.button
                        key={seat.id}
                        whileHover={{ scale: seat.status === "booked" ? 1 : 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleSeat(seat.id)}
                        className={`w-7 h-7 rounded-sm text-[10px] font-semibold transition-colors ${seatColors[seat.status]}
                          ${seat.status === "selected" || seat.status === "vip-selected" ? "text-primary-foreground" : "text-foreground/80"}`}
                        title={`${seat.id} - $${seat.price}`}
                      >
                        {seat.number}
                      </motion.button>
                    ))}
                  </div>
                  <span className="w-6 text-xs text-muted-foreground">{row}</span>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-4 text-xs">
              {[
                { label: "Available", cls: "bg-seat-available" },
                { label: "Selected", cls: "bg-seat-selected" },
                { label: "VIP", cls: "bg-seat-vip" },
                { label: "Booked", cls: "bg-muted opacity-40" },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <div className={`w-4 h-4 rounded-sm ${l.cls}`} />
                  <span className="text-muted-foreground">{l.label}</span>
                </div>
              ))}
            </div>

            {/* Booking Summary */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Ticket size={18} className="text-primary" /> Booking Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedSeats.length === 0 ? (
                  <p className="text-muted-foreground text-sm">Select seats to see your booking summary</p>
                ) : (
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {selectedSeats.map((s) => (
                        <Badge key={s.id} variant="secondary" className="text-xs">
                          {s.id} — ${s.price}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <span className="text-muted-foreground">{selectedSeats.length} seat(s)</span>
                      <span className="text-xl font-bold flex items-center gap-1">
                        <DollarSign size={18} className="text-primary" />
                        {total}
                      </span>
                    </div>
                    <Button onClick={handleBook} className="w-full gap-2" size="lg">
                      <Ticket size={18} /> Confirm Booking
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </AppLayout>
  );
}
