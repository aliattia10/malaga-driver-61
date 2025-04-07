
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const WhatsAppButton = () => {
  const { t } = useLanguage();
  const phoneNumber = "+34620173295"; // Remove spaces for the actual WhatsApp link
  
  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50 transition-transform hover:scale-110 flex items-center justify-center"
      aria-label="Contact via WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="sr-only">{t('whatsapp.message')}</span>
    </a>
  );
};

export default WhatsAppButton;
