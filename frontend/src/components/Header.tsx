import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useBooking } from "@/context/BookingContext";
import { useState } from "react";

const Header = () => {
  const { mockExperiences } = useBooking();
  // const [experiences, setExperiences] = useState<>(mockExperiences);
  const { experiences, setExperiences } = useBooking();
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const filtered = mockExperiences.filter(
        (exp) =>
          exp.title.toLowerCase().includes(query.toLowerCase()) ||
          exp.location.toLowerCase().includes(query.toLowerCase()) ||
          exp.description.toLowerCase().includes(query.toLowerCase())
      );
      setExperiences(filtered);
    } else {
      setExperiences(mockExperiences);
    }
  };
  return (
    <header className="border-b border-border bg-card justify-center items-center ">
      <div className="container mx-auto px-8 py-4 justify-between flex items-center md:flex-row flex-col gap-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 bg-foreground rounded-full">
            <MapPin className="w-5 h-5 text-background" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-none">Highway</span>
            <span className="text-sm font-semibold leading-none">Delite</span>
          </div>


        </Link>
        <div className="flex justify-center">
          <SearchBar onSearch={handleSearch} placeholder="Search experiences" />
        </div>
      </div>
    </header>
  );
};

export default Header;
