/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AlertCircle, MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

import LoaderText from "@/components/base/loading-btn";
import handleImageError from "@/components/error/ImageError";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import config from "@/config";
import { handleApiError } from "@/redux/errorType";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { ITokenData } from "@/redux/features/auth/types";
import CheckOutButton from "@/redux/features/order/CheckoutButton";
import { usePaymentMutation } from "@/redux/features/order/orderApi";
import { useGetSingleProductQuery } from "@/redux/features/product/productApi";
import { TProduct } from "@/redux/features/product/types";
import { useAppSelector } from "@/redux/hook";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router";
import { toast } from "sonner";

const stripePromise = loadStripe(config.SP_KEY);

export default function CheckoutPage() {
  const { id: productId } = useParams();
  const user = useAppSelector(useCurrentUser) as ITokenData;
  const [quantity, setQuantity] = useState(1);
  const [clientSecret, setClientSecret] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog state
  const { data, isLoading, error } = useGetSingleProductQuery(productId);
  const [createOrder, { isLoading: isLoadingPayment }] = usePaymentMutation();

  if (isLoading) return <ProductDetailSkeleton />;
  if (error) {
    toast.error(handleApiError(error));
    return <ProductDetailError />;
  }

  const { _id, name, model, price, stock, category, images } =
    data?.data as TProduct;

  const placeOrder = async () => {
    try {
      const values = {
        amount: price * quantity,
        data: { productId: _id, price, quantity, email: user.email },
      };
      const res = await createOrder(values).unwrap();
      if (!isLoadingPayment && res.success) {
        setClientSecret(res.data.clientSecret);
        setIsDialogOpen(true); // Open the dialog
      }
    } catch (err: any) {
      if (err.response && err.response.data) {
        toast.error(err.response.data.message || "Something went wrong", {
          duration: 3000,
        });
      } else {
        toast.error(err.message || "Something went wrong", { duration: 3000 });
      }
    }
  };

  const increaseQuantity = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const subtotal = price * quantity;
  const shipping = 10;
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto p-4 my-6">
      <Card className="grid grid-cols-1 md:grid-cols-3 gap-1 pt-4">
        {/* Product details and order summary */}
        <CardContent className="col-span-2 w-full rounded-lg overflow-hidden">
          <img
            loading="lazy"
            src={images[0]}
            alt={name}
            className="w-full h-full object-cover object-center rounded-lg"
            onError={handleImageError}
          />
        </CardContent>
        <div>
          {/* Product details */}
          <CardContent className="space-y-3 mt-4">
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-muted-foreground">Model: {model}</p>
            <p className="text-muted-foreground">Category: {category}</p>
            <p className="text-xl font-semibold">${price.toFixed(2)}</p>
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="secondary">
                {stock > 0 ? `${stock} in stock` : "Out of stock"}
              </Badge>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decreaseQuantity}
                  disabled={quantity === 1}
                >
                  <MinusIcon className="h-4 w-4" />
                </Button>
                <span className="mx-4 text-lg">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={increaseQuantity}
                  disabled={quantity === stock}
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>

          {/* Order Summary */}
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>

          {/* Payment Button */}
          <CardFooter>
            <Button className="w-full" size="lg" onClick={placeOrder}>
              <LoaderText isLoading={isLoadingPayment} text="Pay now" />
            </Button>
          </CardFooter>
        </div>
      </Card>

      {/* Stripe Elements Wrapper */}
      <Elements stripe={stripePromise}>
        {clientSecret && (
          <CheckOutButton
            isOpen={isDialogOpen} // Pass dialog state
            onOpenChange={setIsDialogOpen} // Pass state setter
            clientSecret={clientSecret}
          />
        )}
      </Elements>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        {/* Image Skeleton */}
        <div className="col-span-2 w-full rounded-lg overflow-hidden">
          <Skeleton className="w-full h-64 md:h-96 rounded-lg" />
        </div>

        {/* Details Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-8 w-1/4" />

          {/* Quantity Selector Skeleton */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>

          {/* Order Summary Skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>

          {/* Button Skeleton */}
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function ProductDetailError({
  errorMessage = "An error occurred while loading the product details.",
}) {
  return (
    <div className="container mx-auto p-4 py-44">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{errorMessage}</AlertDescription>
      </Alert>
    </div>
  );
}
