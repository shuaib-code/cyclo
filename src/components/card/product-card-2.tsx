import { HeartIcon, ShoppingCart } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

export default function ProductCardSimple({ product }) {
  return (
    <Card className="w-full max-w-xl group relative space-y-4 overflow-hidden">
      <figure className="group-hover:opacity-90">
        <Button
          variant="ghost"
          size="icon"
          className="bg-white/70 absolute top-3 end-3 rounded-full dark:text-black"
        >
          <HeartIcon className="size-4" />
        </Button>
        <img
          src="https://media.trekbikes.com/image/upload/w_1920,h_1440,c_pad,f_auto,fl_progressive:semi,q_auto/4x3_RoadBuydersguide_04"
          alt={product.title}
          className="object-contain transition ease-in-out duration-300 hover:scale-110 hover:rotate-3"
        />
      </figure>
      <CardContent className="px-4 py-0">
        <div className="flex justify-between">
          <div>
            <h3 className="text-base">
              <Link to={product.href}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name}
              </Link>
            </h3>
            <p className="text-sm text-muted-foreground">{product.category}</p>
          </div>
          <p className="text-lg font-semibold">{product.price}</p>
        </div>
      </CardContent>
      <CardFooter className="p-0 border-t mb-0">
        <Button variant={"ghost"} className="w-full">
          <ShoppingCart className="size-4 me-1" /> Buy now
        </Button>
      </CardFooter>
    </Card>
  );
}
