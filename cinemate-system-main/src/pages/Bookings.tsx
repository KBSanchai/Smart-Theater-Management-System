import { motion } from "framer-motion";
import { Ticket, Calendar, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { recentBookings } from "@/data/mock-data";
import AppLayout from "@/components/layout/AppLayout";

const statusStyles = {
  confirmed: "bg-seat-available/20 text-seat-available border-seat-available/30",
  pending: "bg-primary/20 text-primary border-primary/30",
  cancelled: "bg-destructive/20 text-destructive border-destructive/30",
};

export default function Bookings() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-gradient-gold">My Bookings</h1>
          <p className="text-muted-foreground mt-1">Your ticket history</p>
        </div>

        <div className="grid gap-4">
          {recentBookings.map((booking, i) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="bg-card border-border hover:glow-gold transition-shadow">
                <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Ticket size={22} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold">{booking.movieTitle}</h3>
                    <div className="flex flex-wrap gap-3 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar size={12} /> {booking.date}</span>
                      <span>{booking.showTime}</span>
                      <span className="flex items-center gap-1"><MapPin size={12} /> {booking.seats.join(", ")}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-bold">${booking.total}</span>
                    <Badge className={`${statusStyles[booking.status]} border`}>
                      {booking.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
