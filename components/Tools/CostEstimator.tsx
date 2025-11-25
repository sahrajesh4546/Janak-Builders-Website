import React, { useState } from 'react';

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
    <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-secondary">
      <h3 className="text-2xl font-bold text-primary mb-6">House Construction Cost Estimator</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Total Area (Sq. Ft)</label>
          <input 
            type="number" 
            value={area} 
            onChange={(e) => setArea(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Floors</label>
          <input 
            type="number" 
            value={floors} 
            onChange={(e) => setFloors(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none text-gray-900"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Finishing Quality</label>
          <div className="grid grid-cols-3 gap-4">
            {(['Economy', 'Standard', 'Premium'] as const).map((q) => (
              <button
                key={q}
                onClick={() => setQuality(q)}
                className={`py-3 rounded text-center border ${
                  quality === q 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {q}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            * {quality} Rate: NPR {rates[quality].toLocaleString()} / Sq. Ft.
          </p>
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg text-center">
        <p className="text-gray-600 mb-2">Estimated Construction Cost (Approx.)</p>
        <div className="text-3xl font-bold text-primary font-serif">
          NPR {totalCost.toLocaleString()}
        </div>
        <p className="text-xs text-red-500 mt-2">
          * Note: This is a rough estimate. Actual cost depends on site location, material costs at the time, and specific design requirements. Contact us for a precise quote.
        </p>
      </div>
    </div>
  );
};

export default CostEstimator;