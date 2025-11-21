import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Service, SiteSettings, Testimonial, ContactSubmission } from '../types';
import { INITIAL_PROJECTS, INITIAL_SERVICES, INITIAL_SETTINGS, INITIAL_TESTIMONIALS } from '../constants';

interface SiteContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: SiteSettings) => void;
  
  // Admin Credentials
  adminUsername: string;
  adminPassword: string;
  updateAdminCredentials: (u: string, p: string) => void;

  // Projects
  projects: Project[];
  addProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  editProject: (project: Project) => void;

  // Services
  services: Service[];
  addService: (service: Service) => void;
  deleteService: (id: string) => void;
  editService: (service: Service) => void;

  testimonials: Testimonial[];
  contactSubmissions: ContactSubmission[];
  addContactSubmission: (sub: ContactSubmission) => void;
  
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;

  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  
  // Admin Credentials State
  const [adminUsername, setAdminUsername] = useState('Admin');
  const [adminPassword, setAdminPassword] = useState('Admin@123');

  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const updateSettings = (newSettings: SiteSettings) => setSettings(newSettings);
  
  const updateAdminCredentials = (u: string, p: string) => {
    setAdminUsername(u);
    setAdminPassword(p);
  };

  // Project Handlers
  const addProject = (project: Project) => {
    setProjects(prev => [project, ...prev]);
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const editProject = (project: Project) => {
    setProjects(prev => prev.map(p => p.id === project.id ? project : p));
  };

  // Service Handlers
  const addService = (service: Service) => {
    setServices(prev => [...prev, service]);
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const editService = (service: Service) => {
    setServices(prev => prev.map(s => s.id === service.id ? service : s));
  };

  const addContactSubmission = (sub: ContactSubmission) => {
    setContactSubmissions(prev => [sub, ...prev]);
  };

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <SiteContext.Provider value={{
      settings,
      updateSettings,
      adminUsername,
      adminPassword,
      updateAdminCredentials,
      projects,
      addProject,
      deleteProject,
      editProject,
      services,
      addService,
      deleteService,
      editService,
      testimonials,
      contactSubmissions,
      addContactSubmission,
      isAuthenticated,
      login,
      logout,
      theme,
      toggleTheme
    }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) throw new Error('useSite must be used within a SiteProvider');
  return context;
};