
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import PricingSection from '@/components/PricingSection';
import ContactButtons from '@/components/ContactButtons';
import TestimonialsSection from '@/components/TestimonialsSection';
import AboutSection from '@/components/AboutSection';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

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
      <Helmet>
        <title>Hire Private Drivers in Málaga | Airport Transfers & Custom Tours</title>
        <meta name="description" content="Book professional private drivers in Málaga for airport transfers, day trips, and custom tours. Safe and reliable transportation services across Costa del Sol." />
        <meta name="keywords" content="hire driver Málaga, private driver, Málaga airport transfer, Costa del Sol transportation, professional driver service, driver for hire" />
        <link rel="canonical" href="https://malagadriverhub.com" />
        <meta property="og:title" content="Hire Private Drivers in Málaga | Airport Transfers & Custom Tours" />
        <meta property="og:description" content="Book professional private drivers in Málaga for airport transfers, day trips, and custom tours. Safe and reliable transportation services across Costa del Sol." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://malagadriverhub.com" />
        <meta property="og:image" content="/og-image.png" />
      </Helmet>
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <PricingSection />
      <ContactButtons />
      <TestimonialsSection />
      <AboutSection />
      <CtaSection />
      <Footer />
      <WhatsAppButton />
    </motion.div>
  );
};

export default Index;
