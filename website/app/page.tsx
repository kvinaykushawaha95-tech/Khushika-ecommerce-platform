import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero";
import Category from "@/components/Category/Category";
import FeaturedProducts from "@/components/Product/FeaturedProducts";
import BestSellerBanner from "@/components/Common/BestSellerBanner";
import Footer from "@/components/Common/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Category />
      <FeaturedProducts />
      <BestSellerBanner />
      <Footer />
    </>
  );
}