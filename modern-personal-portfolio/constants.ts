
import type { Project, Skill, NavLink } from './types';
import { JavascriptIcon, ReactIcon, NodeIcon, PythonIcon, TailwindIcon, FigmaIcon, GithubIcon, LinkedinIcon, TwitterIcon } from './components/icons/Icons';

export const NAV_LINKS: NavLink[] = [
  { id: 'home', title: 'Home' },
  { id: 'about', title: 'About' },
  { id: 'projects', title: 'Projects' },
  { id: 'contact', title: 'Contact' },
];

export const SKILLS: Skill[] = [
  { name: 'JavaScript', icon: JavascriptIcon },
  { name: 'React', icon: ReactIcon },
  { name: 'Node.js', icon: NodeIcon },
  { name: 'Python', icon: PythonIcon },
  { name: 'Tailwind CSS', icon: TailwindIcon },
  { name: 'Figma', icon: FigmaIcon },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Project Alpha',
    category: 'Web Application',
    image: 'https://picsum.photos/seed/alpha/800/600',
    description: 'A cutting-edge web platform for interactive data visualization.',
    longDescription: 'Project Alpha is a comprehensive platform designed to help users visualize complex datasets with ease. It features a dynamic dashboard, real-time data updates, and customizable chart options. Built with a modern tech stack, it provides a seamless and responsive user experience across all devices.',
    techStack: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
    githubUrl: 'https://github.com',
    liveUrl: '#',
  },
  {
    id: 2,
    title: 'Project Beta',
    category: 'Mobile App',
    image: 'https://picsum.photos/seed/beta/800/600',
    description: 'A mobile application for social networking and event planning.',
    longDescription: 'Project Beta connects people through shared interests and local events. Users can create profiles, join groups, and discover happenings in their area. The app includes features like in-app messaging, event RSVPs, and a recommendation engine powered by machine learning.',
    techStack: ['React Native', 'Firebase', 'GraphQL'],
    githubUrl: 'https://github.com',
  },
  {
    id: 3,
    title: 'Project Gamma',
    category: 'E-commerce',
    image: 'https://picsum.photos/seed/gamma/800/600',
    description: 'A sleek e-commerce store with a focus on user experience.',
    longDescription: 'Project Gamma offers a minimalist and intuitive shopping experience. It features a fast, responsive interface, secure payment integration with Stripe, and a robust backend for managing products and orders. The design is clean, modern, and optimized for conversions.',
    techStack: ['Next.js', 'Stripe', 'Vercel', 'Tailwind CSS'],
    githubUrl: 'https://github.com',
    liveUrl: '#',
  },
   {
    id: 4,
    title: 'Project Delta',
    category: 'AI Tool',
    image: 'https://picsum.photos/seed/delta/800/600',
    description: 'An AI-powered tool for content generation and summarization.',
    longDescription: 'Project Delta leverages advanced natural language processing models to assist users in creating and summarizing text content. It can generate articles, marketing copy, and social media posts, or condense long documents into concise summaries, boosting productivity for writers and researchers.',
    techStack: ['Python', 'Flask', 'React', 'Hugging Face'],
    githubUrl: 'https://github.com',
  },
];

export const SOCIAL_LINKS = [
    { name: 'GitHub', icon: GithubIcon, url: 'https://github.com' },
    { name: 'LinkedIn', icon: LinkedinIcon, url: 'https://linkedin.com' },
    { name: 'Twitter', icon: TwitterIcon, url: 'https://twitter.com' },
];
