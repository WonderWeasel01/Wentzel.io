import { getAge } from './profile';

export type ApplicationLanguage = 'da' | 'en';

export interface ApplicationPromptInput {
  companyName?: string;
  companyInfo: string;
  jobTitle?: string;
  outputLanguage: ApplicationLanguage;
  extraInstructions?: string;
  isEmail?: boolean;
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

## Professionelt resumé
Full Stack Udvikler på ${age} år med erfaring i skalerbare web- og mobilapplikationer (React, Next.js, React Native / RN). Kombinerer frontend-arkitektur, realtids systemer og brugeroplevelsesoptimering i produktionsklare løsninger. Iværksætter med 20+ leverede kundeløsninger.

## Kompetencer
- React, React Native (RN) & Next.js
- TypeScript, Java & Rust
- Frontend Architecture
- Real-time Systems
- Scalable Applications
- User Experience Optimization
- API Design & Systemarkitektur
- PostgreSQL (SQL) & MySQL
- Betalinger (Viva, Stripe)
- Full Stack Udvikling

## Sprog
- Dansk (flydende)
- Engelsk (flydende)
- Tysk (grundlæggende)

## Erhvervserfaring

### CTO — Membar (2025–nu)
- Leder frontend-arkitektur og teknologistak (React Native / RN)
- Beta med 300+ tilmeldte brugere; realtids check-in og belønninger

### Full Stack Udvikler & Grundlægger — Onezite ApS (apr. 2025–jan. 2026)
- Startede og drev Onezite ApS ved siden af studiet for at få praktisk erhvervserfaring
- 20+ skræddersyede webløsninger i React, Next.js og TypeScript
- Reducerede gennemsnitlig load time med 40–60% på udvalgte kundesider

### Leadudvikler — Enterprise POS | Holy Smash ApS & Gadefesten (2025)
- Enterprise POS med realtids ordrehåndtering, PostgreSQL (SQL) og Viva-betaling
- Holy Smash: 1 mio.+ kr. årlig omsætning; checkout optimeret ~35% hurtigere under rush
- Gadefesten: 7.800 ordrer og 1,2 mio. kr. på ét live event uden nedetid

## Projekter

### Membar (CTO) — membar.dk
Loyalitetsapp med 300+ beta-brugere; frontend-arkitektur og skalerbar mobilplatform.

### Enterprise POS — Holy Smash ApS & Gadefesten
Samme POS-platform i restaurantdrift og festivaldrift: 7.800 ordrer, 1,2 mio. kr. ved peak-event.

## Uddannelse
- Datamatiker — Zealand, Sjællands Erhvervsakademi (sep. 2022–jan. 2026)
  - Valgfag: React/Angular, Rust, IT-sikkerhed
  - Praktik: karakter 12 (A). Afsluttende projekt: karakter 12 (A)`;
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

## Professional Summary
Full Stack Developer, age ${age}, experienced in scalable web and mobile applications (React, Next.js, React Native / RN). Combines frontend architecture, real-time systems, and user experience optimization in production-ready solutions. Entrepreneur with 20+ delivered client solutions.

## Skills
- React, React Native (RN) & Next.js
- TypeScript, Java & Rust
- Frontend Architecture
- Real-time Systems
- Scalable Applications
- User Experience Optimization
- API Design & System Architecture
- PostgreSQL (SQL) & MySQL
- Payments (Viva, Stripe)
- Full Stack Development

## Languages
- Danish (fluent)
- English (fluent)
- German (basic)

## Work Experience

### CTO — Membar (2025–present)
- Lead frontend architecture and tech stack (React Native / RN)
- Beta with 300+ signed-up users; real-time check-in and rewards

### Full Stack Developer & Founder — Onezite ApS (Apr 2025–Jan 2026)
- Started and ran Onezite ApS alongside my studies to gain hands-on professional experience
- 20+ custom web solutions in React, Next.js, and TypeScript
- Reduced average load time by 40–60% on selected client sites

### Lead Developer — Enterprise POS | Holy Smash ApS & Gadefesten (2025)
- Enterprise POS with real-time order handling, PostgreSQL (SQL), and Viva payments
- Holy Smash: 1M+ DKK annual revenue; checkout ~35% faster during rush
- Gadefesten: 7,800 orders and 1.2M DKK at a single live event with zero downtime

## Projects

### Membar (CTO) — membar.dk
Loyalty app with 300+ beta users; frontend architecture and scalable mobile platform.

### Enterprise POS — Holy Smash ApS & Gadefesten
Same POS platform in restaurant and festival operations: 7,800 orders, 1.2M DKK at peak event.

## Education
- Computer Science (Datamatiker) — Zealand Academy (Sep 2022–Jan 2026)
  - Electives: React/Angular, Rust, IT Security
  - Internship: grade 12 (A). Final project: grade 12 (A)`;
}

export function buildApplicationPrompt(input: ApplicationPromptInput): string {
  const profile = buildProfileContext(input.outputLanguage);
  const companyName = input.companyName?.trim();
  const jobTitle = input.jobTitle?.trim();
  const companyInfo = input.companyInfo.trim();
  const extra = input.extraInstructions?.trim();
  const isEmail = input.isEmail ?? false;

  const emailBlockDa = isEmail
    ? `

## Email (ansøgningen sendes over mail)
Ansøgningen sendes som email med vedhæftede filer. Lever derudover:
- En meget kort og fængende emnelinje (max 6 ord).
- En kort, høflig email-brødtekst (3–5 sætninger) der indleder venligt, nævner at jeg vedhæfter mit eksamensbevis/diplom, ansøgning og CV, og som udtrykker at jeg håber de vil læse dem. Afslut med en venlig hilsen fra Alexander Wentzel. Hold den professionel men personlig og let at scanne.`
    : '';

  const emailBlockEn = isEmail
    ? `

## Email (application is sent over email)
The application is sent as an email with attached files. Additionally deliver:
- A very short, catchy subject line (max 6 words).
- A short, polite email body (3–5 sentences) with a friendly opening that mentions I am attaching my diploma, application, and CV, and expresses that I hope they will read them. End with a kind sign-off from Alexander Wentzel. Keep it professional but personal and easy to scan.`
    : '';

  if (input.outputLanguage === 'da') {
    return `Du hjælper Alexander Wentzel med at skrive en skræddersyet jobansøgning til en specifik stilling.

Brug AL informationen om Alexander nedenfor. Tilpas ansøgningen præcist til virksomheden og stillingsopslaget. Skriv professionelt, konkret, personligt og selvsikkert — undgå generiske floskler som "jeg er en stærk teamplayer". Brug aktivt sprog og kvantificer resultater hvor muligt. Fremhæv især Membar (CTO/frontend), Enterprise POS (real-time + høj belastning) og Onezite (20+ løsninger + kundekontakt). Match direkte mod kravene i opslaget.

Lever altid:
- En kort, stærk ansøgning (250–380 ord) — kun selve ansøgningsteksten, klar til at kopiere ind i PDF.
- 3–5 skarpe bullet points der matcher stillingens nøglekrav.
- En stærk emnelinje til email (max 6–8 ord).
- Forslag til 1–2 sætninger der kan tilføjes for at ramme virksomhedens værdier/mission.

Skriv alt på dansk. Brug Alexanders tone: iværksætteragtig, praktisk og løsningsorienteret.

## Virksomhed & stillingsopslag
${companyInfo || '(Indsæt her)'}
${companyName ? `\nVirksomhed: ${companyName}` : ''}${jobTitle ? `\nStilling: ${jobTitle}` : ''}
${extra ? `\n## Ekstra instruktioner\n${extra}` : ''}${emailBlockDa}

---

${profile}`;
  }

  return `You are helping Alexander Wentzel write a tailored job application for a specific role.

Use ALL of the information about Alexander below. Adapt the application precisely to the company and job posting. Write professionally, concretely, personally, and confidently — avoid generic fluff like "I am a strong team player". Use active language and quantify results where possible. Highlight especially Membar (CTO/frontend), Enterprise POS (real-time + high load) and Onezite (20+ solutions + client contact). Match directly against the requirements in the posting.

Always deliver:
- A short, strong cover letter (250–380 words) — cover letter text only, ready to copy into PDF.
- 3–5 sharp bullet points matching the role's key requirements.
- A strong email subject line (max 6–8 words).
- Suggestions for 1–2 sentences that can be added to align with the company's values/mission.

Write everything in English. Use Alexander's tone: entrepreneurial, practical, and solution-oriented.

## Company & job posting
${companyInfo || '(Paste here)'}
${companyName ? `\nCompany: ${companyName}` : ''}${jobTitle ? `\nRole: ${jobTitle}` : ''}
${extra ? `\n## Extra instructions\n${extra}` : ''}${emailBlockEn}

---

${profile}`;
}
