
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import translations from '@/translations';

type LanguageContextType = {
  language: "en" | "es";
  setLanguage: (language: "en" | "es") => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [language, setLanguageState] = useState<"en" | "es">("en");
  const [isInitialized, setIsInitialized] = useState(false);

  // Detect user's browser language or use geolocation on first visit
  useEffect(() => {
    const detectLanguage = async () => {
      const savedLanguage = localStorage.getItem("language") as "en" | "es" | null;
      
      if (savedLanguage) {
        setLanguageState(savedLanguage);
        setIsInitialized(true);
        console.log(`Using saved language preference: ${savedLanguage}`);
        return;
      }

      // Try to detect browser language
      const browserLang = navigator.language.split('-')[0].toLowerCase();
      console.log(`Detected browser language: ${browserLang}`);
      
      // Set to Spanish if browser language is Spanish
      if (browserLang === 'es') {
        setLanguageState('es');
        localStorage.setItem("language", 'es');
        setIsInitialized(true);
        console.log('Language set to Spanish based on browser language');
        return;
      }
      
      // Try to detect user's country via their IP (this is approximate)
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        // List of Spanish speaking countries - extend this list
        const spanishCountries = ['es', 'mx', 'ar', 'co', 'pe', 've', 'cl', 'ec', 'gt', 'cu', 'bo', 'do', 'hn', 'py', 'sv', 'ni', 'cr', 'pa', 'uy', 'pr', 'gq'];
        
        if (spanishCountries.includes(data.country_code?.toLowerCase())) {
          setLanguageState('es');
          localStorage.setItem("language", 'es');
          console.log(`Language set to Spanish based on detected location: ${data.country_code}`);
        } else {
          setLanguageState('en');
          localStorage.setItem("language", 'en');
          console.log(`Language set to English based on detected location: ${data.country_code}`);
        }
      } catch (error) {
        // If API call fails, just use browser language or default to English
        const detectedLang = browserLang === 'es' ? 'es' : 'en';
        setLanguageState(detectedLang);
        localStorage.setItem("language", detectedLang);
        console.log(`Location API error, falling back to browser language: ${detectedLang}`, error);
      }
      
      setIsInitialized(true);
    };
    
    detectLanguage();
  }, []);

  const setLanguage = (lang: "en" | "es") => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    console.log(`Language manually set to: ${lang}`);
  };

  // Translation function with improved fallback
  const t = (key: string): string => {
    if (!isInitialized) {
      console.log("Translation requested before language initialized, using fallback");
      // Return a sensible fallback based on the key's last part
      const keyParts = key.split('.');
      return keyParts[keyParts.length - 1].replace(/_/g, ' ');
    }
    
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
