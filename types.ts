export interface Project {
  id: string;
  title: string;
  category: 'Commercial' | 'Residential' | 'Infrastructure' | 'Renovation' | 'Heritage';
  description: string;
  imageUrl: string;
  location: string;
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string; // Storing icon name to map to Lucide icons
  imageUrl?: string;
}

export interface SiteSettings {
  companyName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  facebookUrl: string;
  linkedinUrl: string;
  whatsappNumber: string;
  logoUrl?: string;
  instagramUrl?: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  content: string;
  avatarUrl: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}