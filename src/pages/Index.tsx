import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import IngredientsSection from "@/components/IngredientsSection";
import TransformationSection from "@/components/TransformationSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PhilosophySection from "@/components/PhilosophySection";
import FAQSection from "@/components/FAQSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ProductsSection />
      <IngredientsSection />
      <TransformationSection />
      <TestimonialsSection />
      <PhilosophySection />
      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default Index;
