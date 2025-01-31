import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hook";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useCurrentUser } from "../auth/authSlice";
import { ITokenData } from "../auth/types";

const ChackOutButton = ({ clientSecret }: { clientSecret: string}) => {
  const user = useAppSelector(useCurrentUser) as ITokenData;

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setProcessing(true);
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      //   console.log("Payment Error:", error);
      setError(error.message || "Payment Error");
    } else {
      setError("");
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
      console.log("confirmerror", confirmError);
    } else {
      //   console.log("payment Intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
          //
      }

      setProcessing(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {/* <Button variant="outline">Pay now</Button> */}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Process to payment?</AlertDialogTitle>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
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
          </AlertDialogHeader>
          <AlertDialogFooter>
            <div className="flex justify-center mt-3 w-full">
              <Button
                type="submit"
                disabled={!stripe || !clientSecret || processing}
                className="my-4 px-9"
              >
                {processing ? "Pay" : "Processing..."}
              </Button>
            </div>

            {/* Error Message */}
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  );
};

export default ChackOutButton;
