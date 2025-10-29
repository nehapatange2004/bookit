import { useEffect, useState } from "react";
import { Experience } from "@/types";
import Header from "@/components/Header";
// import SearchBar from "@/components/SearchBar";
import ExperienceCard from "@/components/ExperienceCard";
import api from "@/services/api";
import { toast } from "sonner";
import { useBooking } from "@/context/BookingContext";

const Home = () => {
  const {mockExperiences} = useBooking();
  const {experiences, setExperiences} = useBooking(); 
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    setLoading(true);
    try {
      const response = await api.get("/experiences");
      setExperiences(response.data);
    } catch (error) {
      console.error("Error fetching experiences:", error);
      // Using mock data on error
      toast.info("Using demo data. Connect your backend to load real experiences.");
    } finally {
      setLoading(false);
    }
  };

  // const handleSearch = (query: string) => {
  //   setSearchQuery(query);
  //   if (query.trim()) {
  //     const filtered = mockExperiences.filter(
  //       (exp) =>
  //         exp.title.toLowerCase().includes(query.toLowerCase()) ||
  //         exp.location.toLowerCase().includes(query.toLowerCase()) ||
  //         exp.description.toLowerCase().includes(query.toLowerCase())
  //     );
  //     setExperiences(filtered);
  //   } else {
  //     setExperiences(mockExperiences);
  //   }
  // };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
       
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading experiences...</p>
          </div>
        ) : experiences.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No experiences found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {experiences.map((experience) => (
              <ExperienceCard key={experience._id} experience={experience} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
