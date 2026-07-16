import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Category from "@/components/Category/Category";
import FeaturedProduct from "@/components/Product/FeaturedProducts";
import FeaturedProducts from "@/components/Product/FeaturedProducts";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Category />
      <FeaturedProducts/>
    </>
  );
}