// Spanish (es) content overrides for the gallery sections + project proposal.
//
// Each entry is keyed by the gallery item id. Any field you leave undefined
// automatically falls back to the English version, so the site never breaks
// while translations are being filled in.
//
// - `title`   : the section title shown on cards and in the lightbox header
// - `content` : the long-form body text (same paragraph/bullet structure as EN)
// - `tables`  : localized table headers/rows (structure must match the EN tables)
//
// The section titles below are already translated. Paste your reviewed Spanish
// body text into the `content` fields (and `tables` where present).

export type GalleryTable = {
  marker: string
  headers: string[]
  rows: string[][]
}

export type GalleryOverride = {
  title?: string
  content?: string
  tables?: GalleryTable[]
}

export const galleryOverridesES: Record<string, GalleryOverride> = {
  "project-proposal": {
    title: "la propuesta del proyecto",
    // content: `...`,
    // tables: [...],
  },
  "problem-science": {
    title: "el problema   -   la ciencia",
    // content: `...`,
    // tables: [...],
  },
  "gap-vision": {
    title: "la brecha   -   la visión",
    // content: `...`,
  },
  "philosophy-model": {
    title: "la filosofía   -   el modelo",
    // content: `...`,
  },
  "structures-solutions": {
    title: "estructuras y soluciones",
    // content: `...`,
  },
  "qualification-experience": {
    title: "cualificación y experiencia",
    // content: `...`,
  },
  "unique-points": {
    title: "puntos únicos y métodos",
    // content: `...`,
  },
  "place-environment": {
    title: "lugar, entorno y logística",
    // content: `...`,
  },
  "financials-growth": {
    title: "finanzas y plan de crecimiento",
    // content: `...`,
    // tables: [...],
  },
  "marketing-benefits": {
    title: "marketing y beneficios",
    // content: `...`,
  },
  "call-to-action": {
    title: "llamada a la acción y conclusión",
    // content: `...`,
  },
}
