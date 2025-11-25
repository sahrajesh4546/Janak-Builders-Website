import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { ClipboardList, Loader2, Sparkles } from 'lucide-react';

const BOQGenerator: React.FC = () => {
  const [projectType, setProjectType] = useState('Residential House');
  const [area, setArea] = useState(1000);
  const [floors, setFloors] = useState(1);
  const [loading, setLoading] = useState(false);
  const [boqResult, setBoqResult] = useState<string | null>(null);

  const generateBOQ = async () => {
    setLoading(true);
    setBoqResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        Generate a preliminary Bill of Quantities (BOQ) for a ${floors}-story ${projectType} with a total area of ${area} sq ft in Nepal.
        Include the following categories in a clean Markdown table format:
        1. Earthwork (Excavation, Backfilling)
        2. RCC Work (Concrete, Reinforcement)
        3. Brickwork & Masonry
        4. Plastering
        5. Flooring & Finishing
        6. Plumbing & Sanitary
        7. Electrical Work
        
        For each item, provide an estimated Quantity and Unit based on standard engineering thumb rules for Nepal. 
        Do NOT include prices, only quantities.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setBoqResult(response.text || "Could not generate BOQ.");

    } catch (error) {
      console.error(error);
      setBoqResult("Error generating BOQ. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border-t-8 border-secondary h-full flex flex-col">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-primary/10 p-4 rounded-full text-primary">
            <ClipboardList size={28} />
        </div>
        <div>
            <h3 className="text-2xl font-bold text-gray-900">AI BOQ Generator</h3>
            <p className="text-sm text-gray-500 font-medium">Gemini 2.5 Flash</p>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        <div>
            <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-3">Project Type</label>
            <select 
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-secondary focus:ring-0 outline-none bg-white text-gray-900 font-medium h-[60px]"
            >
                <option>Residential House</option>
                <option>Commercial Building</option>
                <option>Boundary Wall</option>
                <option>Garage/Outhouse</option>
            </select>
        </div>
        <div className="grid grid-cols-2 gap-6">
            <div>
                <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-3">Area (Sq. Ft)</label>
                <input 
                    type="number" 
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-secondary focus:ring-0 outline-none text-gray-900 font-bold bg-white"
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-3">Floors</label>
                <input 
                    type="number" 
                    value={floors}
                    onChange={(e) => setFloors(Number(e.target.value))}
                    className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-secondary focus:ring-0 outline-none text-gray-900 font-bold bg-white"
                />
            </div>
        </div>
        
        <button 
            onClick={generateBOQ}
            disabled={loading}
            className={`w-full bg-secondary text-primary font-bold text-lg py-4 rounded-xl hover:bg-yellow-400 transition flex items-center justify-center gap-3 shadow-lg ${loading ? 'opacity-70' : ''}`}
        >
            {loading ? <Loader2 size={24} className="animate-spin" /> : <Sparkles size={24} />}
            {loading ? 'Generating Estimate...' : 'Generate BOQ'}
        </button>
      </div>

      {boqResult && (
        <div className="flex-grow bg-slate-50 p-6 rounded-xl border border-gray-200 overflow-auto max-h-[500px] shadow-inner custom-scrollbar">
            <div className="prose prose-sm max-w-none text-gray-900">
                <pre className="whitespace-pre-wrap font-sans text-gray-900 leading-relaxed text-sm">{boqResult}</pre>
            </div>
        </div>
      )}
    </div>
  );
};

export default BOQGenerator;