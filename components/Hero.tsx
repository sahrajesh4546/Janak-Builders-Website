import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="relative h-[600px] w-full bg-gray-900 overflow-hidden">
      {/* Background Image */}
      <img 
        src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
        alt="Construction Site in Nepal" 
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent"></div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center text-center px-4">
        <div className="max-w-5xl">
          <h2 className="text-secondary font-bold tracking-widest uppercase text-sm md:text-base mb-4">Janak Builders Pvt. Ltd.</h2>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
            Planning to Build Your Dream Home <br className="hidden md:block" /> or Commercial Space?
          </h1>
          <p className="text-gray-200 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Choose Janak Builders — We Build With Trust, Quality & Commitment!
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-secondary text-primary hover:bg-yellow-400 font-bold py-3 px-8 rounded-full transition transform hover:scale-105 shadow-lg">
              Get Estimate
            </Link>
            <Link to="/projects" className="border-2 border-white text-white hover:bg-white hover:text-primary font-bold py-3 px-8 rounded-full transition">
              Explore Our Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;