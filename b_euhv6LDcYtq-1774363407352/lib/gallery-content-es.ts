// Spanish (es) content overrides for the gallery sections + project proposal.
//
// Each entry is keyed by the gallery item id. Any field left undefined
// automatically falls back to the English version, so the site never breaks.
//
// - `title`   : the section title shown on cards and in the lightbox header
// - `content` : the long-form body text (same paragraph/bullet structure as EN)
// - `tables`  : localized table headers/rows (structure matches the EN tables)
//
// Text is the reviewed Spanish translation provided by the client. Section
// headings render as headings, lines starting with "•" render as bullets, and
// [[TABLE_*]] markers are replaced by the matching table below.

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

// ---------------------------------------------------------------------------
// Shared table definitions (Spanish)
// ---------------------------------------------------------------------------

const tableAlwaysOnES: GalleryTable = {
  marker: "[[TABLE_ALWAYS_ON]]",
  headers: ["Desafío", "Impacto en el Cerebro", "Hallazgo Científico"],
  rows: [
    [
      "Monetización del Yo",
      "Elevación crónica de cortisol",
      "La autopromoción constante trata la identidad como un producto, lo que puede derivar en despersonalización.",
    ],
    [
      "Ritmos circadianos irregulares",
      "Deprivación de sueño REM",
      "Las agendas de actuación alteran el sueño, un periodo clave para la poda neuronal y la síntesis creativa.",
    ],
    [
      "Aislamiento frente al escrutinio",
      "Malestar por rechazo social",
      "El trabajo en aislamiento (alta soledad) contrasta con la crítica pública instantánea (alto dolor social).",
    ],
  ],
}

const tableCapitalES: GalleryTable = {
  marker: "[[TABLE_CAPITAL]]",
  headers: ["Concepto", "Importe"],
  rows: [
    ["Compra de propiedad y terrenos", "500.000 €"],
    ["Estudio de sonido", "50.000 €"],
    ["Estudios para artistas", "75.000 €"],
    ["Espacios comunitarios y de meditación", "60.000 €"],
    ["Salas de trabajo individual", "30.000 €"],
    ["Alojamiento (10 habitaciones dobles con baño)", "250.000 €"],
    ["Equipamiento de cocina", "30.000 €"],
    ["Mobiliario de comedor", "15.000 €"],
    ["Furgoneta (6-9 plazas)", "40.000 €"],
    ["Stock inicial y suministros", "10.000 €"],
    ["Licencias y gastos legales", "20.000 €"],
    ["Marketing y desarrollo de la red de contactos", "25.000 €"],
    ["Total Inversión Inicial", "1.105.000 €"],
  ],
}

const tableGrowthES: GalleryTable = {
  marker: "[[TABLE_GROWTH]]",
  headers: ["Año", "Participantes", "Retiros", "Ingresos", "Costes", "Beneficio Neto"],
  rows: [
    ["1", "12", "6", "201.600 €", "325.000 €", "-123.400 €"],
    ["2", "15", "6", "252.000 €", "365.000 €", "-113.000 €"],
    ["3", "20", "7", "392.000 €", "410.000 €", "-18.000 €"],
    ["4", "25", "8", "560.000 €", "450.000 €", "110.000 €"],
    ["5", "30", "8", "672.000 €", "600.000 €", "172.000 €"],
  ],
}

// ---------------------------------------------------------------------------
// Section body text (Spanish)
// ---------------------------------------------------------------------------

const problemScienceES = `El Problema: Contexto y Patología

El mundo actual plantea a los creadores desafíos significativos, agravados por las presiones propias del complejo entorno urbano. La economía creativa contemporánea exige una producción incesante, sometiendo a artistas, escritores, músicos e intérpretes a niveles de presión cada vez mayores. El resultado es, con frecuencia, el agotamiento profesional (burnout) y el estancamiento creativo.

El acceso a los recursos de apoyo existentes es limitado y a menudo no se ajusta a las necesidades individuales. Por ello, numerosas carreras prometedoras se estancan y terminan por naufragar. Hemos experimentado, investigado y comprendido la «Patología Creativa» que afecta a nuestro colectivo. Somos parte de ella.

Un entorno orientado exclusivamente a los resultados mantiene al artista bajo una presión constante por alcanzar objetivos, dificultando el acceso al estado de fluidez creativa (flow). Cuando se pierden el juego, el silencio interior y la capacidad de escuchar, la inspiración se seca y la creatividad se reduce. Lo que solía ser una vocación empieza a sentirse como una lucha por la supervivencia.

La Ciencia: Evidencias de una Crisis

1. La «Paradoja Creativa»

La literatura científica identifica de manera consistente una relación en forma de «U» entre la alta creatividad y la vulnerabilidad emocional.

• Prevalencia de trastornos: Un estudio de referencia en más de un millón de personas (S. Kyaga et al., 2012) y sus posteriores estudios de seguimiento señalan que los profesionales creativos tienen entre un 8% y un 18% más de probabilidades de experimentar trastorno bipolar y episodios depresivos en comparación con la población general.

• El coste de la «Apertura»: El rasgo de personalidad «Apertura a la experiencia», esencial para los artistas, se correlaciona estadísticamente con límites emocionales más delgados, lo que significa que los creadores absorben el estrés ambiental y los estímulos emocionales con mayor profundidad que el trabajador promedio.

• Ansiedad por rendimiento (MPA): Los estudios sobre la Ansiedad por Rendimiento Musical muestran que hasta el 70% de los músicos profesionales sufren una ansiedad que deteriora su capacidad física para interpretar, lo que puede derivar en ciclos de consumo de sustancias como estrategia de «automedicación».

2. La Mecánica del Agotamiento

El burnout en el sector creativo difiere del agotamiento en trabajos de oficina porque la identidad del artista es inseparable de su obra.

• Fusión de la identidad: Cuando un proyecto fracasa o surge un bloqueo, el profesional creativo lo vive como una amenaza existencial, no como un simple contratiempo laboral. La investigación denomina a esto «Complejidad Deficitaria del Yo».

• El estrés de la economía gig: Un estudio de 2022 sobre la precariedad en las artes reveló que la falta de previsibilidad financiera activa de forma crónica la amígdala (el centro del miedo en el cerebro). Esto inhibe la corteza prefrontal, «apagando» la capacidad de pensar de manera divergente o creativa.

• Agotamiento digital: Estudios recientes sobre la «Ansiedad Algorítmica» muestran que la presión por estar constantemente visible en redes sociales (la «rueda del contenido») ha generado un nuevo tipo de agotamiento caracterizado por el mimetismo creativo: los artistas dejan de innovar y empiezan a imitar lo que el algoritmo premia, perdiendo su identidad artística.

3. Desafíos Profesionales: La Cultura de la Conexión Permanente

Las industrias creativas han evolucionado hacia un entorno de alta velocidad y gran volumen que resulta biológicamente insostenible.

[[TABLE_ALWAYS_ON]]

4. La Ciencia de la Regeneración (La Solución)

La Teoría de la Restauración de la Atención (ART) y la psicología ambiental respaldan científicamente nuestro enfoque.

• El efecto de la «Fascinación Suave»: Frente a la «fascinación dura» (pantallas, tráfico urbano), la «fascinación suave» (contemplar el océano Atlántico, las montañas de Asturias) activa la Red Neuronal por Defecto (DMN), el estado cerebral donde ocurren la incubación y la inspiración.

• Naturaleza y plasticidad neuronal: Caminar 90 minutos en un entorno natural reduce la actividad en la corteza prefrontal subgenual, la zona asociada a la rumiación negativa y la depresión.

• El valor del «tiempo no estructurado»: La investigación en desacoplamiento cognitivo muestra que el descanso consciente es un estado muy activo donde el cerebro reorganiza información compleja.`

const gapVisionES = `La Brecha: La Solución está a Mayor Profundidad

Con esta evidencia surge la pregunta: ¿Podemos reavivar el crecimiento artístico? Los retiros tradicionales, caracterizados por horarios rígidos e instalaciones inadecuadas, no resuelven la raíz del problema. Cuando los creadores perciben sus actividades como «trabajo», cualquier estructura obligatoria se vive simplemente como una carga laboral más.

El camino del artista requiere una soledad positiva: un ambiente seguro para liberarse de las construcciones del personaje social y, sencillamente, ser.

La Visión: Del Objetivo a la Fluidez

Path and Passages ofrece una residencia creativa de larga estancia en los paisajes del norte de España. Proponemos una pausa consciente para despresurizar el proceso creativo y reconectar con sus fuentes originales.

Sustituimos la rigidez por un enfoque flexible. La presión del éxito, la ambición y la política se dejan atrás para que la motivación interna vuelva a tomar el mando.`

const philosophyModelES = `El Modelo: Un Camino Estratégico

Nuestro enfoque se apoya en tres pilares:

• Autonomía y Elección: Espacio para encontrar el momento donde la creatividad fluye sin esfuerzo.

• Preparación Profunda: Uso de la meditación activa y de actividades en la naturaleza para la disposición física y mental.

• Espacio Profesional: Instalaciones de alto nivel adaptadas a las necesidades individuales del artista.

Esto no son unas vacaciones; es una inversión estratégica que genera obras de mayor calidad y prolonga la vida profesional del artista.

La Filosofía: Una Cuestión de Corazón

Cuando no hay miedo ni necesidad de aparentar, se recupera el acceso a las raíces de la vida, allí donde nace la creatividad. Path and Passages ofrece la red de apoyo necesaria para redescubrir esa conexión.

Nuestra filosofía equilibra una presencia abierta con una red de apoyo respetuosa que permanece en segundo plano. Saber que esa red existe ya aporta la calma necesaria para crear.

Preparar el Terreno: El Acto Creativo

Para un artista, preparar el terreno —tanto interno como externo— es esencial para dar el paso hacia lo desconocido. Creado por artistas para artistas, nuestro entorno ofrece las condiciones ideales para que las obras fluyan de manera natural.

Una Infraestructura Viva

• Apoyo Integrado: Actividades opcionales (meditación activa, trabajo comunitario, talleres) disponibles como recursos cuando sean necesarios.

• Instalaciones Profesionales: Estudios de alta calidad diseñados para el trabajo profundo, adaptables a cada disciplina.

• Vida Regenerativa: Proyecto sustentado en la permacultura, con consumo de alimentos cultivados en el propio lugar.

• Expansión Creativa: Fases futuras que abrirán espacios al aire libre para proyectos dedicados de Land Art.`

const structuresSolutionsES = `Estructuras y Soluciones

Estancias de entre uno y seis meses con:

• Alojamiento confortable con baños privados y espacios comunes.

• Estudios totalmente equipados y espacios de ensayo adaptables.

• Sesiones regulares de meditación activa guiadas por facilitadores experimentados.

• Oportunidades para la colaboración y el intercambio espontáneo entre residentes.

• Programas de apoyo que incluyen senderismo, surf, sauna, huerto permacultural y proyectos artísticos en la naturaleza.`

const qualificationES = `Ali von Stein

Experiencia como Artista:
• Artista de grafiti en Nueva York y Alemania (1983-1984).
• Estudiante invitado con Robin Page (Múnich) y Michael Buthe (Düsseldorf).
• Artista visual en Colonia (1985-1988).
• Apertura de estudio de arte en 2nd St, Nueva York (1995).
• Fundador de Play2C Performing Arts en Berlín (2007).

Experiencia como Actor y Director:
• Formación en HB-Studio, Nueva York (2001-2003).
• Participación en diversas producciones teatrales y cinematográficas en Nueva York y Berlín desde 2003.

Experiencia como Profesor de Meditación:
• Creador de Meditation Module en Nueva York (clases de meditación activa, 2003-2007).
• Creador de OSHO Meditation Studio Berlin (clases diarias, 2007-2019).
• Osho Meditation Lab Berlin (2019-2023).

Experiencia Emprendedora:
• Meditation Module NYC (2003-2007).
• OSHO Studio Berlin (2007-2019).
• Play2C Performing Arts Berlin (2008-2017).
• Retiros de meditación Tribes of Nothingness (2019-2022).`

const uniquePointsES = `La creatividad no es una habilidad que se aplica, sino una frecuencia con la que se entra en sintonía. Nos enfocamos en la arquitectura interna de la invención:

• El Vacío: Perder el miedo al espacio en blanco mediante la meditación y la naturaleza.

• El Estado Recolector: Transformar el entorno natural de Asturias en estímulos para el subconsciente.

• El Oficio como Juego: Eliminar la presión laboral para que el estudio sea un lugar de exploración y curiosidad.`

const placeEnvironmentES = `Entorno y Ubicación

Nuestro espacio se encuentra ubicado en la costa asturiana, cerca de Ribadesella, donde las montañas de los Picos de Europa se encuentran con el mar Cantábrico.

Un clima oceánico suave, suelos fértiles para la permacultura y un paisaje con un contraste natural único crean el escenario ideal para pasar del modo de supervivencia a la fluidez creativa.

Capacidad y Logística

Capacidad inicial: 15 participantes durante el primer año, creciendo paulatinamente hasta alcanzar las 30 plazas en cinco años.

Conexiones: A 15 minutos de Ribadesella, cerca de Gijón y Oviedo. Excelente acceso a los aeropuertos de Asturias (OVD) y Santander (SDR), así como a la red de trenes de alta velocidad (AVE).`

const financialsES = `Aspectos Financieros: Una Inversión Estratégica

Presupuesto y Gastos Iniciales (Puesta en Marcha)

[[TABLE_CAPITAL]]

Gastos Operativos (Años 1 al 5)

• Año 1: 325.000 €
• Año 5: 600.000 € (incluyendo salarios, suministros, alimentación y mantenimiento).

Plan de Crecimiento Financiero

[[TABLE_GROWTH]]`

const marketingES = `Beneficios para Colaboradores e Inversores

1. Inversores Privados e Institucionales: Protección del talento, aumento de la calidad de las producciones y espacio seguro para el desarrollo de nuevos proyectos.

2. Organizaciones Benéficas y Fondos Culturales: Impacto directo en la salud mental del sector creativo y revitalización del entorno rural en Asturias.

3. Artistas Consolidados y Mentores: Oportunidad de crear un legado cultural, apadrinar nuevas generaciones y disponer de un refugio propio entre iguales.

4. Filántropos: Apoyo a un modelo innovador de desarrollo humano, actuando como mecenas de la calma interior necesaria para el pensamiento del futuro.`

const callToActionES = `Llamada a la Acción

A menudo confundimos las obras de arte —las pinturas, las representaciones, los guiones— con la creatividad misma. En realidad, se trata de un proceso que prospera en una delicada ecología de «intervalos» y silencio. En nuestra topografía social y económica actual, ese intervalo ha sido descartado, sustituido por una exigencia incesante de utilidad inmediata. Path and Passages se estableció para devolver las pausas necesarias a esta geografía.

Su implicación —ya sea mediante capital inicial, alianzas estratégicas o la difusión de nuestra labor— es mucho más que una contribución a un proyecto arquitectónico. Es la revitalización activa del ADN de la expresión humana. Somos conscientes de un fallo sistémico evidente: la comunidad creativa es el motor principal de nuestra evolución cultural, pero se ve obligada a operar en entornos que frenan su desarrollo. Esta certeza nos impulsa a actuar, y le invitamos a unirse a nosotros.

Juntos podemos preparar un terreno fértil para el potencial humano. Su apoyo asegura que aquellas personas con la capacidad de reflejar nuestra época y nuestra experiencia de manera profunda no se agoten por el ruido de la supervivencia, sino que encuentren un espacio a la altura de su dedicación.

Si esta propuesta conecta con usted, le invitamos a pasar de la observación a la participación. Será un honor dialogar sobre cómo sus posibilidades específicas pueden ayudarnos a consolidar esta visión, en la medida en que mejor respondan al impacto que desea generar.

Conclusión

Imaginemos por un momento la perspectiva dentro de cinco o diez años: Path and Passages se ha convertido en un punto de encuentro internacional para la comunidad creativa, una fuente de inspiración y una comunidad viva.

Es posible que algunas vidas hayan cambiado y que grandes obras hayan salido a la luz gracias a lo que sucedió aquí. O tal vez, simplemente, haya personas que aprendieron a descansar en este lugar y decidieron regresar una y otra vez. Imagine ahora que son sus ojos los que miran atrás, sus recursos los que lo hicieron posible, su voz la que nos apoyó y sus manos las que ayudaron a construir este proyecto... una visión profundamente valiosa y, sobre todo, posible de realizar.`

// The full project proposal is assembled from the individual sections in the
// same order as the English version, so the two stay in sync.
const projectProposalES = [
  problemScienceES,
  gapVisionES,
  philosophyModelES,
  structuresSolutionsES,
  "Cualificación y Experiencia\n\n" + qualificationES,
  "Puntos Únicos y Beneficios\n\n" + uniquePointsES,
  placeEnvironmentES,
  financialsES,
  marketingES,
  callToActionES,
].join("\n\n")

// ---------------------------------------------------------------------------
// Overrides map
// ---------------------------------------------------------------------------

export const galleryOverridesES: Record<string, GalleryOverride> = {
  "project-proposal": {
    title: "la propuesta del proyecto",
    content: projectProposalES,
    tables: [tableAlwaysOnES, tableCapitalES, tableGrowthES],
  },
  "problem-science": {
    title: "el problema   -   la ciencia",
    content: problemScienceES,
    tables: [tableAlwaysOnES],
  },
  "gap-vision": {
    title: "la brecha   -   la visión",
    content: gapVisionES,
  },
  "philosophy-model": {
    title: "la filosofía   -   el modelo",
    content: philosophyModelES,
  },
  "structures-solutions": {
    title: "estructuras y soluciones",
    content: structuresSolutionsES,
  },
  "qualification-experience": {
    title: "cualificación y experiencia",
    content: qualificationES,
  },
  "unique-points": {
    title: "puntos únicos y métodos",
    content: uniquePointsES,
  },
  "place-environment": {
    title: "lugar, entorno y logística",
    content: placeEnvironmentES,
  },
  "financials-growth": {
    title: "finanzas y plan de crecimiento",
    content: financialsES,
    tables: [tableCapitalES, tableGrowthES],
  },
  "marketing-benefits": {
    title: "marketing y beneficios",
    content: marketingES,
  },
  "call-to-action": {
    title: "llamada a la acción y conclusión",
    content: callToActionES,
  },
}
