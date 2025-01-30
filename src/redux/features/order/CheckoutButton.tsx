/* eslint-disable @typescript-eslint/no-unused-vars */
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppSelector } from "@/redux/hook";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useCurrentUser } from "../auth/authSlice";
import { ITokenData } from "../auth/types";
import "./style.css";

interface CheckOutButtonProps {
  clientSecret: string;
  isOpen: boolean; // Dialog open state
  onOpenChange: (open: boolean) => void; // Dialog state setter
}

const CheckOutButton = ({
  clientSecret,
  isOpen,
  onOpenChange,
}: CheckOutButtonProps) => {
  const user = useAppSelector(useCurrentUser) as ITokenData;
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setProcessing(true);
    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      setProcessing(false);
      return;
    }

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) {
        setError(error.message || "Payment Error");
        setProcessing(false);
        return;
      }

      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              email: user?.email || "anonymous",
              name: user?.name || "anonymous",
            },
          },
        });

      if (confirmError) {
        setError(confirmError.message || "Payment Confirmation Error");
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        // Handle success status
        console.log(paymentIntent);
        onOpenChange(false); // Close the dialog after successful payment
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Proceed to Payment?</AlertDialogTitle>
          <AlertDialogDescription>
            Enter your payment details to complete the purchase.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogDescription>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" />
            </div>
            <div className="relative space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <div className="custom-card-element">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        fontFamily: '"Roboto Slab", serif',
                        color: "#424770",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </AlertDialogDescription>
        <AlertDialogDescription className="w-full">
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 mt-3 w-full gap-4">
              {/* Cancel Button */}
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)} // Close the dialog
                className="my-4 px-9 w-full" // Add w-full to make the button full width
              >
                Cancel
              </Button>

              {/* Pay Button */}
              <Button
                type="submit"
                disabled={!stripe || !clientSecret || processing}
                className="my-4 px-9 w-full" // Add w-full to make the button full width
                onClick={handleSubmit}
              >
                {processing ? "Processing..." : "Pay"}
              </Button>
            </div>

            {/* Error Message */}
            {error && (
              <Alert variant="destructive" className="mt-4 block">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CheckOutButton;
