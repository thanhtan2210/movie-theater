
export interface Cast {
  id: number;
  name: string;
  role: string;
  image: string;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
}

export interface Review {
  id: number;
  user: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Movie {
  id: number;
  title: string;
  poster: string;
  backdrop: string;
  genre: string;
  duration: string;
  rating: string;
  releaseDate: string;
  director: string;
  synopsis: string;
  trailerUrl?: string;
  imdb: string;
  status: 'Now Showing' | 'Coming Soon';
  cast?: Cast[];
  crew?: Crew[];
  reviews?: Review[];
}

export interface Cinema {
  id: number;
  name: string;
  address: string;
  image: string;
  coordinates?: { lat: number; lng: number };
}

export interface Showtime {
  id: number;
  time: string;
  room: string;
  type: string; // 2D, 3D, IMAX
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  type: 'standard' | 'vip' | 'couple';
  status: 'available' | 'occupied' | 'selected';
  price: number;
}

export interface Ticket {
  id: string;
  movieTitle: string;
  poster: string;
  cinemaName: string;
  room: string;
  showtime: string;
  seats: string[];
  totalPrice: number;
  status: 'Upcoming' | 'Past' | 'Cancelled';
  bookingDate: string;
}

export interface User {
  name: string;
  email: string;
  phone: string;
  dob: string;
  avatar: string;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: 'booking' | 'promo' | 'info';
  isRead: boolean;
}
