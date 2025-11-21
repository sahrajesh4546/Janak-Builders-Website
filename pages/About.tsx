import React from 'react';
import SEO from '../components/SEO';
import { Check } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      <SEO 
        title="About Us - Er. Mukesh Sah" 
        description="Learn about Janak Builders and our founder Er. Mukesh Sah. We are dedicated to engineering excellence and safe construction practices in Nepal."
        keywords="Er Mukesh Sah, Janak Builders profile, civil engineer profile nepal, reliable construction company"
      />
      {/* Header */}
      <div className="bg-primary dark:bg-gray-950 text-white py-20 transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
           <h1 className="text-4xl font-serif font-bold mb-4">About Janak Builders</h1>
           <p className="text-xl text-gray-300 max-w-2xl mx-auto">Engineering excellence rooted in Nepalese values.</p>
        </div>
      </div>

      {/* Company Intro */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-serif font-bold text-primary dark:text-white mb-6">Our Story</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              Founded with a vision to revolutionize the construction landscape of Nepal, Janak Builders has grown from a small civil contracting firm to a premier construction company. We understand the unique geological and climatic challenges of Nepal, enabling us to build structures that are not only aesthetically pleasing but structurally resilient.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Our commitment goes beyond bricks and mortar; we build trust. We have successfully delivered over 50+ major projects across Kathmandu, Lalitpur, and Bhaktapur, ranging from commercial high-rises to private residences.
            </p>
          </div>
          <div>
             <img 
               src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
               alt="Construction Team" 
               className="rounded-lg shadow-xl"
             />
          </div>
        </div>
      </section>

      {/* Er. Mukesh Sah Section */}
      <section className="py-16 bg-neutral-100 dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
           <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row transition-colors duration-300">
             <div className="md:w-1/3">
               {/* Replaced placeholder with user provided image */}
               <img 
                 src="https://i.imgur.com/h5t8nqV.jpeg" 
                 alt="Er. Mukesh Sah" 
                 className="w-full h-full object-cover min-h-[400px]"
               />
             </div>
             <div className="md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
                <div className="mb-2">
                  <span className="bg-secondary text-primary px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">Leadership</span>
                </div>
                <h2 className="text-3xl font-serif font-bold text-primary dark:text-white mb-2">Er. Mukesh Sah</h2>
                <p className="text-gray-500 dark:text-gray-400 font-medium mb-6">Founder & Civil Engineer</p>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  "As a Civil Engineer, my philosophy is simple: Quality is not an act, it is a habit. In Nepal, where seismic activity is a reality, our responsibility as builders is immense. At Janak Builders, I personally oversee the structural integrity of every project. We don't just follow codes; we set standards."
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300"><Check className="text-secondary" size={18}/> <span>B.E. Civil Engineering</span></div>
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300"><Check className="text-secondary" size={18}/> <span>5+ Years Experience</span></div>
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300"><Check className="text-secondary" size={18}/> <span>Member, Nepal Engineering Council</span></div>
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300"><Check className="text-secondary" size={18}/> <span>Structural Analysis Expert</span></div>
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 container mx-auto px-4 text-center">
        <h2 className="text-3xl font-serif font-bold text-primary dark:text-white mb-12">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-secondary transition">
             <h3 className="text-xl font-bold text-primary dark:text-white mb-3">Integrity</h3>
             <p className="text-gray-600 dark:text-gray-400">We believe in honest dealings, transparent costs, and keeping our promises to clients.</p>
          </div>
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-secondary transition">
             <h3 className="text-xl font-bold text-primary dark:text-white mb-3">Innovation</h3>
             <p className="text-gray-600 dark:text-gray-400">Using modern technologies and materials to build efficient and durable structures.</p>
          </div>
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-secondary transition">
             <h3 className="text-xl font-bold text-primary dark:text-white mb-3">Sustainability</h3>
             <p className="text-gray-600 dark:text-gray-400">Minimizing environmental impact through responsible construction practices.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;