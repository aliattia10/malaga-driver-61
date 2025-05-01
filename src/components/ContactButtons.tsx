
import { Button } from "@/components/ui/button";
import { MessageSquare, Calendar } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { motion } from "framer-motion";

const ContactButtons = () => {
  const { t } = useLanguage();
  
  const phoneNumber = "+34620173295";
  const setmoreLink = "https://malagadriver.setmore.com/services/1542010e-e59e-48ad-a465-60d58eae7945";
  
  return (
    <section id="booking" className="py-24 bg-accent">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block py-1 px-3 mb-4 text-xs font-medium uppercase tracking-wider text-primary-foreground bg-primary rounded-full">{t('booking.title')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('booking.subtitle')}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Contact us directly via WhatsApp or book your service online through Setmore
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <motion.div 
            className="glass-card rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col gap-6">
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700 rounded-xl py-6 text-lg shadow-lg"
                onClick={() => window.open(`https://wa.me/${phoneNumber}`, '_blank')}
              >
                <MessageSquare className="mr-3 h-6 w-6" />
                Contact Us Now on WhatsApp
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-xl border-2 py-6 text-lg shadow-md"
                onClick={() => window.open(setmoreLink, '_blank')}
              >
                <Calendar className="mr-3 h-6 w-6" />
                Book Online via Setmore
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactButtons;
