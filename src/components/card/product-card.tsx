import placeholder from "@/assets/placeholder.svg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TProduct } from "@/redux/features/product/types";
import { Star } from "lucide-react";
import { useNavigate } from "react-router";
import handleImageError from "../error/ImageError";

export function ProductCard({ product }: { product: TProduct }) {
  const navigate = useNavigate();
  const { _id, description, images, name, price, rating, stock } = product;
  const viewDetais = () => navigate(`/product/${_id}`);
  const handleOrder = () => navigate(`/checkout/${_id}`);

  return (
    <Card className="flex flex-col h-full w-full transition ease-in-out duration-300 hover:drop-shadow-md">
      <div className="w-full max-h-56 rounded-lg overflow-hidden">
        <img
          loading="lazy"
          src={images[0] || placeholder}
          alt={name}
          className="w-full h-full object-cover object-center transition ease-in-out duration-300 hover:scale-110 hover:rotate-3"
          onError={handleImageError}
        />
      </div>
      <CardContent className="flex-grow flex flex-col justify-between p-4 space-y-2">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{name}</h3>
          <Ratings rating={rating} />
          <p className="text-sm text-muted-foreground">
            {description.slice(0, 190)}...
          </p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">${price.toFixed(2)}</span>
          {stock ? (
            <Badge
              variant="secondary"
              className="font-semibold bg-green-500 hover:bg-green-500/70 text-white"
            >
              In Stock
            </Badge>
          ) : (
            <Badge variant="destructive" className="font-semibold">
              Out of Stock
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="px-4 pb-4 grid grid-cols-5 gap-4">
        <Button variant="outline" className="col-span-2" onClick={viewDetais}>
          View Details
        </Button>
        <Button className="col-span-3" onClick={handleOrder}>
          Buy now
        </Button>
      </CardFooter>
    </Card>
  );
}

function Ratings({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(rating)
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }`}
        />
      ))}
      <span className="text-sm text-muted-foreground">({rating})</span>
    </div>
  );
}
