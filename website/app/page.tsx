import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero";
import Category from "@/components/Category/Category";
import FeaturedProducts from "@/components/Product/FeaturedProducts";
import BestSellerBanner from "@/components/Common/BestSellerBanner";
import Footer from "@/components/Common/Footer";
import Features from "@/components/Common/Features";
import Testimonials from "@/components/Common/Testimonials";
import Newsletter from "@/components/Common/Newsletter";
import FadeIn from "@/components/Common/FadeIn";

export default function Home() {
  return (
    <>
      <Navbar />
      <FadeIn>
        <Hero />
      </FadeIn>
      <FadeIn delay={0.1}>
              <Category />
      </FadeIn>
      <FadeIn delay={0.2}>
        <FeaturedProducts />
      </FadeIn>
      <FadeIn delay={0.3}>
        <BestSellerBanner />
      </FadeIn>
      <FadeIn delay={0.4}>
        <Features />
      </FadeIn>
      <FadeIn delay={0.5}>
        <Testimonials />
      </FadeIn>
      <FadeIn delay={0.6}>
        <Newsletter />
      </FadeIn>
      <Footer />
    </>
  );
}