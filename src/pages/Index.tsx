
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import BookingForm from '@/components/BookingForm';
import TestimonialsSection from '@/components/TestimonialsSection';
import AboutSection from '@/components/AboutSection';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Smooth scroll to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (!targetId) return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        // Use getBoundingClientRect instead of offsetTop
        const top = targetElement.getBoundingClientRect().top + window.scrollY - 80;
        
        window.scrollTo({
          top,
          behavior: 'smooth'
        });
      });
    });

    // Scroll to section if hash is present in URL
    if (window.location.hash) {
      const targetElement = document.querySelector(window.location.hash);
      if (targetElement) {
        setTimeout(() => {
          const top = targetElement.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({
            top,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative" // Add relative position to fix framer-motion warning
    >
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <BookingForm />
      <TestimonialsSection />
      <AboutSection />
      <CtaSection />
      <Footer />
    </motion.div>
  );
};

export default Index;
