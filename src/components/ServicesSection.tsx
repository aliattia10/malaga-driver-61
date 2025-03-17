
import { motion } from 'framer-motion';
import { Car, Calendar, Globe, UserCheck, Clock, Headphones } from 'lucide-react';
import { cn } from '@/lib/utils';

const services = [
  {
    icon: <Car className="h-10 w-10" />,
    title: "Airport Transfers",
    description: "Reliable pickup and drop-off services at Málaga Airport. We track your flight to ensure we're there when you arrive.",
  },
  {
    icon: <Calendar className="h-10 w-10" />,
    title: "Day Trips",
    description: "Explore Andalusia's beautiful cities and towns with a knowledgeable driver who knows the best routes and spots.",
  },
  {
    icon: <Globe className="h-10 w-10" />,
    title: "Sightseeing Tours",
    description: "Custom sightseeing tours around Málaga and Costa del Sol. Visit historical sites, beaches, and hidden gems.",
  },
  {
    icon: <UserCheck className="h-10 w-10" />,
    title: "Corporate Services",
    description: "Professional transportation for business meetings, conferences, and corporate events in the Málaga area.",
  },
  {
    icon: <Clock className="h-10 w-10" />,
    title: "Hourly Hire",
    description: "Flexible hourly booking options for when you need a driver for a few hours or for the whole day.",
  },
  {
    icon: <Headphones className="h-10 w-10" />,
    title: "24/7 Support",
    description: "Around-the-clock customer service to assist with any questions or changes to your booking.",
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
          <span className="inline-block py-1 px-3 mb-4 text-xs font-medium uppercase tracking-wider text-primary-foreground bg-primary rounded-full">Our Services</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Premium Transportation Services in Málaga
          </h2>
          <p className="text-lg text-muted-foreground">
            We offer a range of professional driver services tailored to your needs
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
