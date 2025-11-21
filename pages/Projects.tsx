import React, { useState } from 'react';
import SEO from '../components/SEO';
import { useSite } from '../context/SiteContext';
import { MapPin } from 'lucide-react';

const Projects: React.FC = () => {
  const { projects } = useSite();
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div>
      <SEO 
        title="Our Construction Projects Portfolio" 
        description="View our completed projects including commercial complexes, residential homes, and apartments in Kathmandu, Lalitpur, and Bhaktapur."
        keywords="construction projects nepal, modern house designs nepal, commercial buildings kathmandu, janak builders portfolio"
      />
      <div className="bg-neutral-900 dark:bg-gray-950 text-white py-16 transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
           <h1 className="text-4xl font-serif font-bold mb-4">Our Projects</h1>
           <p className="text-xl text-gray-300">Showcasing our contribution to Nepal's infrastructure.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-medium transition ${
                filter === cat 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <div key={project.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300">
              <div className="h-64 overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover hover:scale-110 transition duration-700"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-secondary bg-primary/10 dark:bg-white/10 px-2 py-1 rounded uppercase">{project.category}</span>
                </div>
                <h3 className="text-xl font-bold text-primary dark:text-white mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm border-t dark:border-gray-700 pt-4">
                  <MapPin size={16} className="mr-1" />
                  {project.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;