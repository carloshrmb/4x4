export type Question = {
  id: string;
  category: "Conocimiento" | "Habilidades" | "Competencias" | "Valores";
  dimension: "Físico" | "Emocional" | "Espiritual" | "Intelectual";
  text: string;
};

export const questions: Question[] = [
  // CONOCIMIENTO
  {
    id: "K1",
    category: "Conocimiento",
    dimension: "Físico",
    text: "¿Qué tanto comprendes cómo tu nutrición, descanso y actividad física impactan en tu rendimiento?",
  },
  {
    id: "K2",
    category: "Conocimiento",
    dimension: "Emocional",
    text: "¿Qué tan bien identificas tus detonantes emocionales y cómo influyen en tus decisiones?",
  },
  {
    id: "K3",
    category: "Conocimiento",
    dimension: "Espiritual",
    text: "¿Qué tanta claridad tienes sobre tu misión personal y su conexión con el impacto que buscas?",
  },
  {
    id: "K4",
    category: "Conocimiento",
    dimension: "Intelectual",
    text: "¿Qué tan actualizado estás en tendencias, herramientas digitales e innovaciones de tu área?",
  },
  // HABILIDADES
  {
    id: "H1",
    category: "Habilidades",
    dimension: "Físico",
    text: "¿Tienes disciplina para mantener rutinas de salud y administrar tu energía diaria?",
  },
  {
    id: "H2",
    category: "Habilidades",
    dimension: "Emocional",
    text: "¿Qué tan hábil eres para escuchar activamente y comunicarte con empatía?",
  },
  {
    id: "H3",
    category: "Habilidades",
    dimension: "Espiritual",
    text: "¿Qué tanto logras inspirar a otros con tus acciones y narrativa personal?",
  },
  {
    id: "H4",
    category: "Habilidades",
    dimension: "Intelectual",
    text: "¿Qué tan hábil eres usando tecnología como IA o CRM para optimizar resultados?",
  },
  // COMPETENCIAS
  {
    id: "C1",
    category: "Competencias",
    dimension: "Físico",
    text: "¿Puedes mantener alto desempeño sin llegar al agotamiento crónico?",
  },
  {
    id: "C2",
    category: "Competencias",
    dimension: "Emocional",
    text: "¿Qué tan resiliente eres ante el fracaso, transformando obstáculos en oportunidades?",
  },
  {
    id: "C3",
    category: "Competencias",
    dimension: "Espiritual",
    text: "¿Tomas decisiones basadas en tu propósito a largo plazo sobre ganancias inmediatas?",
  },
  {
    id: "C4",
    category: "Competencias",
    dimension: "Intelectual",
    text: "¿Qué tan efectivo eres analizando problemas complejos y proponiendo soluciones?",
  },
  // VALORES
  {
    id: "V1",
    category: "Valores",
    dimension: "Físico",
    text: "¿Priorizas tu bienestar físico como valor innegociable para servir a los demás?",
  },
  {
    id: "V2",
    category: "Valores",
    dimension: "Emocional",
    text: "¿El respeto, bondad y paciencia guían tu trato hacia tu equipo y comunidad?",
  },
  {
    id: "V3",
    category: "Valores",
    dimension: "Espiritual",
    text: "¿Demuestras integridad y honestidad en cada promesa y compromiso?",
  },
  {
    id: "V4",
    category: "Valores",
    dimension: "Intelectual",
    text: "¿Practicas la humildad intelectual y tienes compromiso real con la mejora continua?",
  },
];

export function getProfile(avg: number): {
  label: string;
  color: string;
  emoji: string;
  description: string;
} {
  if (avg <= 4) {
    return {
      label: "VEHÍCULO EN RESTAURACIÓN",
      color: "#C41E1E",
      emoji: "🔴",
      description:
        "Tienes oportunidades claras de mejora. Con el plan correcto, cada área puede ser calibrada para alcanzar tu máximo potencial.",
    };
  }
  if (avg <= 7) {
    return {
      label: "EN CAMINO AL TERRENO",
      color: "#E07020",
      emoji: "🟠",
      description:
        "Vas por buen camino. Tu motor tiene potencia pero aún puedes afinar la tracción en algunos ejes clave.",
    };
  }
  return {
    label: "PROFESIONAL TODOTERRENO",
    color: "#D4A017",
    emoji: "🟡",
    description:
      "Eres un profesional de alto rendimiento. Mantienes tus 4 ruedas en terreno exigente y sigues mejorando.",
  };
}

export function scoreColor(score: number): string {
  if (score <= 4) return "#C41E1E";
  if (score <= 7) return "#E07020";
  return "#D4A017";
}
