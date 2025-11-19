import React from 'react';
import SEO from '../components/SEO';
import { useSite } from '../context/SiteContext';
import * as Icons from 'lucide-react';

const Services: React.FC = () => {
  const { services } = useSite();

  return (
    <div>
       <SEO 
        title="Civil Engineering Services & House Design" 
        description="We provide complete construction services: Residential house design, structural analysis, interior renovation, and turnkey projects in Kathmandu, Nepal."
        keywords="house design nepal, interior design kathmandu, renovation services, structural engineering, turnkey construction nepal"
      />
       <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
           <h1 className="text-4xl font-serif font-bold mb-4">Our Expertise</h1>
           <p className="text-xl text-gray-300 max-w-2xl">Comprehensive construction services tailored for the Nepalese landscape.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="space-y-12">
          {services.map((service, index) => {
            // Dynamic Icon Rendering
            const IconComponent = (Icons as any)[service.iconName] || Icons.Building;
            
            return (
              <div key={service.id} className={`flex flex-col md:flex-row gap-8 items-start ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className="md:w-1/3 bg-white p-8 rounded-xl shadow-lg border-t-4 border-secondary flex flex-col justify-center items-center">
                   {service.imageUrl ? (
                     <div className="w-full">
                       <img src={service.imageUrl} alt={service.title} className="w-full h-64 object-cover rounded-lg mb-4 shadow-sm" />
                       <h3 className="text-2xl font-bold text-primary text-center">{service.title}</h3>
                     </div>
                   ) : (
                     <div className="text-center">
                        <div className="inline-flex p-4 bg-blue-50 text-primary rounded-full mb-4">
                          <IconComponent size={48} />
                        </div>
                        <h3 className="text-2xl font-bold text-primary">{service.title}</h3>
                     </div>
                   )}
                </div>
                <div className="md:w-2/3">
                   <h3 className="text-2xl font-bold text-primary mb-4 md:hidden">{service.title}</h3>
                   <p className="text-lg text-gray-700 leading-relaxed mb-4">{service.fullDescription}</p>
                   <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
                      <li>Site analysis and feasibility studies</li>
                      <li>Material procurement and quality control</li>
                      <li>On-site supervision by expert engineers</li>
                   </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;