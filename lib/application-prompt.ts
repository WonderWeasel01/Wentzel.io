import { getAge } from './profile';

export type ApplicationLanguage = 'da' | 'en';

export interface ApplicationPromptInput {
  companyName?: string;
  companyInfo: string;
  jobTitle?: string;
  outputLanguage: ApplicationLanguage;
  extraInstructions?: string;
}

const CONTACT = {
  name: 'Alexander Wentzel',
  email: 'alex@wentzel.io',
  phone: '+45 52 39 12 48',
  location: 'Næstved, Denmark',
  website: 'https://wentzel.io',
  linkedin: 'https://www.linkedin.com/in/wentzel01',
  github: 'https://github.com/WonderWeasel01',
};

export function buildProfileContext(language: ApplicationLanguage): string {
  const age = getAge();

  if (language === 'da') {
    return `# Om Alexander Wentzel

- Navn: ${CONTACT.name} (Alex)
- Alder: ${age} år
- Rolle: Full Stack Udvikler
- Lokation: Næstved, Danmark
- Email: ${CONTACT.email}
- Telefon: ${CONTACT.phone}
- Hjemmeside: ${CONTACT.website}
- LinkedIn: ${CONTACT.linkedin}
- GitHub: ${CONTACT.github}

## Profil
Hej! Jeg er Alex, en ${age}-årig Full Stack Udvikler med passion for at kombinere æstetik og funktionalitet i løsninger, der både virker og ser fantastiske ud. Jeg er stærkt iværksætterorienteret og har drevet egne virksomheder som Onezite ApS, Wentzel Event/Wentzel Event ApS og Friedrich/Wentzel ApS. Arbejder med React, Next.js og React Native.

## Kompetencer
- React, React Native & Next.js
- Java, Rust & TypeScript
- Full Stack Udvikling
- One-page hjemmesider
- Adobe Pakken
- UI/UX & Design
- PostgreSQL & MySQL
- Betalinger (Viva, Stripe)

## Sprog
- Dansk (flydende)
- Engelsk (flydende)
- Tysk (grundlæggende)

## Fremhævede projekter

### Membar (CTO) — membar.dk
Loyalitetsapp hvor jeg leder frontend og softwarevalg i hele appen. Beta med 300+ tilmeldte brugere — flere på vej ved den offentlige lancering.

### Enterprise POS (Full Stack Udvikler)
Samme POS-system i to use cases: daglig drift hos Holy Smash ApS (1 mio.+ kr. årlig omsætning via Viva) og festivaldrift hos Gadefesten (7.800 ordrer og 1,2 mio. kr. ved live event). Realtids ordrehåndtering, multi-lokations lagerstyring og optimeret checkout.

## Erhvervserfaring

### CTO — Membar (2025–nu)
- Frontend-udvikling og valg af software/teknologistak i hele appen
- Beta med 300+ tilmeldte brugere

### Full Stack Udvikler — Onezite ApS (apr. 2025–nu)
- Skræddersyede webløsninger til virksomheder
- Kundekontakt fra idé til lancering
- 20+ digitale løsninger i React, Next.js og moderne webteknologi

### Full Stack Udvikler — Holy Smash ApS & Gadefesten (2025)
- Enterprise POS med Viva, realtids lager og salgsstatistik
- Holy Smash: daglig produktion, 1 mio.+ kr. årligt
- Gadefesten: 7.800 ordrer, 1,2 mio. kr. ved festival

### Hold Træner — Lille Næstved Idræts Forening (2024–2026)

### Grafisk Design — Realtruck (jan. 2023–feb. 2024)

### Produktionsmedarbejder — Realtruck (sep. 2017–jan. 2023)

## Uddannelse
- Datamatiker — Zealand, Sjællands Erhvervsakademi (sep. 2022–jan. 2026)
- Gymnasial uddannelse HF — Næstved Gymnasium og HF (aug. 2019–jun. 2021)`;
  }

  return `# About Alexander Wentzel

- Name: ${CONTACT.name} (Alex)
- Age: ${age}
- Role: Full Stack Developer
- Location: Næstved, Denmark
- Email: ${CONTACT.email}
- Phone: ${CONTACT.phone}
- Website: ${CONTACT.website}
- LinkedIn: ${CONTACT.linkedin}
- GitHub: ${CONTACT.github}

## Profile
Hi! I'm Alex, a ${age}-year-old Full Stack Developer passionate about combining aesthetics and functionality in solutions that work well and look great. I'm strongly entrepreneur-oriented and have run my own companies including Onezite ApS, Wentzel Event/Wentzel Event ApS, and Friedrich/Wentzel ApS. Working with React, Next.js, and React Native.

## Skills
- React, React Native & Next.js
- Java, Rust & TypeScript
- Full Stack Development
- One-page websites
- Adobe Suite
- UI/UX & Design
- PostgreSQL & MySQL
- Payments (Viva, Stripe)

## Languages
- Danish (fluent)
- English (fluent)
- German (basic)

## Featured projects

### Membar (CTO) — membar.dk
Loyalty app where I lead frontend development and software choices across the entire app. Beta with 300+ signed-up users — more coming with the public launch.

### Enterprise POS (Full Stack Developer)
The same POS system in two use cases: daily operations at Holy Smash ApS (1M+ DKK annual revenue via Viva) and festival operations at Gadefesten (7,800 orders and 1.2 million DKK at a live event). Real-time order handling, multi-location inventory, and optimized checkout.

## Work experience

### CTO — Membar (2025–present)
- Frontend development and software/tech stack decisions across the entire app
- Beta with 300+ signed-up users

### Full Stack Developer — Onezite ApS (Apr 2025–present)
- Custom web solutions for businesses
- Customer contact from idea through launch
- 20+ digital solutions in React, Next.js, and modern web technology

### Full Stack Developer — Holy Smash ApS & Gadefesten (2025)
- Enterprise POS with Viva, real-time inventory, and sales analytics
- Holy Smash: daily production, 1M+ DKK annually
- Gadefesten: 7,800 orders, 1.2M DKK at festival

### Team Coach — Lille Næstved Sports Association (2024–2026)

### Graphic Design — Realtruck (Jan 2023–Feb 2024)

### Production Employee — Realtruck (Sep 2017–Jan 2023)

## Education
- Computer Science (Datamatiker) — Zealand Academy (Sep 2022–Jan 2026)
- High School HF — Næstved Gymnasium og HF (Aug 2019–Jun 2021)`;
}

export function buildApplicationPrompt(input: ApplicationPromptInput): string {
  const profile = buildProfileContext(input.outputLanguage);
  const companyName = input.companyName?.trim();
  const jobTitle = input.jobTitle?.trim();
  const companyInfo = input.companyInfo.trim();
  const extra = input.extraInstructions?.trim();

  if (input.outputLanguage === 'da') {
    return `Du hjælper Alexander Wentzel med at skrive en skræddersyet jobansøgning.

Brug AL informationen om Alexander nedenfor. Tilpas ansøgningen til virksomheden og stillingen. Skriv professionelt, konkret og personligt — undgå generiske floskler. Fremhæv relevant erfaring (især Membar, Enterprise POS og Onezite) og match det med virksomhedens behov.

Lever:
1. En kort, stærk ansøgning (ca. 250–400 ord) — kun selve ansøgningsteksten, klar til PDF
2. 3–5 konkrete bullet points der matcher stillingen
3. En kort emnelinje til email

Skriv output på dansk.

${companyName ? `## Virksomhed\n${companyName}\n` : ''}${jobTitle ? `## Stilling\n${jobTitle}\n` : ''}
## Virksomhed & stillingsopslag
${companyInfo || '(Indsæt virksomhedsinfo og stillingsopslag her før du sender prompten)'}

${extra ? `## Ekstra instruktioner\n${extra}\n` : ''}
---

${profile}`;
  }

  return `You are helping Alexander Wentzel write a tailored job application.

Use ALL of the information about Alexander below. Adapt the application to the company and role. Write professionally, concretely, and personally — avoid generic fluff. Highlight relevant experience (especially Membar, Enterprise POS, and Onezite) and match it to the company's needs.

Deliver:
1. A short, strong cover letter (approx. 250–400 words) — cover letter text only, ready for PDF
2. 3–5 concrete bullet points matching the role
3. A short email subject line

Write output in English.

${companyName ? `## Company\n${companyName}\n` : ''}${jobTitle ? `## Role\n${jobTitle}\n` : ''}
## Company & job posting
${companyInfo || '(Paste company info and job posting here before sending the prompt)'}

${extra ? `## Extra instructions\n${extra}\n` : ''}
---

${profile}`;
}
