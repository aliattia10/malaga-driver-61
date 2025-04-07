
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PricingSection = () => {
  const { t } = useLanguage();
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            💰 {t('pricing.title')}
          </motion.h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Base pricing */}
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="col-span-1 md:col-span-2"
          >
            <Card className="h-full shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-primary/5">
                <CardTitle className="text-xl text-center">{t('pricing.distance_based')}</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <motion.ul className="space-y-4" variants={container}>
                  <motion.li variants={item} className="flex items-start gap-2">
                    <span className="text-lg">▪️</span>
                    <span>{t('pricing.example1')}</span>
                  </motion.li>
                  <motion.li variants={item} className="flex items-start gap-2">
                    <span className="text-lg">▪️</span>
                    <span>{t('pricing.example2')}</span>
                  </motion.li>
                  <motion.li variants={item} className="flex items-start gap-2">
                    <span className="text-lg">▪️</span>
                    <span>{t('pricing.and_so_on')}</span>
                  </motion.li>
                  <motion.li variants={item} className="flex items-start gap-2 mt-4 text-green-700 font-medium">
                    <span>{t('pricing.base_price_valid')}</span>
                  </motion.li>
                </motion.ul>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Additional people pricing */}
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <Card className="h-full shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-primary/5">
                <CardTitle className="text-xl">{t('pricing.additional_people')}</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <motion.ul className="space-y-4">
                  <motion.li variants={item} className="flex items-start gap-2">
                    <span className="text-lg">▪️</span>
                    <span>{t('pricing.fourth_person')}</span>
                  </motion.li>
                  <motion.li variants={item} className="flex items-start gap-2">
                    <span className="text-lg">▪️</span>
                    <span>{t('pricing.fifth_person')}</span>
                  </motion.li>
                </motion.ul>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Example calculation */}
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <Card className="h-full shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-primary/5">
                <CardTitle className="text-xl">{t('pricing.example_title')}</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <motion.ul className="space-y-4">
                  <motion.li variants={item} className="flex items-start gap-2">
                    <span className="text-lg">▪️</span>
                    <span>{t('pricing.example_3people')}</span>
                  </motion.li>
                  <motion.li variants={item} className="flex items-start gap-2">
                    <span className="text-lg">▪️</span>
                    <span>{t('pricing.example_4people')}</span>
                  </motion.li>
                  <motion.li variants={item} className="flex items-start gap-2">
                    <span className="text-lg">▪️</span>
                    <span>{t('pricing.example_5people')}</span>
                  </motion.li>
                </motion.ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10"
        >
          <p className="text-xl font-medium text-primary">{t('pricing.book_now')}</p>
          <div className="mt-6">
            <a 
              href="#booking" 
              className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full transition-all shadow-md hover:shadow-lg"
            >
              {t('hero.cta')}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
