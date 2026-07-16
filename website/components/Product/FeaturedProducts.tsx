import ProductCard from "./ProductCard";
import { products } from "@/lib/products";

export default function FeaturedProducts() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-6">Featured Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}