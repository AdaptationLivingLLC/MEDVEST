// =============================================================================
// Medvst — Site Content Data
// All page content as typed TypeScript objects, bilingual EN/ES
// =============================================================================

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface LocalizedString {
  en: string;
  es: string;
}

export interface LocalizedStringArray {
  en: string[];
  es: string[];
}

export interface SEOMeta {
  title: LocalizedString;
  description: LocalizedString;
}

export interface Benefit {
  title: LocalizedString;
  description: LocalizedString;
  icon?: string;
}

export interface ProcessStep {
  step: number;
  title: LocalizedString;
  description: LocalizedString;
  details?: LocalizedString;
}

export interface FAQItem {
  question: LocalizedString;
  answer: LocalizedString;
  category?: string;
}

export interface CaseResult {
  id: string;
  amount: string;
  type: LocalizedString;
  description: LocalizedString;
  serviceCategory: string;
}

export interface TeamMember {
  name: string;
  role: LocalizedString;
  bio: LocalizedString;
  image?: string;
}

export interface Credential {
  title: LocalizedString;
  description: LocalizedString;
  icon?: string;
}

export interface ServicePage {
  slug: string;
  seo: SEOMeta;
  hero: {
    headline: LocalizedString;
    description: LocalizedString;
  };
  benefits: Benefit[];
  explanation: LocalizedString;
  processSteps: ProcessStep[];
  faqs: FAQItem[];
}

export interface PortalFeature {
  title: LocalizedString;
  description: LocalizedString;
  icon?: string;
}

// -----------------------------------------------------------------------------
// Business Info
// -----------------------------------------------------------------------------

export const businessInfo = {
  name: 'Medvst',
  legalName: 'Medvst',
  address: {
    street: 'PO Box 8294',
    city: 'Van Nuys',
    state: 'CA',
    zip: '91410',
    full: 'PO Box 8294, Van Nuys, CA 91410',
  },
  phone: '(818) 674-1211',
  phoneRaw: '+18186741211',
  email: 'info@medvst.com',
  domain: 'medvst.com',
  url: 'https://medvst.com',
  hours: {
    en: 'Monday - Friday, 8:00 AM - 6:00 PM PST',
    es: 'Lunes a Viernes, 8:00 AM - 6:00 PM PST',
  },
  serviceArea: {
    en: 'All 50 states',
    es: 'Los 50 estados',
  },
};

// -----------------------------------------------------------------------------
// About Page
// -----------------------------------------------------------------------------

export const aboutContent = {
  seo: {
    title: {
      en: 'About Medvst | Medicare Set-Aside Administration',
      es: 'Sobre Medvst | Administracion de Medicare Set-Aside',
    },
    description: {
      en: 'Learn about Medvst, a nationwide Medicare Set-Aside administration company helping injured individuals protect their settlements and Medicare benefits.',
      es: 'Conozca Medvst, una empresa nacional de administracion de Medicare Set-Aside que ayuda a personas lesionadas a proteger sus acuerdos y beneficios de Medicare.',
    },
  },

  hero: {
    headline: {
      en: 'We Protect What Matters Most: Your Settlement and Your Future',
      es: 'Protegemos Lo Que Mas Importa: Su Acuerdo y Su Futuro',
    },
    subheadline: {
      en: 'Medvst helps injured individuals and their families navigate Medicare Set-Asides, liens, and settlement administration with care and expertise.',
      es: 'Medvst ayuda a personas lesionadas y sus familias a navegar los Medicare Set-Asides, gravamenes y administracion de acuerdos con cuidado y experiencia.',
    },
  },

  story: {
    en: [
      'Medvst was founded on a simple belief: people who have been injured and received a settlement deserve clear, honest guidance about how to protect their money and their Medicare benefits. Too often, individuals are left confused by complicated government rules, unsure whether they are doing the right thing with their settlement funds. We started Medvst to change that.',
      'Our founder, Shahpoor, saw firsthand how families struggled to understand Medicare Set-Asides, liens, and compliance requirements after settling an injury claim. The paperwork was overwhelming. The language was confusing. And the consequences of making a mistake were serious — including losing access to Medicare coverage. He knew there had to be a better way to help people through this process.',
      'Today, Medvst serves families across all 50 states. We handle the complex paperwork, communicate with Medicare and CMS on your behalf, and make sure your settlement funds are managed correctly. We speak your language — both literally, with full services in English and Spanish, and figuratively, by explaining everything in plain terms you can understand. Your peace of mind is our priority.',
    ],
    es: [
      'Medvst fue fundada con una creencia simple: las personas que han sido lesionadas y recibieron un acuerdo merecen una orientacion clara y honesta sobre como proteger su dinero y sus beneficios de Medicare. Con demasiada frecuencia, las personas quedan confundidas por las complicadas reglas del gobierno, sin saber si estan haciendo lo correcto con los fondos de su acuerdo. Creamos Medvst para cambiar eso.',
      'Nuestro fundador, Shahpoor, vio de primera mano como las familias luchaban por entender los Medicare Set-Asides, los gravamenes y los requisitos de cumplimiento despues de resolver un reclamo por lesiones. El papeleo era abrumador. El lenguaje era confuso. Y las consecuencias de cometer un error eran graves, incluyendo perder el acceso a la cobertura de Medicare. El sabia que tenia que haber una mejor manera de ayudar a las personas en este proceso.',
      'Hoy, Medvst atiende a familias en los 50 estados. Nos encargamos del papeleo complejo, nos comunicamos con Medicare y CMS en su nombre, y nos aseguramos de que los fondos de su acuerdo se administren correctamente. Hablamos su idioma, tanto literalmente, con servicios completos en ingles y espanol, como figurativamente, explicando todo en terminos sencillos que pueda entender. Su tranquilidad es nuestra prioridad.',
    ],
  },

  mission: {
    en: 'To give every injured individual and their family the expert support they need to protect their settlement, maintain their Medicare benefits, and move forward with confidence.',
    es: 'Dar a cada persona lesionada y su familia el apoyo experto que necesitan para proteger su acuerdo, mantener sus beneficios de Medicare y avanzar con confianza.',
  },

  values: [
    {
      title: { en: 'Clarity', es: 'Claridad' },
      description: {
        en: 'We explain everything in plain language. No legal jargon, no confusing forms — just honest answers.',
        es: 'Explicamos todo en un lenguaje sencillo. Sin jerga legal, sin formularios confusos, solo respuestas honestas.',
      },
    },
    {
      title: { en: 'Compassion', es: 'Compasion' },
      description: {
        en: 'We know this is a stressful time. We treat every client like family and take the burden off your shoulders.',
        es: 'Sabemos que este es un momento estresante. Tratamos a cada cliente como familia y le quitamos la carga de encima.',
      },
    },
    {
      title: { en: 'Compliance', es: 'Cumplimiento' },
      description: {
        en: 'Every dollar is tracked, every report is filed, and every requirement is met. Your settlement stays protected.',
        es: 'Cada dolar es rastreado, cada informe es presentado y cada requisito es cumplido. Su acuerdo permanece protegido.',
      },
    },
    {
      title: { en: 'Accessibility', es: 'Accesibilidad' },
      description: {
        en: 'Full bilingual services in English and Spanish, serving all 50 states, with a client portal you can access anytime.',
        es: 'Servicios bilingues completos en ingles y espanol, sirviendo a los 50 estados, con un portal de cliente al que puede acceder en cualquier momento.',
      },
    },
  ],

  team: [
    {
      name: 'Shahpoor',
      role: {
        en: 'Founder & CEO',
        es: 'Fundador y CEO',
      },
      bio: {
        en: 'Shahpoor founded Medvst after witnessing the confusion and anxiety that injured individuals face when navigating Medicare Set-Asides and settlement compliance. With years of experience in healthcare administration and a deep commitment to helping families, he built Medvst to be the trusted partner that every settlement recipient deserves. He oversees all operations and personally ensures that each client receives the highest level of service.',
        es: 'Shahpoor fundo Medvst despues de presenciar la confusion y la ansiedad que enfrentan las personas lesionadas al navegar los Medicare Set-Asides y el cumplimiento de acuerdos. Con anos de experiencia en administracion de salud y un profundo compromiso de ayudar a las familias, construyo Medvst para ser el socio de confianza que todo beneficiario de acuerdo merece. El supervisa todas las operaciones y personalmente se asegura de que cada cliente reciba el mas alto nivel de servicio.',
      },
    },
  ] as TeamMember[],

  credentials: [
    {
      title: {
        en: 'CMS Compliant',
        es: 'Cumplimiento con CMS',
      },
      description: {
        en: 'All of our processes meet Centers for Medicare & Medicaid Services requirements. Your settlement administration is fully compliant.',
        es: 'Todos nuestros procesos cumplen con los requisitos de los Centros de Servicios de Medicare y Medicaid. La administracion de su acuerdo cumple completamente.',
      },
    },
    {
      title: {
        en: 'HIPAA Secure',
        es: 'Seguridad HIPAA',
      },
      description: {
        en: 'Your medical and financial information is protected with HIPAA-compliant security measures at every step.',
        es: 'Su informacion medica y financiera esta protegida con medidas de seguridad que cumplen con HIPAA en cada paso.',
      },
    },
    {
      title: {
        en: 'All 50 States',
        es: 'Los 50 Estados',
      },
      description: {
        en: 'We serve clients nationwide. No matter where you live, Medvst is available to help with your settlement.',
        es: 'Servimos a clientes en todo el pais. No importa donde viva, Medvst esta disponible para ayudar con su acuerdo.',
      },
    },
    {
      title: {
        en: 'Bilingual Services',
        es: 'Servicios Bilingues',
      },
      description: {
        en: 'Full service in English and Spanish. We believe everyone deserves to understand their settlement in their own language.',
        es: 'Servicio completo en ingles y espanol. Creemos que todos merecen entender su acuerdo en su propio idioma.',
      },
    },
  ] as Credential[],
};

// -----------------------------------------------------------------------------
// Services Pages (5 services)
// -----------------------------------------------------------------------------

export const servicePages: ServicePage[] = [
  // ---- MSA Administration ----
  {
    slug: 'msa-administration',
    seo: {
      title: {
        en: 'MSA Administration Services | Medvst',
        es: 'Servicios de Administracion MSA | Medvst',
      },
      description: {
        en: 'Professional Medicare Set-Aside administration. Medvst manages your MSA funds, tracks medical expenses, and ensures full CMS compliance nationwide.',
        es: 'Administracion profesional de Medicare Set-Aside. Medvst administra sus fondos MSA, rastrea gastos medicos y garantiza el cumplimiento total con CMS a nivel nacional.',
      },
    },
    hero: {
      headline: {
        en: 'Medicare Set-Aside Administration',
        es: 'Administracion de Medicare Set-Aside',
      },
      description: {
        en: 'Let us manage your MSA so you can focus on your recovery. We handle the paperwork, track every dollar, and keep you in compliance with Medicare — so you never have to worry about losing your benefits.',
        es: 'Permitanos administrar su MSA para que pueda concentrarse en su recuperacion. Nos encargamos del papeleo, rastreamos cada dolar y lo mantenemos en cumplimiento con Medicare, para que nunca tenga que preocuparse por perder sus beneficios.',
      },
    },
    benefits: [
      {
        title: { en: 'Complete Fund Management', es: 'Gestion Completa de Fondos' },
        description: {
          en: 'We set up and manage your MSA account, pay approved medical bills, and track every transaction so your funds are used correctly.',
          es: 'Configuramos y administramos su cuenta MSA, pagamos facturas medicas aprobadas y rastreamos cada transaccion para que sus fondos se utilicen correctamente.',
        },
      },
      {
        title: { en: 'CMS Annual Reporting', es: 'Informes Anuales a CMS' },
        description: {
          en: 'We prepare and submit all required reports to the Centers for Medicare & Medicaid Services on your behalf, on time, every time.',
          es: 'Preparamos y enviamos todos los informes requeridos a los Centros de Servicios de Medicare y Medicaid en su nombre, a tiempo, siempre.',
        },
      },
      {
        title: { en: 'Medical Bill Review', es: 'Revision de Facturas Medicas' },
        description: {
          en: 'Every bill is reviewed to make sure only eligible expenses are paid from your MSA, protecting your funds from errors or overcharges.',
          es: 'Cada factura se revisa para asegurar que solo los gastos elegibles se paguen de su MSA, protegiendo sus fondos de errores o cobros excesivos.',
        },
      },
      {
        title: { en: 'Online Portal Access', es: 'Acceso al Portal en Linea' },
        description: {
          en: 'Track your MSA balance, view payment history, and download reports anytime through your secure online portal.',
          es: 'Rastree su saldo MSA, vea el historial de pagos y descargue informes en cualquier momento a traves de su portal seguro en linea.',
        },
      },
      {
        title: { en: 'Protect Your Medicare Benefits', es: 'Proteja Sus Beneficios de Medicare' },
        description: {
          en: 'Proper MSA administration ensures Medicare will continue to cover your healthcare needs after your settlement funds are exhausted.',
          es: 'La administracion adecuada del MSA asegura que Medicare continuara cubriendo sus necesidades de atencion medica despues de que se agoten los fondos de su acuerdo.',
        },
      },
    ],
    explanation: {
      en: 'A Medicare Set-Aside (MSA) is a portion of your settlement that is set aside to pay for future medical expenses related to your injury. Medicare requires this to make sure your settlement — not Medicare — pays for injury-related care first. If the MSA is not managed correctly, Medicare can refuse to pay for your medical care, even after your settlement money runs out.\n\nThat is where Medvst comes in. We take full responsibility for administering your MSA. We open a dedicated account for your funds, review and pay your medical bills, keep detailed records, and submit all required annual reports to CMS. You do not have to figure out which bills qualify, how to file reports, or what the rules are — we handle all of it.\n\nOur team has administered hundreds of millions of dollars in MSA funds. We know the rules inside and out, and we stay current on every change in CMS policy. When you work with Medvst, you can focus on your health and your family, knowing your MSA is in expert hands.',
      es: 'Un Medicare Set-Aside (MSA) es una porcion de su acuerdo que se reserva para pagar futuros gastos medicos relacionados con su lesion. Medicare requiere esto para asegurarse de que su acuerdo, no Medicare, pague primero por la atencion relacionada con la lesion. Si el MSA no se administra correctamente, Medicare puede negarse a pagar por su atencion medica, incluso despues de que se agote el dinero de su acuerdo.\n\nAhi es donde entra Medvst. Asumimos la responsabilidad total de administrar su MSA. Abrimos una cuenta dedicada para sus fondos, revisamos y pagamos sus facturas medicas, mantenemos registros detallados y presentamos todos los informes anuales requeridos a CMS. Usted no tiene que averiguar que facturas califican, como presentar informes o cuales son las reglas — nosotros nos encargamos de todo.\n\nNuestro equipo ha administrado cientos de millones de dolares en fondos MSA. Conocemos las reglas de principio a fin y nos mantenemos al dia con cada cambio en la politica de CMS. Cuando trabaja con Medvst, puede concentrarse en su salud y su familia, sabiendo que su MSA esta en manos expertas.',
    },
    processSteps: [
      {
        step: 1,
        title: { en: 'Initial Consultation', es: 'Consulta Inicial' },
        description: {
          en: 'We review your settlement documents and MSA allocation to understand your specific situation and needs.',
          es: 'Revisamos sus documentos de acuerdo y asignacion MSA para comprender su situacion y necesidades especificas.',
        },
      },
      {
        step: 2,
        title: { en: 'Account Setup', es: 'Configuracion de Cuenta' },
        description: {
          en: 'We establish your dedicated MSA account, set up your online portal, and register with CMS on your behalf.',
          es: 'Establecemos su cuenta MSA dedicada, configuramos su portal en linea y nos registramos con CMS en su nombre.',
        },
      },
      {
        step: 3,
        title: { en: 'Ongoing Administration', es: 'Administracion Continua' },
        description: {
          en: 'We review and pay your medical bills, track your balance, and handle all correspondence with Medicare and CMS.',
          es: 'Revisamos y pagamos sus facturas medicas, rastreamos su saldo y manejamos toda la correspondencia con Medicare y CMS.',
        },
      },
      {
        step: 4,
        title: { en: 'Annual Reporting & Support', es: 'Informes Anuales y Soporte' },
        description: {
          en: 'We file all required annual attestation reports and are always available to answer your questions or help with issues.',
          es: 'Presentamos todos los informes de atestacion anuales requeridos y siempre estamos disponibles para responder sus preguntas o ayudar con problemas.',
        },
      },
    ],
    faqs: [
      {
        question: {
          en: 'What happens if I manage my MSA on my own and make a mistake?',
          es: 'Que sucede si administro mi MSA por mi cuenta y cometo un error?',
        },
        answer: {
          en: 'If your MSA is not administered correctly — for example, if you use the funds for non-approved expenses or fail to file reports — Medicare can deny coverage for your injury-related medical care. This can leave you responsible for paying those medical bills out of pocket, even after your MSA funds are gone. Professional administration protects you from these risks.',
          es: 'Si su MSA no se administra correctamente, por ejemplo, si utiliza los fondos para gastos no aprobados o no presenta informes, Medicare puede negar la cobertura de su atencion medica relacionada con la lesion. Esto puede dejarlo responsable de pagar esas facturas medicas de su bolsillo, incluso despues de que se agoten los fondos de su MSA. La administracion profesional lo protege de estos riesgos.',
        },
      },
      {
        question: {
          en: 'How much does MSA administration cost?',
          es: 'Cuanto cuesta la administracion de MSA?',
        },
        answer: {
          en: 'Our fees are competitive and transparent. In most cases, the administration fee is included as part of the MSA allocation, so there is no additional out-of-pocket cost to you. We will explain all fees clearly during your initial consultation — there are never hidden charges.',
          es: 'Nuestras tarifas son competitivas y transparentes. En la mayoria de los casos, la tarifa de administracion se incluye como parte de la asignacion MSA, por lo que no hay costo adicional de su bolsillo. Explicaremos todas las tarifas claramente durante su consulta inicial — nunca hay cargos ocultos.',
        },
      },
      {
        question: {
          en: 'Can I still choose my own doctors with an MSA?',
          es: 'Puedo seguir eligiendo mis propios medicos con un MSA?',
        },
        answer: {
          en: 'Yes. An MSA does not change your ability to choose your healthcare providers. You continue to see the doctors you want. The MSA simply pays for injury-related medical expenses through the set-aside funds first, before Medicare begins covering those costs.',
          es: 'Si. Un MSA no cambia su capacidad de elegir sus proveedores de atencion medica. Usted continua viendo a los medicos que desee. El MSA simplemente paga los gastos medicos relacionados con la lesion a traves de los fondos reservados primero, antes de que Medicare comience a cubrir esos costos.',
        },
      },
    ],
  },

  // ---- Lien Resolution ----
  {
    slug: 'lien-resolution',
    seo: {
      title: {
        en: 'Medicare Lien Resolution | Medvst',
        es: 'Resolucion de Gravamenes de Medicare | Medvst',
      },
      description: {
        en: 'Expert Medicare lien resolution services. Medvst negotiates and resolves conditional payment liens to maximize your settlement take-home amount.',
        es: 'Servicios expertos de resolucion de gravamenes de Medicare. Medvst negocia y resuelve gravamenes de pagos condicionales para maximizar la cantidad neta de su acuerdo.',
      },
    },
    hero: {
      headline: {
        en: 'Medicare Lien Resolution',
        es: 'Resolucion de Gravamenes de Medicare',
      },
      description: {
        en: 'Medicare may have a claim on part of your settlement. We negotiate with Medicare to reduce what you owe and help you keep more of the money you deserve.',
        es: 'Medicare puede tener un reclamo sobre parte de su acuerdo. Negociamos con Medicare para reducir lo que debe y ayudarle a quedarse con mas del dinero que merece.',
      },
    },
    benefits: [
      {
        title: { en: 'Lien Amount Reduction', es: 'Reduccion del Monto del Gravamen' },
        description: {
          en: 'We work with Medicare and its recovery contractors to reduce the lien amount, often saving our clients thousands of dollars.',
          es: 'Trabajamos con Medicare y sus contratistas de recuperacion para reducir el monto del gravamen, a menudo ahorrando a nuestros clientes miles de dolares.',
        },
      },
      {
        title: { en: 'Conditional Payment Tracking', es: 'Rastreo de Pagos Condicionales' },
        description: {
          en: 'We obtain and verify all conditional payment records from Medicare to ensure the lien amount is accurate and includes only eligible payments.',
          es: 'Obtenemos y verificamos todos los registros de pagos condicionales de Medicare para asegurar que el monto del gravamen sea preciso e incluya solo pagos elegibles.',
        },
      },
      {
        title: { en: 'Dispute & Negotiation', es: 'Disputa y Negociacion' },
        description: {
          en: 'If Medicare includes charges that should not be on the lien, we dispute them and negotiate on your behalf to get the amount corrected.',
          es: 'Si Medicare incluye cargos que no deberian estar en el gravamen, los disputamos y negociamos en su nombre para que se corrija el monto.',
        },
      },
      {
        title: { en: 'Final Settlement Protection', es: 'Proteccion Final del Acuerdo' },
        description: {
          en: 'We make sure the lien is fully resolved before your settlement closes, so there are no surprises or claims against your money later.',
          es: 'Nos aseguramos de que el gravamen se resuelva completamente antes de que se cierre su acuerdo, para que no haya sorpresas ni reclamos contra su dinero despues.',
        },
      },
    ],
    explanation: {
      en: 'When you receive medical treatment for an injury and Medicare pays for some of that treatment, Medicare has the right to be reimbursed from your settlement. This is called a Medicare lien, or a conditional payment recovery. The amount Medicare claims can sometimes be incorrect — it may include charges for treatment unrelated to your injury, or the total may be higher than it should be.\n\nMedvst steps in to protect your settlement. We request the full list of conditional payments from Medicare and its recovery contractor (the Benefits Coordination & Recovery Center, or BCRC). We carefully review every charge to make sure it is related to your injury. If we find charges that should not be included, we dispute them. We then negotiate with Medicare to reduce the total lien amount wherever possible.\n\nThe result? You keep more of your settlement. Our clients regularly save significant amounts through our lien resolution process. And because we handle all the communication with Medicare and the BCRC, you do not have to deal with confusing letters or phone calls.',
      es: 'Cuando recibe tratamiento medico por una lesion y Medicare paga parte de ese tratamiento, Medicare tiene derecho a ser reembolsado de su acuerdo. Esto se llama un gravamen de Medicare, o una recuperacion de pago condicional. El monto que Medicare reclama a veces puede ser incorrecto — puede incluir cargos por tratamiento no relacionado con su lesion, o el total puede ser mas alto de lo que deberia ser.\n\nMedvst interviene para proteger su acuerdo. Solicitamos la lista completa de pagos condicionales de Medicare y su contratista de recuperacion (el Centro de Coordinacion y Recuperacion de Beneficios, o BCRC). Revisamos cuidadosamente cada cargo para asegurarnos de que este relacionado con su lesion. Si encontramos cargos que no deberian estar incluidos, los disputamos. Luego negociamos con Medicare para reducir el monto total del gravamen siempre que sea posible.\n\nEl resultado? Usted se queda con mas de su acuerdo. Nuestros clientes regularmente ahorran cantidades significativas a traves de nuestro proceso de resolucion de gravamenes. Y como manejamos toda la comunicacion con Medicare y el BCRC, usted no tiene que lidiar con cartas o llamadas telefonicas confusas.',
    },
    processSteps: [
      {
        step: 1,
        title: { en: 'Lien Investigation', es: 'Investigacion del Gravamen' },
        description: {
          en: 'We request and obtain the full conditional payment summary from Medicare and the BCRC to determine the exact lien amount.',
          es: 'Solicitamos y obtenemos el resumen completo de pagos condicionales de Medicare y el BCRC para determinar el monto exacto del gravamen.',
        },
      },
      {
        step: 2,
        title: { en: 'Line-by-Line Review', es: 'Revision Linea por Linea' },
        description: {
          en: 'We review every charge on the lien to identify payments unrelated to your injury and any billing errors that inflate the amount.',
          es: 'Revisamos cada cargo en el gravamen para identificar pagos no relacionados con su lesion y cualquier error de facturacion que infle el monto.',
        },
      },
      {
        step: 3,
        title: { en: 'Negotiation & Dispute', es: 'Negociacion y Disputa' },
        description: {
          en: 'We submit disputes for incorrect charges and negotiate with Medicare to reduce the total amount owed from your settlement.',
          es: 'Presentamos disputas por cargos incorrectos y negociamos con Medicare para reducir el monto total adeudado de su acuerdo.',
        },
      },
      {
        step: 4,
        title: { en: 'Resolution & Closure', es: 'Resolucion y Cierre' },
        description: {
          en: 'Once the final lien amount is agreed upon, we coordinate payment and obtain a final demand letter to close the lien permanently.',
          es: 'Una vez que se acuerda el monto final del gravamen, coordinamos el pago y obtenemos una carta de demanda final para cerrar el gravamen permanentemente.',
        },
      },
    ],
    faqs: [
      {
        question: {
          en: 'What is a Medicare conditional payment?',
          es: 'Que es un pago condicional de Medicare?',
        },
        answer: {
          en: 'A conditional payment is when Medicare pays for medical treatment related to your injury while your case is pending. Medicare pays on the condition that it will be reimbursed from your settlement. The total of these conditional payments becomes the Medicare lien on your settlement.',
          es: 'Un pago condicional es cuando Medicare paga por un tratamiento medico relacionado con su lesion mientras su caso esta pendiente. Medicare paga con la condicion de que sera reembolsado de su acuerdo. El total de estos pagos condicionales se convierte en el gravamen de Medicare sobre su acuerdo.',
        },
      },
      {
        question: {
          en: 'Can the Medicare lien be reduced?',
          es: 'Se puede reducir el gravamen de Medicare?',
        },
        answer: {
          en: 'Yes, in many cases the lien can be reduced. Medicare allows for procurement cost reductions (a share of your attorney fees and legal costs), and incorrect or unrelated charges can be disputed and removed. Our team works to reduce your lien to the lowest legitimate amount.',
          es: 'Si, en muchos casos el gravamen puede reducirse. Medicare permite reducciones por costos de adquisicion (una parte de los honorarios de su abogado y costos legales), y los cargos incorrectos o no relacionados pueden ser disputados y eliminados. Nuestro equipo trabaja para reducir su gravamen al monto legitimo mas bajo.',
        },
      },
      {
        question: {
          en: 'What happens if I ignore the Medicare lien?',
          es: 'Que sucede si ignoro el gravamen de Medicare?',
        },
        answer: {
          en: 'Ignoring a Medicare lien can have serious consequences. Medicare can pursue legal action to recover the money, and they can refuse to pay for future medical treatment related to your injury until the lien is resolved. It is always best to address the lien properly as part of your settlement.',
          es: 'Ignorar un gravamen de Medicare puede tener consecuencias graves. Medicare puede emprender acciones legales para recuperar el dinero, y pueden negarse a pagar por futuros tratamientos medicos relacionados con su lesion hasta que se resuelva el gravamen. Siempre es mejor abordar el gravamen adecuadamente como parte de su acuerdo.',
        },
      },
    ],
  },

  // ---- Settlement Consulting ----
  {
    slug: 'settlement-consulting',
    seo: {
      title: {
        en: 'Settlement Consulting Services | Medvst',
        es: 'Servicios de Consultoria de Acuerdos | Medvst',
      },
      description: {
        en: 'Expert settlement consulting to protect your future Medicare benefits. Medvst guides you through MSA allocations and settlement compliance.',
        es: 'Consultoria experta en acuerdos para proteger sus futuros beneficios de Medicare. Medvst lo guia a traves de asignaciones MSA y cumplimiento de acuerdos.',
      },
    },
    hero: {
      headline: {
        en: 'Settlement Consulting',
        es: 'Consultoria de Acuerdos',
      },
      description: {
        en: 'Settling an injury claim is just the beginning. We help you understand your obligations, protect your benefits, and make smart decisions with your settlement money.',
        es: 'Resolver un reclamo por lesiones es solo el comienzo. Le ayudamos a comprender sus obligaciones, proteger sus beneficios y tomar decisiones inteligentes con el dinero de su acuerdo.',
      },
    },
    benefits: [
      {
        title: { en: 'MSA Allocation Guidance', es: 'Orientacion sobre Asignacion MSA' },
        description: {
          en: 'We help determine whether your settlement requires an MSA and, if so, what the proper allocation amount should be.',
          es: 'Le ayudamos a determinar si su acuerdo requiere un MSA y, de ser asi, cual deberia ser el monto de asignacion adecuado.',
        },
      },
      {
        title: { en: 'Medicare Compliance Review', es: 'Revision de Cumplimiento con Medicare' },
        description: {
          en: 'We review your settlement terms to ensure everything complies with Medicare Secondary Payer rules and CMS requirements.',
          es: 'Revisamos los terminos de su acuerdo para asegurar que todo cumpla con las reglas de Medicare como Pagador Secundario y los requisitos de CMS.',
        },
      },
      {
        title: { en: 'Future Medical Cost Analysis', es: 'Analisis de Costos Medicos Futuros' },
        description: {
          en: 'We help project your future injury-related medical costs so your MSA allocation accurately reflects your needs.',
          es: 'Le ayudamos a proyectar sus futuros costos medicos relacionados con la lesion para que su asignacion MSA refleje con precision sus necesidades.',
        },
      },
      {
        title: { en: 'Plain Language Explanations', es: 'Explicaciones en Lenguaje Sencillo' },
        description: {
          en: 'We break down complex settlement requirements into terms you can understand, so you always know what is happening with your money.',
          es: 'Desglosamos los requisitos complejos del acuerdo en terminos que puede entender, para que siempre sepa que esta pasando con su dinero.',
        },
      },
    ],
    explanation: {
      en: 'After you settle an injury claim, there are important decisions to make — especially if you are a Medicare beneficiary or expect to become one in the future. The government has rules about how your settlement money should be used for future medical care related to your injury. If those rules are not followed, your Medicare benefits could be at risk.\n\nMedvst provides expert consulting to help you navigate these decisions. We review your settlement, assess whether a Medicare Set-Aside is required, and guide you through the entire compliance process. We work alongside your attorney to make sure your settlement is structured in a way that protects your benefits and your financial future.\n\nOur goal is to make sure you understand every step. We do not use confusing legal language or rush through explanations. We sit down with you, answer every question, and make sure you feel confident about the decisions being made with your settlement.',
      es: 'Despues de resolver un reclamo por lesiones, hay decisiones importantes que tomar, especialmente si usted es beneficiario de Medicare o espera serlo en el futuro. El gobierno tiene reglas sobre como se debe usar el dinero de su acuerdo para la atencion medica futura relacionada con su lesion. Si esas reglas no se siguen, sus beneficios de Medicare podrian estar en riesgo.\n\nMedvst proporciona consultoria experta para ayudarle a navegar estas decisiones. Revisamos su acuerdo, evaluamos si se requiere un Medicare Set-Aside y lo guiamos a traves de todo el proceso de cumplimiento. Trabajamos junto con su abogado para asegurarnos de que su acuerdo este estructurado de una manera que proteja sus beneficios y su futuro financiero.\n\nNuestro objetivo es asegurarnos de que usted entienda cada paso. No usamos lenguaje legal confuso ni nos apresuramos con las explicaciones. Nos sentamos con usted, respondemos cada pregunta y nos aseguramos de que se sienta seguro sobre las decisiones que se estan tomando con su acuerdo.',
    },
    processSteps: [
      {
        step: 1,
        title: { en: 'Settlement Review', es: 'Revision del Acuerdo' },
        description: {
          en: 'We review your settlement terms, medical records, and injury details to understand your full situation.',
          es: 'Revisamos los terminos de su acuerdo, registros medicos y detalles de la lesion para comprender su situacion completa.',
        },
      },
      {
        step: 2,
        title: { en: 'Compliance Assessment', es: 'Evaluacion de Cumplimiento' },
        description: {
          en: 'We determine your Medicare obligations and recommend the best strategy to protect your benefits and your funds.',
          es: 'Determinamos sus obligaciones con Medicare y recomendamos la mejor estrategia para proteger sus beneficios y sus fondos.',
        },
      },
      {
        step: 3,
        title: { en: 'Implementation Support', es: 'Soporte de Implementacion' },
        description: {
          en: 'We work with you and your legal team to implement the recommended compliance plan and set up any required accounts.',
          es: 'Trabajamos con usted y su equipo legal para implementar el plan de cumplimiento recomendado y configurar cualquier cuenta requerida.',
        },
      },
    ],
    faqs: [
      {
        question: {
          en: 'Do I need a Medicare Set-Aside for my settlement?',
          es: 'Necesito un Medicare Set-Aside para mi acuerdo?',
        },
        answer: {
          en: 'Not every settlement requires an MSA. Whether you need one depends on factors like the type of case (workers\' compensation or liability), the settlement amount, your current Medicare status, and your age. We evaluate your specific situation and advise you on whether an MSA is required or recommended.',
          es: 'No todo acuerdo requiere un MSA. Si necesita uno depende de factores como el tipo de caso (compensacion laboral o responsabilidad civil), el monto del acuerdo, su estado actual de Medicare y su edad. Evaluamos su situacion especifica y le aconsejamos si un MSA es requerido o recomendado.',
        },
      },
      {
        question: {
          en: 'When should I contact Medvst during my case?',
          es: 'Cuando debo contactar a Medvst durante mi caso?',
        },
        answer: {
          en: 'The earlier, the better. Ideally, contact us before your settlement is finalized so we can review the terms and make sure everything is set up correctly. However, we can also help after a settlement has already been reached if you need administration or compliance assistance.',
          es: 'Cuanto antes, mejor. Idealmente, contactenos antes de que su acuerdo sea finalizado para que podamos revisar los terminos y asegurarnos de que todo este configurado correctamente. Sin embargo, tambien podemos ayudar despues de que un acuerdo ya se haya alcanzado si necesita asistencia con la administracion o el cumplimiento.',
        },
      },
      {
        question: {
          en: 'Will Medvst work with my attorney?',
          es: 'Medvst trabajara con mi abogado?',
        },
        answer: {
          en: 'Absolutely. We regularly coordinate with attorneys, insurance adjusters, and other parties involved in settlements. We complement your legal team by providing the Medicare compliance expertise they may not have in-house.',
          es: 'Absolutamente. Regularmente coordinamos con abogados, ajustadores de seguros y otras partes involucradas en los acuerdos. Complementamos su equipo legal proporcionando la experiencia en cumplimiento de Medicare que tal vez no tengan internamente.',
        },
      },
    ],
  },

  // ---- Trust Services ----
  {
    slug: 'trust-services',
    seo: {
      title: {
        en: 'Medicare Set-Aside Trust Services | Medvst',
        es: 'Servicios de Fideicomiso de Medicare Set-Aside | Medvst',
      },
      description: {
        en: 'Professional MSA trust administration. Medvst manages custodial and irrevocable trusts for Medicare Set-Aside accounts to protect your settlement funds.',
        es: 'Administracion profesional de fideicomisos MSA. Medvst administra fideicomisos custodiales e irrevocables para cuentas de Medicare Set-Aside para proteger los fondos de su acuerdo.',
      },
    },
    hero: {
      headline: {
        en: 'MSA Trust Services',
        es: 'Servicios de Fideicomiso MSA',
      },
      description: {
        en: 'For clients who need an extra layer of protection, we provide professional trust services to safeguard your Medicare Set-Aside funds and ensure they are used only for their intended purpose.',
        es: 'Para clientes que necesitan una capa adicional de proteccion, proporcionamos servicios profesionales de fideicomiso para salvaguardar sus fondos de Medicare Set-Aside y asegurar que se utilicen solo para su proposito previsto.',
      },
    },
    benefits: [
      {
        title: { en: 'Professional Trustee Services', es: 'Servicios Profesionales de Fideicomisario' },
        description: {
          en: 'An independent professional trustee manages your MSA funds with fiduciary responsibility, ensuring proper stewardship of your money.',
          es: 'Un fideicomisario profesional independiente administra sus fondos MSA con responsabilidad fiduciaria, asegurando la administracion adecuada de su dinero.',
        },
      },
      {
        title: { en: 'Asset Protection', es: 'Proteccion de Activos' },
        description: {
          en: 'Trust structures protect your MSA funds from creditors, liens, and other claims that could reduce the money available for your medical care.',
          es: 'Las estructuras de fideicomiso protegen sus fondos MSA de acreedores, gravamenes y otros reclamos que podrian reducir el dinero disponible para su atencion medica.',
        },
      },
      {
        title: { en: 'Compliance Assurance', es: 'Garantia de Cumplimiento' },
        description: {
          en: 'A properly structured trust ensures that MSA funds are used exclusively for approved medical expenses, keeping you in full compliance with CMS.',
          es: 'Un fideicomiso debidamente estructurado asegura que los fondos MSA se utilicen exclusivamente para gastos medicos aprobados, manteniendolo en pleno cumplimiento con CMS.',
        },
      },
      {
        title: { en: 'Tailored Trust Structures', es: 'Estructuras de Fideicomiso Personalizadas' },
        description: {
          en: 'We design trust arrangements to fit your specific needs, whether you need a custodial account, an irrevocable trust, or a special needs trust integration.',
          es: 'Disenamos arreglos de fideicomiso para adaptarse a sus necesidades especificas, ya sea que necesite una cuenta custodial, un fideicomiso irrevocable o una integracion de fideicomiso para necesidades especiales.',
        },
      },
    ],
    explanation: {
      en: 'Some settlement recipients benefit from having their Medicare Set-Aside funds held in a formal trust rather than a simple bank account. A trust provides additional legal protections for your money and ensures that an experienced professional oversees how your MSA funds are managed.\n\nMedvst offers custodial and trust administration services specifically designed for MSA accounts. We work with qualified trust companies to establish the right type of trust for your situation. Whether you need a straightforward custodial arrangement or a more complex irrevocable trust — especially if you also have a special needs trust or are receiving government benefits — we have the expertise to set it up correctly.\n\nWith a trust in place, your MSA funds are protected from potential risks and managed by a fiduciary who is legally required to act in your best interest. Combined with our ongoing MSA administration services, this gives you the highest level of protection for your settlement funds.',
      es: 'Algunos beneficiarios de acuerdos se benefician de tener sus fondos de Medicare Set-Aside en un fideicomiso formal en lugar de una simple cuenta bancaria. Un fideicomiso proporciona protecciones legales adicionales para su dinero y asegura que un profesional experimentado supervise como se administran sus fondos MSA.\n\nMedvst ofrece servicios de custodia y administracion de fideicomisos disenados especificamente para cuentas MSA. Trabajamos con companias de fideicomiso calificadas para establecer el tipo correcto de fideicomiso para su situacion. Ya sea que necesite un arreglo custodial sencillo o un fideicomiso irrevocable mas complejo — especialmente si tambien tiene un fideicomiso para necesidades especiales o esta recibiendo beneficios del gobierno — tenemos la experiencia para configurarlo correctamente.\n\nCon un fideicomiso en su lugar, sus fondos MSA estan protegidos de riesgos potenciales y administrados por un fiduciario que esta legalmente obligado a actuar en su mejor interes. Combinado con nuestros servicios continuos de administracion MSA, esto le brinda el mas alto nivel de proteccion para los fondos de su acuerdo.',
    },
    processSteps: [
      {
        step: 1,
        title: { en: 'Needs Assessment', es: 'Evaluacion de Necesidades' },
        description: {
          en: 'We evaluate your settlement, MSA allocation, and personal circumstances to determine the best trust structure for your needs.',
          es: 'Evaluamos su acuerdo, asignacion MSA y circunstancias personales para determinar la mejor estructura de fideicomiso para sus necesidades.',
        },
      },
      {
        step: 2,
        title: { en: 'Trust Establishment', es: 'Establecimiento del Fideicomiso' },
        description: {
          en: 'We coordinate with qualified trust companies and legal professionals to draft and establish your MSA trust.',
          es: 'Coordinamos con companias de fideicomiso calificadas y profesionales legales para redactar y establecer su fideicomiso MSA.',
        },
      },
      {
        step: 3,
        title: { en: 'Fund Transfer & Setup', es: 'Transferencia de Fondos y Configuracion' },
        description: {
          en: 'Your MSA funds are transferred into the trust, accounts are set up, and ongoing administration begins under fiduciary oversight.',
          es: 'Sus fondos MSA se transfieren al fideicomiso, se configuran las cuentas y comienza la administracion continua bajo supervision fiduciaria.',
        },
      },
      {
        step: 4,
        title: { en: 'Ongoing Trust Administration', es: 'Administracion Continua del Fideicomiso' },
        description: {
          en: 'We manage the trust on an ongoing basis — paying approved medical bills, filing CMS reports, and providing you with regular account statements.',
          es: 'Administramos el fideicomiso de forma continua — pagando facturas medicas aprobadas, presentando informes a CMS y proporcionandole estados de cuenta regulares.',
        },
      },
    ],
    faqs: [
      {
        question: {
          en: 'What is the difference between an MSA trust and a regular MSA account?',
          es: 'Cual es la diferencia entre un fideicomiso MSA y una cuenta MSA regular?',
        },
        answer: {
          en: 'A regular MSA account is a dedicated bank account where your MSA funds are held and administered. An MSA trust adds a legal trust structure around those funds, which provides additional protections such as creditor protection, fiduciary oversight, and ensures the funds can only be used for their intended purpose. Trusts are often recommended for larger MSA amounts or when the beneficiary receives other government benefits.',
          es: 'Una cuenta MSA regular es una cuenta bancaria dedicada donde se mantienen y administran sus fondos MSA. Un fideicomiso MSA agrega una estructura legal de fideicomiso alrededor de esos fondos, que proporciona protecciones adicionales como proteccion contra acreedores, supervision fiduciaria y asegura que los fondos solo puedan usarse para su proposito previsto. Los fideicomisos a menudo se recomiendan para montos MSA mas grandes o cuando el beneficiario recibe otros beneficios del gobierno.',
        },
      },
      {
        question: {
          en: 'Do I have to use a trust for my MSA?',
          es: 'Tengo que usar un fideicomiso para mi MSA?',
        },
        answer: {
          en: 'No, a trust is not required for every MSA. Many settlement recipients manage their MSA with a simple custodial account and professional administration. However, a trust may be recommended in certain situations, such as when the MSA amount is large, when there are concerns about asset protection, or when the recipient also has a special needs trust. We will advise you on the best option for your situation.',
          es: 'No, no se requiere un fideicomiso para cada MSA. Muchos beneficiarios de acuerdos administran su MSA con una cuenta custodial simple y administracion profesional. Sin embargo, se puede recomendar un fideicomiso en ciertas situaciones, como cuando el monto del MSA es grande, cuando hay preocupaciones sobre la proteccion de activos, o cuando el beneficiario tambien tiene un fideicomiso para necesidades especiales. Le asesoraremos sobre la mejor opcion para su situacion.',
        },
      },
      {
        question: {
          en: 'Can a trust affect my eligibility for other government benefits?',
          es: 'Puede un fideicomiso afectar mi elegibilidad para otros beneficios del gobierno?',
        },
        answer: {
          en: 'A properly structured irrevocable trust should not count as an available resource for purposes of Medicaid or SSI eligibility. However, trust structures must be carefully designed by qualified professionals. We work with experienced trust attorneys to make sure your trust is set up correctly and does not jeopardize your other benefits.',
          es: 'Un fideicomiso irrevocable debidamente estructurado no deberia contar como un recurso disponible para propositos de elegibilidad de Medicaid o SSI. Sin embargo, las estructuras de fideicomiso deben ser cuidadosamente disenadas por profesionales calificados. Trabajamos con abogados de fideicomisos experimentados para asegurarnos de que su fideicomiso se establezca correctamente y no ponga en peligro sus otros beneficios.',
        },
      },
    ],
  },

  // ---- Liability Settlements ----
  {
    slug: 'liability-settlements',
    seo: {
      title: {
        en: 'Liability Settlement MSA Services | Medvst',
        es: 'Servicios MSA para Acuerdos de Responsabilidad Civil | Medvst',
      },
      description: {
        en: 'Medicare Set-Aside services for liability settlements. Medvst helps protect your Medicare benefits in auto accident, slip and fall, and personal injury cases.',
        es: 'Servicios de Medicare Set-Aside para acuerdos de responsabilidad civil. Medvst ayuda a proteger sus beneficios de Medicare en casos de accidentes de auto, caidas y lesiones personales.',
      },
    },
    hero: {
      headline: {
        en: 'Liability Settlement Services',
        es: 'Servicios de Acuerdos de Responsabilidad Civil',
      },
      description: {
        en: 'If you have settled a personal injury, auto accident, or premises liability case, you may have obligations to protect Medicare. We help you understand and meet those obligations so your benefits stay safe.',
        es: 'Si ha resuelto un caso de lesiones personales, accidente de auto o responsabilidad de instalaciones, puede tener obligaciones de proteger a Medicare. Le ayudamos a comprender y cumplir esas obligaciones para que sus beneficios esten seguros.',
      },
    },
    benefits: [
      {
        title: { en: 'Liability MSA Expertise', es: 'Experiencia en MSA de Responsabilidad Civil' },
        description: {
          en: 'Liability MSAs are different from workers\' compensation MSAs. We have deep expertise in the specific rules and best practices for liability settlements.',
          es: 'Los MSA de responsabilidad civil son diferentes de los MSA de compensacion laboral. Tenemos una profunda experiencia en las reglas especificas y mejores practicas para acuerdos de responsabilidad civil.',
        },
      },
      {
        title: { en: 'Risk Assessment', es: 'Evaluacion de Riesgos' },
        description: {
          en: 'We evaluate whether your liability settlement creates a Medicare obligation and, if so, what the appropriate approach is to protect your benefits.',
          es: 'Evaluamos si su acuerdo de responsabilidad civil crea una obligacion con Medicare y, de ser asi, cual es el enfoque adecuado para proteger sus beneficios.',
        },
      },
      {
        title: { en: 'All Case Types', es: 'Todos los Tipos de Casos' },
        description: {
          en: 'We handle MSA and compliance services for auto accidents, premises liability (slip and fall), medical malpractice, product liability, and other personal injury cases.',
          es: 'Manejamos servicios MSA y de cumplimiento para accidentes de auto, responsabilidad de instalaciones (caidas), negligencia medica, responsabilidad del producto y otros casos de lesiones personales.',
        },
      },
      {
        title: { en: 'Settlement Structuring Advice', es: 'Asesoramiento en Estructuracion de Acuerdos' },
        description: {
          en: 'We advise on how to structure your liability settlement to properly account for Medicare\'s interests while maximizing the funds available to you.',
          es: 'Asesoramos sobre como estructurar su acuerdo de responsabilidad civil para considerar adecuadamente los intereses de Medicare mientras se maximizan los fondos disponibles para usted.',
        },
      },
    ],
    explanation: {
      en: 'When you settle a personal injury lawsuit — whether it is from a car accident, a slip and fall, medical malpractice, or another type of incident — Medicare may have an interest in your settlement. If you are currently on Medicare, or if you are expected to enroll within 30 months, you have a responsibility to consider Medicare\'s interests when settling your case.\n\nLiability settlements are different from workers\' compensation cases when it comes to Medicare rules. CMS does not currently have a formal review process for liability MSAs the way it does for workers\' compensation MSAs. However, that does not mean you can ignore Medicare\'s interests. Courts and CMS have made it clear that settlement recipients have an obligation to protect Medicare\'s future interests in liability cases.\n\nMedvst specializes in helping liability settlement recipients navigate this evolving area of law. We assess whether a liability MSA is appropriate for your case, help determine the right allocation amount if one is needed, and provide full administration services to keep you in compliance. Our goal is to protect your settlement and your Medicare benefits so you can focus on moving forward with your life.',
      es: 'Cuando resuelve una demanda por lesiones personales — ya sea por un accidente de auto, una caida, negligencia medica u otro tipo de incidente — Medicare puede tener un interes en su acuerdo. Si actualmente esta en Medicare, o si se espera que se inscriba dentro de 30 meses, tiene la responsabilidad de considerar los intereses de Medicare al resolver su caso.\n\nLos acuerdos de responsabilidad civil son diferentes de los casos de compensacion laboral en lo que respecta a las reglas de Medicare. CMS actualmente no tiene un proceso formal de revision para MSA de responsabilidad civil como lo tiene para MSA de compensacion laboral. Sin embargo, eso no significa que pueda ignorar los intereses de Medicare. Los tribunales y CMS han dejado claro que los beneficiarios de acuerdos tienen la obligacion de proteger los intereses futuros de Medicare en casos de responsabilidad civil.\n\nMedvst se especializa en ayudar a los beneficiarios de acuerdos de responsabilidad civil a navegar esta area del derecho en evolucion. Evaluamos si un MSA de responsabilidad civil es apropiado para su caso, ayudamos a determinar el monto de asignacion correcto si se necesita uno y proporcionamos servicios completos de administracion para mantenerlo en cumplimiento. Nuestro objetivo es proteger su acuerdo y sus beneficios de Medicare para que pueda concentrarse en seguir adelante con su vida.',
    },
    processSteps: [
      {
        step: 1,
        title: { en: 'Case Evaluation', es: 'Evaluacion del Caso' },
        description: {
          en: 'We review your liability settlement details, medical records, and Medicare status to assess whether a liability MSA is needed.',
          es: 'Revisamos los detalles de su acuerdo de responsabilidad civil, registros medicos y estado de Medicare para evaluar si se necesita un MSA de responsabilidad civil.',
        },
      },
      {
        step: 2,
        title: { en: 'MSA Allocation & Setup', es: 'Asignacion y Configuracion del MSA' },
        description: {
          en: 'If an MSA is recommended, we determine the proper allocation amount and set up the account to hold and administer the funds.',
          es: 'Si se recomienda un MSA, determinamos el monto de asignacion adecuado y configuramos la cuenta para mantener y administrar los fondos.',
        },
      },
      {
        step: 3,
        title: { en: 'Administration & Compliance', es: 'Administracion y Cumplimiento' },
        description: {
          en: 'We provide full ongoing administration — paying medical bills, tracking expenses, filing reports, and keeping you compliant with all Medicare requirements.',
          es: 'Proporcionamos administracion continua completa — pagando facturas medicas, rastreando gastos, presentando informes y manteniendolo en cumplimiento con todos los requisitos de Medicare.',
        },
      },
    ],
    faqs: [
      {
        question: {
          en: 'Is a Medicare Set-Aside required for liability settlements?',
          es: 'Se requiere un Medicare Set-Aside para acuerdos de responsabilidad civil?',
        },
        answer: {
          en: 'While CMS does not currently have a mandatory review process for liability MSAs like it does for workers\' compensation, Medicare beneficiaries still have a legal obligation to protect Medicare\'s interests in any settlement. Setting up a voluntary liability MSA is considered a best practice to protect your Medicare benefits and avoid potential recovery actions by CMS.',
          es: 'Aunque CMS actualmente no tiene un proceso de revision obligatorio para MSA de responsabilidad civil como lo tiene para compensacion laboral, los beneficiarios de Medicare aun tienen una obligacion legal de proteger los intereses de Medicare en cualquier acuerdo. Establecer un MSA de responsabilidad civil voluntario se considera una mejor practica para proteger sus beneficios de Medicare y evitar posibles acciones de recuperacion por parte de CMS.',
        },
      },
      {
        question: {
          en: 'What types of liability cases does Medvst handle?',
          es: 'Que tipos de casos de responsabilidad civil maneja Medvst?',
        },
        answer: {
          en: 'We handle all types of liability cases including auto accidents, premises liability (slip and fall), medical malpractice, product liability, dog bites, and other personal injury claims. If your case involves a settlement and you are a Medicare beneficiary or may become one, we can help.',
          es: 'Manejamos todos los tipos de casos de responsabilidad civil, incluyendo accidentes de auto, responsabilidad de instalaciones (caidas), negligencia medica, responsabilidad del producto, mordeduras de perros y otros reclamos por lesiones personales. Si su caso involucra un acuerdo y usted es beneficiario de Medicare o puede llegar a serlo, podemos ayudar.',
        },
      },
      {
        question: {
          en: 'How is a liability MSA different from a workers\' compensation MSA?',
          es: 'Como es diferente un MSA de responsabilidad civil de un MSA de compensacion laboral?',
        },
        answer: {
          en: 'The main difference is the CMS review process. Workers\' compensation MSAs can be submitted to CMS for formal review and approval. Liability MSAs do not have this formal review process, so they are set up voluntarily based on industry best practices and legal guidance. The administration process, however, is similar — funds are set aside and managed to pay for injury-related medical expenses before Medicare begins covering those costs.',
          es: 'La principal diferencia es el proceso de revision de CMS. Los MSA de compensacion laboral pueden presentarse a CMS para revision y aprobacion formal. Los MSA de responsabilidad civil no tienen este proceso de revision formal, por lo que se establecen voluntariamente basandose en las mejores practicas de la industria y orientacion legal. El proceso de administracion, sin embargo, es similar — los fondos se reservan y administran para pagar gastos medicos relacionados con la lesion antes de que Medicare comience a cubrir esos costos.',
        },
      },
    ],
  },
];

// -----------------------------------------------------------------------------
// How It Works Page
// -----------------------------------------------------------------------------

export const howItWorksContent = {
  seo: {
    title: {
      en: 'How It Works | Medvst Medicare Set-Aside Administration',
      es: 'Como Funciona | Administracion de Medicare Set-Aside Medvst',
    },
    description: {
      en: 'Learn how Medvst manages your Medicare Set-Aside in 4 simple steps. From consultation to ongoing administration, we make the process easy.',
      es: 'Aprenda como Medvst administra su Medicare Set-Aside en 4 simples pasos. Desde la consulta hasta la administracion continua, hacemos el proceso facil.',
    },
  },

  hero: {
    headline: {
      en: 'How Medvst Works',
      es: 'Como Funciona Medvst',
    },
    description: {
      en: 'We take the stress and confusion out of Medicare Set-Aside administration. Here is how the process works, step by step.',
      es: 'Eliminamos el estres y la confusion de la administracion de Medicare Set-Aside. Asi es como funciona el proceso, paso a paso.',
    },
  },

  steps: [
    {
      step: 1,
      title: {
        en: 'Contact Us for a Free Consultation',
        es: 'Contactenos para una Consulta Gratuita',
      },
      description: {
        en: 'Reach out by phone, email, or through our website. We will review your settlement details and explain your options — in plain language, with no pressure and no cost.',
        es: 'Comuniquese por telefono, correo electronico o a traves de nuestro sitio web. Revisaremos los detalles de su acuerdo y le explicaremos sus opciones — en un lenguaje sencillo, sin presion y sin costo.',
      },
      details: {
        en: 'During your initial consultation, we will ask about your settlement, your injury, your current Medicare status, and any concerns you have. This helps us understand your situation and determine exactly what services you need. Most consultations take about 30 minutes, and you will leave the call knowing exactly where you stand.',
        es: 'Durante su consulta inicial, le preguntaremos sobre su acuerdo, su lesion, su estado actual de Medicare y cualquier preocupacion que tenga. Esto nos ayuda a comprender su situacion y determinar exactamente que servicios necesita. La mayoria de las consultas toman unos 30 minutos, y saldra de la llamada sabiendo exactamente donde se encuentra.',
      },
    },
    {
      step: 2,
      title: {
        en: 'We Analyze Your Case',
        es: 'Analizamos Su Caso',
      },
      description: {
        en: 'Our team reviews your settlement documents, medical records, and Medicare obligations to create a customized plan for your situation.',
        es: 'Nuestro equipo revisa sus documentos de acuerdo, registros medicos y obligaciones con Medicare para crear un plan personalizado para su situacion.',
      },
      details: {
        en: 'We examine your settlement terms, review any existing MSA allocations, check for Medicare liens or conditional payments, and assess your future medical needs related to your injury. We then prepare a clear summary of our findings and recommendations. You will know exactly what needs to happen and why.',
        es: 'Examinamos los terminos de su acuerdo, revisamos cualquier asignacion MSA existente, verificamos gravamenes o pagos condicionales de Medicare y evaluamos sus necesidades medicas futuras relacionadas con su lesion. Luego preparamos un resumen claro de nuestros hallazgos y recomendaciones. Usted sabra exactamente que necesita suceder y por que.',
      },
    },
    {
      step: 3,
      title: {
        en: 'We Handle Everything',
        es: 'Nos Encargamos de Todo',
      },
      description: {
        en: 'From setting up your MSA account to paying medical bills to filing reports with CMS — we take care of all the details so you do not have to.',
        es: 'Desde configurar su cuenta MSA hasta pagar facturas medicas y presentar informes a CMS — nos encargamos de todos los detalles para que usted no tenga que hacerlo.',
      },
      details: {
        en: 'Once you give us the go-ahead, we spring into action. We set up your dedicated MSA account, register with CMS, and begin processing your medical bills. Every bill is reviewed for accuracy and eligibility before payment. We maintain detailed records of every transaction and handle all communication with Medicare, CMS, and medical providers on your behalf. You receive regular updates and can check your account status anytime through your online portal.',
        es: 'Una vez que nos da la aprobacion, entramos en accion. Configuramos su cuenta MSA dedicada, nos registramos con CMS y comenzamos a procesar sus facturas medicas. Cada factura se revisa para verificar su precision y elegibilidad antes del pago. Mantenemos registros detallados de cada transaccion y manejamos toda la comunicacion con Medicare, CMS y proveedores medicos en su nombre. Usted recibe actualizaciones regulares y puede verificar el estado de su cuenta en cualquier momento a traves de su portal en linea.',
      },
    },
    {
      step: 4,
      title: {
        en: 'Track Your Progress Online',
        es: 'Siga Su Progreso en Linea',
      },
      description: {
        en: 'Access your secure client portal anytime to view your balance, payment history, reports, and documents. You are always in the loop.',
        es: 'Acceda a su portal seguro de cliente en cualquier momento para ver su saldo, historial de pagos, informes y documentos. Siempre esta informado.',
      },
      details: {
        en: 'Your client portal gives you 24/7 access to your MSA account information. You can see your current balance, review every payment that has been made, download copies of CMS reports, and upload documents. If you ever have questions, our team is just a phone call or email away. We believe in complete transparency — your money, your information, always accessible to you.',
        es: 'Su portal de cliente le brinda acceso 24/7 a la informacion de su cuenta MSA. Puede ver su saldo actual, revisar cada pago que se ha realizado, descargar copias de informes de CMS y cargar documentos. Si alguna vez tiene preguntas, nuestro equipo esta a solo una llamada telefonica o un correo electronico de distancia. Creemos en la transparencia total — su dinero, su informacion, siempre accesible para usted.',
      },
    },
  ] as ProcessStep[],
};

// -----------------------------------------------------------------------------
// Results Page
// -----------------------------------------------------------------------------

export const resultsContent = {
  seo: {
    title: {
      en: 'Case Results | Medvst Medicare Set-Aside Administration',
      es: 'Resultados de Casos | Administracion de Medicare Set-Aside Medvst',
    },
    description: {
      en: 'View real case results from Medvst. Over $500 million administered for 5,000+ families across all 50 states.',
      es: 'Vea resultados reales de casos de Medvst. Mas de $500 millones administrados para mas de 5,000 familias en los 50 estados.',
    },
  },

  hero: {
    headline: {
      en: 'Real Results for Real Families',
      es: 'Resultados Reales para Familias Reales',
    },
    description: {
      en: 'These are real outcomes from real cases. Every number represents a family we helped protect their settlement and their future.',
      es: 'Estos son resultados reales de casos reales. Cada numero representa una familia a la que ayudamos a proteger su acuerdo y su futuro.',
    },
  },

  aggregateStats: [
    {
      label: { en: 'Total Funds Administered', es: 'Fondos Totales Administrados' },
      value: '$500M+',
    },
    {
      label: { en: 'Families Served', es: 'Familias Atendidas' },
      value: '5,000+',
    },
    {
      label: { en: 'CMS Compliance Rate', es: 'Tasa de Cumplimiento con CMS' },
      value: '100%',
    },
    {
      label: { en: 'States Served', es: 'Estados Atendidos' },
      value: '50',
    },
  ],

  trustCopy: {
    en: 'Every case result shown below represents a real family that trusted Medvst with their settlement. While every case is different, these results reflect our commitment to protecting our clients\' funds and Medicare benefits. Individual outcomes depend on the specifics of each case.',
    es: 'Cada resultado de caso mostrado a continuacion representa una familia real que confio en Medvst con su acuerdo. Si bien cada caso es diferente, estos resultados reflejan nuestro compromiso de proteger los fondos y beneficios de Medicare de nuestros clientes. Los resultados individuales dependen de los detalles especificos de cada caso.',
  },

  caseResults: [
    {
      id: 'case-001',
      amount: '$1,250,000',
      type: {
        en: 'Workers\' Compensation — Construction Injury',
        es: 'Compensacion Laboral — Lesion en Construccion',
      },
      description: {
        en: 'MSA administration for a construction worker who suffered a severe back injury. We set up and managed a $1.25 million MSA, ensuring full CMS compliance and proper fund disbursement for ongoing medical treatment.',
        es: 'Administracion MSA para un trabajador de construccion que sufrio una lesion grave de espalda. Configuramos y administramos un MSA de $1.25 millones, asegurando el cumplimiento total con CMS y el desembolso adecuado de fondos para tratamiento medico continuo.',
      },
      serviceCategory: 'msa-administration',
    },
    {
      id: 'case-002',
      amount: '$875,000',
      type: {
        en: 'Auto Accident — Liability Settlement',
        es: 'Accidente de Auto — Acuerdo de Responsabilidad Civil',
      },
      description: {
        en: 'Liability MSA setup and administration for a retired Medicare beneficiary injured in a multi-vehicle accident. We helped structure the settlement to properly account for future medical needs.',
        es: 'Configuracion y administracion de MSA de responsabilidad civil para un beneficiario de Medicare jubilado lesionado en un accidente de multiples vehiculos. Ayudamos a estructurar el acuerdo para considerar adecuadamente las necesidades medicas futuras.',
      },
      serviceCategory: 'liability-settlements',
    },
    {
      id: 'case-003',
      amount: '$340,000',
      type: {
        en: 'Medicare Lien Resolution — Slip and Fall',
        es: 'Resolucion de Gravamen de Medicare — Caida',
      },
      description: {
        en: 'Negotiated a Medicare lien down from $340,000 to $198,000 for a slip and fall case, saving the client over $140,000. We identified multiple charges unrelated to the injury and successfully disputed them.',
        es: 'Negociamos un gravamen de Medicare de $340,000 a $198,000 para un caso de caida, ahorrando al cliente mas de $140,000. Identificamos multiples cargos no relacionados con la lesion y los disputamos exitosamente.',
      },
      serviceCategory: 'lien-resolution',
    },
    {
      id: 'case-004',
      amount: '$2,100,000',
      type: {
        en: 'Workers\' Compensation — Industrial Accident',
        es: 'Compensacion Laboral — Accidente Industrial',
      },
      description: {
        en: 'Comprehensive MSA trust administration for an industrial accident victim. We established an irrevocable trust, administered the $2.1 million MSA, and coordinated with the client\'s special needs trust to protect additional benefits.',
        es: 'Administracion integral de fideicomiso MSA para una victima de accidente industrial. Establecimos un fideicomiso irrevocable, administramos el MSA de $2.1 millones y coordinamos con el fideicomiso para necesidades especiales del cliente para proteger beneficios adicionales.',
      },
      serviceCategory: 'trust-services',
    },
    {
      id: 'case-005',
      amount: '$525,000',
      type: {
        en: 'Settlement Consulting — Medical Malpractice',
        es: 'Consultoria de Acuerdo — Negligencia Medica',
      },
      description: {
        en: 'Provided settlement consulting for a medical malpractice case where the client was approaching Medicare eligibility. We guided the MSA allocation and ensured the settlement was structured to protect future Medicare benefits.',
        es: 'Proporcionamos consultoria de acuerdo para un caso de negligencia medica donde el cliente se acercaba a la elegibilidad de Medicare. Guiamos la asignacion MSA y aseguramos que el acuerdo se estructurara para proteger los beneficios futuros de Medicare.',
      },
      serviceCategory: 'settlement-consulting',
    },
    {
      id: 'case-006',
      amount: '$750,000',
      type: {
        en: 'Workers\' Compensation — Repetitive Stress Injury',
        es: 'Compensacion Laboral — Lesion por Estres Repetitivo',
      },
      description: {
        en: 'MSA administration for a warehouse worker with chronic shoulder and knee injuries from years of repetitive labor. We managed the MSA funds to cover ongoing physical therapy, medications, and future surgical needs.',
        es: 'Administracion MSA para un trabajador de almacen con lesiones cronicas de hombro y rodilla por anos de trabajo repetitivo. Administramos los fondos MSA para cubrir fisioterapia continua, medicamentos y futuras necesidades quirurgicas.',
      },
      serviceCategory: 'msa-administration',
    },
    {
      id: 'case-007',
      amount: '$180,000',
      type: {
        en: 'Medicare Lien Resolution — Auto Accident',
        es: 'Resolucion de Gravamen de Medicare — Accidente de Auto',
      },
      description: {
        en: 'Resolved a $180,000 Medicare lien for $112,000 in an auto accident case. Our line-by-line review identified billing errors and unrelated treatments that reduced the total owed by nearly 40%.',
        es: 'Resolvimos un gravamen de Medicare de $180,000 por $112,000 en un caso de accidente de auto. Nuestra revision linea por linea identifico errores de facturacion y tratamientos no relacionados que redujeron el total adeudado en casi un 40%.',
      },
      serviceCategory: 'lien-resolution',
    },
    {
      id: 'case-008',
      amount: '$1,500,000',
      type: {
        en: 'Liability Settlement — Premises Liability',
        es: 'Acuerdo de Responsabilidad Civil — Responsabilidad de Instalaciones',
      },
      description: {
        en: 'Full-service settlement consulting and MSA administration for a premises liability case involving a senior citizen who fell at a commercial property. We set up the liability MSA, resolved the Medicare lien, and provided ongoing administration.',
        es: 'Consultoria de acuerdo de servicio completo y administracion MSA para un caso de responsabilidad de instalaciones que involucro a un ciudadano mayor que cayo en una propiedad comercial. Configuramos el MSA de responsabilidad civil, resolvimos el gravamen de Medicare y proporcionamos administracion continua.',
      },
      serviceCategory: 'liability-settlements',
    },
    {
      id: 'case-009',
      amount: '$425,000',
      type: {
        en: 'MSA Trust Administration — Workers\' Compensation',
        es: 'Administracion de Fideicomiso MSA — Compensacion Laboral',
      },
      description: {
        en: 'Established and administered an MSA trust for a workers\' compensation case where the claimant also received SSI. The trust was structured to preserve SSI eligibility while meeting all CMS requirements.',
        es: 'Establecimos y administramos un fideicomiso MSA para un caso de compensacion laboral donde el demandante tambien recibia SSI. El fideicomiso se estructuro para preservar la elegibilidad de SSI mientras se cumplian todos los requisitos de CMS.',
      },
      serviceCategory: 'trust-services',
    },
    {
      id: 'case-010',
      amount: '$650,000',
      type: {
        en: 'Settlement Consulting — Workers\' Compensation',
        es: 'Consultoria de Acuerdo — Compensacion Laboral',
      },
      description: {
        en: 'Pre-settlement consulting for a complex workers\' compensation case. We worked with the claimant\'s attorney to determine the appropriate MSA allocation, identified potential lien issues, and developed a comprehensive compliance plan.',
        es: 'Consultoria previa al acuerdo para un caso complejo de compensacion laboral. Trabajamos con el abogado del demandante para determinar la asignacion MSA apropiada, identificamos posibles problemas de gravamenes y desarrollamos un plan integral de cumplimiento.',
      },
      serviceCategory: 'settlement-consulting',
    },
  ] as CaseResult[],
};

// -----------------------------------------------------------------------------
// FAQ Page
// -----------------------------------------------------------------------------

export const faqContent = {
  seo: {
    title: {
      en: 'Frequently Asked Questions | Medvst',
      es: 'Preguntas Frecuentes | Medvst',
    },
    description: {
      en: 'Get answers to common questions about Medicare Set-Asides, liens, settlement administration, and how Medvst can help protect your settlement.',
      es: 'Obtenga respuestas a preguntas comunes sobre Medicare Set-Asides, gravamenes, administracion de acuerdos y como Medvst puede ayudar a proteger su acuerdo.',
    },
  },

  hero: {
    headline: {
      en: 'Frequently Asked Questions',
      es: 'Preguntas Frecuentes',
    },
    description: {
      en: 'We know you have questions — and we believe you deserve clear, honest answers. Browse our FAQ below, or contact us for a free consultation.',
      es: 'Sabemos que tiene preguntas — y creemos que merece respuestas claras y honestas. Consulte nuestras preguntas frecuentes a continuacion, o contactenos para una consulta gratuita.',
    },
  },

  items: [
    // General
    {
      question: {
        en: 'What does Medvst do?',
        es: 'Que hace Medvst?',
      },
      answer: {
        en: 'Medvst is a Medicare Set-Aside (MSA) administration company. We help people who have received injury settlements manage their MSA funds, resolve Medicare liens, and stay in compliance with Medicare and CMS requirements. We handle the paperwork, pay medical bills from your MSA account, file required reports, and make sure your Medicare benefits are protected.',
        es: 'Medvst es una empresa de administracion de Medicare Set-Aside (MSA). Ayudamos a personas que han recibido acuerdos por lesiones a administrar sus fondos MSA, resolver gravamenes de Medicare y cumplir con los requisitos de Medicare y CMS. Nos encargamos del papeleo, pagamos facturas medicas de su cuenta MSA, presentamos informes requeridos y nos aseguramos de que sus beneficios de Medicare esten protegidos.',
      },
      category: 'General',
    },
    {
      question: {
        en: 'Who does Medvst serve?',
        es: 'A quien atiende Medvst?',
      },
      answer: {
        en: 'We serve injured individuals and their families who have received or are about to receive an injury settlement — whether from a workers\' compensation case, auto accident, slip and fall, or other personal injury claim. If your settlement involves Medicare obligations, we are here to help. We serve clients in all 50 states.',
        es: 'Servimos a personas lesionadas y sus familias que han recibido o estan a punto de recibir un acuerdo por lesiones — ya sea de un caso de compensacion laboral, accidente de auto, caida u otro reclamo por lesiones personales. Si su acuerdo involucra obligaciones con Medicare, estamos aqui para ayudar. Servimos a clientes en los 50 estados.',
      },
      category: 'General',
    },
    {
      question: {
        en: 'Do you offer services in Spanish?',
        es: 'Ofrecen servicios en espanol?',
      },
      answer: {
        en: 'Yes. Medvst provides full bilingual services in English and Spanish. Our team members speak both languages, and our website, client portal, and documentation are available in Spanish. We believe everyone deserves to understand their settlement in their own language.',
        es: 'Si. Medvst proporciona servicios bilingues completos en ingles y espanol. Los miembros de nuestro equipo hablan ambos idiomas, y nuestro sitio web, portal de cliente y documentacion estan disponibles en espanol. Creemos que todos merecen entender su acuerdo en su propio idioma.',
      },
      category: 'General',
    },
    {
      question: {
        en: 'How do I get started with Medvst?',
        es: 'Como empiezo con Medvst?',
      },
      answer: {
        en: 'Getting started is easy. Call us at (818) 674-1211, email us at info@medvst.com, or fill out the contact form on our website. We will schedule a free consultation to review your situation and explain your options. There is no cost and no obligation for the initial consultation.',
        es: 'Comenzar es facil. Llamenos al (818) 674-1211, envie un correo electronico a info@medvst.com, o complete el formulario de contacto en nuestro sitio web. Programaremos una consulta gratuita para revisar su situacion y explicar sus opciones. No hay costo ni obligacion para la consulta inicial.',
      },
      category: 'General',
    },
    // MSA
    {
      question: {
        en: 'What is a Medicare Set-Aside (MSA)?',
        es: 'Que es un Medicare Set-Aside (MSA)?',
      },
      answer: {
        en: 'A Medicare Set-Aside is a portion of your injury settlement that is reserved to pay for future medical expenses related to your injury. Medicare requires this so that your settlement money — not Medicare — covers injury-related medical costs first. Once the MSA funds are properly exhausted, Medicare resumes paying for those medical expenses.',
        es: 'Un Medicare Set-Aside es una porcion de su acuerdo por lesiones que se reserva para pagar futuros gastos medicos relacionados con su lesion. Medicare requiere esto para que el dinero de su acuerdo — no Medicare — cubra primero los costos medicos relacionados con la lesion. Una vez que los fondos del MSA se agotan adecuadamente, Medicare retoma el pago de esos gastos medicos.',
      },
      category: 'MSA',
    },
    {
      question: {
        en: 'Do I need an MSA for my settlement?',
        es: 'Necesito un MSA para mi acuerdo?',
      },
      answer: {
        en: 'It depends on your situation. If you are currently a Medicare beneficiary, or if you are reasonably expected to become one within 30 months of your settlement, you may need to consider Medicare\'s interests. Factors include the type of case, the settlement amount, and your specific medical needs. We provide a free consultation to help you determine whether an MSA is necessary for your case.',
        es: 'Depende de su situacion. Si actualmente es beneficiario de Medicare, o si se espera razonablemente que se convierta en uno dentro de los 30 meses de su acuerdo, puede necesitar considerar los intereses de Medicare. Los factores incluyen el tipo de caso, el monto del acuerdo y sus necesidades medicas especificas. Ofrecemos una consulta gratuita para ayudarle a determinar si un MSA es necesario para su caso.',
      },
      category: 'MSA',
    },
    {
      question: {
        en: 'Can I manage my MSA on my own?',
        es: 'Puedo administrar mi MSA por mi cuenta?',
      },
      answer: {
        en: 'Technically, yes — you can self-administer your MSA. However, the rules are complex, and mistakes can have serious consequences. If you use MSA funds for unapproved expenses, fail to keep proper records, or miss required reports, Medicare can refuse to cover your injury-related medical care. Professional administration through Medvst ensures everything is done correctly and protects your benefits.',
        es: 'Tecnicamente, si — puede autoadministrar su MSA. Sin embargo, las reglas son complejas y los errores pueden tener consecuencias graves. Si utiliza fondos MSA para gastos no aprobados, no mantiene registros adecuados o no presenta informes requeridos, Medicare puede negarse a cubrir su atencion medica relacionada con la lesion. La administracion profesional a traves de Medvst asegura que todo se haga correctamente y protege sus beneficios.',
      },
      category: 'MSA',
    },
    {
      question: {
        en: 'What happens when my MSA funds run out?',
        es: 'Que sucede cuando se agotan mis fondos MSA?',
      },
      answer: {
        en: 'If your MSA has been properly administered and the funds are exhausted through approved medical expenses, Medicare will begin paying for your injury-related medical care again. This is exactly why proper administration is so important — it creates a clear record showing that the funds were used correctly, making the transition back to Medicare coverage smooth.',
        es: 'Si su MSA ha sido administrado adecuadamente y los fondos se agotan a traves de gastos medicos aprobados, Medicare comenzara a pagar nuevamente por su atencion medica relacionada con la lesion. Es exactamente por esto que la administracion adecuada es tan importante — crea un registro claro que muestra que los fondos se utilizaron correctamente, haciendo que la transicion de regreso a la cobertura de Medicare sea fluida.',
      },
      category: 'MSA',
    },
    // Liens
    {
      question: {
        en: 'What is a Medicare lien?',
        es: 'Que es un gravamen de Medicare?',
      },
      answer: {
        en: 'A Medicare lien is a claim that Medicare has against your settlement for medical treatment it paid for during your case. When Medicare pays for treatment related to your injury while your claim is pending, it has the right to be reimbursed from your settlement. The total of these payments is the lien amount.',
        es: 'Un gravamen de Medicare es un reclamo que Medicare tiene contra su acuerdo por tratamiento medico que pago durante su caso. Cuando Medicare paga por tratamiento relacionado con su lesion mientras su reclamo esta pendiente, tiene derecho a ser reembolsado de su acuerdo. El total de estos pagos es el monto del gravamen.',
      },
      category: 'Liens',
    },
    {
      question: {
        en: 'Can Medicare liens be negotiated or reduced?',
        es: 'Se pueden negociar o reducir los gravamenes de Medicare?',
      },
      answer: {
        en: 'Yes. Medicare allows for reductions based on procurement costs (your attorney fees and legal expenses). Additionally, if the lien includes charges for treatment unrelated to your injury, those can be disputed and removed. Medvst reviews every charge and negotiates with Medicare to reduce your lien to the lowest legitimate amount.',
        es: 'Si. Medicare permite reducciones basadas en costos de adquisicion (honorarios de su abogado y gastos legales). Adicionalmente, si el gravamen incluye cargos por tratamiento no relacionado con su lesion, estos pueden ser disputados y eliminados. Medvst revisa cada cargo y negocia con Medicare para reducir su gravamen al monto legitimo mas bajo.',
      },
      category: 'Liens',
    },
    {
      question: {
        en: 'How long does lien resolution take?',
        es: 'Cuanto tiempo toma la resolucion de gravamenes?',
      },
      answer: {
        en: 'The timeline varies depending on the complexity of the lien and how quickly Medicare and the BCRC respond. Typically, the process takes 30 to 90 days from the time we receive all necessary documentation. We work to resolve liens as quickly as possible so your settlement can be finalized without unnecessary delays.',
        es: 'El plazo varia dependiendo de la complejidad del gravamen y la rapidez con que respondan Medicare y el BCRC. Tipicamente, el proceso toma de 30 a 90 dias desde el momento en que recibimos toda la documentacion necesaria. Trabajamos para resolver gravamenes lo mas rapido posible para que su acuerdo pueda finalizarse sin demoras innecesarias.',
      },
      category: 'Liens',
    },
    // Costs
    {
      question: {
        en: 'How much do Medvst\'s services cost?',
        es: 'Cuanto cuestan los servicios de Medvst?',
      },
      answer: {
        en: 'Our fees vary depending on the service. For MSA administration, the fee is often built into the MSA allocation itself, meaning there is typically no additional out-of-pocket cost to you. For lien resolution and consulting services, we provide transparent pricing during your free initial consultation. We never charge hidden fees.',
        es: 'Nuestras tarifas varian dependiendo del servicio. Para la administracion MSA, la tarifa a menudo se incluye en la asignacion MSA en si, lo que significa que generalmente no hay costo adicional de su bolsillo. Para servicios de resolucion de gravamenes y consultoria, proporcionamos precios transparentes durante su consulta inicial gratuita. Nunca cobramos tarifas ocultas.',
      },
      category: 'Costs',
    },
    {
      question: {
        en: 'Is the initial consultation really free?',
        es: 'La consulta inicial es realmente gratuita?',
      },
      answer: {
        en: 'Yes. Your initial consultation with Medvst is completely free with no obligation. We review your situation, explain your options, and answer your questions — at no cost. We want you to have the information you need to make the best decision for your situation.',
        es: 'Si. Su consulta inicial con Medvst es completamente gratuita y sin obligacion. Revisamos su situacion, explicamos sus opciones y respondemos sus preguntas — sin costo. Queremos que tenga la informacion que necesita para tomar la mejor decision para su situacion.',
      },
      category: 'Costs',
    },
    {
      question: {
        en: 'Are there any hidden fees?',
        es: 'Hay tarifas ocultas?',
      },
      answer: {
        en: 'No. Medvst is committed to complete transparency in our pricing. All fees are explained in detail before you agree to any services. You will know exactly what you are paying for and why. If anything about our pricing is unclear, we encourage you to ask — we are happy to explain.',
        es: 'No. Medvst esta comprometido con la transparencia total en nuestros precios. Todas las tarifas se explican en detalle antes de que acepte cualquier servicio. Sabra exactamente por que esta pagando y por que. Si algo sobre nuestros precios no esta claro, le animamos a preguntar — estamos felices de explicar.',
      },
      category: 'Costs',
    },
    // Portal
    {
      question: {
        en: 'What is the client portal?',
        es: 'Que es el portal de cliente?',
      },
      answer: {
        en: 'The Medvst client portal is a secure online platform where you can track your MSA account in real time. You can view your balance, see payment history, download reports and documents, upload files, and communicate with our team. It is available 24/7 from any device with internet access.',
        es: 'El portal de cliente de Medvst es una plataforma segura en linea donde puede rastrear su cuenta MSA en tiempo real. Puede ver su saldo, ver el historial de pagos, descargar informes y documentos, cargar archivos y comunicarse con nuestro equipo. Esta disponible 24/7 desde cualquier dispositivo con acceso a internet.',
      },
      category: 'Portal',
    },
    {
      question: {
        en: 'Is the portal secure?',
        es: 'Es seguro el portal?',
      },
      answer: {
        en: 'Yes. Our client portal uses HIPAA-compliant security measures to protect your personal, medical, and financial information. All data is encrypted, access requires authentication, and we follow strict security protocols to keep your information safe.',
        es: 'Si. Nuestro portal de cliente utiliza medidas de seguridad que cumplen con HIPAA para proteger su informacion personal, medica y financiera. Todos los datos estan encriptados, el acceso requiere autenticacion y seguimos protocolos de seguridad estrictos para mantener su informacion segura.',
      },
      category: 'Portal',
    },
    {
      question: {
        en: 'Can a family member access my portal?',
        es: 'Puede un miembro de mi familia acceder a mi portal?',
      },
      answer: {
        en: 'Yes, with your authorization. If you would like a family member, caregiver, or legal representative to have access to your portal, we can set that up for you. We understand that managing a settlement is often a family effort, and we want to make sure the right people have the information they need.',
        es: 'Si, con su autorizacion. Si desea que un miembro de su familia, cuidador o representante legal tenga acceso a su portal, podemos configurarlo para usted. Entendemos que administrar un acuerdo a menudo es un esfuerzo familiar, y queremos asegurarnos de que las personas adecuadas tengan la informacion que necesitan.',
      },
      category: 'Portal',
    },
  ] as FAQItem[],
};

// -----------------------------------------------------------------------------
// Legal Page
// -----------------------------------------------------------------------------

export const legalContent = {
  seo: {
    title: {
      en: 'Legal | Privacy Policy, Terms, HIPAA Notice | Medvst',
      es: 'Legal | Politica de Privacidad, Terminos, Aviso HIPAA | Medvst',
    },
    description: {
      en: 'Medvst legal information including Privacy Policy (CCPA/CPRA), Terms of Service, HIPAA Notice, and Accessibility Statement.',
      es: 'Informacion legal de Medvst incluyendo Politica de Privacidad (CCPA/CPRA), Terminos de Servicio, Aviso HIPAA y Declaracion de Accesibilidad.',
    },
  },

  privacyPolicy: {
    title: { en: 'Privacy Policy', es: 'Politica de Privacidad' },
    lastUpdated: '2026-04-01',
    content: {
      en: `Medvst ("we," "us," or "our") is committed to protecting the privacy and security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (medvst.com) or use our services.

INFORMATION WE COLLECT

Personal Information: When you contact us, submit a form, or use our services, we may collect your name, email address, phone number, mailing address, date of birth, Social Security number (for Medicare-related services), medical records, settlement information, and insurance details.

Automatically Collected Information: When you visit our website, we may automatically collect your IP address, browser type, operating system, referring URLs, pages viewed, and the dates and times of your visits.

HOW WE USE YOUR INFORMATION

We use the information we collect to:
- Provide, maintain, and improve our MSA administration and related services
- Communicate with you about your account, services, and inquiries
- Process Medicare-related paperwork, reports, and filings on your behalf
- Comply with legal obligations and CMS requirements
- Send you relevant updates about your case (with your consent)
- Improve our website and user experience

HOW WE SHARE YOUR INFORMATION

We do not sell your personal information. We may share your information with:
- Medicare, CMS, and related government agencies as required for MSA administration and compliance
- Medical providers and insurance companies as necessary for processing claims
- Trusted service providers who assist with our operations (e.g., secure hosting, payment processing) under strict confidentiality agreements
- Legal authorities when required by law or to protect our rights

CALIFORNIA PRIVACY RIGHTS (CCPA/CPRA)

If you are a California resident, you have the right to:
- Know what personal information we collect about you and how it is used
- Request deletion of your personal information (subject to certain exceptions)
- Opt out of the sale or sharing of your personal information (we do not sell personal information)
- Not be discriminated against for exercising your privacy rights
- Correct inaccurate personal information
- Limit the use of sensitive personal information

To exercise your California privacy rights, contact us at info@medvst.com or call (818) 674-1211. We will respond to verifiable requests within 45 days.

DATA SECURITY

We implement appropriate technical and organizational security measures to protect your personal information, including encryption, access controls, and secure data storage. Our systems comply with HIPAA security requirements.

DATA RETENTION

We retain your personal information for as long as necessary to provide our services and comply with legal obligations, including CMS record-keeping requirements. When your information is no longer needed, we securely dispose of it.

COOKIES AND TRACKING

Our website uses cookies and similar technologies to improve your browsing experience and analyze site traffic. You can control cookie settings through your browser preferences.

CHILDREN'S PRIVACY

Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children.

CHANGES TO THIS POLICY

We may update this Privacy Policy from time to time. The updated version will be indicated by the "Last Updated" date. We encourage you to review this policy periodically.

CONTACT US

If you have questions about this Privacy Policy or wish to exercise your privacy rights, please contact us:

Medvst
PO Box 8294, Van Nuys, CA 91410
Phone: (818) 674-1211
Email: info@medvst.com`,
      es: `Medvst ("nosotros" o "nuestro") esta comprometido con la proteccion de la privacidad y seguridad de su informacion personal. Esta Politica de Privacidad explica como recopilamos, usamos, divulgamos y protegemos su informacion cuando visita nuestro sitio web (medvst.com) o utiliza nuestros servicios.

INFORMACION QUE RECOPILAMOS

Informacion Personal: Cuando nos contacta, envia un formulario o utiliza nuestros servicios, podemos recopilar su nombre, direccion de correo electronico, numero de telefono, direccion postal, fecha de nacimiento, numero de Seguro Social (para servicios relacionados con Medicare), registros medicos, informacion de acuerdos y detalles de seguros.

Informacion Recopilada Automaticamente: Cuando visita nuestro sitio web, podemos recopilar automaticamente su direccion IP, tipo de navegador, sistema operativo, URLs de referencia, paginas visitadas y las fechas y horarios de sus visitas.

COMO USAMOS SU INFORMACION

Utilizamos la informacion que recopilamos para:
- Proporcionar, mantener y mejorar nuestros servicios de administracion MSA y relacionados
- Comunicarnos con usted sobre su cuenta, servicios y consultas
- Procesar papeleo, informes y presentaciones relacionadas con Medicare en su nombre
- Cumplir con obligaciones legales y requisitos de CMS
- Enviarle actualizaciones relevantes sobre su caso (con su consentimiento)
- Mejorar nuestro sitio web y la experiencia del usuario

COMO COMPARTIMOS SU INFORMACION

No vendemos su informacion personal. Podemos compartir su informacion con:
- Medicare, CMS y agencias gubernamentales relacionadas segun lo requerido para la administracion y cumplimiento del MSA
- Proveedores medicos y companias de seguros segun sea necesario para procesar reclamos
- Proveedores de servicios de confianza que asisten con nuestras operaciones (por ejemplo, alojamiento seguro, procesamiento de pagos) bajo acuerdos estrictos de confidencialidad
- Autoridades legales cuando lo requiera la ley o para proteger nuestros derechos

DERECHOS DE PRIVACIDAD DE CALIFORNIA (CCPA/CPRA)

Si usted es residente de California, tiene derecho a:
- Saber que informacion personal recopilamos sobre usted y como se utiliza
- Solicitar la eliminacion de su informacion personal (sujeto a ciertas excepciones)
- Optar por no participar en la venta o comparticion de su informacion personal (no vendemos informacion personal)
- No ser discriminado por ejercer sus derechos de privacidad
- Corregir informacion personal inexacta
- Limitar el uso de informacion personal sensible

Para ejercer sus derechos de privacidad de California, contactenos en info@medvst.com o llame al (818) 674-1211. Responderemos a solicitudes verificables dentro de 45 dias.

SEGURIDAD DE DATOS

Implementamos medidas de seguridad tecnicas y organizativas apropiadas para proteger su informacion personal, incluyendo encriptacion, controles de acceso y almacenamiento seguro de datos. Nuestros sistemas cumplen con los requisitos de seguridad de HIPAA.

RETENCION DE DATOS

Retenemos su informacion personal durante el tiempo necesario para proporcionar nuestros servicios y cumplir con las obligaciones legales, incluidos los requisitos de mantenimiento de registros de CMS. Cuando su informacion ya no sea necesaria, la eliminamos de forma segura.

COOKIES Y SEGUIMIENTO

Nuestro sitio web utiliza cookies y tecnologias similares para mejorar su experiencia de navegacion y analizar el trafico del sitio. Puede controlar la configuracion de cookies a traves de las preferencias de su navegador.

PRIVACIDAD DE MENORES

Nuestros servicios no estan dirigidos a personas menores de 18 anos. No recopilamos intencionalmente informacion personal de menores.

CAMBIOS A ESTA POLITICA

Podemos actualizar esta Politica de Privacidad de vez en cuando. La version actualizada se indicara por la fecha de "Ultima Actualizacion". Le recomendamos que revise esta politica periodicamente.

CONTACTENOS

Si tiene preguntas sobre esta Politica de Privacidad o desea ejercer sus derechos de privacidad, contactenos:

Medvst
PO Box 8294, Van Nuys, CA 91410
Telefono: (818) 674-1211
Correo electronico: info@medvst.com`,
    },
  },

  termsOfService: {
    title: { en: 'Terms of Service', es: 'Terminos de Servicio' },
    lastUpdated: '2026-04-01',
    content: {
      en: `These Terms of Service ("Terms") govern your use of the Medvst website (medvst.com) and services. By accessing our website or using our services, you agree to these Terms.

SERVICES

Medvst provides Medicare Set-Aside administration, lien resolution, settlement consulting, trust services, and related services. Our services are provided pursuant to individual service agreements between Medvst and each client.

USE OF WEBSITE

You may use our website for lawful purposes only. You agree not to:
- Use the site in any way that violates applicable laws or regulations
- Attempt to gain unauthorized access to any part of the site or its systems
- Transmit any malicious code, viruses, or harmful data
- Collect personal information of other users without consent

INTELLECTUAL PROPERTY

All content on this website — including text, graphics, logos, images, and software — is the property of Medvst and is protected by copyright and intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without written permission.

DISCLAIMER

The information on this website is for general educational purposes only and does not constitute legal, medical, or financial advice. Medvst is not a law firm and does not provide legal advice. We recommend consulting with a qualified attorney for legal questions related to your settlement.

Our website and services are provided "as is" without warranties of any kind, either express or implied. We do not guarantee specific outcomes for any case or service.

LIMITATION OF LIABILITY

To the fullest extent permitted by law, Medvst shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of our website or services.

INDEMNIFICATION

You agree to indemnify and hold harmless Medvst, its officers, employees, and agents from any claims, damages, or expenses arising from your use of our website or violation of these Terms.

THIRD-PARTY LINKS

Our website may contain links to third-party websites. We are not responsible for the content, privacy practices, or policies of third-party sites.

GOVERNING LAW

These Terms are governed by the laws of the State of California. Any disputes arising from these Terms shall be resolved in the courts of Los Angeles County, California.

CHANGES TO TERMS

We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of our website after changes constitutes acceptance of the updated Terms.

CONTACT

For questions about these Terms, contact us at:
Medvst
PO Box 8294, Van Nuys, CA 91410
Email: info@medvst.com
Phone: (818) 674-1211`,
      es: `Estos Terminos de Servicio ("Terminos") rigen su uso del sitio web de Medvst (medvst.com) y sus servicios. Al acceder a nuestro sitio web o utilizar nuestros servicios, usted acepta estos Terminos.

SERVICIOS

Medvst proporciona administracion de Medicare Set-Aside, resolucion de gravamenes, consultoria de acuerdos, servicios de fideicomiso y servicios relacionados. Nuestros servicios se proporcionan de acuerdo con contratos de servicio individuales entre Medvst y cada cliente.

USO DEL SITIO WEB

Puede utilizar nuestro sitio web solo para propositos legales. Usted acepta no:
- Usar el sitio de cualquier manera que viole las leyes o regulaciones aplicables
- Intentar obtener acceso no autorizado a cualquier parte del sitio o sus sistemas
- Transmitir cualquier codigo malicioso, virus o datos daninos
- Recopilar informacion personal de otros usuarios sin consentimiento

PROPIEDAD INTELECTUAL

Todo el contenido de este sitio web — incluyendo texto, graficos, logotipos, imagenes y software — es propiedad de Medvst y esta protegido por leyes de derechos de autor y propiedad intelectual. No puede reproducir, distribuir ni crear obras derivadas de nuestro contenido sin permiso por escrito.

DESCARGO DE RESPONSABILIDAD

La informacion en este sitio web es solo para propositos educativos generales y no constituye asesoramiento legal, medico o financiero. Medvst no es un bufete de abogados y no proporciona asesoramiento legal. Recomendamos consultar con un abogado calificado para preguntas legales relacionadas con su acuerdo.

Nuestro sitio web y servicios se proporcionan "tal cual" sin garantias de ningun tipo, ya sean expresas o implicitas. No garantizamos resultados especificos para ningun caso o servicio.

LIMITACION DE RESPONSABILIDAD

En la maxima medida permitida por la ley, Medvst no sera responsable de ningun dano indirecto, incidental, consecuente o punitivo que surja de su uso de nuestro sitio web o servicios.

INDEMNIZACION

Usted acepta indemnizar y mantener indemne a Medvst, sus oficiales, empleados y agentes de cualquier reclamo, dano o gasto que surja de su uso de nuestro sitio web o violacion de estos Terminos.

ENLACES DE TERCEROS

Nuestro sitio web puede contener enlaces a sitios web de terceros. No somos responsables del contenido, practicas de privacidad o politicas de sitios de terceros.

LEY APLICABLE

Estos Terminos se rigen por las leyes del Estado de California. Cualquier disputa que surja de estos Terminos se resolvera en los tribunales del Condado de Los Angeles, California.

CAMBIOS A LOS TERMINOS

Nos reservamos el derecho de modificar estos Terminos en cualquier momento. Los cambios seran efectivos inmediatamente despues de su publicacion en el sitio web. Su uso continuado de nuestro sitio web despues de los cambios constituye la aceptacion de los Terminos actualizados.

CONTACTO

Para preguntas sobre estos Terminos, contactenos en:
Medvst
PO Box 8294, Van Nuys, CA 91410
Correo electronico: info@medvst.com
Telefono: (818) 674-1211`,
    },
  },

  hipaaNotice: {
    title: { en: 'HIPAA Notice of Privacy Practices', es: 'Aviso de Practicas de Privacidad HIPAA' },
    lastUpdated: '2026-04-01',
    content: {
      en: `THIS NOTICE DESCRIBES HOW MEDICAL INFORMATION ABOUT YOU MAY BE USED AND DISCLOSED AND HOW YOU CAN GET ACCESS TO THIS INFORMATION. PLEASE REVIEW IT CAREFULLY.

Medvst is committed to protecting the privacy of your health information. This notice explains how we may use and share your protected health information (PHI) and your rights regarding that information.

HOW WE MAY USE AND DISCLOSE YOUR HEALTH INFORMATION

Treatment and Services: We may use your health information to administer your Medicare Set-Aside account, process medical bills, and coordinate with your healthcare providers.

Payment: We may use your health information to process payments for medical services covered by your MSA.

Healthcare Operations: We may use your health information for quality assurance, compliance audits, and administrative functions necessary to run our business.

As Required by Law: We may disclose your health information when required by federal, state, or local law, including reporting to Medicare and CMS as required for MSA compliance.

YOUR RIGHTS

You have the right to:
- Request a copy of your health information
- Request corrections to your health information
- Request a list of disclosures we have made
- Request restrictions on how we use or share your information
- Receive a paper copy of this notice
- File a complaint if you believe your privacy rights have been violated

HOW WE PROTECT YOUR INFORMATION

We maintain physical, technical, and administrative safeguards to protect your health information. These include encrypted data storage, secure access controls, employee training, and regular security assessments.

CONTACT INFORMATION

Privacy Officer
Medvst
PO Box 8294, Van Nuys, CA 91410
Phone: (818) 674-1211
Email: info@medvst.com

If you believe your privacy rights have been violated, you may file a complaint with us or with the U.S. Department of Health and Human Services Office for Civil Rights.`,
      es: `ESTE AVISO DESCRIBE COMO SE PUEDE USAR Y DIVULGAR LA INFORMACION MEDICA SOBRE USTED Y COMO PUEDE OBTENER ACCESO A ESTA INFORMACION. POR FAVOR REVISELO CUIDADOSAMENTE.

Medvst esta comprometido con la proteccion de la privacidad de su informacion de salud. Este aviso explica como podemos usar y compartir su informacion de salud protegida (PHI) y sus derechos con respecto a esa informacion.

COMO PODEMOS USAR Y DIVULGAR SU INFORMACION DE SALUD

Tratamiento y Servicios: Podemos usar su informacion de salud para administrar su cuenta de Medicare Set-Aside, procesar facturas medicas y coordinar con sus proveedores de atencion medica.

Pago: Podemos usar su informacion de salud para procesar pagos por servicios medicos cubiertos por su MSA.

Operaciones de Atencion Medica: Podemos usar su informacion de salud para garantia de calidad, auditorias de cumplimiento y funciones administrativas necesarias para operar nuestro negocio.

Segun lo Requerido por la Ley: Podemos divulgar su informacion de salud cuando lo requiera la ley federal, estatal o local, incluyendo informes a Medicare y CMS segun lo requerido para el cumplimiento del MSA.

SUS DERECHOS

Usted tiene derecho a:
- Solicitar una copia de su informacion de salud
- Solicitar correcciones a su informacion de salud
- Solicitar una lista de divulgaciones que hemos realizado
- Solicitar restricciones sobre como usamos o compartimos su informacion
- Recibir una copia en papel de este aviso
- Presentar una queja si cree que se han violado sus derechos de privacidad

COMO PROTEGEMOS SU INFORMACION

Mantenemos salvaguardas fisicas, tecnicas y administrativas para proteger su informacion de salud. Estas incluyen almacenamiento de datos encriptado, controles de acceso seguros, capacitacion de empleados y evaluaciones de seguridad regulares.

INFORMACION DE CONTACTO

Oficial de Privacidad
Medvst
PO Box 8294, Van Nuys, CA 91410
Telefono: (818) 674-1211
Correo electronico: info@medvst.com

Si cree que se han violado sus derechos de privacidad, puede presentar una queja con nosotros o con la Oficina de Derechos Civiles del Departamento de Salud y Servicios Humanos de los EE. UU.`,
    },
  },

  accessibilityStatement: {
    title: { en: 'Accessibility Statement', es: 'Declaracion de Accesibilidad' },
    lastUpdated: '2026-04-01',
    content: {
      en: `Medvst is committed to ensuring that our website is accessible to all users, including individuals with disabilities. We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.

OUR COMMITMENT

We are actively working to increase the accessibility and usability of our website. Our efforts include:
- Using semantic HTML to ensure proper document structure
- Providing text alternatives for non-text content
- Ensuring sufficient color contrast ratios
- Making all functionality available from a keyboard
- Providing clear and consistent navigation
- Designing forms with proper labels and error messages
- Supporting screen readers and assistive technologies
- Respecting user preferences for reduced motion

ACCESSIBILITY FEATURES

Our website includes the following accessibility features:
- Skip-to-content navigation link
- Descriptive alt text on all images
- ARIA labels on interactive elements
- Keyboard-accessible navigation and forms
- Focus indicators on interactive elements
- Responsive design that works across devices and screen sizes

FEEDBACK

We welcome your feedback on the accessibility of the Medvst website. If you encounter any accessibility barriers or have suggestions for improvement, please contact us:

Email: info@medvst.com
Phone: (818) 674-1211

We will make reasonable efforts to address accessibility issues and respond to your feedback within 5 business days.

THIRD-PARTY CONTENT

While we strive to ensure accessibility across our entire website, some third-party content or embedded elements may not be fully accessible. We are working with our third-party partners to improve accessibility wherever possible.`,
      es: `Medvst esta comprometido con garantizar que nuestro sitio web sea accesible para todos los usuarios, incluidas las personas con discapacidades. Nos esforzamos por cumplir con los estandares de las Pautas de Accesibilidad para el Contenido Web (WCAG) 2.1 Nivel AA.

NUESTRO COMPROMISO

Estamos trabajando activamente para aumentar la accesibilidad y usabilidad de nuestro sitio web. Nuestros esfuerzos incluyen:
- Uso de HTML semantico para garantizar una estructura de documento adecuada
- Proporcionar alternativas de texto para contenido no textual
- Asegurar relaciones de contraste de color suficientes
- Hacer que toda la funcionalidad este disponible desde un teclado
- Proporcionar una navegacion clara y consistente
- Disenar formularios con etiquetas y mensajes de error adecuados
- Soportar lectores de pantalla y tecnologias de asistencia
- Respetar las preferencias del usuario para movimiento reducido

CARACTERISTICAS DE ACCESIBILIDAD

Nuestro sitio web incluye las siguientes caracteristicas de accesibilidad:
- Enlace de navegacion para saltar al contenido
- Texto alternativo descriptivo en todas las imagenes
- Etiquetas ARIA en elementos interactivos
- Navegacion y formularios accesibles por teclado
- Indicadores de enfoque en elementos interactivos
- Diseno responsivo que funciona en todos los dispositivos y tamanos de pantalla

COMENTARIOS

Agradecemos sus comentarios sobre la accesibilidad del sitio web de Medvst. Si encuentra barreras de accesibilidad o tiene sugerencias para mejorar, contactenos:

Correo electronico: info@medvst.com
Telefono: (818) 674-1211

Haremos esfuerzos razonables para abordar los problemas de accesibilidad y responder a sus comentarios dentro de 5 dias habiles.

CONTENIDO DE TERCEROS

Si bien nos esforzamos por garantizar la accesibilidad en todo nuestro sitio web, parte del contenido de terceros o elementos incrustados pueden no ser completamente accesibles. Estamos trabajando con nuestros socios terceros para mejorar la accesibilidad siempre que sea posible.`,
    },
  },
};

// -----------------------------------------------------------------------------
// Contact Page
// -----------------------------------------------------------------------------

export const contactContent = {
  seo: {
    title: {
      en: 'Contact Us | Medvst Medicare Set-Aside Administration',
      es: 'Contactenos | Administracion de Medicare Set-Aside Medvst',
    },
    description: {
      en: 'Contact Medvst for a free consultation about Medicare Set-Aside administration, lien resolution, and settlement services. Call (818) 674-1211.',
      es: 'Contacte a Medvst para una consulta gratuita sobre administracion de Medicare Set-Aside, resolucion de gravamenes y servicios de acuerdos. Llame al (818) 674-1211.',
    },
  },

  hero: {
    headline: {
      en: 'Get in Touch',
      es: 'Pongase en Contacto',
    },
    description: {
      en: 'Have questions about your settlement or Medicare obligations? We are here to help. Reach out for a free, no-obligation consultation.',
      es: 'Tiene preguntas sobre su acuerdo u obligaciones con Medicare? Estamos aqui para ayudar. Comuniquese para una consulta gratuita y sin obligacion.',
    },
  },

  formIntro: {
    en: 'Fill out the form below and a member of our team will contact you within one business day. All information is kept strictly confidential and protected under HIPAA.',
    es: 'Complete el formulario a continuacion y un miembro de nuestro equipo se comunicara con usted dentro de un dia habil. Toda la informacion se mantiene estrictamente confidencial y protegida bajo HIPAA.',
  },

  callToAction: {
    en: 'Prefer to talk? Call us directly at',
    es: 'Prefiere hablar? Llamenos directamente al',
  },

  spanishBadge: {
    en: 'Hablamos Espanol — Full bilingual services available',
    es: 'Hablamos Espanol — Servicios bilingues completos disponibles',
  },

  hipaaNotice: {
    en: 'Your information is protected by HIPAA-compliant security measures. We never share your data without your explicit consent.',
    es: 'Su informacion esta protegida por medidas de seguridad que cumplen con HIPAA. Nunca compartimos sus datos sin su consentimiento explicito.',
  },
};

// -----------------------------------------------------------------------------
// Portal Page
// -----------------------------------------------------------------------------

export const portalContent = {
  seo: {
    title: {
      en: 'Client Portal | Medvst',
      es: 'Portal de Cliente | Medvst',
    },
    description: {
      en: 'Access your Medvst client portal to track your MSA balance, view payment history, download reports, and manage your account.',
      es: 'Acceda a su portal de cliente Medvst para rastrear su saldo MSA, ver el historial de pagos, descargar informes y administrar su cuenta.',
    },
  },

  hero: {
    headline: {
      en: 'Your Settlement, At Your Fingertips',
      es: 'Su Acuerdo, Al Alcance de Su Mano',
    },
    description: {
      en: 'Log in to your secure client portal to track your MSA account, view payments, and access your documents — anytime, anywhere.',
      es: 'Inicie sesion en su portal seguro de cliente para rastrear su cuenta MSA, ver pagos y acceder a sus documentos — en cualquier momento, en cualquier lugar.',
    },
  },

  features: [
    {
      title: { en: 'Real-Time Balance Tracking', es: 'Seguimiento de Saldo en Tiempo Real' },
      description: {
        en: 'See your current MSA balance and how your funds have been used. Every transaction is recorded and available for your review.',
        es: 'Vea su saldo MSA actual y como se han utilizado sus fondos. Cada transaccion se registra y esta disponible para su revision.',
      },
    },
    {
      title: { en: 'Payment History', es: 'Historial de Pagos' },
      description: {
        en: 'View a complete record of every medical bill paid from your MSA, including the provider, amount, date, and approval status.',
        es: 'Vea un registro completo de cada factura medica pagada de su MSA, incluyendo el proveedor, monto, fecha y estado de aprobacion.',
      },
    },
    {
      title: { en: 'Document Downloads', es: 'Descarga de Documentos' },
      description: {
        en: 'Download copies of CMS reports, annual attestation filings, account statements, and other important documents anytime you need them.',
        es: 'Descargue copias de informes de CMS, presentaciones de atestacion anuales, estados de cuenta y otros documentos importantes en cualquier momento que los necesite.',
      },
    },
    {
      title: { en: 'Secure File Upload', es: 'Carga Segura de Archivos' },
      description: {
        en: 'Upload medical bills, receipts, and other documents directly through the portal. All uploads are encrypted and HIPAA-compliant.',
        es: 'Cargue facturas medicas, recibos y otros documentos directamente a traves del portal. Todas las cargas estan encriptadas y cumplen con HIPAA.',
      },
    },
    {
      title: { en: 'Direct Communication', es: 'Comunicacion Directa' },
      description: {
        en: 'Send messages to your Medvst team directly through the portal. Ask questions, request updates, or share information securely.',
        es: 'Envie mensajes a su equipo de Medvst directamente a traves del portal. Haga preguntas, solicite actualizaciones o comparta informacion de forma segura.',
      },
    },
    {
      title: { en: 'Mobile-Friendly Access', es: 'Acceso Adaptado a Movil' },
      description: {
        en: 'Access your portal from any device — phone, tablet, or computer. Your account information is always just a few taps away.',
        es: 'Acceda a su portal desde cualquier dispositivo — telefono, tableta o computadora. La informacion de su cuenta siempre esta a solo unos toques de distancia.',
      },
    },
  ] as PortalFeature[],

  loginCta: {
    en: 'Already a client? Log in to your portal below.',
    es: 'Ya es cliente? Inicie sesion en su portal a continuacion.',
  },

  signupCta: {
    en: 'Not a client yet? Contact us today for a free consultation and learn how Medvst can help protect your settlement.',
    es: 'Aun no es cliente? Contactenos hoy para una consulta gratuita y conozca como Medvst puede ayudar a proteger su acuerdo.',
  },
};

// -----------------------------------------------------------------------------
// Home Page (shared content)
// -----------------------------------------------------------------------------

export const homeContent = {
  seo: {
    title: {
      en: 'Medvst | Medicare Set-Aside Administration & Settlement Services',
      es: 'Medvst | Administracion de Medicare Set-Aside y Servicios de Acuerdos',
    },
    description: {
      en: 'Medvst provides expert Medicare Set-Aside administration, lien resolution, and settlement consulting. Protecting your settlement and Medicare benefits nationwide.',
      es: 'Medvst proporciona administracion experta de Medicare Set-Aside, resolucion de gravamenes y consultoria de acuerdos. Protegiendo su acuerdo y beneficios de Medicare a nivel nacional.',
    },
  },

  hero: {
    headline: {
      en: 'Protecting Your Settlement. Securing Your Future.',
      es: 'Protegiendo Su Acuerdo. Asegurando Su Futuro.',
    },
    subheadline: {
      en: 'Expert Medicare Set-Aside administration and settlement services — so you can focus on your recovery, not the paperwork.',
      es: 'Administracion experta de Medicare Set-Aside y servicios de acuerdos — para que pueda concentrarse en su recuperacion, no en el papeleo.',
    },
    cta: {
      en: 'Get a Free Consultation',
      es: 'Obtenga una Consulta Gratuita',
    },
  },

  socialProof: [
    { value: '$500M+', label: { en: 'Funds Administered', es: 'Fondos Administrados' } },
    { value: '5,000+', label: { en: 'Families Served', es: 'Familias Atendidas' } },
    { value: '100%', label: { en: 'CMS Compliance', es: 'Cumplimiento con CMS' } },
  ],

  servicesOverview: [
    {
      title: { en: 'MSA Administration', es: 'Administracion MSA' },
      description: {
        en: 'We manage your Medicare Set-Aside funds, pay medical bills, and file reports with CMS — so you stay compliant and keep your benefits.',
        es: 'Administramos sus fondos de Medicare Set-Aside, pagamos facturas medicas y presentamos informes a CMS — para que cumpla y mantenga sus beneficios.',
      },
      slug: 'msa-administration',
    },
    {
      title: { en: 'Lien Resolution', es: 'Resolucion de Gravamenes' },
      description: {
        en: 'We negotiate with Medicare to reduce liens on your settlement, helping you keep more of the money you deserve.',
        es: 'Negociamos con Medicare para reducir gravamenes sobre su acuerdo, ayudandole a quedarse con mas del dinero que merece.',
      },
      slug: 'lien-resolution',
    },
    {
      title: { en: 'Settlement Consulting', es: 'Consultoria de Acuerdos' },
      description: {
        en: 'We guide you through settlement compliance and MSA allocations, making sure your benefits are protected.',
        es: 'Lo guiamos a traves del cumplimiento de acuerdos y asignaciones MSA, asegurandonos de que sus beneficios esten protegidos.',
      },
      slug: 'settlement-consulting',
    },
    {
      title: { en: 'Trust Services', es: 'Servicios de Fideicomiso' },
      description: {
        en: 'We provide professional trust administration for MSA accounts, adding an extra layer of protection for your funds.',
        es: 'Proporcionamos administracion profesional de fideicomisos para cuentas MSA, agregando una capa adicional de proteccion para sus fondos.',
      },
      slug: 'trust-services',
    },
    {
      title: { en: 'Liability Settlements', es: 'Acuerdos de Responsabilidad Civil' },
      description: {
        en: 'We help protect your Medicare benefits in personal injury, auto accident, and other liability settlement cases.',
        es: 'Ayudamos a proteger sus beneficios de Medicare en casos de lesiones personales, accidentes de auto y otros acuerdos de responsabilidad civil.',
      },
      slug: 'liability-settlements',
    },
  ],

  ctaBand: {
    headline: {
      en: 'Ready to Protect Your Settlement?',
      es: 'Listo para Proteger Su Acuerdo?',
    },
    description: {
      en: 'Contact us today for a free consultation. We will review your situation and explain your options — in plain language, with no pressure.',
      es: 'Contactenos hoy para una consulta gratuita. Revisaremos su situacion y le explicaremos sus opciones — en un lenguaje sencillo, sin presion.',
    },
    callCta: {
      en: 'Call Now',
      es: 'Llame Ahora',
    },
    bookCta: {
      en: 'Book Online',
      es: 'Reserve en Linea',
    },
    spanishNote: {
      en: 'Hablamos Espanol',
      es: 'Hablamos Espanol',
    },
  },
};
