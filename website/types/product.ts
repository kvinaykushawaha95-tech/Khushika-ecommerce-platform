export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  images?: string[];
  rating: number;
  category: string;
  stock: number;
}
