export interface ExperienceCompany {
  company: string;
  group: string;
  about: string;
  role: string;
}

export interface EducationItem {
  degree: string;
  field: string;
}

export interface SkillItem {
  name: string;
  detail?: string;
  level: number;
  category: 'Accounting & ERP' | 'Spreadsheet & Systems' | 'Technical & Automation';
}

export const SITE_URL = 'https://saifullahanowar.github.io';

export const profile = {
  fullName: 'Saifullah Anowar',
  initials: 'SA',
  siteUrl: SITE_URL,
  siteDisplay: 'saifullahanowar.github.io',
  headline: 'Crafting Excellence in Accounting & Tech',
  rolesLine: 'Aspiring Accountant · Tech Enthusiast · ERP Expert',
  jobTitle: 'Accounts & Finance Executive',
  summary:
    'Motivated accounting student with hands-on experience in core finance & accounts operations across multiple roles. Skilled in bank reconciliation, supplier payments, dealer commission preparation, and marketing expense reporting. Proficient in daily financial entries, inventory accounting, and costing. Known for accuracy, consistency, and a proactive approach to verifying daily accounts activities, with a strong commitment to professional growth in the accounting field.',

  /**
   * Single site image: replace `src` with your real portrait (e.g. '/images/portrait.webp')
   * and delete `public/images/portrait-placeholder.svg` when ready.
   */
  portrait: {
    src: '/images/portrait-placeholder.svg',
    width: 320,
    height: 384,
    alt: 'Portrait placeholder for Saifullah Anowar, Accounting and ERP professional',
  },

  experience: [
    {
      company: 'Excellent Ceramic Industries Limited',
      group: 'Excellent Ceramics Group / Halim Group',
      about:
        'One of Bangladesh’s largest manufacturers of sanitary ware and tiles, operating under premium brands like Excellent and Marcopolo.',
      role: 'Executive - Accounts & Finance',
    },
  ] satisfies ExperienceCompany[],

  professionalQualification: {
    title: 'ICMAB (CMA Program)',
    institute: 'Institute of Cost and Management Accountants of Bangladesh (ICMAB)',
  },

  education: [
    {
      degree: 'MBA',
      field: 'Accounting',
    },
    {
      degree: 'BBA',
      field: 'Accounting',
    },
  ] satisfies EducationItem[],

  skills: [
    {
      name: 'Tally Prime',
      detail: 'Full Experience',
      level: 95,
      category: 'Accounting & ERP',
    },
    {
      name: 'ERPNext',
      detail: 'Company Setup, Chart of Accounts, Others',
      level: 85,
      category: 'Accounting & ERP',
    },
    {
      name: 'MS Excel',
      detail: 'Pivot tables, VLOOKUP, Macros, financial dashboards',
      level: 80,
      category: 'Spreadsheet & Systems',
    },
    {
      name: 'Operating Systems',
      level: 80,
      category: 'Spreadsheet & Systems',
    },
    {
      name: 'Web Development',
      detail: 'HTML/CSS/JS',
      level: 75,
      category: 'Technical & Automation',
    },
    {
      name: 'Python / Automation',
      level: 70,
      category: 'Technical & Automation',
    },
  ] satisfies SkillItem[],

  contact: {
    website: SITE_URL,
    websiteDisplay: 'saifullahanowar.github.io',
  },
} as const;

export const navLinks = [
  { href: '#summary', label: 'Summary' },
  { href: '#experience', label: 'Experience' },
  { href: '#qualification', label: 'Qualification' },
  { href: '#education', label: 'Education' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Website' },
] as const;
