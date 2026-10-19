// Copy literal entregado por la Copywriter. No resumir, reescribir ni sustituir.
// Cualquier texto nuevo de interfaz (juego, fecha, etiquetas) vive en data/gamification.ts y data/event.ts.

export const HERO = {
  lead: "La teoría te ayuda a comprender la RCP. La práctica te da la oportunidad de trabajar lo que has aprendido.",
  title: "Formación online de RCP Solo Compresiones",
  description: [
    "Una experiencia educativa de dos horas que combina aprendizaje online con práctica interactiva por Zoom.",
    "Para quienes desean aprender, repasar o reforzar sus conocimientos de reanimación cardiopulmonar.",
  ],
  price: "Inversión: $35 USD",
  cta: "QUIERO CONOCER LA FORMACIÓN",
  microcopy: "Consulta el contenido, los requisitos de participación y el alcance del certificado antes de inscribirte.",
}

export const NARRATIVE = {
  title: "Hay una diferencia entre leer una explicación y participar en una práctica.",
  paragraphs: [
    "Cuando estudias un procedimiento, puedes detenerte, volver a leer y revisar los conceptos tantas veces como necesites.",
    "Pero aprender también implica explorar cómo se relacionan esos conceptos, qué dudas aparecen y qué aspectos necesitas reforzar.",
    "Eso no significa que debas vivir con miedo a una emergencia.",
    "Significa que puedes tomar una decisión responsable: dedicar tiempo a tu preparación.",
    "La RCP es un tema en el que comprender los conceptos y practicar de forma guiada son partes importantes del proceso de aprendizaje.",
    "Por eso, si llevas tiempo pensando en formarte, actualizar tus conocimientos o reforzar lo que ya sabes, vale la pena conocer una modalidad que reúne explicación y práctica interactiva en una sesión online.",
  ],
  closing: [
    "Sin promesas imposibles.",
    "Sin afirmar que un curso elimina toda incertidumbre.",
    "Con información clara sobre lo que aprenderás y sobre lo que incluye la formación.",
  ],
}

export const PREPARATION = {
  title: "El verdadero obstáculo no es no saberlo todo.",
  paragraphs: [
    "Nadie empieza una formación sabiéndolo todo.",
    "El problema aparece cuando confundimos reconocer una explicación con haber tenido oportunidades suficientes para practicarla.",
    "Puedes haber leído sobre primeros auxilios. Puedes haber visto vídeos educativos. Incluso puedes recordar conceptos que estudiaste hace tiempo.",
    "Y aun así, tener preguntas sobre cómo se desarrolla una práctica, cómo se organiza una respuesta o qué necesitas reforzar.",
    "No es una prueba de incapacidad.",
    "Es una invitación a continuar aprendiendo.",
    "La preparación no se construye únicamente acumulando información. También requiere práctica, orientación y una comprensión realista de los propios límites.",
  ],
  closing: [
    "Por eso, el objetivo no es que termines esta página sintiendo miedo.",
    "Es que puedas valorar si necesitas dar el siguiente paso en tu formación.",
  ],
}

export const REVELATION = {
  title: "No necesitas más miedo. Necesitas una oportunidad para practicar.",
  paragraphs: [
    "La pregunta no es si puedes garantizar que nunca tendrás dudas.",
    "La pregunta es qué puedes hacer hoy para mejorar tu preparación.",
    "Una formación bien planteada debe ayudarte a entender los contenidos, conocer cómo se desarrolla la práctica y disponer de un espacio educativo para trabajar tus preguntas.",
    "Ese es el enfoque de la formación de RCP Solo Compresiones.",
    "Una modalidad online, de duración breve, que incorpora una práctica interactiva por Zoom.",
    "No se trata de presentar una pantalla como si pudiera certificar tu preparación.",
    "Tampoco de prometer que una sesión resolverá todas las dificultades.",
    "Se trata de ofrecer una experiencia de aprendizaje con un componente práctico definido y condiciones que puedes revisar antes de inscribirte.",
  ],
}

export const SOLUTION = {
  title: "Una formación online para aprender y reforzar conocimientos de RCP.",
  intro: "La formación de RCP Solo Compresiones está diseñada para personas que desean adquirir o reforzar competencias relacionadas con la reanimación cardiopulmonar.",
  audienceTitle: "Puede interesarte si eres:",
  audience: [
    "Una persona que desea aprender sobre RCP.",
    "Un docente o instructor que necesita reforzar conocimientos.",
    "Un preparador físico o profesional responsable de otras personas.",
    "Un integrante de un equipo de seguridad laboral.",
    "Alguien que busca actualizar su preparación en primeros auxilios.",
  ],
  note: "La adecuación depende de tus necesidades, tu nivel y los requisitos de acreditación que debas cumplir.",
  featuresTitle: "¿Qué caracteriza la propuesta?",
  finalText: "Antes de inscribirte, confirma los contenidos específicos, las condiciones de la sesión y los detalles del certificado.",
}

export interface ProcessStepData {
  label: string
  title: string
  text: string[]
}

export const PROCESS = {
  title: "Un proceso claro, desde el aprendizaje hasta la práctica.",
  steps: [
    {
      label: "Paso 1.",
      title: "Conoce los contenidos",
      text: ["Revisa los conceptos de RCP Solo Compresiones que forman parte de la formación y comprende qué temas se abordarán."],
    },
    {
      label: "Paso 2.",
      title: "Participa en la sesión online",
      text: ["La formación tiene una duración anunciada de dos horas. Revisa previamente el horario y las condiciones de participación."],
    },
    {
      label: "Paso 3.",
      title: "Accede a la práctica interactiva por Zoom",
      text: ["La sesión incorpora un componente práctico guiado. Podrás conocer la dinámica educativa y plantear las dudas que correspondan al desarrollo de la actividad."],
    },
    {
      label: "Paso 4.",
      title: "Comprueba el alcance de tu formación",
      text: ["Antes de completar tu inscripción, confirma qué documentación se entrega, qué acredita el certificado y si satisface los requisitos de tu institución o empleador."],
    },
    {
      label: "Paso 5.",
      title: "Decide con información clara",
      text: [
        "Si la formación corresponde a tus necesidades, podrás continuar con el proceso de inscripción.",
        "Si necesitas una acreditación específica que no está contemplada, es mejor saberlo antes de pagar.",
      ],
    },
  ] satisfies ProcessStepData[],
}

export const TRANSPARENCY = {
  title: "La confianza se construye con información que puedes comprobar.",
  intro: [
    "Cuando se trata de formación en primeros auxilios, las afirmaciones importantes deben poder verificarse.",
    "Por eso, antes de tomar una decisión, debes poder revisar la información correspondiente a la formación.",
  ],
  blocks: [
    {
      title: "Documentación de respaldo",
      text: "Consulta los documentos que acreditan el respaldo declarado para el curso y la entidad responsable de su emisión.",
    },
    {
      title: "Certificado",
      text: "Solicita el nombre exacto del certificado, quién lo emite, sus condiciones de obtención y el alcance de lo que acredita.",
    },
    {
      title: "Testimonios y resultados documentados",
      text: "Los testimonios y resultados documentados disponibles deben presentarse con su contexto real y sin atribuir al curso resultados clínicos que no estén demostrados.",
    },
    {
      title: "Importante",
      text: "Si necesitas presentar la acreditación ante un empleador, una institución educativa o una entidad reguladora, confirma directamente que el certificado cumple los requisitos que te solicitan.",
    },
  ],
  closing: "La transparencia no es un detalle secundario. Es parte de una decisión responsable.",
}

export const OFFER = {
  title: "Refuerza tus conocimientos con una formación online de dos horas.",
  name: "RCP Solo Compresiones",
  price: "Inversión total anunciada: $35 USD",
  includesTitle: "Tu formación contempla:",
  includes: [
    "Modalidad online.",
    "Duración de dos horas.",
    "Práctica interactiva por Zoom.",
    "Una experiencia educativa orientada a aprender o reforzar conocimientos de RCP Solo Compresiones.",
  ],
  transparency: "Antes del pago, podrás confirmar los contenidos específicos, los requisitos de participación y la documentación o certificado correspondiente.",
  decide: [
    "No necesitas decidir basándote en el miedo.",
    "Decide comprobando si esta formación encaja con lo que buscas.",
  ],
  cta: "QUIERO INFORMACIÓN PARA INSCRIBIRME",
  microcopy: "Escríbenos por WhatsApp para resolver tus dudas sobre la modalidad, el precio y el certificado.",
}

export const FAQ_TITLE = "Preguntas frecuentes"

export const FINAL_CTA = {
  title: "Tu preparación merece algo más que una suposición.",
  paragraphs: [
    "No necesitas esperar a sentirte inseguro para seguir aprendiendo.",
    "Puedes revisar tus conocimientos, reconocer lo que necesitas reforzar y valorar una formación que combina aprendizaje online con práctica interactiva.",
  ],
  summaryName: "RCP Solo Compresiones",
  summary: ["Online.", "Dos horas.", "Práctica interactiva por Zoom.", "$35 USD."],
  text: "Conoce los contenidos, comprueba el alcance del certificado y resuelve tus dudas antes de inscribirte.",
  cta: "QUIERO CONSULTAR POR WHATSAPP",
  closing: "La preparación es un proceso continuo. Empieza con información clara, práctica adecuada y expectativas realistas.",
}
