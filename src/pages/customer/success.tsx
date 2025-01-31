import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import error from "@/lotties/error.json";
import success from "@/lotties/success.json";
import { Player } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="p-6 w-full max-w-md shadow-lg dark:bg-gray-800">
        <CardContent className="flex flex-col items-center text-center">
          <Player autoplay loop={true} src={success} className="w-96 h-80" />
          <h2 className="text-2xl font-semibold mt-2 dark:text-white">
            Payment Successful
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Your payment was processed successfully. Thank you for your
            purchase!
          </p>
          <Button
            className="mt-6 w-full dark:bg-gray-700 dark:hover:bg-gray-600"
            onClick={() => navigate("/")}
          >
            Go to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export function PaymentError() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="p-6 w-full max-w-md shadow-lg dark:bg-gray-800">
        <CardContent className="flex flex-col items-center text-center">
          <Player
            autoplay
            loop={true}
            src={error}
            style={{ height: "150px", width: "150px" }}
          />
          <h2 className="text-2xl font-semibold mt-4 dark:text-white">
            Payment Failed
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Your payment could not be processed. Please check your payment
            details and try again.
          </p>
          <Button
            className="mt-6 w-full bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white"
            onClick={() => navigate("/")} // Navigate back to the payment page
          >
            Go to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
