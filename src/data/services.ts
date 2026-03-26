import type { LucideIcon } from "lucide-react";
import {
  Shield,
  Globe,
  TrendingUp,
  Crosshair,
  Monitor,
  Award,
} from "lucide-react";

export type Service = {
  id: string;
  category: string;
  icon: LucideIcon;
  description: string;
  items: string[];
  details: string;
};

// Nota: tu pegado venía cortado en 'credibilidad'; dejé el bloque completo basado en los mensajes previos.
export const servicesData: Service[] = [
  {
    id: "blindaje",
    category: "Blindaje y Reputación",
    icon: Shield,
    description:
      "Protegemos tu identidad digital ante cualquier amenaza, controlando lo que el mundo ve cuando te busca.",
    items: [
      "Diagnóstico completo de presencia",
      "Identificación de riesgos reputacionales",
      "Construcción de narrativa positiva",
      "Control de primeras impresiones",
      "Contención de crisis digitales",
    ],
    details:
      "En la era digital, la percepción es la realidad. Nuestro servicio de blindaje está diseñado para figuras públicas, corporaciones y líderes que no pueden permitirse el lujo de una crisis sin contención. Mapeamos vulnerabilidades, desplazamos contenidos perjudiciales y construimos un muro de contención SEO a tu alrededor.",
  },
  {
    id: "control",
    category: "Control de Conversación",
    icon: Globe,
    description:
      "Dictamos el ritmo y el tono de lo que se habla de ti en el ecosistema digital y redes sociales.",
    items: [
      "Gestión estratégica en redes sociales",
      "Activación de interacción dirigida",
      "Redirección de percepción pública",
      "Auditoría de primera página en Google",
      "Desplazamiento de contenido negativo",
    ],
    details:
      "Dejar la conversación pública al azar es un riesgo inaceptable. Utilizamos ejércitos digitales, inteligencia artificial y tácticas de guerrilla narrativa para inyectar tus mensajes clave, redirigir debates y asegurar que la primera página de Google cuente tu versión de la historia.",
  },
  {
    id: "core",
    category: "Servicios Core Digitales",
    icon: Monitor,
    description:
      "Desarrollo tecnológico, diseño y arquitectura web de ultra alto nivel para dominar tu mercado.",
    items: [
      "Estrategia & Branding",
      "Diseño y Desarrollo web",
      "SEO & Publicidad digital",
      "Analítica y Automatización",
      "Soporte técnico integral",
    ],
    details:
      "La infraestructura es tan importante como el mensaje. Desarrollamos ecosistemas digitales veloces, seguros y orientados a la conversión. Desde el rebranding corporativo hasta la arquitectura de servidores, tu presencia online será inquebrantable y superior a tu competencia.",
  },
  {
    id: "viralizacion",
    category: "Viralización y Amplificación",
    icon: TrendingUp,
    description:
      "Hacemos que tu mensaje escale exponencialmente, dominando tendencias y algoritmos.",
    items: [
      "Diseño de mensajes con potencial",
      "Activación de conversación masiva",
      "Amplificación de mensajes clave",
      "Escalamiento digital con seguimiento",
      "Publicidad con enfoque reputacional",
    ],
    details:
      "La viralidad no es suerte, es ciencia. Diseñamos contenidos psicométricamente adaptados a tus audiencias para garantizar su difusión. Comprendemos los detonantes emocionales de las redes sociales para posicionar tus iniciativas en la cima de la atención pública.",
  },
  {
    id: "prestigio",
    category: "Prestigio y Liderazgo",
    icon: Award,
    description:
      "Elevamos tu perfil al estatus de autoridad indiscutible en tu sector o industria.",
    items: [
      "Desarrollo de libros y publicaciones",
      "Diseño de conferencias y ponencias",
      "Vinculación académica internacional",
      "Construcción de liderazgo de opinión",
      "Media training para vocería",
    ],
    details:
      "Transformamos a directivos en líderes de pensamiento. A través de ghostwriting avanzado, publicación en medios Tier-1 y preparación intensiva para vocería, consolidamos tu perfil como la referencia absoluta en tu área de expertise.",
  },
  {
    id: "credibilidad",
    category: "Plataformas de Credibilidad",
    icon: Crosshair,
    description:
      "Arquitectura de información diseñada específicamente para generar confianza instantánea.",
    items: [
      "Desarrollo de sitios web estratégicos",
      "Arquitectura de mensaje claro",
      "Optimización para confianza",
      "Producción audiovisual profesional",
      "Desarrollo de podcasts propios",
    ],
    details:
      "Creamos activos digitales propios que funcionan como anclas de verdad. Desde podcasts de alta producción hasta hubs de contenido y documentales corporativos, te damos los canales necesarios para ser tu propio medio de comunicación y no depender de terceros.",
  },
];
