
import { useState, useEffect } from 'react';
import { Menu, X, Phone, Plane, MapPin, Edit, Globe } from 'lucide-react';
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
import { useLanguage } from '@/hooks/useLanguage';

const locationOptions = [
  { name: "Málaga Airport", icon: <Plane className="h-4 w-4 mr-2" /> },
  { name: "Málaga City Center", icon: <MapPin className="h-4 w-4 mr-2" /> },
  { name: "Custom Location", icon: <Edit className="h-4 w-4 mr-2" /> },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  
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
      
      // If we had a global state manager, we could update the pickup location here
      // For now we'll add a small delay and try to set the value using DOM methods
      setTimeout(() => {
        // Find select element and set the value
        const pickupSelect = document.querySelector('[id^="radix-:"][aria-expanded="false"]');
        if (pickupSelect && pickupSelect instanceof HTMLElement) {
          pickupSelect.click();
          // This is not ideal, but for demonstration. In a real app, use a state manager
        }
      }, 800);
    }
  };

  const handleLanguageSwitch = (lang: 'en' | 'es') => {
    setLanguage(lang);
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
                <NavigationMenuTrigger className="text-sm font-medium transition-colors hover:text-primary">
                  {t('navbar.locations')}
                </NavigationMenuTrigger>
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
                            {t(`locations.${location.name.toLowerCase().replace(/\s+/g, '_')}`)}
                          </Button>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <a href="#services" className="text-sm font-medium transition-colors hover:text-primary">{t('navbar.services')}</a>
          <a href="#booking" className="text-sm font-medium transition-colors hover:text-primary">{t('navbar.book_now')}</a>
          <a href="#testimonials" className="text-sm font-medium transition-colors hover:text-primary">{t('navbar.testimonials')}</a>
          <a href="#about" className="text-sm font-medium transition-colors hover:text-primary">{t('navbar.about_us')}</a>
          <Button asChild variant="outline" className="rounded-full">
            <a href="tel:+34620173295">
              <Phone className="mr-2 h-4 w-4" /> +34 620 173 295
            </a>
          </Button>
        </nav>
        
        {/* Language Switcher - Top Right */}
        <div className="relative z-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="rounded-full border-primary text-primary hover:bg-primary/10">
                <Globe className="h-4 w-4 mr-2" /> 
                {language === 'en' ? 'EN' : 'ES'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleLanguageSwitch('en')} className={language === 'en' ? "bg-primary/10" : ""}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLanguageSwitch('es')} className={language === 'es' ? "bg-primary/10" : ""}>
                Español
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

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
          <div className="flex space-x-4 mb-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleLanguageSwitch('en')}
              className={cn("flex-1", language === 'en' ? "bg-primary/10 border-primary text-primary" : "")}
            >
              English
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleLanguageSwitch('es')}
              className={cn("flex-1", language === 'es' ? "bg-primary/10 border-primary text-primary" : "")}
            >
              Español
            </Button>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-semibold text-muted-foreground mb-2">{t('navbar.locations')}</p>
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
                {t(`locations.${location.name.toLowerCase().replace(/\s+/g, '_')}`)}
              </Button>
            ))}
          </div>
          
          <a 
            href="#services" 
            className="text-xl font-medium transition-colors hover:text-primary"
            onClick={toggleMenu}
          >
            {t('navbar.services')}
          </a>
          <a 
            href="#booking" 
            className="text-xl font-medium transition-colors hover:text-primary"
            onClick={toggleMenu}
          >
            {t('navbar.book_now')}
          </a>
          <a 
            href="#testimonials" 
            className="text-xl font-medium transition-colors hover:text-primary"
            onClick={toggleMenu}
          >
            {t('navbar.testimonials')}
          </a>
          <a 
            href="#about" 
            className="text-xl font-medium transition-colors hover:text-primary"
            onClick={toggleMenu}
          >
            {t('navbar.about_us')}
          </a>
          <div className="mt-auto pt-8">
            <Button asChild size="lg" className="w-full rounded-full">
              <a href="tel:+34620173295">
                <Phone className="mr-2 h-4 w-4" /> {t('navbar.call_now')}: +34 620 173 295
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
