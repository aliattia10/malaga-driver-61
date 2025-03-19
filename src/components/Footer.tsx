
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Clock } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary pt-16 pb-8">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-display font-semibold mb-4">
              <span className="text-primary">Málaga</span> Driver Hub
            </h3>
            <p className="text-muted-foreground mb-6">
              Premium private driver services in Málaga and Costa del Sol. Professional, reliable, and comfortable transportation.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Airport Transfers</a>
              </li>
              <li>
                <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Day Trips</a>
              </li>
              <li>
                <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Sightseeing Tours</a>
              </li>
              <li>
                <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Corporate Services</a>
              </li>
              <li>
                <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Hourly Hire</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">+34 620 173 295</span>
              </li>
              <li className="flex items-start">
                <Mail className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">malagadriverhub@gmail.com</span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Av. del Comandante García Morato s/n, Churriana, 29004 Málaga, Andalucía, España</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Business Hours</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Clock className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Monday - Friday</p>
                  <p className="text-muted-foreground">8:00 AM - 8:00 PM</p>
                </div>
              </li>
              <li className="flex items-start">
                <Clock className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Saturday - Sunday</p>
                  <p className="text-muted-foreground">9:00 AM - 6:00 PM</p>
                </div>
              </li>
              <li className="text-sm mt-4 text-muted-foreground">
                <p>24/7 service available for pre-booked airport transfers and special requests.</p>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              &copy; {currentYear} Málaga Driver Hub. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
