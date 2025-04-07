
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import translations from '@/translations';

type LanguageContextType = {
  language: "en" | "es";
  setLanguage: (language: "en" | "es") => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<"en" | "es">("en");

  // Detect user's browser language or use geolocation on first visit
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as "en" | "es" | null;
    
    if (savedLanguage) {
      setLanguageState(savedLanguage);
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split('-')[0].toLowerCase();
      
      // Try to detect user's country via their IP (this is approximate)
      try {
        fetch('https://ipapi.co/json/')
          .then(response => response.json())
          .then(data => {
            // If in a Spanish speaking country, default to Spanish
            const spanishCountries = ['es', 'mx', 'ar', 'co', 'pe', 've', 'cl', 'ec', 'gt', 'cu', 'bo', 'do', 'hn', 'py', 'sv', 'ni', 'cr', 'pa', 'uy', 'pr', 'gq'];
            if (spanishCountries.includes(data.country_code?.toLowerCase())) {
              setLanguageState('es');
              localStorage.setItem("language", 'es');
              console.log(`Language set to Spanish based on location: ${data.country_code}`);
            } else if (browserLang === 'es') {
              // Fall back to browser language if API returns non-Spanish country
              setLanguageState('es');
              localStorage.setItem("language", 'es');
              console.log('Language set to Spanish based on browser language');
            } else {
              setLanguageState('en');
              localStorage.setItem("language", 'en');
              console.log(`Language set to English based on location: ${data.country_code}`);
            }
          })
          .catch((error) => {
            // If API call fails, just use browser language
            console.log('Location API error, falling back to browser language:', error);
            const detectedLang = browserLang === 'es' ? 'es' : 'en';
            setLanguageState(detectedLang);
            localStorage.setItem("language", detectedLang);
            console.log(`Language set to ${detectedLang} based on browser language`);
          });
      } catch (error) {
        // If anything fails, default to browser language detection
        console.log('General error in language detection, using browser language:', error);
        const detectedLang = browserLang === 'es' ? 'es' : 'en';
        setLanguageState(detectedLang);
        localStorage.setItem("language", detectedLang);
      }
    }
  }, []);

  const setLanguage = (lang: "en" | "es") => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    console.log(`Language manually set to: ${lang}`);
  };

  // Translation function
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        // If translation not found, return the key itself or English version
        if (language === 'es') {
          // Try to get English version if Spanish is missing
          value = getEnglishFallback(key);
        } else {
          return key;
        }
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  // Fallback to English if Spanish translation is missing
  const getEnglishFallback = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations['en'];
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
