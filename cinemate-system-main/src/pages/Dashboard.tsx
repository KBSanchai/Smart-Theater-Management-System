import { motion } from "framer-motion";
import { Film, Ticket, DollarSign, TrendingUp, Users, Monitor } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area,
} from "recharts";
import { dailySalesData, recentBookings } from "@/data/mock-data";
import AppLayout from "@/components/layout/AppLayout";

const stats = [
  { label: "Total Movies", value: "24", icon: Film, change: "+3 this week" },
  { label: "Active Shows", value: "18", icon: Monitor, change: "6 screens" },
  { label: "Today's Bookings", value: "156", icon: Ticket, change: "+12% vs yesterday" },
  { label: "Revenue (Today)", value: "$2,340", icon: DollarSign, change: "+8.5%" },
  { label: "Total Customers", value: "3,842", icon: Users, change: "+45 today" },
  { label: "Occupancy Rate", value: "78%", icon: TrendingUp, change: "+5% this week" },
];

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-gradient-gold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of your theater operations</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="bg-card border-border hover:glow-gold transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      <p className="text-xs text-primary mt-1">{stat.change}</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-primary/10">
                      <stat.icon size={20} className="text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base">Daily Ticket Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={dailySalesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 6% 18%)" />
                  <XAxis dataKey="day" stroke="hsl(240 5% 55%)" fontSize={12} />
                  <YAxis stroke="hsl(240 5% 55%)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(240 8% 12%)",
                      border: "1px solid hsl(240 6% 18%)",
                      borderRadius: "8px",
                      color: "hsl(40 20% 92%)",
                    }}
                  />
                  <Bar dataKey="tickets" fill="hsl(42 80% 55%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base">Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={dailySalesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 6% 18%)" />
                  <XAxis dataKey="day" stroke="hsl(240 5% 55%)" fontSize={12} />
                  <YAxis stroke="hsl(240 5% 55%)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(240 8% 12%)",
                      border: "1px solid hsl(240 6% 18%)",
                      borderRadius: "8px",
                      color: "hsl(40 20% 92%)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(42 80% 55%)"
                    fill="hsl(42 80% 55% / 0.15)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Bookings */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base">Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="text-left py-3 px-2 font-medium">Customer</th>
                    <th className="text-left py-3 px-2 font-medium">Movie</th>
                    <th className="text-left py-3 px-2 font-medium">Time</th>
                    <th className="text-left py-3 px-2 font-medium">Seats</th>
                    <th className="text-left py-3 px-2 font-medium">Total</th>
                    <th className="text-left py-3 px-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((b) => (
                    <tr key={b.id} className="border-b border-border/50 hover:bg-secondary/30">
                      <td className="py-3 px-2">{b.customerName}</td>
                      <td className="py-3 px-2">{b.movieTitle}</td>
                      <td className="py-3 px-2 text-muted-foreground">{b.showTime}</td>
                      <td className="py-3 px-2">{b.seats.join(", ")}</td>
                      <td className="py-3 px-2 font-semibold">${b.total}</td>
                      <td className="py-3 px-2">
                        <Badge
                          variant={b.status === "confirmed" ? "default" : b.status === "pending" ? "secondary" : "destructive"}
                        >
                          {b.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
