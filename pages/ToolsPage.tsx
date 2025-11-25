import React from 'react';
import SEO from '../components/SEO';
import CostEstimator from '../components/Tools/CostEstimator';
import UnitConverter from '../components/Tools/UnitConverter';
import ImageEditor from '../components/Tools/ImageEditor';
import ImageAnalyzer from '../components/Tools/ImageAnalyzer';
import BOQGenerator from '../components/Tools/BOQGenerator';
import MaterialCalculator from '../components/Tools/MaterialCalculator';
import ScientificCalculator from '../components/Tools/ScientificCalculator';
import { Calculator, Ruler, BrainCircuit } from 'lucide-react';

const ToolsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <SEO 
        title="Construction Tools & Engineering Calculator Nepal" 
        description="Free engineering tools for Nepal: Scientific Calculator for Civil Engineers, House Cost Estimator, Land Converter, and AI BOQ Generator."
        keywords="scientific calculator nepal, engineering calculator, civil engineering tools, house cost calculator nepal, land converter aana dhur, boq generator"
      />
      
      {/* Header Banner */}
      <div className="bg-primary dark:bg-gray-950 text-white py-16 transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
           <h1 className="text-4xl font-serif font-bold mb-4">Engineering & Construction Tools</h1>
           <p className="text-xl text-gray-300 max-w-3xl mx-auto">
             Empowering engineers and home builders with advanced utilities and AI-powered estimation tools.
           </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 space-y-20">
        
        {/* Section 1: Engineering Calculators */}
        <section>
          <div className="flex items-center gap-3 mb-8 border-b-2 border-gray-200 dark:border-gray-700 pb-4">
            <div className="bg-secondary p-2 rounded text-primary">
              <Calculator size={24} />
            </div>
            <h2 className="text-3xl font-serif font-bold text-primary dark:text-white">Engineering Calculators</h2>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
            <div className="w-full">
              <ScientificCalculator />
            </div>
            <div className="w-full">
              <MaterialCalculator />
            </div>
          </div>
        </section>

        {/* Section 2: Estimation & Converters */}
        <section>
          <div className="flex items-center gap-3 mb-8 border-b-2 border-gray-200 dark:border-gray-700 pb-4">
            <div className="bg-secondary p-2 rounded text-primary">
              <Ruler size={24} />
            </div>
            <h2 className="text-3xl font-serif font-bold text-primary dark:text-white">Estimation & Conversions</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <div className="h-full">
              <CostEstimator />
            </div>
            <div className="h-full">
              <UnitConverter />
            </div>
          </div>
        </section>

        {/* Section 3: AI Power Tools */}
        <section>
          <div className="flex items-center gap-3 mb-8 border-b-2 border-gray-200 dark:border-gray-700 pb-4">
            <div className="bg-secondary p-2 rounded text-primary">
              <BrainCircuit size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-serif font-bold text-primary dark:text-white flex items-center gap-3">
                AI Power Suite 
                <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full font-sans font-normal tracking-wide">BETA</span>
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
            <div className="w-full">
              <BOQGenerator />
            </div>
            <div className="w-full grid grid-cols-1 gap-8">
              <ImageAnalyzer />
              <ImageEditor />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ToolsPage;
