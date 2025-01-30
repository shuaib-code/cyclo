import placeholder from "@/assets/placeholder.svg";
import handleImageError from "@/components/error/ImageError";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { handleApiError } from "@/redux/errorType";
import { useGetSingleProductQuery } from "@/redux/features/product/productApi";
import { TProduct } from "@/redux/features/product/types";
import { format } from "date-fns";
import { AlertCircle, Check, ShoppingCart, Star } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const features = [
  "Lightweight carbon fiber frame for optimal strength-to-weight ratio",
  "Advanced RockShox suspension for smooth rides on rough trails",
  "Shimano XT drivetrain for precise and reliable shifting",
  "Hydraulic disc brakes for powerful stopping in all conditions",
  "Tubeless-ready wheels for improved traction and puncture resistance",
];

export default function ProductDetails() {
  // const [showImage, setShowImage] = useState("");
  const navigate = useNavigate();
  const { id: productId } = useParams();
  const { data, isLoading, error } = useGetSingleProductQuery(productId);
  if (isLoading) return <ProductDetailsSkeletion />;
  if (error) {
    toast.error(handleApiError(error));
    return <ErrorComponent />;
  }
  const {
    _id,
    name,
    brand,
    model,
    price,
    stock,
    category,
    images,
    description,
    rating,
    createdAt,
  } = data?.data as TProduct;

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "";

    return format(new Date(dateString), "MMMM dd, yyyy");
  };
  const handleOrder = () => navigate(`/prodcut/${_id}`);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <Card className="overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Image Section */}
            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  loading="lazy"
                  src={images[0] || placeholder}
                  alt={name}
                  className="transition-transform duration-300 hover:scale-105 object-cover"
                  onError={handleImageError}
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="relative overflow-hidden rounded-md">
                    <img
                      loading="lazy"
                      src={images[i] || placeholder}
                      alt={`${name} thumbnail ${i + 1}`}
                      className="transition-transform duration-300 hover:scale-105 object-cover"
                      onError={handleImageError}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details Section */}
            <div className="flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    {name}
                  </h1>
                  <p className="text-xl text-muted-foreground mb-2">{model}</p>
                </div>
              </div>
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
                <span className="ml-2 text-muted-foreground">({rating}/5)</span>
              </div>

              {/* Price */}
              <p className="text-4xl font-bold text-foreground mb-6">
                {formatPrice(price)}
              </p>

              {/* Stock and Date */}
              <div className="space-y-4 mb-6">
                <p className="text-green-600 flex items-center">
                  <Check className="mr-2" /> In stock: {stock} available
                </p>
                <p className="text-muted-foreground">
                  Added on: {formatDate(createdAt)}
                </p>
              </div>

              {/* Add to Cart Button */}
              <Button className="w-full mb-6" size="lg" onClick={handleOrder}>
                <ShoppingCart className="mr-2 h-5 w-5" /> Buy now
              </Button>

              {/* Tabs for Description and Features */}
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="mt-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Product Description
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </TabsContent>
                <TabsContent value="features" className="mt-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Key Features
                  </h2>
                  <ul className="list-disc pl-5 space-y-2">
                    {features.map((feature, index) => (
                      <li key={index} className="text-muted-foreground">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="details" className="mt-6">
                  <h2 className="text-xl text-left font-bold text-foreground mb-4">
                    Details
                  </h2>
                  <table className="w-full text-left">
                    <tbody className="divide-y divide-border">
                      {/* Brand */}
                      <tr>
                        <td className="px-4 py-3 text-muted-foreground font-medium">
                          Brand
                        </td>
                        <td className="px-4 py-3 text-foreground">{brand}</td>
                      </tr>
                      {/* Model */}
                      <tr>
                        <td className="px-4 py-3 text-muted-foreground font-medium">
                          Model
                        </td>
                        <td className="px-4 py-3 text-foreground">{model}</td>
                      </tr>
                      {/* Category */}
                      <tr>
                        <td className="px-4 py-3 text-muted-foreground font-medium">
                          Category
                        </td>
                        <td className="px-4 py-3 text-foreground">
                          <Badge variant="outline" className="text-sm">
                            {category}
                          </Badge>
                        </td>
                      </tr>
                      {/* Price */}
                      <tr>
                        <td className="px-4 py-3 text-muted-foreground font-medium">
                          Price
                        </td>
                        <td className="px-4 py-3 text-foreground font-semibold">
                          {formatPrice(price)}
                        </td>
                      </tr>
                      {/* Stock */}
                      <tr>
                        <td className="px-4 py-3 text-muted-foreground font-medium">
                          Stock
                        </td>
                        <td className="px-4 py-3 text-foreground">
                          <span
                            className={`${
                              stock > 0 ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {stock > 0 ? `${stock} available` : "Out of stock"}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-muted-foreground font-medium">
                          Material
                        </td>
                        <td className="px-4 py-3 text-foreground">
                          High-quality material
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-muted-foreground font-medium">
                          Technology
                        </td>
                        <td className="px-4 py-3 text-foreground">
                          Advanced AeroDynamic technology
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function ProductDetailsSkeletion() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <Card className="overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Image Section Skeleton */}
            <div className="space-y-6">
              <Skeleton className="relative aspect-square rounded-lg" />
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="aspect-square rounded-md" />
                ))}
              </div>
            </div>

            {/* Product Details Section Skeleton */}
            <div className="flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <Skeleton className="h-8 w-48 mb-2" />
                  <Skeleton className="h-6 w-32" />
                </div>
                <Skeleton className="h-6 w-20" />
              </div>

              {/* Rating Skeleton */}
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="w-6 h-6 rounded-full mr-1" />
                ))}
                <Skeleton className="h-6 w-12 ml-2" />
              </div>

              {/* Price Skeleton */}
              <Skeleton className="h-10 w-32 mb-6" />

              {/* Stock and Date Skeleton */}
              <div className="space-y-4 mb-6">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-6 w-56" />
              </div>

              {/* Add to Cart Button Skeleton */}
              <Skeleton className="h-12 w-full mb-6" />

              {/* Tabs Skeleton */}
              <div className="w-full">
                <div className="grid w-full grid-cols-2 gap-2 mb-6">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <Skeleton className="h-24 w-full" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function ErrorComponent() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen mt-32 bg-background py-8 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <Card className="overflow-hidden p-6 lg:p-8 text-center dark:bg-gray-800 dark:border-gray-700">
          <AlertCircle className="w-12 h-12 text-red-500 dark:text-red-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-foreground dark:text-white mb-4">
            No Product Found
          </h1>
          <p className="text-muted-foreground dark:text-gray-300 mb-6">
            The product you are looking for does not exist or has been removed.
          </p>
          <Button
            size="lg"
            className="dark:bg-gray-700 dark:text-white"
            onClick={() => navigate("/")}
          >
            Go to Home
          </Button>
        </Card>
      </div>
    </div>
  );
}
