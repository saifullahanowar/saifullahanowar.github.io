export interface ExperienceRole {
  title: string;
  period: string;
  responsibilities: string[];
}

export interface ExperienceCompany {
  company: string;
  group: string;
  about: string;
  roles: ExperienceRole[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  affiliationOrBoard: string;
  session: string;
  resultLabel: 'CGPA' | 'GPA';
  resultValue: string;
  resultScale: string;
}

export interface SkillItem {
  name: string;
  detail?: string;
  level: number;
  category: 'Accounting & ERP' | 'Spreadsheet & Systems' | 'Technical & Automation';
  featuredOnHome?: boolean;
}

export interface ProjectItem {
  id: 'erp' | 'web' | 'excel';
  category: string;
  title: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  external?: boolean;
}

export const SITE_URL = 'https://saifullahanowar.github.io';

export const profile = {
  fullName: 'Saifullah Anowar',
  initials: 'SA',
  siteUrl: SITE_URL,
  siteDisplay: 'saifullahanowar.github.io',
  headline: 'Crafting Excellence in Accounting & Tech',
  rolesLine: 'Aspiring Accountant | Tech Enthusiast | ERP Expert',
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
      roles: [
        {
          title: 'Executive - Accounts & Finance',
          period: '01-07-2025 – 01-01-2026',
          responsibilities: [
            'Check & Verify Daily Accounts Activities.',
            'Bank Reconciliation.',
            'Provide assistance in Preparing Cost Of Goods Sold (COGS).',
          ],
        },
        {
          title: 'MTO - Accounts & Finance',
          period: '01-10-2024 – 30-06-2025',
          responsibilities: [
            'Daily Sales Invoice & Receivable Entry.',
            'Raw Material Consumption & Finished Good Production Entry.',
            'Supplier Payment & Monthly Dealer Commission Preparation.',
            'Marketing TA/DA report.',
          ],
        },
      ],
    },
  ] satisfies ExperienceCompany[],

  professionalQualification: {
    title: 'ICMAB (CMA Program)',
    institute: 'Institute of Cost and Management Accountants of Bangladesh (ICMAB)',
    completedMarks: 500,
    totalMarks: 2000,
    summary: 'Completed 500 marks out of 2000 marks.',
  },

  education: [
    {
      degree: 'MBA (Accounting)',
      institution: 'Govt. Bangla College, Dhaka',
      affiliationOrBoard: 'University of Dhaka (Affiliated)',
      session: '2021–2022',
      resultLabel: 'CGPA',
      resultValue: '3.06',
      resultScale: '4.00',
    },
    {
      degree: 'BBA (Accounting)',
      institution: 'Govt. Bangla College, Dhaka',
      affiliationOrBoard: 'University of Dhaka (Affiliated)',
      session: '2017–2018',
      resultLabel: 'CGPA',
      resultValue: '2.82',
      resultScale: '4.00',
    },
    {
      degree: 'HSC (Business Studies)',
      institution: 'Nilphamari Govt. College',
      affiliationOrBoard: 'Dinajpur Board',
      session: '2015–2016',
      resultLabel: 'GPA',
      resultValue: '3.33',
      resultScale: '5.00',
    },
    {
      degree: 'SSC (Science)',
      institution: 'Nilphamari Govt. High School',
      affiliationOrBoard: 'Dinajpur Board',
      session: '2013–2014',
      resultLabel: 'GPA',
      resultValue: '4.89',
      resultScale: '5.00',
    },
  ] satisfies EducationItem[],

  skills: [
    {
      name: 'Tally Prime',
      detail: 'Full Experience',
      level: 95,
      category: 'Accounting & ERP',
      featuredOnHome: true,
    },
    {
      name: 'ERPNext',
      detail: 'Company Setup, Chart of Accounts, Others',
      level: 85,
      category: 'Accounting & ERP',
      featuredOnHome: true,
    },
    {
      name: 'MS Excel',
      detail: 'Pivot tables, VLOOKUP, Macros, financial dashboards',
      level: 80,
      category: 'Spreadsheet & Systems',
      featuredOnHome: true,
    },
    {
      name: 'Operating Systems',
      level: 80,
      category: 'Spreadsheet & Systems',
      featuredOnHome: true,
    },
    {
      name: 'Web Development',
      detail: 'HTML/CSS/JS',
      level: 75,
      category: 'Technical & Automation',
      featuredOnHome: false,
    },
    {
      name: 'Python / Automation',
      level: 70,
      category: 'Technical & Automation',
      featuredOnHome: false,
    },
  ] satisfies SkillItem[],

  projects: [
    {
      id: 'erp',
      category: 'ERP System',
      title: 'ERPNext Company Setup',
      description:
        'A complete ERPNext implementation for a mid-size trading company — including full Chart of Accounts setup, inventory & stock management, purchase & sales flow configuration, and financial reporting & P&L setup.',
      features: [
        'Full Chart of Accounts setup',
        'Inventory & stock management',
        'Purchase & sales flow configuration',
        'Financial reporting & P&L setup',
      ],
      ctaLabel: 'Request Demo',
      ctaHref: 'mailto:info@saifit.org?subject=ERP%20Demo%20Request',
      external: false,
    },
    {
      id: 'web',
      category: 'Web Development',
      title: 'Personal Portfolio Website',
      description:
        'Fast, SEO-optimized static portfolio built with Astro and deployed automatically to GitHub Pages (https://saifullahanowar.github.io) with light/dark theming, responsive design, and an ATS resume builder.',
      features: [
        'Static Astro architecture with zero-JS default',
        'Accessible light & dark color-scheme theming',
        'Responsive semantic layout & technical SEO',
        'Isolated client-side ATS Resume Builder',
      ],
      ctaLabel: 'View on GitHub',
      ctaHref: 'https://github.com/saifullahanowar/saifullahanowar.github.io',
      external: true,
    },
    {
      id: 'excel',
      category: 'Excel Automation',
      title: 'Financial Dashboard & Reports',
      description:
        'An automated Excel workbook featuring dynamic pivot tables & charts, automated monthly P&L summary, conditional formatting KPIs, and one-click printable report layouts.',
      features: [
        'Dynamic pivot tables & charts',
        'Automated monthly P&L summary',
        'Conditional formatting KPIs',
        'One-click printable report layouts',
      ],
      ctaLabel: 'Request Demo',
      ctaHref: 'mailto:info@saifit.org?subject=Excel%20Demo%20Request',
      external: false,
    },
  ] satisfies ProjectItem[],

  contact: {
    address: '167-Hatirpool, Dhaka-1205, Bangladesh',
    city: 'Dhaka',
    postalCode: '1205',
    country: 'Bangladesh',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=167-Hatirpool%2C+Dhaka-1205%2C+Bangladesh',
    email: 'info@saifit.org',
    website: SITE_URL,
    websiteDisplay: 'saifullahanowar.github.io',
    github: 'https://github.com/saifullahanowar',
    githubHandle: 'saifullahanowar',
  },
} as const;

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/skills/', label: 'Skills' },
  { href: '/projects/', label: 'Projects' },
  { href: '/build/', label: 'Resume Builder' },
] as const;
