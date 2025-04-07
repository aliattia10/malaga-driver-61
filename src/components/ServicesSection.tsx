
import { motion } from 'framer-motion';
import { Car, Calendar, Globe, UserCheck, Clock, Headphones } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/useLanguage';

const ServicesSection = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: <Car className="h-10 w-10" />,
      title: t('services.airport_transfers.title'),
      description: t('services.airport_transfers.description'),
    },
    {
      icon: <Calendar className="h-10 w-10" />,
      title: t('services.day_trips.title'),
      description: t('services.day_trips.description'),
    },
    {
      icon: <Globe className="h-10 w-10" />,
      title: t('services.custom_tours.title'),
      description: t('services.custom_tours.description'),
    },
    {
      icon: <UserCheck className="h-10 w-10" />,
      title: t('services.corporate.title'),
      description: t('services.corporate.description'),
    },
    {
      icon: <Clock className="h-10 w-10" />,
      title: t('services.hourly.title'),
      description: t('services.hourly.description'),
    },
    {
      icon: <Headphones className="h-10 w-10" />,
      title: t('services.support.title'),
      description: t('services.support.description'),
    },
  ];

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
          <span className="inline-block py-1 px-3 mb-4 text-xs font-medium uppercase tracking-wider text-primary-foreground bg-primary rounded-full">{t('services.badge')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('services.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('services.subtitle')}
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
