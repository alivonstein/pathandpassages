import type { Lang } from "@/components/language-provider"

// Short UI chrome strings (navigation, buttons, form fields).
// The long-form proposal/gallery content lives in lib/gallery-content.ts.
type UIStrings = {
  projectProposal: string
  theProjectProposal: string
  topics: string
  getInTouch: string
  name: string
  email: string
  message: string
  send: string
  sendMessage: string
  sending: string
  thankYouShort: string
  thankYouTitle: string
  thankYouBody: string
  sendError: string
  close: string
  location: string
  toggleMenu: string
  // language switcher
  switchToLabel: string
}

export const uiStrings: Record<Lang, UIStrings> = {
  en: {
    projectProposal: "project proposal",
    theProjectProposal: "the project proposal",
    topics: "topics",
    getInTouch: "get in touch",
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send",
    sendMessage: "Send Message",
    sending: "Sending...",
    thankYouShort: "Thank you. We will be in touch soon.",
    thankYouTitle: "Thank You",
    thankYouBody: "We will be in touch soon.",
    sendError: "Something went wrong. Please try again or email us directly.",
    close: "close",
    location: "asturias, northern spain",
    toggleMenu: "Toggle menu",
    switchToLabel: "Cambiar a español",
  },
  es: {
    projectProposal: "propuesta del proyecto",
    theProjectProposal: "la propuesta del proyecto",
    topics: "temas",
    getInTouch: "contacto",
    name: "Nombre",
    email: "Correo electrónico",
    message: "Mensaje",
    send: "Enviar",
    sendMessage: "Enviar mensaje",
    sending: "Enviando...",
    thankYouShort: "Gracias. Nos pondremos en contacto pronto.",
    thankYouTitle: "Gracias",
    thankYouBody: "Nos pondremos en contacto pronto.",
    sendError: "Algo salió mal. Inténtalo de nuevo o escríbenos directamente.",
    close: "cerrar",
    location: "asturias, norte de españa",
    toggleMenu: "Abrir menú",
    switchToLabel: "Switch to English",
  },
}

// Navigation links shown in the header menu. Ids must match gallery item ids.
export const navLinks: {
  id: string
  label: Record<Lang, string>
}[] = [
  {
    id: "problem-science",
    label: { en: "the problem   -   the science", es: "el problema   -   la ciencia" },
  },
  {
    id: "gap-vision",
    label: { en: "the gap   -   the vision", es: "la brecha   -   la visión" },
  },
  {
    id: "philosophy-model",
    label: { en: "the philosophy   -   the model", es: "la filosofía   -   el modelo" },
  },
  {
    id: "structures-solutions",
    label: { en: "structures and solutions", es: "estructuras y soluciones" },
  },
  {
    id: "qualification-experience",
    label: { en: "qualification and experience", es: "cualificación y experiencia" },
  },
  {
    id: "unique-points",
    label: { en: "unique points and methods", es: "puntos únicos y métodos" },
  },
  {
    id: "place-environment",
    label: { en: "place, environment and logistics", es: "lugar, entorno y logística" },
  },
  {
    id: "financials-growth",
    label: { en: "financials and growth plan", es: "finanzas y plan de crecimiento" },
  },
  {
    id: "marketing-benefits",
    label: { en: "marketing and benefits", es: "marketing y beneficios" },
  },
  {
    id: "call-to-action",
    label: { en: "call to action and conclusion", es: "llamada a la acción y conclusión" },
  },
]
