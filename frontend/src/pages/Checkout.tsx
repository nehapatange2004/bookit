import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import Header from "@/components/Header";
import BookingSummary from "@/components/BookingSummary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import api from "@/services/api";
import { Card } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";

const Checkout = () => {
  const navigate = useNavigate();
  const { bookingDetails, setBookingDetails, userDetails, updateUserDetails } = useBooking();
  const { experience, date, time, quantity, subtotal, taxes, total } = bookingDetails;
  
  const [fullName, setFullName] = useState(userDetails.fullName);
  const [email, setEmail] = useState(userDetails.email);
  const [promoCode, setPromoCode] = useState(userDetails.promoCode || "");
  const [appliedPromo, setAppliedPromo] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleApplyPromo =async () => {
    // if (promoCode.trim()) {
    //   toast.info("Promo code validation coming soon");
    //   updateUserDetails({ promoCode });
    // }
    try{
      const response = await api.post("/promo/apply", { code: promoCode, amount: total });
      if(response.data.valid){
        toast.success("Promo code applied successfully!");
        setAppliedPromo(true);
        setBookingDetails(prev => ({
          ...prev,
          total: prev.total - response.data.promoResult.discountAmount
        }));
      } else {
        toast.error("Invalid promo code");
      }
    }catch(error){
      console.error("Error validating promo code:", error);
      toast.error(error.response?.data?.message || "Error validating promo code");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      toast.error("Please enter your full name");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!agreedToTerms) {
      toast.error("Please agree to the terms and safety policy");
      return;
    }

    updateUserDetails({ fullName, email, promoCode });

    setLoading(true);
    try {
      const bookingData = {
        experience: bookingDetails.experience,
        date: bookingDetails.date,
        time: bookingDetails.time,
        quantity: bookingDetails.quantity,
        total: bookingDetails.total,
        user: {
          fullName,
          email,
        },
        code: promoCode || undefined,
      };

      await api.post("/bookings", bookingData);
      toast.success("Booking confirmed!");
      navigate("/result?status=success");
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("Booking failed. Please try again.");
      navigate("/result?status=failure");
    } finally {
      setLoading(false);
    }
  };

  if (!bookingDetails.experience) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">
            No booking selected. Please select an experience first.
          </p>
          <div className="text-center mt-4">
            <Button onClick={() => navigate("/")}>Browse Experiences</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Checkout
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 ">
            <form onSubmit={handleSubmit} className="space-y-6 bg-[rgb(236,239,239)] p-6 rounded-lg">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    className="bg-[rgba(221,221,221)]"
                    placeholder="Your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    className="bg-[rgba(221,221,221)]"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Input
                  type="text"
                  className="flex-1 bg-[rgba(221,221,221)]"
                  placeholder="Promo code"
                  disabled={appliedPromo}
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}

                />
                <Button
                  type="button"
                  variant="secondary"
                  disabled={appliedPromo}
                  onClick={handleApplyPromo}
                  className="bg-foreground text-background hover:bg-foreground/90"
                >
                  {appliedPromo ? "Applied" : "Apply"}
                </Button>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the terms and safety policy
                </label>
              </div>
            </form>
          </div>

          <div className="lg:col-span-1 rounded-lg">



            <Card className="p-6 sticky top-4 bg-[rgb(236,239,239)]">
          

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
                {quantity && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Qty</span>
                    <span className="font-medium">{quantity}</span>
                  </div>
                )}

                {quantity > 1 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Quantity</span>
                    <span className="font-medium">{quantity}</span>
                  </div>
                )}
              </div>

              <Separator className="my-4" />

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
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Processing..." : "Pay and Confirm"}
            </Button>

            </Card>





          
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
