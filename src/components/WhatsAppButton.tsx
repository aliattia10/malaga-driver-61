
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const WhatsAppButton = () => {
  const { t, language } = useLanguage();
  
  // Get the translated text for the WhatsApp button
  const buttonText = t('whatsapp.contact_now');
  
  const phoneNumber = "+34620173295"; // Phone number for WhatsApp link
  
  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50 transition-transform hover:scale-110 flex items-center justify-center gap-2"
      aria-label={t('whatsapp.message')}
    >
      <MessageCircle className="h-7 w-7" />
      <span className="font-medium text-base">{buttonText}</span>
    </a>
  );
};

export default WhatsAppButton;
