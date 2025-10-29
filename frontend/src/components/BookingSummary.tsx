import { useBooking } from "@/context/BookingContext";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const BookingSummary = () => {
  const { bookingDetails } = useBooking();
  const { experience, date, time, quantity, subtotal, taxes, total } = bookingDetails;

  if (!experience) return null;

  return (
    <Card className="p-6 sticky top-4">
      <h3 className="font-semibold text-lg mb-4">Booking Summary</h3>
      
      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Experience</span>
          <span className="font-medium">{experience.title}</span>
        </div>
        
        {date && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Date</span>
            <span className="font-medium">{date}</span>
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
      
    </Card>
  );
};

export default BookingSummary;
