import AboutSection from "../components/aboutPageSections/AboutUs";
import FaqSection from "../components/aboutPageSections/FaqSection";
import TestimonialsSection from "../components/aboutPageSections/UserTestimonials";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <AboutSection />
      <TestimonialsSection />
      <FaqSection />
      <Footer />
    </main>
  );
}
