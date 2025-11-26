import React from 'react';
import SEO from '../components/SEO';
import CostEstimator from '../components/Tools/CostEstimator';
import UnitConverter from '../components/Tools/UnitConverter';
import ImageEditor from '../components/Tools/ImageEditor';
import ImageAnalyzer from '../components/Tools/ImageAnalyzer';
import BOQGenerator from '../components/Tools/BOQGenerator';
import MaterialCalculator from '../components/Tools/MaterialCalculator';
import ScientificCalculator from '../components/Tools/ScientificCalculator';
import EngineeringCalcs from '../components/Tools/EngineeringCalcs';
import { Calculator, Ruler, BrainCircuit, Wrench, FileText } from 'lucide-react';

const ToolsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <SEO 
        title="Engineering Tools & Calculators Nepal" 
        description="Comprehensive suite of engineering tools: Scientific Calculator, Universal Unit Converter, Civil & Mechanical Calculators, and AI Project Estimation."
        keywords="scientific calculator nepal, engineering calculator, civil engineering tools, house cost calculator nepal, land converter aana dhur, boq generator, mechanical calculator"
      />
      
      {/* Header Banner */}
      <div className="bg-primary dark:bg-gray-950 text-white py-16 transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
           <h1 className="text-3xl md:text-5xl font-serif font-bold mb-6">Engineering Suite</h1>
           <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
             Professional grade calculation, estimation, and AI tools for Engineers, Contractors, and Students.
           </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-7xl space-y-20">
        
        {/* ENGINEERING CALCULATORS SECTION */}
        <section id="engineering">
            <div className="flex items-center gap-3 mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
                <div className="bg-secondary p-2 rounded-lg text-primary">
                    <Calculator size={24} />
                </div>
                <h2 className="text-2xl font-bold text-primary dark:text-white">Engineering Calculators</h2>
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
              <div className="w-full">
                <ScientificCalculator />
              </div>
              <div className="w-full grid grid-cols-1 gap-8">
                 <EngineeringCalcs />
                 <UnitConverter />
              </div>
            </div>
        </section>

        {/* ESTIMATION SECTION */}
        <section id="estimation">
            <div className="flex items-center gap-3 mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
                <div className="bg-secondary p-2 rounded-lg text-primary">
                    <Ruler size={24} />
                </div>
                <h2 className="text-2xl font-bold text-primary dark:text-white">Construction Estimation</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              <div className="h-full">
                <MaterialCalculator />
              </div>
              <div className="h-full">
                <CostEstimator />
              </div>
            </div>
        </section>

        {/* AI TOOLS SECTION */}
        <section id="ai-tools">
            <div className="flex items-center gap-3 mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
                <div className="bg-secondary p-2 rounded-lg text-primary">
                    <BrainCircuit size={24} />
                </div>
                <h2 className="text-2xl font-bold text-primary dark:text-white">AI Powered Tools</h2>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 border border-blue-100 dark:border-gray-700 p-6 rounded-xl text-center shadow-sm mb-8">
                <p className="text-lg text-blue-900 dark:text-blue-100 flex items-center justify-center gap-3">
                    <BrainCircuit size={24} className="text-secondary" />
                    Powered by <strong>Google Gemini AI</strong> (Flash 2.5 & Pro 3.0) for advanced analysis.
                </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
                <div className="w-full grid grid-cols-1 gap-8">
                   <ImageAnalyzer />
                   <ImageEditor />
                </div>
                <div className="w-full">
                    <BOQGenerator />
                </div>
            </div>
        </section>
        
      </div>
    </div>
  );
};

export default ToolsPage;