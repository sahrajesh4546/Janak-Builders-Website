import React, { useState } from 'react';
import { DollarSign, Calculator } from 'lucide-react';

const CostEstimator: React.FC = () => {
  const [area, setArea] = useState<number>(1000);
  const [quality, setQuality] = useState<'Economy' | 'Standard' | 'Premium'>('Standard');
  const [floors, setFloors] = useState<number>(1);

  // Estimated rates in NPR per sq ft (approximate for demo)
  const rates = {
    Economy: 2800,
    Standard: 3500,
    Premium: 4500
  };

  const totalCost = area * floors * rates[quality];

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border-t-8 border-secondary h-full flex flex-col">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-primary/10 p-4 rounded-full text-primary">
            <Calculator size={28} />
        </div>
        <div>
            <h3 className="text-2xl font-bold text-gray-900">Cost Estimator</h3>
            <p className="text-sm text-gray-500 font-medium">House Construction in Nepal</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-3">Total Area (Sq. Ft)</label>
          <input 
            type="number" 
            value={area} 
            onChange={(e) => setArea(Number(e.target.value))}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-secondary focus:ring-0 outline-none text-gray-900 text-lg font-bold bg-gray-50 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-3">Number of Floors</label>
          <input 
            type="number" 
            value={floors} 
            onChange={(e) => setFloors(Number(e.target.value))}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-secondary focus:ring-0 outline-none text-gray-900 text-lg font-bold bg-gray-50 transition-colors"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-3">Finishing Quality</label>
          <div className="grid grid-cols-3 gap-4">
            {(['Economy', 'Standard', 'Premium'] as const).map((q) => (
              <button
                key={q}
                onClick={() => setQuality(q)}
                className={`py-4 rounded-xl text-center font-bold border-2 transition-all ${
                  quality === q 
                    ? 'bg-primary text-white border-primary shadow-lg transform scale-105' 
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                {q}
              </button>
            ))}
          </div>
          <p className="text-sm font-medium text-gray-600 mt-3 text-center bg-gray-100 py-2 rounded-lg">
            Current Rate: <span className="text-primary font-bold">NPR {rates[quality].toLocaleString()}</span> / Sq. Ft.
          </p>
        </div>
      </div>

      <div className="mt-auto bg-gradient-to-br from-primary to-slate-800 p-8 rounded-2xl text-center text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
            <p className="text-gray-300 mb-2 font-medium uppercase tracking-widest text-xs">Estimated Project Cost</p>
            <div className="text-4xl md:text-5xl font-bold text-secondary font-mono mb-2 tracking-tight">
            NPR {totalCost.toLocaleString()}
            </div>
            <p className="text-[10px] text-gray-400 max-w-lg mx-auto leading-relaxed mt-4">
            * Note: This is a rough estimate. Actual cost depends on site location, material costs at the time, and specific design requirements. Prices may change according to the location. Contact us for a precise quote.
            </p>
        </div>
      </div>
    </div>
  );
};

export default CostEstimator;