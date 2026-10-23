
import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AfterViewInit,
  HostListener,
} from '@angular/core';

type ProjectCategory = 'All' | 'Full Stack' | 'Frontend' | 'Backend' | 'AI';

interface Technology {
  name: string;
  logo: string;
  docsUrl: string;
}

interface Project {
  id: number;
  name: string;
  category: Exclude<ProjectCategory, 'All'>;
  number: string;
  symbol: string;
  accent: string;
  subtitle: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  previewUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements AfterViewInit, OnDestroy {
  private revealObserver?: IntersectionObserver;
private revealRefreshFrame = 0;
private destroyed = false;
  menuOpen = false;
  selectedCategory: ProjectCategory = 'All';
  selectedProject: Project | null = null;
  assistantOpen = false;
  question = '';
  answer = '';
  copied = false;
  private copyTimer?: ReturnType<typeof setTimeout>;

  readonly email = 'meghnabansod26@gmail.com';
  readonly resumeUrl = 'YOUR_RESUME_URL';
  readonly githubUrl = 'https://github.com/meghnabansod26';
  readonly linkedinUrl = 'https://linkedin.com/in/meghnabansod';
  readonly portfolioUrl = 'https://meghna-personal-portfolio.vercel.app/';

  readonly categories: ProjectCategory[] = [
    'All', 'Full Stack', 'Frontend', 'Backend', 'AI'
  ];

  readonly technologyLinks: Record<string, { logo: string; docsUrl: string }> = {
  'Angular': {
    logo: 'https://cdn.simpleicons.org/angular/DD0031',
    docsUrl: 'https://angular.dev/'
  },
  'Angular Material': {
    logo: 'https://cdn.simpleicons.org/angularmaterial/005CBB',
    docsUrl: 'https://material.angular.dev/'
  },
  'TypeScript': {
    logo: 'https://cdn.simpleicons.org/typescript/3178C6',
    docsUrl: 'https://www.typescriptlang.org/docs/'
  },
  'JavaScript': {
    logo: 'https://cdn.simpleicons.org/javascript/F7DF1E',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
  },
  'Java': {
    logo: 'https://cdn.simpleicons.org/openjdk/ED8B00',
    docsUrl: 'https://dev.java/learn/'
  },
  'Spring Boot': {
    logo: 'https://cdn.simpleicons.org/springboot/6DB33F',
    docsUrl: 'https://docs.spring.io/spring-boot/index.html'
  },
  'REST APIs': {
    logo: 'https://cdn.simpleicons.org/openapiinitiative/6BA539',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Glossary/REST'
  },
  'React': {
    logo: 'https://cdn.simpleicons.org/react/61DAFB',
    docsUrl: 'https://react.dev/'
  },
  'Next.js': {
    logo: 'https://cdn.simpleicons.org/nextdotjs/FFFFFF',
    docsUrl: 'https://nextjs.org/docs'
  },
  'Node.js': {
    logo: 'https://cdn.simpleicons.org/nodedotjs/339933',
    docsUrl: 'https://nodejs.org/docs/latest/api/'
  },
  'Express.js': {
    logo: 'https://cdn.simpleicons.org/express/FFFFFF',
    docsUrl: 'https://expressjs.com/'
  },
  'MongoDB': {
    logo: 'https://cdn.simpleicons.org/mongodb/47A248',
    docsUrl: 'https://www.mongodb.com/docs/'
  },
  'MySQL': {
    logo: 'https://cdn.simpleicons.org/mysql/4479A1',
    docsUrl: 'https://dev.mysql.com/doc/'
  },
  'SQL': {
    logo: 'https://cdn.simpleicons.org/mysql/4479A1',
    docsUrl: 'https://dev.mysql.com/doc/'
  },
  'HTML': {
    logo: 'https://cdn.simpleicons.org/html5/E34F26',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML'
  },
  'HTML5': {
    logo: 'https://cdn.simpleicons.org/html5/E34F26',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML'
  },
  'CSS': {
    logo: 'https://cdn.simpleicons.org/css/1572B6',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS'
  },
  'CSS3': {
    logo: 'https://cdn.simpleicons.org/css/1572B6',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS'
  },
  'Bootstrap': {
    logo: 'https://cdn.simpleicons.org/bootstrap/7952B3',
    docsUrl: 'https://getbootstrap.com/docs/'
  },
  'Socket.IO': {
    logo: 'https://cdn.simpleicons.org/socketdotio/FFFFFF',
    docsUrl: 'https://socket.io/docs/v4/'
  },
  'AWS S3': {
    logo: 'https://cdn.simpleicons.org/amazons3/569A31',
    docsUrl: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html'
  },
  'Razorpay': {
    logo: 'https://cdn.simpleicons.org/razorpay/0C2451',
    docsUrl: 'https://razorpay.com/docs/'
  },
  'Git': {
    logo: 'https://cdn.simpleicons.org/git/F05032',
    docsUrl: 'https://git-scm.com/doc'
  },
  'GitHub': {
    logo: 'https://cdn.simpleicons.org/github/FFFFFF',
    docsUrl: 'https://docs.github.com/'
  },
  'GitLab': {
    logo: 'https://cdn.simpleicons.org/gitlab/FC6D26',
    docsUrl: 'https://docs.gitlab.com/'
  },
  'Maven': {
    logo: 'https://cdn.simpleicons.org/apachemaven/C71A36',
    docsUrl: 'https://maven.apache.org/guides/'
  },
  'Postman': {
    logo: 'https://cdn.simpleicons.org/postman/FF6C37',
    docsUrl: 'https://learning.postman.com/docs/'
  },
  'FreeMarker': {
    logo: '',
    docsUrl: 'https://freemarker.apache.org/docs/'
  },
  'Machine Learning': {
    logo: '',
    docsUrl: 'https://developers.google.com/machine-learning'
  },
  'Python': {
    logo: 'https://cdn.simpleicons.org/python/3776AB',
    docsUrl: 'https://docs.python.org/3/'
  },
  'AI Integration': {
    logo: '',
    docsUrl: 'https://platform.openai.com/docs/'
  },
  'AWS': {
  logo: 'https://cdn.simpleicons.org/amazonaws/FF9900',
  docsUrl: 'https://aws.amazon.com/'
},
  
};

getTechnology(name: string): { logo: string; docsUrl: string } {
  return this.technologyLinks[name] ?? {
    logo: '',
    docsUrl: 'https://developer.mozilla.org/'
  };
}

onTechnologyLogoError(event: Event): void {
  const image = event.target as HTMLImageElement | null;

  if (!image) {
    return;
  }

  image.style.display = 'none';

  const fallback =
    image.parentElement?.querySelector<HTMLElement>(
      '.tech-logo-fallback'
    );

  if (fallback) {
    fallback.style.display = 'inline-flex';
  }
}

onLogoError(event: Event): void {
  const image = event.target as HTMLImageElement | null;

  if (!image) {
    return;
  }

  image.style.display = 'none';

  const fallback =
    image.parentElement?.querySelector<HTMLElement>(
      '.exp-v2-logo-fallback'
    );

  if (fallback) {
    fallback.style.display = 'flex';
  }
}

  // Add each project's actual repository URL when ready.
 
readonly projects: Project[] = [
  {
    id: 1,
    number: '01',
    name: 'FoodieHub',
    subtitle: 'Food delivery · AI recommendations',
    category: 'AI',
    symbol: 'F.',
    accent: 'blue',
    featured: true,
    description:
      'A full-stack food delivery platform with customer and admin experiences, AWS S3 image storage, Razorpay payment integration, and an AI assistant that recommends food based on user preferences and budget.',
    technologies: [
      'React',
      'Spring Boot',
      'MongoDB',
      'AWS S3',
      'Razorpay',
      'AI'
    ],
    liveUrl: 'https://foodiehub-meghna.vercel.app/',
    githubUrl:
      'https://github.com/meghnabansod26/foodiehub-fullstack'
  },
  {
    id: 2,
    number: '02',
    name: 'TweetBuddy',
    subtitle: 'Social networking · Real time',
    category: 'Full Stack',
    symbol: 'T.',
    accent: 'violet',
    description:
      'A social networking application built with Next.js and Node.js, featuring MongoDB data persistence and real-time communication using Socket.IO.',
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'Socket.IO'],
    githubUrl:
      'https://github.com/meghnabansod26/TweetBuddy-Client',
    previewUrl:
      'https://drive.google.com/file/d/1I_7DwdlgnpLkbT3relhwXfeLR7o5BLN8/view'
  },
  {
    id: 3,
    number: '03',
    name: 'Employee Management',
    subtitle: 'Employee records · CRUD',
    category: 'Frontend',
    symbol: 'E.',
    accent: 'cyan',
    description:
      'An Angular application for managing employee records through structured forms, data listings, and create, read, update, and delete operations.',
    technologies: ['Angular', 'TypeScript', 'HTML', 'CSS'],
    githubUrl:
      'https://github.com/meghnabansod26/Employee-Management-System_AngularCrud_App',
    previewUrl:
      'https://drive.google.com/file/d/11U5kQ6hIlEgDMlP2zzw77J-DsA1pkJnz/view'
  },
  {
    id: 4,
    number: '04',
    name: 'Widget Management',
    subtitle: 'Dashboard · Data management',
    category: 'Frontend',
    symbol: 'W.',
    accent: 'blue',
    description:
      'A dashboard application focused on reusable UI components, widget organization, and structured data presentation.',
    technologies: ['Angular', 'TypeScript', 'CSS'],
    githubUrl:
      'https://github.com/meghnabansod26/Widget-Management',
    liveUrl:
      'https://widget-management-dashboard.vercel.app/'
  },
  {
    id: 5,
    number: '05',
    name: 'Readers Website',
    subtitle: 'Reading · Content discovery',
    category: 'Frontend',
    symbol: 'B.',
    accent: 'pink',
    description:
      'A website for readers, designed to present book-related content through a clear and accessible interface.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    githubUrl:
      'https://github.com/meghnabansod26/Readers-Website',
    liveUrl:
      'https://meghnabansod26.github.io/Readers-Website/'
  },
  {
    id: 6,
    number: '06',
    name: 'Disease Prediction',
    subtitle: 'Prediction · Data exploration',
    category: 'Backend',
    symbol: 'D.',
    accent: 'mint',
    description:
      'An academic project exploring disease prediction using data-driven techniques.',
    technologies: ['Machine Learning', 'Python'],
       githubUrl:
      'https://github.com/meghnabansod26/Disease-Prediction-',
    liveUrl:
      ''
  }
];


  
  readonly skillGroups = [
    {
      number: '01', title: 'Frontend',
      subtitle: 'Interfaces & experiences',
      skills: ['Angular', 'TypeScript', 'JavaScript', 'React', 'Next.js', 'HTML5', 'CSS3', 'Bootstrap']
    },
    {
      number: '02', title: 'Backend',
      subtitle: 'Logic & APIs',
      skills: ['Java', 'Spring Boot', 'REST APIs', 'Node.js', 'Express.js']
    },
    {
      number: '03', title: 'Data',
      subtitle: 'Storage & queries',
      skills: ['MongoDB', 'MySQL', 'SQL']
    },
    {
      number: '04', title: 'Tools & Cloud',
      subtitle: 'Build, ship & collaborate',
      skills: ['Git', 'GitHub', 'GitLab', 'AWS S3', 'Maven', 'Postman']
    }
  ];


experiences = [
  {
    company: 'Lentra',
    role: 'Associate Software Developer',
    period: 'Jun 2025 – Jan 2026',
    location: 'Pune, India',
    type: 'FULL-TIME',
    showClients: true,

    description:
      'Contributed to enterprise digital lending platforms, enhancing loan origination, loan management, credit bureau integrations and customer verification workflows.',

    highlights: [
      'Developed and enhanced Angular frontend functionality.',
      'Implemented and modified Java Spring Boot REST APIs and business logic.',
      'Worked on request/response validation and credit bureau data mapping.',
      'Contributed to KYC validations and MongoDB data troubleshooting.'
    ],

    technologies: [
      'Angular',
      'TypeScript',
      'Java',
      'Spring Boot',
      'REST APIs',
      'MongoDB'
    ]
  },

  {
    company: 'Lentra',
    role: 'Full Stack Developer Intern',
    period: 'Oct 2024 – May 2025',
    location: 'Pune, India',
    type: 'INTERNSHIP',
    showClients: false,

    description:
      'Contributed to frontend and backend enhancements within an existing enterprise digital lending application.',

    highlights: [
      'Worked on Angular UI components and frontend changes.',
      'Contributed to Java Spring Boot API updates and validations.',
      'Assisted with debugging, issue resolution and MongoDB data checks.'
    ],

    technologies: [
      'Angular',
      'TypeScript',
      'Java',
      'Spring Boot',
      'REST APIs',
      'MongoDB'
    ]
  },

  {
    company: 'Anka Technology Solutions',
    role: 'Frontend Developer Intern',
    period: 'Jan 2023 – Jun 2023',
    location: 'India',
    type: 'INTERNSHIP',
    showClients: false,

    description:
      'Contributed to Referedge, an Angular-based product, through frontend development and UI enhancements.',

    highlights: [
      'Developed and modified Angular UI components.',
      'Implemented frontend functionality using TypeScript, HTML and CSS.',
      'Worked on UI issues and existing application improvements.'
    ],

    technologies: [
      'Angular',
      'TypeScript',
      'HTML',
      'CSS',
      'JavaScript'
    ]
  }
];

selectedLentraModule = 'Multi-Bureau';

lentraModules = [
  {
    name: 'LOS',
    number: '01',
    subtitle: 'Loan Origination System',
    icon: '📋',
    color: '#8b9dff',

    summary:
      'A digital lending module that supports the loan application and origination journey.',

    contribution:
      'Worked on existing Angular screens, Java and Spring Boot backend changes, REST API integration, requirement-based enhancements, and bug fixes.',

    flow: [
      'Angular UI',
      'Spring Boot API',
      'Business Logic',
      'Response'
    ]
  },

  {
    name: 'LMS',
    number: '02',
    subtitle: 'Loan Management System',
    icon: '📊',
    color: '#65d6ad',

    summary:
      'A lending platform module for functionality associated with managing loans.',

    contribution:
      'Enhanced existing functionality by making frontend changes, updating backend APIs, integrating application flows, and resolving issues.',

    flow: [
      'Angular UI',
      'REST API',
      'Loan Processing',
      'Response'
    ]
  },

  {
    name: 'Multi-Bureau',
    number: '03',
    subtitle: 'Credit Bureau Integration',
    icon: '🔗',
    color: '#ffbc70',

    summary:
      'Integrates external credit bureau services to retrieve and process credit information.',

    contribution:
      'Worked on API integration, request and response handling, DTOs, validations, and mapping bureau-specific response formats into the application.',

    flow: [
      'Loan Request',
      'Bureau API',
      'Map & Validate',
      'Credit Response'
    ]
  },

  {
    name: 'KYC',
    number: '04',
    subtitle: 'Know Your Customer',
    icon: '🛡️',
    color: '#d3a0ff',

    summary:
      'Supports customer identity-verification functionality within the lending workflow.',

    contribution:
      'Contributed to existing Angular interfaces, frontend validations, backend/API changes, and issue resolution for KYC-related functionality.',

    flow: [
      'Customer Details',
      'Validation',
      'Backend API',
      'Verification Result'
    ]
  }
];

selectLentraModule(moduleName: string): void {
  this.selectedLentraModule = moduleName;
}

certifications = [
  {
    title: 'DSA with Java',
    provider: 'Apna College',
    date: 'Apr 2025',
    category: 'Programming',
    url: 'https://drive.google.com/file/d/1JLycOBGNOnAtf38vkJwmvUPARLcETX1t/view',
    logo: 'https://lwfiles.mycourse.app/62a6cd5e1e9e2fbf212d608d-public/87c40f6213de38546841280fb345d40f.png'
  },
  {
    title: 'Java Backend Development',
    provider: 'GeeksforGeeks',
    date: 'Jun 2024',
    category: 'Backend',
    url: 'https://media.geeksforgeeks.org/courses/certificates/c634bbc350c42e487a9712c588c8dc63.pdf',
    logo: 'https://cdn.simpleicons.org/geeksforgeeks/2F8D46'
  },
  {
    title: 'React Node - MERN Stack By Ryan Dhungel',
    provider: 'Udemy',
    date: 'Feb 2024',
    category: 'Full Stack',
    url: 'https://drive.google.com/file/d/1JBEVdf9WEffGYuo60bWC-FARFiZO2tor/view',
    logo: 'https://cdn.simpleicons.org/udemy/A435F0'
  },
  {
    title: 'Live Workshop on ChatGPT and AI Tools',
    provider: 'Skill Nation',
    date: 'Nov 2023',
    category: 'AI',
    url: 'https://drive.google.com/file/d/1y-8D4cYR7B-CRcEjMYz0PcEu5A_OKSeM/view?usp=sharing',
    logo: ''
  },
  {
    title: 'Angular & NodeJS - The MEAN Stack Guide',
    provider: 'Udemy',
    date: 'Nov 2023',
    category: 'Full Stack',
    url: 'https://www.udemy.com/certificate/UC-6c1e711f-36ce-4b4f-b41f-c5f6ca45d72a/',
    logo: 'https://cdn.simpleicons.org/udemy/A435F0'
  },
  {
    title: 'Complete 2023 Web Development Bootcamp',
    provider: 'Udemy',
    date: 'Oct 2023',
    category: 'Web Development',
    url: 'https://www.udemy.com/certificate/UC-95c80a2b-f877-43f3-aeee-e5fc0e523495/',
    logo: 'https://cdn.simpleicons.org/udemy/A435F0'
  },
  {
    title: 'SQL (Intermediate)',
    provider: 'HackerRank',
    date: 'Oct 2023',
    category: 'Database',
    url: 'https://www.hackerrank.com/certificates/5cb76dcb70b5',
    logo: 'https://cdn.simpleicons.org/hackerrank/00EA64'
  },
  {
    title: 'SQL (Basic)',
    provider: 'HackerRank',
    date: 'Oct 2022',
    category: 'Database',
    url: 'https://www.hackerrank.com/certificates/a76b640d1fa1',
    logo: 'https://cdn.simpleicons.org/hackerrank/00EA64'
  },
  {
    title: 'C Programming Language',
    provider: 'Great Learning',
    date: 'Feb 2021',
    category: 'Programming',
    url: 'https://www.mygreatlearning.com/certificate/BPPEYRTP',
    logo: 'https://cdn.simpleicons.org/greatlearning/0B1D9B'
  },
  // {
  //   title: 'Workshop on Android Application Development',
  //   provider: 'iBase Electrosoft LLP',
  //   date: 'Sep 2022',
  //   category: 'Mobile Development',
  //   url: '',
  //   logo: ''
  // },
  {
    title: 'Python Core',
    provider: 'MySirG',
    date: 'Jun 2022',
    category: 'Programming',
    url: 'https://drive.google.com/file/d/1iblTrKhtgsiE3YOfFtplilx2HoBofZPV/view?usp=sharing',
    logo: ''
  },
  // {
  //   title: 'English Grooming Skills',
  //   provider: 'LUDIFU',
  //   date: 'May 2022',
  //   category: 'Professional Skills',
  //   url: '',
  //   logo: ''
  // },
  // {
  //   title: 'Corporate Behavioral Skills',
  //   provider: 'LUDIFU',
  //   date: 'May 2022',
  //   category: 'Professional Skills',
  //   url: '',
  //   logo: ''
  // },
  // {
  //   title: 'Python Programming',
  //   provider: 'LUDIFU',
  //   date: 'May 2022',
  //   category: 'Programming',
  //   url: '',
  //   logo: ''
  // },
  {
    title: 'CSS',
    provider: 'Great Learning',
    date: 'Feb 2021',
    category: 'Web Development',
    url: 'https://www.mygreatlearning.com/certificate/DIPNQZFK',
    logo: 'https://cdn.simpleicons.org/greatlearning/0B1D9B'
  },
  {
    title: 'HTML',
    provider: 'Great Learning',
    date: 'Feb 2021',
    category: 'Web Development',
    url: 'https://www.mygreatlearning.com/certificate/SSOWAUCY',
    logo: 'https://cdn.simpleicons.org/greatlearning/0B1D9B'
  }
];


  readonly awards = [
   
    { number: '04', title: 'Gold Badge — Java', year: 'HackerRank', source: 'Programming' }
  ];

  get filteredProjects(): Project[] {
    if (this.selectedCategory === 'All') return this.projects;

    if (this.selectedCategory === 'AI') {
      return this.projects.filter(project =>
        project.category === 'AI' ||
        project.technologies.some(tech => tech.toLowerCase().includes('ai'))
      );
    }

    return this.projects.filter(project =>
      project.category === this.selectedCategory
    );
  }



  openProject(project: Project): void {
    this.selectedProject = project;
    document.body.style.overflow = 'hidden';
  }

  closeProject(): void {
    this.selectedProject = null;
    document.body.style.overflow = '';
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  toggleAssistant(): void {
    this.assistantOpen = !this.assistantOpen;
  }

  askQuestion(question?: string): void {
    const q = (question || this.question).trim();
    if (!q) return;

    const text = q.toLowerCase();
    this.question = '';

    if (text.includes('project') || text.includes('foodie') || text.includes('tweet')) {
      this.answer = 'My projects include FoodieHub, a full-stack food delivery application with AI recommendations and payment integration; TweetBuddy, a real-time social networking app; and Angular projects including Employee Management and Widget Management.';
    } else if (text.includes('experience') || text.includes('lentra') || text.includes('work')) {
      this.answer = 'I worked as an Associate Software Developer at Lentra on enterprise lending platforms, including LOS and LMS workflows. My work involved Java, Spring Boot REST APIs, integrations, and banking workflows.';
    } else if (text.includes('skill') || text.includes('technology') || text.includes('stack')) {
      this.answer = 'My core skills include Java, Spring Boot, REST APIs, Angular, TypeScript, JavaScript, SQL, MongoDB, React, Git, and AWS S3.';
    } else if (text.includes('education') || text.includes('degree') || text.includes('college')) {
      this.answer = 'I completed my B.Tech in Information Technology from Shri Guru Gobind Singhji Institute of Engineering and Technology (SGGSIE&T), Nanded, with a CGPA of 7.90/10.';
    } else if (text.includes('award') || text.includes('achievement')) {
      this.answer = 'My recognitions include the Lentra Top Performer of the Year award in 2024, Extra Miler awards in 2023 and 2024, and a HackerRank Gold Badge in Java.';
    } else if (text.includes('contact') || text.includes('email') || text.includes('hire')) {
      this.answer = `You can reach me at ${this.email} or connect through LinkedIn and GitHub using the links on this page.`;
    } else {
      this.answer = 'Ask me about my experience, projects, technical skills, education, awards, or contact details.';
    }
  }

  async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.email);
      this.copied = true;
      if (this.copyTimer) clearTimeout(this.copyTimer);
      this.copyTimer = setTimeout(() => this.copied = false, 1800);
    } catch {
      window.location.href = `mailto:${this.email}`;
    }
  }

  /**
 * Follow the pointer with a subtle blue glow.
 * CSS controls the appearance and opacity.
 */
@HostListener('document:mousemove', ['$event'])
onDocumentMouseMove(event: MouseEvent): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  document.documentElement.style.setProperty(
    '--cursor-x',
    `${event.clientX}px`
  );

  document.documentElement.style.setProperty(
    '--cursor-y',
    `${event.clientY}px`
  );
}

/**
 * Reveal content as it enters the viewport.
 */
ngAfterViewInit(): void {
  if (
    typeof IntersectionObserver === 'undefined' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return;
  }

  this.revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          this.revealObserver?.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -35px 0px'
    }
  );

  this.observeRevealElements();
}

/**
 * Observe current sections, cards, and timeline entries.
 */
private observeRevealElements(): void {
  if (!this.revealObserver || this.destroyed) {
    return;
  }

  document
    .querySelectorAll(
      '.reveal-on-scroll, .project-card, .exp-v2-entry, .skill-card, .award-row'
    )
    .forEach((element) => {
      if (!element.classList.contains('is-visible')) {
        this.revealObserver?.observe(element);
      }
    });
}

/**
 * Re-observe content after Angular updates a filtered project list.
 */
private refreshRevealElements(): void {
  if (this.revealRefreshFrame) {
    cancelAnimationFrame(this.revealRefreshFrame);
  }

  this.revealRefreshFrame = requestAnimationFrame(() => {
    this.revealRefreshFrame = 0;
    this.observeRevealElements();
  });
}

/**
 * Re-run reveal setup after a project category changes.
 */
setCategory(category: ProjectCategory): void {
  this.selectedCategory = category;
  this.refreshRevealElements();
}

/**
 * Track the pointer within a project card for a subtle highlight.
 */
onProjectPointerMove(event: PointerEvent): void {
  if (
    event.pointerType === 'touch' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return;
  }

  const card = event.currentTarget as HTMLElement;
  const rect = card.getBoundingClientRect();

  card.style.setProperty(
    '--pointer-x',
    `${event.clientX - rect.left}px`
  );

  card.style.setProperty(
    '--pointer-y',
    `${event.clientY - rect.top}px`
  );
}

/**
 * Clear card pointer effects when the pointer leaves.
 */
onProjectPointerLeave(event: PointerEvent): void {
  const card = event.currentTarget as HTMLElement;
  card.style.removeProperty('--pointer-x');
  card.style.removeProperty('--pointer-y');
}

  ngOnDestroy(): void {
  this.destroyed = true;
  this.revealObserver?.disconnect();

  if (this.revealRefreshFrame) {
    cancelAnimationFrame(this.revealRefreshFrame);
  }

  if (this.copyTimer) {
    clearTimeout(this.copyTimer);
  }
}
}
