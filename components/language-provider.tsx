"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

import type { Locale } from "@/data/site";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (nextLocale: Locale) => void;
  toggleLocale: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "shannon-fu-site-locale";

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always start with "en" during SSR to avoid hydration mismatch.
  // Hydrate from localStorage after mount — this synchronizes React state
  // with an external system (localStorage), which is the documented purpose of useEffect.
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);
    if (storedValue === "zh" || storedValue === "en") {
      // Hydrate from localStorage after mount to fix hydration mismatch.
      // This is the documented use case for useEffect: synchronizing React
      // state with an external system (localStorage).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocaleState(storedValue);
    }
  }, []);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, nextLocale);
    }
  };

  const toggleLocale = () => {
    setLocale(locale === "en" ? "zh" : "en");
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider.");
  }
  return context;
}
