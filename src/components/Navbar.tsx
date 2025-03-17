
import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-12",
      isScrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-2xl font-display font-semibold tracking-tight transition-colors">
          <span className="text-primary">Málaga</span> Driver Hub
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#services" className="text-sm font-medium transition-colors hover:text-primary">Services</a>
          <a href="#booking" className="text-sm font-medium transition-colors hover:text-primary">Book Now</a>
          <a href="#testimonials" className="text-sm font-medium transition-colors hover:text-primary">Testimonials</a>
          <a href="#about" className="text-sm font-medium transition-colors hover:text-primary">About Us</a>
          <Button asChild variant="outline" className="rounded-full">
            <a href="tel:+34600000000">
              <Phone className="mr-2 h-4 w-4" /> +34 600 000 000
            </a>
          </Button>
        </nav>
        
        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-gray-700 hover:text-primary focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <div className={cn(
        "fixed inset-0 z-40 bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out transform md:hidden",
        isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
      )}>
        <div className="flex flex-col h-full pt-20 px-8 pb-8 space-y-8">
          <a 
            href="#services" 
            className="text-xl font-medium transition-colors hover:text-primary"
            onClick={toggleMenu}
          >
            Services
          </a>
          <a 
            href="#booking" 
            className="text-xl font-medium transition-colors hover:text-primary"
            onClick={toggleMenu}
          >
            Book Now
          </a>
          <a 
            href="#testimonials" 
            className="text-xl font-medium transition-colors hover:text-primary"
            onClick={toggleMenu}
          >
            Testimonials
          </a>
          <a 
            href="#about" 
            className="text-xl font-medium transition-colors hover:text-primary"
            onClick={toggleMenu}
          >
            About Us
          </a>
          <div className="mt-auto pt-8">
            <Button asChild size="lg" className="w-full rounded-full">
              <a href="tel:+34600000000">
                <Phone className="mr-2 h-4 w-4" /> Call Now: +34 600 000 000
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
