import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { Experience } from "@/types";
import { useBooking } from "@/context/BookingContext";
import Header from "@/components/Header";
import BookingSummary from "@/components/BookingSummary";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import api from "@/services/api";
import { toast } from "sonner";
import { Separator } from "@radix-ui/react-separator";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectExperience, updateBookingDetails, bookingDetails } = useBooking();
  //  const { bookingDetails } = useBooking();
  const { date, time, subtotal, taxes, total } = bookingDetails;

  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchExperience();
  }, [id]);

  const fetchExperience = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/experiences/${id}`);
      const exp = response.data;
      setExperience(exp);
      selectExperience(exp);
    } catch (error) {
      console.error("Error fetching experience:", error);
      // Mock data fallback
      const mockExp: Experience = {
        _id: id || "1",
        title: experience.title || "Title not found",
        description: "Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany in kayaking.",
        location: "Uttapi",
        price: 999,
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80",
        availableDates: ["Oct 22", "Oct 23", "Oct 24", "Oct 26"],
        availableTimes: ["07:00 am", "09:00 am", "11:00 am", "1:00 pm"],
      };
      setExperience(mockExp);
      selectExperience(mockExp);
      toast.info("Using demo data");
    } finally {
      setLoading(false);
    }
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    updateBookingDetails({ date });
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    updateBookingDetails({ time });
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
    updateBookingDetails({ quantity: newQuantity });
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select date and time");
      return;
    }
    navigate("/checkout");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">Experience not found</p>
        </div>
      </div>
    );
  }

  const canConfirm = selectedDate && selectedTime;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className=" mr-2 rounded-md"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          
        </Button>
        Details
        </div>

{/* the part below the details */}


        <div className="grid lg:grid-cols-10 gap-8  ">
          <div className="lg:col-span-6 space-y-6 ml-[10%]">
            <Card className="overflow-hidden w">
              <img
                src={experience.image}
                alt={experience.title}
                className="h-[300px] w-full aspect-video object-cover"
              />
            </Card>

            <div>
              <h1 className="text-3xl font-bold mb-2">{experience.title}</h1>
              <p className="text-muted-foreground">{experience.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Choose date</h2>
              <div className="flex gap-3 flex-wrap">
                {experience.availableDates?.map((date) => (
                  <Button
                    key={date}
                    variant={selectedDate === date ? "default" : "outline"}
                    onClick={() => handleDateSelect(date)}
                    className={selectedDate === date ? "bg-primary text-primary-foreground" : ""}
                  >
                    {date.split("T")[0]}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Choose time</h2>
              <div className="flex gap-3 flex-wrap">
                {experience.availableTimes?.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    onClick={() => handleTimeSelect(time)}
                    className={selectedTime === time ? "bg-primary text-primary-foreground" : ""}
                  >
                    {time}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                All times are in IST (GMT +5:30)
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-muted-foreground">
                Explore routes, trained guides, and safety briefing. Minimum age 10
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
            {/* <Card className="p-6 mb-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Starts at</span>
                  <span className="font-bold text-xl">₹{experience.price}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Quantity</span>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="font-semibold w-8 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
            </Card> */}

            {/* <BookingSummary /> */}
            <Card className="p-6 sticky top-4 bg-slate-400/10">
              {/* <h3 className="font-semibold text-lg mb-4">Booking Summary</h3> */}
              <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Starts at</span>
                  <span className="font-bold text-xl">₹{experience.price}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Quantity</span>
                  <div className="flex items-center ">
                    <Button
                      variant="outline"
                      size="lg"
                      className="p-0 m-0 bg-inherit hover:bg-inherit"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      {/* <Minus className="w-2 h-2 p-0" /> */}
                      -
                    </Button>
                    <span className="font-semibold w-8 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="lg"
                      className="p-0 m-0 bg-inherit hover:bg-inherit"
                      onClick={() => handleQuantityChange(1)}
                    >
                      {/* <Plus className="w-1 h-1 p-0" /> */}
                      +
                    </Button>
                  </div>
                </div>
                

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Experience</span>
                  <span className="font-medium">{experience.title}</span>
                </div>

                {date && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium">{date.split("T")[0]}</span>
                  </div>
                )}

                {time && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Time</span>
                    <span className="font-medium">{time}</span>
                  </div>
                )}

                {quantity > 1 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Quantity</span>
                    <span className="font-medium">{quantity}</span>
                  </div>
                )}
              </div>

              {/* <Separator className="my-4" /> */}

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Taxes</span>
                  <span>₹{taxes}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg">Total</span>
                <span className="font-bold text-xl">₹{total}</span>
              </div>
              <Button
                className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
                size="lg"
                onClick={handleConfirm}
                // disabled={!canConfirm}
              >
                Confirm
              </Button>
            </Card>


          </div>
        </div>
      </main>
    </div>
  );
};

export default Details;
