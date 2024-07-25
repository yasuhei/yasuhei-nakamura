import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface LanguageProviderProps {
  children: ReactNode; 
}

const LanguageContext = createContext<string | undefined>(navigator.language);

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState(navigator.language);

  useEffect(() => {
    setLanguage(navigator.language);
  }, []);

  return (
    <LanguageContext.Provider value={language}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): string | undefined => useContext(LanguageContext);
