
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "David Thompson",
    role: "Business Traveler",
    text: "The service was impeccable. My driver was on time, professional, and knew the best routes to avoid traffic. I'll definitely use Málaga Driver Hub for all my business trips.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
  },
  {
    name: "Emma Rodriguez",
    role: "Tourist",
    text: "We hired a driver for a day trip to Ronda and it was the highlight of our vacation. Our driver was knowledgeable about the area and showed us places we would have never found on our own.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
  },
  {
    name: "Michael Chen",
    role: "Family Vacation",
    text: "As a family of five, finding transportation can be challenging. Our driver was accommodating, patient, and made sure our kids were comfortable. The vehicle was spacious and immaculate.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
  },
  {
    name: "Sophia Garcia",
    role: "Local Resident",
    text: "I needed a reliable driver for a special event and Málaga Driver Hub exceeded my expectations. The booking process was smooth, the price was fair, and the service was exceptional.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayTimeoutRef = useRef<number | null>(null);

  const nextTestimonial = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (autoplay) {
      autoplayTimeoutRef.current = window.setTimeout(nextTestimonial, 5000);
    }
    
    return () => {
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
      }
    };
  }, [autoplay, current]);

  const handleManualNavigation = (callback: () => void) => {
    setAutoplay(false);
    callback();
    
    // Resume autoplay after 10 seconds of inactivity
    const timeout = setTimeout(() => {
      setAutoplay(true);
    }, 10000);
    
    return () => clearTimeout(timeout);
  };

  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block py-1 px-3 mb-4 text-xs font-medium uppercase tracking-wider text-primary-foreground bg-primary rounded-full">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Hear from our satisfied customers about their experience with Málaga Driver Hub
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          <div className="glass-card rounded-2xl p-8 md:p-10 overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="flex flex-col md:flex-row gap-8 items-center text-center md:text-left"
                initial={{ opacity: 0, x: 100 }}
                animate={{ 
                  opacity: current === index ? 1 : 0,
                  x: current === index ? 0 : 100,
                  position: current === index ? 'relative' : 'absolute',
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ display: current === index ? 'flex' : 'none' }}
              >
                <div className="flex-shrink-0">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-primary/20"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-center md:justify-start mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="text-lg mb-4 italic">"{testimonial.text}"</blockquote>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full hover-lift"
              onClick={() => handleManualNavigation(prevTestimonial)}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    current === index ? "bg-primary scale-125" : "bg-primary/30"
                  }`}
                  onClick={() => {
                    setAutoplay(false);
                    setCurrent(index);
                  }}
                  aria-label={`Go to testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
            
            <Button
              variant="outline"
              size="icon"
              className="rounded-full hover-lift"
              onClick={() => handleManualNavigation(nextTestimonial)}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
