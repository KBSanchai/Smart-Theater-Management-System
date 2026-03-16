import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Film,
  LayoutDashboard,
  Armchair,
  CalendarDays,
  Ticket,
  Users,
  Menu,
  X,
  LogIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/movies", label: "Movies", icon: Film },
  { path: "/shows", label: "Shows", icon: CalendarDays },
  { path: "/booking", label: "Book Tickets", icon: Ticket },
  { path: "/bookings", label: "My Bookings", icon: Armchair },
  { path: "/admin/users", label: "Users", icon: Users },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Top Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-gold flex items-center justify-center">
                <Film size={18} className="text-primary-foreground" />
              </div>
              <span className="font-display text-lg font-bold text-gradient-gold">
                CineVault
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="outline" size="sm" className="gap-2">
                <LogIn size={16} />
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <AnimatePresence>
          {(sidebarOpen || true) && (
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              className={`fixed lg:sticky top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 border-r border-border bg-sidebar overflow-y-auto
                ${sidebarOpen ? "block" : "hidden lg:block"}`}
            >
              <nav className="p-4 space-y-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                        ${
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                        }`}
                    >
                      <item.icon size={18} />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-background/60 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-4rem)] p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
