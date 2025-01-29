export type TProduct = {
  _id: string;
  name: string;
  brand: string;
  model: string;
  price: number;
  stock: number;
  category: string;
  images: string[];
  description: string;
  rating: number;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};
