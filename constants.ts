import { Project, Service, SiteSettings, Testimonial } from './types';

// Google Analytics Measurement ID
export const GA_ID = "G-MEASUREMENT_ID"; // Replace this with your actual ID

export const INITIAL_SETTINGS: SiteSettings = {
  companyName: "Janak Builders Pvt. Ltd.",
  tagline: "Quality Builds That Last",
  email: "Janakbuilder@gmail.com",
  phone: "+977 9807850508 / 9844297168",
  address: "Kathmandu, Nepal",
  facebookUrl: "https://facebook.com",
  linkedinUrl: "https://linkedin.com",
  whatsappNumber: "9779807850508",
  logoUrl: "https://i.imgur.com/DA8XYIF.png"
};

export const INITIAL_SERVICES: Service[] = [
  {
    id: '1',
    title: 'Residential & Commercial Buildings',
    shortDescription: 'Complete construction solutions for homes and businesses.',
    fullDescription: 'From dream homes to high-rise commercial complexes, we provide structural excellence and modern designs tailored to your needs.',
    iconName: 'Building2'
  },
  {
    id: '2',
    title: 'Interior + Build Solutions',
    shortDescription: 'Integrated design and construction.',
    fullDescription: 'A seamless blend of structural construction and interior finishing to create ready-to-move-in spaces.',
    iconName: 'Home'
  },
  {
    id: '3',
    title: 'Interior & Renovation Works',
    shortDescription: 'Modernizing existing spaces.',
    fullDescription: 'We breathe new life into old structures with premium interior design and renovation services.',
    iconName: 'PaintBucket'
  },
  {
    id: '4',
    title: 'Reliable Subcontracting & Turnkey Projects',
    shortDescription: 'End-to-end project management.',
    fullDescription: 'We handle everything from the foundation to the final finish, offering a single point of responsibility.',
    iconName: 'Key'
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Commercial Complex Construction',
    category: 'Commercial',
    description: 'A modern 8-story commercial complex with shopping malls, underground parking, and corporate offices.',
    imageUrl: 'https://picsum.photos/id/122/800/600',
    location: 'Dhangadhi, Kailali'
  },
  {
    id: 'p2',
    title: 'Residential Housing Development',
    category: 'Residential',
    description: 'Integrated community housing project featuring 25 modern earthquake-resistant standalone units.',
    imageUrl: 'https://picsum.photos/id/188/800/600',
    location: 'Rajbiraj, Saptari'
  },
  {
    id: 'p3',
    title: 'Traditional Monastery Project',
    category: 'Heritage',
    description: 'Construction of a traditional Buddhist monastery (Gumba) with meditation halls and landscaping.',
    imageUrl: 'https://picsum.photos/id/227/800/600',
    location: 'Lumbini, Nepal'
  },
  {
    id: 'p4',
    title: 'Heritage Structure Retrofitting',
    category: 'Renovation',
    description: 'Structural retrofitting and aesthetic restoration of a 200-year-old stone masonry Gumba.',
    imageUrl: 'https://picsum.photos/id/203/800/600',
    location: 'Upper Mustang'
  },
  {
    id: 'p5',
    title: 'High-Altitude Public Infrastructure',
    category: 'Infrastructure',
    description: 'Community center designed with specialized insulation and materials to withstand extreme weather.',
    imageUrl: 'https://picsum.photos/id/204/800/600',
    location: 'Manang, Gandaki'
  },
  {
    id: 'p6',
    title: 'Healthcare Facility Engineering',
    category: 'Commercial',
    description: 'Structural expansion and interior finishing for a multi-specialty hospital wing.',
    imageUrl: 'https://picsum.photos/id/164/800/600',
    location: 'Biratnagar, Nepal'
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    clientName: 'Rajesh Hamal',
    role: 'Hotel Owner',
    content: 'Janak Builders delivered our hotel project 2 months ahead of schedule. The quality is unmatched.',
    avatarUrl: 'https://picsum.photos/id/1005/100/100'
  },
  {
    id: 't2',
    clientName: 'Sita Sharma',
    role: 'Homeowner',
    content: 'Er. Mukesh Sah guided us through every step of building our dream home. Highly professional.',
    avatarUrl: 'https://picsum.photos/id/1011/100/100'
  }
];