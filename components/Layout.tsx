import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import { Menu, X, Phone, Mail, Facebook, Linkedin, MessageSquare, LogIn, LayoutDashboard } from 'lucide-react';

const Layout: React.FC = () => {
  const { settings, isAuthenticated } = useSite();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? 'text-secondary' : 'text-white hover:text-secondary';

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Top Bar */}
      <div className="bg-neutral-900 text-white text-sm py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><Phone size={14} /> {settings.phone}</span>
            <span className="flex items-center gap-2"><Mail size={14} /> {settings.email}</span>
          </div>
          <div className="flex gap-4">
            <a href={settings.facebookUrl} target="_blank" rel="noreferrer" className="hover:text-secondary"><Facebook size={14} /></a>
            <a href={settings.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-secondary"><Linkedin size={14} /></a>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <header className="bg-primary text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-xl md:text-2xl font-serif font-bold flex flex-col leading-tight">
            <span>{settings.companyName}</span>
            <span className="text-xs font-sans font-normal text-secondary tracking-wider">QUALITY BUILDS THAT LAST</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 items-center font-medium">
            <Link to="/" className={isActive('/')}>Home</Link>
            <Link to="/about" className={isActive('/about')}>About Us</Link>
            <Link to="/services" className={isActive('/services')}>Services</Link>
            <Link to="/projects" className={isActive('/projects')}>Projects</Link>
            <Link to="/tools" className={isActive('/tools')}>Construction Tools</Link>
            <Link to="/contact" className={isActive('/contact')}>Contact</Link>
            
            {/* Admin Login/Dashboard Link */}
            {isAuthenticated ? (
              <Link to="/admin/dashboard" className="text-secondary hover:text-white flex items-center gap-1 transition">
                <LayoutDashboard size={18} /> Dashboard
              </Link>
            ) : (
              <Link to="/admin" className="text-white hover:text-secondary flex items-center gap-1 transition">
                <LogIn size={18} /> Login
              </Link>
            )}

            <Link to="/contact" className="bg-secondary text-primary px-5 py-2 rounded-full font-bold hover:bg-yellow-400 transition">
              Get Estimate
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button onClick={toggleMenu} className="md:hidden text-white">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-primary border-t border-blue-900">
            <nav className="flex flex-col p-4 gap-4">
              <Link to="/" onClick={toggleMenu} className="text-white hover:text-secondary">Home</Link>
              <Link to="/about" onClick={toggleMenu} className="text-white hover:text-secondary">About Us</Link>
              <Link to="/services" onClick={toggleMenu} className="text-white hover:text-secondary">Services</Link>
              <Link to="/projects" onClick={toggleMenu} className="text-white hover:text-secondary">Projects</Link>
              <Link to="/tools" onClick={toggleMenu} className="text-white hover:text-secondary">Construction Tools</Link>
              <Link to="/contact" onClick={toggleMenu} className="text-white hover:text-secondary">Contact</Link>
              
              {isAuthenticated ? (
                <Link to="/admin/dashboard" onClick={toggleMenu} className="text-secondary font-bold flex items-center gap-2">
                  <LayoutDashboard size={20} /> Admin Dashboard
                </Link>
              ) : (
                <Link to="/admin" onClick={toggleMenu} className="text-white hover:text-secondary flex items-center gap-2">
                  <LogIn size={20} /> Admin Login
                </Link>
              )}

              <Link to="/contact" onClick={toggleMenu} className="bg-secondary text-primary px-4 py-2 rounded text-center font-bold">Get Estimate</Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-neutral-100">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white pt-16 pb-8 border-t-4 border-secondary">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* About */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4 text-secondary">{settings.companyName}</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {settings.tagline}
              <br/>
              Led by Er. Mukesh Sah, we are dedicated to building safe, sustainable, and modern structures across Nepal.
            </p>
            <div className="flex gap-4">
              <a href={settings.facebookUrl} target="_blank" rel="noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-secondary hover:text-primary transition"><Facebook size={18} /></a>
              <a href={`https://wa.me/${settings.whatsappNumber}`} target="_blank" rel="noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-secondary hover:text-primary transition"><MessageSquare size={18} /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-secondary">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/services" className="hover:text-white">Services</Link></li>
              <li><Link to="/projects" className="hover:text-white">Our Portfolio</Link></li>
              <li><Link to="/tools" className="hover:text-white">Cost Estimator</Link></li>
              <li><Link to="/admin" className="hover:text-white text-xs opacity-50">Admin Login</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-secondary">Contact Us</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex gap-3 items-start">
                <div className="mt-1"><MapPinIcon /></div>
                <span>{settings.address}</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={16} />
                <span>{settings.phone}</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={16} />
                <span>{settings.email}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="text-center text-gray-500 text-sm border-t border-blue-900 pt-8">
          &copy; {new Date().getFullYear()} {settings.companyName}. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

export default Layout;