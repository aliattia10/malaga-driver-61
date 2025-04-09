
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ShieldCheck, Clock, Users, Map } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const AboutSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  const benefits = [
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: t('about.benefits.safe_drivers.title'),
      description: t('about.benefits.safe_drivers.description'),
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: t('about.benefits.punctual.title'),
      description: t('about.benefits.punctual.description'),
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: t('about.benefits.expertise.title'),
      description: t('about.benefits.expertise.description'),
    },
    {
      icon: <Map className="h-6 w-6" />,
      title: t('about.benefits.custom.title'),
      description: t('about.benefits.custom.description'),
    },
  ];
  
  return (
    <section id="about" className="py-24 bg-accent overflow-hidden" ref={sectionRef}>
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block py-1 px-3 mb-4 text-xs font-medium uppercase tracking-wider text-primary-foreground bg-primary rounded-full">{t('about.badge')}</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('about.title')}
            </h2>
            <div className="prose max-w-none mb-8">
              <p className="text-lg mb-4">
                {t('about.description.first')}
              </p>
              <p className="mb-4">
                {t('about.description.second')}
              </p>
              <p>
                {t('about.description.third')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index}
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div 
            className="relative h-[500px] overflow-hidden rounded-2xl"
            style={{ y, opacity }}
          >
            <div className="relative w-full h-full">
              <motion.div 
                className="absolute inset-0 bg-cover bg-center rounded-2xl elegant-shadow"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1560031898-fa65b5de30a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')` }}
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1.5 }}
                viewport={{ once: true }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="glass-panel p-4 rounded-lg">
                  <p className="text-sm md:text-base font-medium">
                    {t('about.image_caption')}
                  </p>
                  <div className="mt-4">
                    <img 
                      src="https://images.unsplash.com/photo-1544642899-f0d6e5f6ed6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                      alt={t('about.image_alt')} 
                      className="w-full h-32 object-cover rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
