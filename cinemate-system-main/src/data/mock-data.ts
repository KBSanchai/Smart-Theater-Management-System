export interface Movie {
  id: string;
  title: string;
  genre: string;
  duration: number;
  language: string;
  rating: number;
  description: string;
  poster: string;
  releaseDate: string;
}

export interface Show {
  id: string;
  movieId: string;
  screenId: string;
  screenName: string;
  time: string;
  date: string;
  price: number;
  vipPrice: number;
}

export interface Booking {
  id: string;
  movieTitle: string;
  showTime: string;
  seats: string[];
  total: number;
  status: "confirmed" | "pending" | "cancelled";
  date: string;
  customerName: string;
}

export const movies: Movie[] = [
  {
    id: "1",
    title: "Galactic Odyssey",
    genre: "Sci-Fi",
    duration: 148,
    language: "English",
    rating: 8.7,
    description: "An epic journey across the cosmos to save humanity's last hope.",
    poster: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=400&h=600&fit=crop",
    releaseDate: "2026-03-10",
  },
  {
    id: "2",
    title: "The Last Canvas",
    genre: "Drama",
    duration: 124,
    language: "English",
    rating: 9.1,
    description: "A struggling artist discovers a painting that changes reality.",
    poster: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=600&fit=crop",
    releaseDate: "2026-02-28",
  },
  {
    id: "3",
    title: "Midnight Protocol",
    genre: "Thriller",
    duration: 132,
    language: "English",
    rating: 8.3,
    description: "A cyber security expert uncovers a global conspiracy.",
    poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
    releaseDate: "2026-03-05",
  },
  {
    id: "4",
    title: "Echoes of Tomorrow",
    genre: "Romance",
    duration: 116,
    language: "English",
    rating: 7.9,
    description: "Two strangers connected across time must find each other.",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    releaseDate: "2026-03-14",
  },
  {
    id: "5",
    title: "Iron Fortress",
    genre: "Action",
    duration: 155,
    language: "English",
    rating: 8.5,
    description: "A retired soldier defends his city against an unstoppable force.",
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
    releaseDate: "2026-01-20",
  },
  {
    id: "6",
    title: "Whispers in the Dark",
    genre: "Horror",
    duration: 108,
    language: "English",
    rating: 7.6,
    description: "A family moves into a house with a terrifying secret.",
    poster: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=400&h=600&fit=crop",
    releaseDate: "2026-03-01",
  },
];

export const shows: Show[] = [
  { id: "s1", movieId: "1", screenId: "sc1", screenName: "Screen 1 - IMAX", time: "10:00 AM", date: "2026-03-16", price: 12, vipPrice: 25 },
  { id: "s2", movieId: "1", screenId: "sc2", screenName: "Screen 2", time: "1:30 PM", date: "2026-03-16", price: 10, vipPrice: 20 },
  { id: "s3", movieId: "2", screenId: "sc1", screenName: "Screen 1 - IMAX", time: "4:00 PM", date: "2026-03-16", price: 12, vipPrice: 25 },
  { id: "s4", movieId: "3", screenId: "sc3", screenName: "Screen 3", time: "7:00 PM", date: "2026-03-16", price: 10, vipPrice: 20 },
  { id: "s5", movieId: "4", screenId: "sc2", screenName: "Screen 2", time: "9:30 PM", date: "2026-03-16", price: 10, vipPrice: 20 },
  { id: "s6", movieId: "5", screenId: "sc1", screenName: "Screen 1 - IMAX", time: "8:00 PM", date: "2026-03-16", price: 14, vipPrice: 28 },
];

export const recentBookings: Booking[] = [
  { id: "b1", movieTitle: "Galactic Odyssey", showTime: "10:00 AM", seats: ["A1", "A2"], total: 24, status: "confirmed", date: "2026-03-16", customerName: "John Doe" },
  { id: "b2", movieTitle: "The Last Canvas", showTime: "4:00 PM", seats: ["C5", "C6", "C7"], total: 36, status: "confirmed", date: "2026-03-16", customerName: "Jane Smith" },
  { id: "b3", movieTitle: "Midnight Protocol", showTime: "7:00 PM", seats: ["VIP1", "VIP2"], total: 40, status: "pending", date: "2026-03-16", customerName: "Bob Wilson" },
  { id: "b4", movieTitle: "Iron Fortress", showTime: "8:00 PM", seats: ["B3"], total: 14, status: "confirmed", date: "2026-03-15", customerName: "Alice Brown" },
  { id: "b5", movieTitle: "Echoes of Tomorrow", showTime: "9:30 PM", seats: ["D4", "D5"], total: 20, status: "cancelled", date: "2026-03-15", customerName: "Charlie Davis" },
];

export const dailySalesData = [
  { day: "Mon", tickets: 45, revenue: 540 },
  { day: "Tue", tickets: 52, revenue: 624 },
  { day: "Wed", tickets: 38, revenue: 456 },
  { day: "Thu", tickets: 65, revenue: 780 },
  { day: "Fri", tickets: 89, revenue: 1068 },
  { day: "Sat", tickets: 120, revenue: 1440 },
  { day: "Sun", tickets: 98, revenue: 1176 },
];

export const monthlySalesData = [
  { month: "Jan", tickets: 1200, revenue: 14400 },
  { month: "Feb", tickets: 1450, revenue: 17400 },
  { month: "Mar", tickets: 1680, revenue: 20160 },
];
