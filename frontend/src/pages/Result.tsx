import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2, XCircle } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Result = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { resetBooking } = useBooking();
  const status = searchParams.get("status");

  const isSuccess = status === "success";

  useEffect(() => {
    // Reset booking after showing result
    return () => {
      if (isSuccess) {
        resetBooking();
      }
    };
  }, [isSuccess, resetBooking]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto p-8 text-center">
          {isSuccess ? (
            <>
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2">Booking Confirmed!</h1>
              <p className="text-muted-foreground mb-6">
                Your booking has been successfully confirmed. Check your email for details.
              </p>
            </>
          ) : (
            <>
              <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2">Booking Failed</h1>
              <p className="text-muted-foreground mb-6">
                Something went wrong with your booking. Please try again.
              </p>
            </>
          )}
          
          <div className="space-y-3">
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => navigate("/")}
            >
              Browse More Experiences
            </Button>
            {!isSuccess && (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate("/checkout")}
              >
                Try Again
              </Button>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Result;
