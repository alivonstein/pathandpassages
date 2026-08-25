"use client"

import { createContext, useContext, useEffect, useState, useCallback } from "react"

export type Lang = "en" | "es"

type LanguageContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  toggleLang: () => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = "pnp-lang"

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en")

  // Restore saved preference on mount
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null
      if (saved === "en" || saved === "es") {
        setLangState(saved)
      }
    } catch {
      // ignore storage errors
    }
  }, [])

  // Persist preference + keep <html lang> in sync
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // ignore storage errors
    }
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((next: Lang) => setLangState(next), [])
  const toggleLang = useCallback(
    () => setLangState((prev) => (prev === "en" ? "es" : "en")),
    []
  )

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return ctx
}
