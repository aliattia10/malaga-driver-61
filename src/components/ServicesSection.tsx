
import { motion } from 'framer-motion';
import { Car, Calendar, Globe, UserCheck, Clock, Headphones } from 'lucide-react';
import { cn } from '@/lib/utils';

const services = [
  {
    icon: <Car className="h-10 w-10" />,
    title: "Airport Transfers Málaga",
    description: "Professional driver services for reliable pickup and drop-off at Málaga Airport. We track your flight to ensure we're there when you arrive.",
  },
  {
    icon: <Calendar className="h-10 w-10" />,
    title: "Private Day Trips",
    description: "Hire a private driver for day trips across Andalusia with knowledgeable local drivers who know the best routes and hidden gems.",
  },
  {
    icon: <Globe className="h-10 w-10" />,
    title: "Custom Sightseeing Tours",
    description: "Book personalized sightseeing tours with a private driver around Málaga and Costa del Sol to visit historical sites and beaches.",
  },
  {
    icon: <UserCheck className="h-10 w-10" />,
    title: "Corporate Transportation",
    description: "Professional driver services for business meetings, conferences, and corporate events throughout the Málaga region.",
  },
  {
    icon: <Clock className="h-10 w-10" />,
    title: "Hourly Driver Hire",
    description: "Flexible hourly booking options when you need to hire a private driver for a few hours or for the whole day in Málaga.",
  },
  {
    icon: <Headphones className="h-10 w-10" />,
    title: "24/7 Driver Support",
    description: "Around-the-clock customer service to assist with any questions or changes to your private driver booking in Málaga.",
  },
];

const ServicesSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="services" className="py-24">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block py-1 px-3 mb-4 text-xs font-medium uppercase tracking-wider text-primary-foreground bg-primary rounded-full">Our Driver Services</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Professional Private Driver Services in Málaga
          </h2>
          <p className="text-lg text-muted-foreground">
            Hire experienced drivers for a range of professional transportation services tailored to your needs
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className={cn(
                "group glass-card p-6 rounded-2xl hover-lift",
                index === 0 && "md:border-primary/30"
              )}
              variants={childVariants}
            >
              <div className="text-primary mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
