'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface NameContextType {
  displayName: string;
  realName: string;
  pseudonym: string;
  isRealNameRevealed: boolean;
  revealRealName: () => void;
  hideRealName: () => void;
}

const NameContext = createContext<NameContextType | undefined>(undefined);

export const useNameContext = () => {
  const context = useContext(NameContext);
  if (!context) {
    throw new Error('useNameContext must be used within a NameProvider');
  }
  return context;
};

export const NameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const realName = "Iris Annelise Martinez";
  const pseudonym = "Brandon Martinez";
  const [isRealNameRevealed, setIsRealNameRevealed] = useState(false);

  // Load saved state from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('nameRevealed');
    if (saved === 'true') {
      setIsRealNameRevealed(true);
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('nameRevealed', isRealNameRevealed.toString());
  }, [isRealNameRevealed]);

  const revealRealName = () => {
    setIsRealNameRevealed(true);
  };

  const hideRealName = () => {
    setIsRealNameRevealed(false);
  };

  const displayName = isRealNameRevealed ? realName : pseudonym;

  return (
    <NameContext.Provider value={{
      displayName,
      realName,
      pseudonym,
      isRealNameRevealed,
      revealRealName,
      hideRealName
    }}>
      {children}
    </NameContext.Provider>
  );
};
