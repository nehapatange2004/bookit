import React, { createContext, useContext, useState, ReactNode } from "react";
import { BookingDetails, UserDetails, Experience } from "@/types";

interface BookingContextType {
  bookingDetails: BookingDetails;
  setBookingDetails: React.Dispatch<React.SetStateAction<BookingDetails>>;
  userDetails: UserDetails;
  selectExperience: (experience: Experience) => void;
  updateBookingDetails: (details: Partial<BookingDetails>) => void;
  updateUserDetails: (details: Partial<UserDetails>) => void;
  resetBooking: () => void;
  experiences: Experience[];
  setExperiences: React.Dispatch<React.SetStateAction<Experience[]>>;
  mockExperiences: Experience[];
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const initialBookingDetails: BookingDetails = {
  experience: null,
  date: "",
  time: "",
  quantity: 1,
  subtotal: 0,
  taxes: 0,
  total: 0,
};

const initialUserDetails: UserDetails = {
  fullName: "",
  email: "",
  promoCode: "",
};

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>(initialBookingDetails);
  const [userDetails, setUserDetails] = useState<UserDetails>(initialUserDetails);

  const [mockExperiences, setMockExperience] = useState<Experience[]>([
    {
      _id: "1",
      title: "Kayaking",
      description: "Curated small-group experience. Certified guide. Safety first with gear included.",
      location: "Uttapi",
      price: 999,
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
      category: "Water Sports",
      availableDates: ["Oct 22", "Oct 23", "Oct 24", "Oct 26"],
      availableTimes: ["07:00 am", "09:00 am", "11:00 am", "1:00 pm"],
    },
    {
      _id: "2",
      title: "Nandi Hills Sunrise",
      description: "Curated small-group experience. Certified guide. Safety first with gear included.",
      location: "Bangalore",
      price: 899,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      category: "Nature",
    },
    {
      _id: "3",
      title: "Coffee Trail",
      description: "Curated small-group experience. Certified guide. Safety first with gear included.",
      location: "Coorg",
      price: 1299,
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
      category: "Nature",
    },
    {
      _id: "4",
      title: "Kayaking",
      description: "Curated small-group experience. Certified guide. Safety first with gear included.",
      location: "Uttapi-Karnataka",
      price: 999,
      image: "https://images.unsplash.com/photo-1502933691298-84fc14542831?w=800&q=80",
      category: "Water Sports",
    },
    {
      _id: "5",
      title: "Boat Cruise",
      description: "Curated small-group experience. Certified guide. Safety first with gear included.",
      location: "Bangalore",
      price: 999,
      image: "https://images.unsplash.com/photo-1585417854776-c7f8f98e7c7b?w=800&q=80",
      category: "Water Sports",
    },
    {
      _id: "6",
      title: "Bungee Jumping",
      description: "Curated small-group experience. Certified guide. Safety first with gear included.",
      location: "Mysore",
      price: 999,
      image: "https://images.unsplash.com/photo-1624214109229-e6048e1e6c1f?w=800&q=80",
      category: "Adventure",
    },
    {
      _id: "7",
      title: "Coffee Trail",
      description: "Curated small-group experience. Certified guide. Safety first with gear included.",
      location: "Coorg",
      price: 1299,
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",
      category: "Nature",
    }]);

  const [experiences, setExperiences] = useState<Experience[]>(mockExperiences);
  const selectExperience = (experience: Experience) => {
    const subtotal = experience.price;
    const taxes = Math.round(subtotal * 0.09); // 9% tax
    const total = subtotal + taxes;

    setBookingDetails({
      ...bookingDetails,
      experience,
      quantity: 1,
      subtotal,
      taxes,
      total,
    });
  };

  const updateBookingDetails = (details: Partial<BookingDetails>) => {
    setBookingDetails((prev) => {
      const updated = { ...prev, ...details };

      // Recalculate totals if quantity or experience changes
      if (details.quantity !== undefined || details.experience !== undefined) {
        const price = updated.experience?.price || 0;
        const subtotal = price * updated.quantity;
        const taxes = Math.round(subtotal * 0.09);
        const total = subtotal + taxes;

        return {
          ...updated,
          subtotal,
          taxes,
          total,
        };
      }

      return updated;
    });
  };

  const updateUserDetails = (details: Partial<UserDetails>) => {
    setUserDetails((prev) => ({ ...prev, ...details }));
  };

  const resetBooking = () => {
    setBookingDetails(initialBookingDetails);
    setUserDetails(initialUserDetails);
  };

  return (
    <BookingContext.Provider
      value={{
        bookingDetails,
        setBookingDetails,
        userDetails,
        selectExperience,
        updateBookingDetails,
        updateUserDetails,
        resetBooking,
        mockExperiences,
        experiences,
        setExperiences,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
