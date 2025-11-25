import React from 'react';
import Hero from '../components/Hero';
import SEO from '../components/SEO';
import { useSite } from '../context/SiteContext';
import { ArrowRight, CheckCircle, Wrench, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const { projects, settings } = useSite();

  return (
    <div className="flex flex-col">
      <SEO 
        title="Best Construction Company in Kathmandu" 
        description="Janak Builders is a leading construction company in Nepal offering residential & commercial building services, cost estimation, and earthquake-resistant designs."
        keywords="construction company nepal, house builders kathmandu, building contractor lalitpur, earthquake resistant homes nepal, janak builders"
      />
      <Hero />

      {/* Banner Strip */}
      <div className="bg-secondary py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="bg-white p-3 rounded-full shadow-lg">
               <Wrench className="text-primary" size={32} />
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary">
              Choose Janak Builders - We Build With Trust, Quality & Commitment!
            </h2>
          </div>
        </div>
      </div>

      {/* Expertise & Why Choose Us (Split Section) */}
      <section className="bg-primary dark:bg-gray-900 text-white py-16 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Expertise */}
            <div>
              <h3 className="text-2xl font-bold border-b-4 border-secondary inline-block mb-8 pb-2 uppercase tracking-wide">Our Expertise</h3>
              <ul className="space-y-6 text-lg">
                <li className="flex items-center gap-4">
                  <div className="bg-secondary text-primary p-1 rounded-full"><ArrowRight size={18}/></div> 
                  Residential & Commercial Buildings
                </li>
                <li className="flex items-center gap-4">
                  <div className="bg-secondary text-primary p-1 rounded-full"><ArrowRight size={18}/></div> 
                  Interior + Build Solutions
                </li>
                <li className="flex items-center gap-4">
                  <div className="bg-secondary text-primary p-1 rounded-full"><ArrowRight size={18}/></div> 
                  Interior & Renovation Works
                </li>
                <li className="flex items-center gap-4">
                  <div className="bg-secondary text-primary p-1 rounded-full"><ArrowRight size={18}/></div> 
                  Reliable Subcontracting & Turnkey Projects
                </li>
              </ul>
            </div>

            {/* Why Choose Us */}
            <div>
              <h3 className="text-2xl font-bold border-b-4 border-secondary inline-block mb-8 pb-2 uppercase tracking-wide">Why Choose Janak Builders?</h3>
              <ul className="space-y-4 text-lg">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-secondary mt-1 flex-shrink-0" size={24} /> 
                  <span>Experienced Team of Engineers & Supervisors</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-secondary mt-1 flex-shrink-0" size={24} /> 
                  <span>On-Time Project Delivery</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-secondary mt-1 flex-shrink-0" size={24} /> 
                  <span>Transparent Costing (No Hidden Charges)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-secondary mt-1 flex-shrink-0" size={24} /> 
                  <span>Quality Assurance from Foundation to Finish</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-secondary mt-1 flex-shrink-0" size={24} /> 
                  <span>Site Visit & Cost Estimation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="bg-secondary text-primary px-6 py-2 rounded-full font-bold uppercase text-sm tracking-wide">Pricing Plans</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white mt-4">Custom packages available based on design & budget</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Basic Package */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 flex flex-col bg-white dark:bg-gray-900">
              <div className="bg-gray-50 dark:bg-gray-800 p-8 border-b border-gray-200 dark:border-gray-700 text-center transition-colors duration-300">
                <h3 className="text-2xl font-bold text-primary dark:text-white uppercase tracking-wide">BASIC PACKAGE</h3>
                <div className="mt-4 text-3xl font-bold text-secondary">Rs. 3000<span className="text-lg text-gray-500 dark:text-gray-400 font-normal">/sq.ft</span></div>
              </div>
              <div className="p-8 bg-white dark:bg-gray-900 flex-grow transition-colors duration-300">
                <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                  <li className="flex gap-3"><div className="mt-2 w-2 h-2 bg-primary dark:bg-white rounded-full flex-shrink-0"></div> Branded materials & modern finishing</li>
                  <li className="flex gap-3"><div className="mt-2 w-2 h-2 bg-primary dark:bg-white rounded-full flex-shrink-0"></div> Modular kitchen</li>
                  <li className="flex gap-3"><div className="mt-2 w-2 h-2 bg-primary dark:bg-white rounded-full flex-shrink-0"></div> Premium tiles</li>
                  <li className="flex gap-3"><div className="mt-2 w-2 h-2 bg-primary dark:bg-white rounded-full flex-shrink-0"></div> False ceiling</li>
                  <li className="flex gap-3"><div className="mt-2 w-2 h-2 bg-primary dark:bg-white rounded-full flex-shrink-0"></div> Better-quality electrical & plumbing</li>
                </ul>
                <div className="mt-8 pt-6 border-t border-dashed border-gray-300 dark:border-gray-700 text-center">
                  <p className="font-bold text-primary dark:text-white">Ideal for modern family homes</p>
                </div>
              </div>
            </div>

            {/* Premium Package */}
            <div className="border-2 border-primary dark:border-secondary rounded-2xl shadow-xl overflow-hidden transform md:-translate-y-4 flex flex-col relative bg-white dark:bg-gray-900">
              <div className="absolute top-0 right-0 bg-secondary text-xs font-bold px-3 py-1 text-primary uppercase rounded-bl-lg">Most Popular</div>
              <div className="bg-primary dark:bg-gray-950 p-8 text-center text-white transition-colors duration-300">
                <h3 className="text-2xl font-bold uppercase tracking-wide">PREMIUM PACKAGE</h3>
                <div className="mt-4 text-3xl font-bold text-secondary">Rs. 3500<span className="text-lg text-white/70 font-normal">/sq.ft</span></div>
              </div>
              <div className="p-8 bg-white dark:bg-gray-900 flex-grow transition-colors duration-300">
                <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                   <li className="flex gap-3"><div className="mt-2 w-2 h-2 bg-secondary rounded-full flex-shrink-0"></div> High-end imported materials</li>
                   <li className="flex gap-3"><div className="mt-2 w-2 h-2 bg-secondary rounded-full flex-shrink-0"></div> Luxury tiles / parquet flooring</li>
                   <li className="flex gap-3"><div className="mt-2 w-2 h-2 bg-secondary rounded-full flex-shrink-0"></div> Modular kitchen + elite fittings</li>
                   <li className="flex gap-3"><div className="mt-2 w-2 h-2 bg-secondary rounded-full flex-shrink-0"></div> False ceiling with LED design</li>
                   <li className="flex gap-3"><div className="mt-2 w-2 h-2 bg-secondary rounded-full flex-shrink-0"></div> Premium bathroom fittings</li>
                </ul>
                <div className="mt-8 pt-6 border-t border-dashed border-gray-300 dark:border-gray-700 text-center">
                   <p className="font-bold text-primary dark:text-white">Ideal for villas, hotels & commercial spaces</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Projects Snippet */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
             <h2 className="text-3xl font-serif font-bold text-primary dark:text-white">Latest Projects</h2>
             <p className="text-gray-600 dark:text-gray-400 mt-2">A glimpse of what we build.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.slice(0, 3).map(project => (
              <div key={project.id} className="relative group overflow-hidden rounded-lg shadow-lg">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-6">
                  <span className="text-secondary text-xs font-bold uppercase tracking-wider mb-1">{project.category}</span>
                  <h4 className="text-xl font-bold text-white mb-1">{project.title}</h4>
                  <p className="text-xs text-gray-300">{project.location}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
             <Link to="/projects" className="text-primary dark:text-white font-bold hover:text-secondary transition underline">View Full Portfolio</Link>
          </div>
        </div>
      </section>

      {/* Large CTA Footer Strip */}
      <section className="bg-secondary py-12 relative overflow-hidden">
         <div className="container mx-auto px-4 text-center relative z-10">
           <h2 className="text-2xl md:text-3xl font-bold text-primary uppercase mb-4 tracking-tight">
             Book Your Free Site Visit & Cost Estimate Today!
           </h2>
           <h3 className="text-3xl md:text-5xl font-serif font-bold text-white mb-10 drop-shadow-md">
             Let's Build Your Dream Together!
           </h3>
           
           <div className="flex flex-col md:flex-row justify-center gap-6 text-primary font-bold text-lg">
              <div className="flex flex-col items-center justify-center bg-white/90 px-8 py-4 rounded-xl shadow-lg">
                 <div className="flex items-center gap-2 mb-1">
                   <Phone size={24} className="text-primary"/> 
                   <span>Call Us</span>
                 </div>
                 <span className="text-xl">{settings.phone}</span>
              </div>
              
              <div className="flex flex-col items-center justify-center bg-white/90 px-8 py-4 rounded-xl shadow-lg">
                 <div className="flex items-center gap-2 mb-1">
                   <Mail size={24} className="text-primary"/> 
                   <span>Email Us</span>
                 </div>
                 <span className="text-xl">{settings.email}</span>
              </div>
           </div>
         </div>
      </section>
    </div>
  );
};

export default Home;