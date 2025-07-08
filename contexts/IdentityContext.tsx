'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface IdentityContextType {
  isIris: boolean;
  setIsIris: (value: boolean) => void;
  getName: () => string;
  getInitials: () => string;
  getFullName: () => string;
  isIrisDomain: boolean;
}

const IdentityContext = createContext<IdentityContextType | undefined>(undefined);

export const IdentityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isIris, setIsIris] = useState(false);
  const [isIrisDomain, setIsIrisDomain] = useState(false);

  // Check domain and localStorage on mount
  useEffect(() => {
    // Check if we're on the Iris domain
    const hostname = window.location.hostname;
    const isDomainIris = hostname === 'irisannelisemartinez.dev' || hostname === 'www.irisannelisemartinez.dev';
    setIsIrisDomain(isDomainIris);
    
    if (isDomainIris) {
      // Automatically set to Iris mode if on Iris domain
      setIsIris(true);
    } else {
      // For other domains, check localStorage
      const saved = localStorage.getItem('identity-iris');
      if (saved === 'true') {
        setIsIris(true);
      }
    }
  }, []);

  // Save to localStorage when changed (but only if not on Iris domain)
  useEffect(() => {
    // Only save to localStorage if not on Iris domain (since Iris domain is automatic)
    if (!isIrisDomain) {
      localStorage.setItem('identity-iris', isIris.toString());
    }
  }, [isIris, isIrisDomain]);

  const getName = () => isIris ? 'Iris Martinez' : 'Brandon Martinez';
  const getInitials = () => isIris ? 'IAM' : 'BM';
  const getFullName = () => isIris ? 'Iris Annelise Martinez' : 'Brandon Martinez';

  return (
    <IdentityContext.Provider value={{ isIris, setIsIris, getName, getInitials, getFullName, isIrisDomain }}>
      {children}
    </IdentityContext.Provider>
  );
};

export const useIdentity = () => {
  const context = useContext(IdentityContext);
  if (context === undefined) {
    throw new Error('useIdentity must be used within an IdentityProvider');
  }
  return context;
};
