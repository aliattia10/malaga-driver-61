
import { useState, useEffect } from 'react';
import { Menu, X, Phone, Plane, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';

const locationOptions = [
  { name: "Málaga Airport", icon: <Plane className="h-4 w-4 mr-2" /> },
  { name: "Málaga City Center", icon: <MapPin className="h-4 w-4 mr-2" /> },
  { name: "Custom Location", icon: <MapPin className="h-4 w-4 mr-2" /> },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  
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
  
  const handleLocationSelect = (location: string) => {
    console.log(`Selected location: ${location}`);
    // Scroll to booking form
    const bookingElement = document.querySelector('#booking');
    if (bookingElement) {
      window.scrollTo({
        top: bookingElement.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth'
      });
      
      // Here you could also pre-fill the pickup location in the booking form
      // This would require lifting state up or using a context/state management
    }
  };
  
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
        <nav className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium transition-colors hover:text-primary">Locations</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 p-4 w-[220px]">
                    {locationOptions.map((location) => (
                      <li key={location.name}>
                        <NavigationMenuLink asChild>
                          <Button 
                            variant="ghost" 
                            className="w-full justify-start py-2 px-3 rounded-md hover:bg-accent"
                            onClick={() => handleLocationSelect(location.name)}
                          >
                            {location.icon}
                            {location.name}
                          </Button>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
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
        <div className="flex flex-col h-full pt-20 px-8 pb-8 space-y-6">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-muted-foreground mb-2">Locations</p>
            {locationOptions.map((location) => (
              <Button 
                key={location.name}
                variant="ghost" 
                className="w-full justify-start py-3 mb-1"
                onClick={() => {
                  handleLocationSelect(location.name);
                  toggleMenu();
                }}
              >
                {location.icon}
                {location.name}
              </Button>
            ))}
          </div>
          
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
