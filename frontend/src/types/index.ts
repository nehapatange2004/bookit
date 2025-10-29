export interface Experience {
  _id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  image: string;
  category?: string;
  availableDates?: string[];
  availableTimes?: string[];
}

export interface BookingDetails {
  experience: Experience | null;
  date: string;
  time: string;
  quantity: number;
  subtotal: number;
  taxes: number;
  total: number;
}

export interface UserDetails {
  fullName: string;
  email: string;
  promoCode?: string;
}
