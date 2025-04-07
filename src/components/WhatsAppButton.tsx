
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const WhatsAppButton = () => {
  // Try to access the language context, with fallback to prevent errors
  let translatedText = "Contact us now";
  try {
    const { t } = useLanguage();
    translatedText = t('whatsapp.contact_now');
  } catch (error) {
    console.log("Language provider not available yet for WhatsAppButton");
  }
  
  const phoneNumber = "+34620173295"; // Remove spaces for the actual WhatsApp link
  
  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50 transition-transform hover:scale-110 flex items-center justify-center gap-2"
      aria-label="Contact via WhatsApp"
    >
      <MessageCircle className="h-8 w-8" />
      <span className="hidden md:inline font-medium">{translatedText}</span>
    </a>
  );
};

export default WhatsAppButton;
