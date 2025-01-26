import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star } from "lucide-react";

interface ProductCardProps {
  image: string;
  title: string;
  rating: number;
  description: string;
  price: number;
  inStock?: boolean;
}

export function ProductCard({
  image,
  title,
  rating,
  description,
  price,
  inStock = true,
}: ProductCardProps) {
  return (
    <Card className="h-full transition ease-in-out duration-300 hover:drop-shadow-md">
      <div className="w-full max-h-72 rounded-lg overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="object-contain transition ease-in-out duration-300 hover:scale-110 hover:rotate-3"
        />
      </div>
      <CardContent className="p-4 space-y-4">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <Ratings rating={rating} />
        <p className="text-muted-foreground">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold">${price.toFixed(2)}</span>
          {inStock ? (
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
        <Button variant="outline" className="col-span-2">
          View Details
        </Button>
        <Button className="col-span-3">Buy now</Button>
      </CardFooter>
    </Card>
  );
}

function Ratings({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-2">
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
