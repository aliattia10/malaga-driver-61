
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Euro } from "lucide-react";

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
            <Euro className="inline-block mr-2 h-8 w-8" /> {t('pricing.title')}
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
            <Card className="h-full shadow-md hover:shadow-lg transition-shadow border-t-4 border-t-primary">
              <CardHeader className="bg-primary/10 pb-4">
                <CardTitle className="text-2xl text-center">{t('pricing.distance_based')}</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div variants={container} className="space-y-4">
                    <motion.div variants={item} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <span className="font-bold text-lg text-primary">48 km</span>
                      <span className="text-2xl">=</span>
                      <span className="text-lg font-medium">48 €</span>
                    </motion.div>
                    
                    <motion.div variants={item} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <span className="font-bold text-lg text-primary">62 km</span>
                      <span className="text-2xl">=</span>
                      <span className="text-lg font-medium">62 €</span>
                    </motion.div>
                    
                    <motion.div variants={item} className="flex items-center gap-3">
                      <span className="italic">{t('pricing.and_so_on')}</span>
                    </motion.div>
                  </motion.div>
                  
                  <motion.div variants={container} className="space-y-6">
                    <motion.div variants={item} className="flex items-center gap-2 bg-green-50 p-4 rounded-lg border border-green-100">
                      <span className="text-green-600 text-lg">✓</span>
                      <span className="text-green-800 font-medium">{t('pricing.base_price_valid')}</span>
                    </motion.div>
                    
                    <motion.div variants={item} className="space-y-4">
                      <h3 className="font-bold text-lg border-b pb-2 mb-3">{t('pricing.additional_people')}</h3>
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                          <span>{t('pricing.fourth_person')}</span>
                          <span className="font-bold">+10 €</span>
                        </div>
                        <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                          <span>{t('pricing.fifth_person')}</span>
                          <span className="font-bold">+10 €</span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
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
