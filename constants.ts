import { Project, Service, SiteSettings, Testimonial } from './types';

export const INITIAL_SETTINGS: SiteSettings = {
  companyName: "Janak Builders Pvt. Ltd.",
  tagline: "Quality Builds That Last",
  email: "Janakbuilder@gmail.com",
  phone: "+977 9807850508 / 9844297168",
  address: "Kathmandu, Nepal",
  facebookUrl: "https://facebook.com",
  linkedinUrl: "https://linkedin.com",
  whatsappNumber: "9779807850508"
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
    title: 'Kathmandu Corporate Hub',
    category: 'Commercial',
    description: 'A 12-story commercial complex in the heart of Baneshwor.',
    imageUrl: 'https://picsum.photos/id/122/800/600',
    location: 'Baneshwor, Kathmandu'
  },
  {
    id: 'p2',
    title: 'Lalitpur Modern Residence',
    category: 'Residential',
    description: 'A luxury private residence combining traditional Newari architecture with modern amenities.',
    imageUrl: 'https://picsum.photos/id/188/800/600',
    location: 'Sanepa, Lalitpur'
  },
  {
    id: 'p3',
    title: 'Bagmati River Bridge',
    category: 'Infrastructure',
    description: 'Structural reinforcement and expansion of a key connecting bridge.',
    imageUrl: 'https://picsum.photos/id/227/800/600',
    location: 'Kathmandu Valley'
  },
  {
    id: 'p4',
    title: 'Pokhara Lake View Resort',
    category: 'Commercial',
    description: 'Eco-friendly resort construction overlooking Phewa Lake.',
    imageUrl: 'https://picsum.photos/id/164/800/600',
    location: 'Pokhara, Kaski'
  },
  {
    id: 'p5',
    title: 'Heritage Home Restoration',
    category: 'Renovation',
    description: 'Restoring a 100-year-old Rana-style building.',
    imageUrl: 'https://picsum.photos/id/203/800/600',
    location: 'Patan'
  },
  {
    id: 'p6',
    title: 'Sunrise Apartments',
    category: 'Residential',
    description: 'Affordable housing project with 50 units.',
    imageUrl: 'https://picsum.photos/id/204/800/600',
    location: 'Bhaktapur'
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