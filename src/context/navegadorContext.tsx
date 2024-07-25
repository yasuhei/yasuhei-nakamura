/* eslint-disable  */

import { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext<string | undefined>(navigator.language);

export const LanguageProvider: React.FC = ({ children }) => {
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
