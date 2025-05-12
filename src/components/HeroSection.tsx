
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const HeroSection = () => {
  const { t, language } = useLanguage();
  
  return (
    <section className="min-h-screen pt-24 pb-16 flex items-center hero-bg relative">
      <div className="container px-4 mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block py-1 px-3 mb-4 text-xs font-medium uppercase tracking-wider text-primary-foreground bg-primary rounded-full">
                {language === 'en' ? 'TRANSFERS FROM MÁLAGA, SPAIN' : 'TRASLADOS DESDE MÁLAGA, ESPAÑA'}
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold leading-tight md:leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t('hero.title_first')}<br className="hidden md:block" /> 
              <span className="text-primary">{t('hero.title_second')}</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t('hero.description')}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button asChild size="lg" className="rounded-full shadow-lg hover-lift">
                <a href="#booking">
                  {t('hero.cta')} <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </motion.div>
          </div>
          
          <motion.div 
            className="relative w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden elegant-shadow"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')` }}></div>
            <div className="absolute bottom-8 left-8 z-20">
              <span className="glass-panel py-2 px-4 rounded-lg text-sm font-medium">
                {language === 'en' ? 'Private Transfers from Málaga' : 'Traslados Privados desde Málaga'}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
