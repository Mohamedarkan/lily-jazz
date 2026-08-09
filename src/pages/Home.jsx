import React from "react";
import FloatingParticles from "@/components/FloatingParticles";
import Hero from "@/components/sections/Hero";
import MenuSection from "@/components/sections/MenuSection";
import OurStory from "@/components/sections/OurStory";
import Gallery from "@/components/sections/Gallery";
import LocationSection from "@/components/sections/LocationSection";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="relative min-h-screen ink-texture">
      <FloatingParticles />
      <Navbar />
      <div className="relative z-10">
        <Hero />
        <MenuSection />
        <div className="staff-line max-w-5xl mx-auto" />
        <OurStory />
        <div className="staff-line max-w-5xl mx-auto" />
        <Gallery />
        <div className="staff-line max-w-5xl mx-auto" />
        <LocationSection />
        <div className="staff-line max-w-5xl mx-auto" />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}