import React from 'react';
import SEO from '../components/SEO';
import CostEstimator from '../components/Tools/CostEstimator';
import UnitConverter from '../components/Tools/UnitConverter';
import ImageEditor from '../components/Tools/ImageEditor';
import ImageAnalyzer from '../components/Tools/ImageAnalyzer';
import BOQGenerator from '../components/Tools/BOQGenerator';
import MaterialCalculator from '../components/Tools/MaterialCalculator';
import ScientificCalculator from '../components/Tools/ScientificCalculator';

const ToolsPage: React.FC = () => {
  return (
    <div>
      <SEO 
        title="Construction Tools & Engineering Calculator Nepal" 
        description="Free engineering tools for Nepal: Scientific Calculator for Civil Engineers, House Cost Estimator, Land Converter, and AI BOQ Generator."
        keywords="scientific calculator nepal, engineering calculator, civil engineering tools, house cost calculator nepal, land converter aana dhur, boq generator"
      />
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
           <h1 className="text-4xl font-serif font-bold mb-4">Engineering & Construction Tools</h1>
           <p className="text-xl text-gray-300">Advanced utilities and AI-powered tools for engineers and home builders in Nepal.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculators Row */}
          <ScientificCalculator />
          <MaterialCalculator />
          
          {/* Estimators Row */}
          <CostEstimator />
          <UnitConverter />
          
          {/* AI Tools */}
          <BOQGenerator />
          <div className="space-y-8">
            <ImageAnalyzer />
            <ImageEditor />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;