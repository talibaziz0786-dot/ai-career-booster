import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import FloatingParticles from "../components/ui/FloatingParticles";
import Hero from "../components/landing/Hero";
import TrustedCompanies from "../components/landing/TrustedCompanies";
import Stats from "../components/landing/Stats";
import Features from "../components/landing/Features";
import ResumeShowcase from "../components/landing/ResumeShowcase";
import ATSShowcase from "../components/landing/ATSShowcase";
import Testimonials from "../components/landing/Testimonials";
import Pricing from "../components/landing/Pricing";
import FAQ from "../components/landing/FAQ";
import FloatingOrbs from "../components/ui/FloatingOrbs";

export default function HomePage() {
  return (
<div
  className="
  min-h-screen
  bg-slate-50
  text-slate-900

  dark:bg-slate-950
  dark:text-white

  transition-colors
  duration-300
  "
>
      <FloatingOrbs />

      <Navbar />
        <FloatingParticles />
      <Hero />

          
      <Stats />

      <TrustedCompanies />


      <Features />

      <ResumeShowcase />

      <ATSShowcase />

      <Testimonials />

      <Pricing />

      <FAQ />

      <Footer />
    </div>
  );
}