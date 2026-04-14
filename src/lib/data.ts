export type CaseResult = {
  amount: string;
  type: string;
  description: string;
  service: "msa" | "lien" | "consulting" | "trust" | "liability";
};

export type Testimonial = {
  quote: string;
  quoteEs: string;
  name: string;
  location: string;
  rating: number;
};

export type FAQItem = {
  question: string;
  questionEs: string;
  answer: string;
  answerEs: string;
};

export const caseResults: CaseResult[] = [
  {
    amount: "$2.4M",
    type: "Workers' Comp MSA",
    description: "Full lifecycle administration with CMS compliance and zero audit issues",
    service: "msa",
  },
  {
    amount: "$1.8M",
    type: "Liability Settlement",
    description: "LMSA development and post-settlement administration for auto injury case",
    service: "liability",
  },
  {
    amount: "$890K",
    type: "Lien Reduction",
    description: "Negotiated 62% reduction in Medicare conditional payment liens",
    service: "lien",
  },
  {
    amount: "$3.1M",
    type: "Trust Administration",
    description: "Special Needs Trust protecting SSI eligibility for catastrophic injury",
    service: "trust",
  },
  {
    amount: "$1.2M",
    type: "Settlement Consulting",
    description: "Pre-settlement MSA allocation saved client from $1.2M overpayment",
    service: "consulting",
  },
  {
    amount: "$650K",
    type: "Lien Resolution",
    description: "Complete clearance of Medicare, Medicaid, and ERISA liens for clean closing",
    service: "lien",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote: "They made the most confusing process of my life feel manageable. I always knew where my case stood and never felt alone.",
    quoteEs: "Hicieron que el proceso más confuso de mi vida se sintiera manejable. Siempre supe dónde estaba mi caso y nunca me sentí solo.",
    name: "Maria G.",
    location: "Los Angeles, CA",
    rating: 5,
  },
  {
    quote: "Medvst saved my family over $340,000 in unnecessary Medicare liens. They fought for us when no one else would.",
    quoteEs: "Medvst le ahorró a mi familia más de $340,000 en gravámenes innecesarios de Medicare. Lucharon por nosotros cuando nadie más lo haría.",
    name: "Carlos R.",
    location: "San Fernando Valley, CA",
    rating: 5,
  },
  {
    quote: "I was so overwhelmed until I found Medvst. They explained everything in plain English and took over completely. I could finally breathe.",
    quoteEs: "Estaba tan abrumada hasta que encontré Medvst. Me explicaron todo en términos sencillos y se hicieron cargo completamente. Finalmente pude respirar.",
    name: "Sandra M.",
    location: "Van Nuys, CA",
    rating: 5,
  },
  {
    quote: "Professional, caring, and incredibly thorough. They handled every detail of my MSA and I never had to worry about compliance.",
    quoteEs: "Profesionales, atentos e increíblemente minuciosos. Manejaron cada detalle de mi MSA y nunca tuve que preocuparme por el cumplimiento.",
    name: "Robert T.",
    location: "Burbank, CA",
    rating: 5,
  },
  {
    quote: "The client portal alone is worth it. I can check my case status anytime without making a phone call. This is how it should be done.",
    quoteEs: "Solo el portal del cliente ya vale la pena. Puedo verificar el estado de mi caso en cualquier momento sin hacer una llamada telefónica. Así es como debería hacerse.",
    name: "Jennifer L.",
    location: "Glendale, CA",
    rating: 5,
  },
];

export const homeFAQs: FAQItem[] = [
  {
    question: "What is a Medicare Set-Aside?",
    questionEs: "¿Qué es un Medicare Set-Aside?",
    answer: "A Medicare Set-Aside (MSA) is a financial arrangement that sets aside a portion of a settlement to pay for future medical expenses related to your injury that would otherwise be covered by Medicare. It protects both you and Medicare's interests.",
    answerEs: "Un Medicare Set-Aside (MSA) es un arreglo financiero que reserva una parte de un acuerdo para pagar gastos médicos futuros relacionados con su lesión que de otro modo serían cubiertos por Medicare. Protege tanto sus intereses como los de Medicare.",
  },
  {
    question: "How much does your service cost?",
    questionEs: "¿Cuánto cuesta su servicio?",
    answer: "We offer a free initial consultation to understand your situation. Our fees vary depending on the complexity of your case and the services you need. We believe in transparency and will provide a clear fee schedule before any work begins.",
    answerEs: "Ofrecemos una consulta inicial gratuita para entender su situación. Nuestras tarifas varían según la complejidad de su caso y los servicios que necesita. Creemos en la transparencia y proporcionaremos un calendario de tarifas claro antes de que comience cualquier trabajo.",
  },
  {
    question: "How long does the MSA process take?",
    questionEs: "¿Cuánto tiempo dura el proceso de MSA?",
    answer: "The timeline varies by case, but most MSA administrations are set up within 2-4 weeks of receiving all necessary documents. We pride ourselves on being 40% faster than the industry average while maintaining 100% CMS compliance.",
    answerEs: "El plazo varía según el caso, pero la mayoría de las administraciones de MSA se establecen dentro de 2-4 semanas de recibir todos los documentos necesarios. Nos enorgullecemos de ser un 40% más rápidos que el promedio de la industria mientras mantenemos un 100% de cumplimiento con CMS.",
  },
  {
    question: "Do you serve clients outside California?",
    questionEs: "¿Atienden clientes fuera de California?",
    answer: "Yes! Medvst serves clients in all 50 states. Medicare Set-Aside administration is governed by federal regulations, and our team has expertise handling cases nationwide regardless of your location.",
    answerEs: "¡Sí! Medvst atiende clientes en los 50 estados. La administración de Medicare Set-Aside se rige por regulaciones federales, y nuestro equipo tiene experiencia manejando casos en todo el país independientemente de su ubicación.",
  },
];
