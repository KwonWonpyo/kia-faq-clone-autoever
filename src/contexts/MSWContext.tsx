'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { initMocks } from '@/mocks';

type MSWContextType = {
  isInitialized: boolean;
};

const MSWContext = createContext<MSWContextType>({ isInitialized: false });

export const useMSW = () => useContext(MSWContext);

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const initializeMSW = async () => {
        await initMocks();
        setIsInitialized(true);
      };
      initializeMSW();
    } else {
      setIsInitialized(true);
    }
  }, []);

  return (
    <MSWContext.Provider value={{ isInitialized }}>
      {children}
    </MSWContext.Provider>
  );
} 