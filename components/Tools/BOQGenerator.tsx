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
    <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-secondary h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary/10 p-3 rounded-full text-primary">
            <ClipboardList size={24} />
        </div>
        <div>
            <h3 className="text-2xl font-bold text-primary">AI BOQ Generator</h3>
            <p className="text-xs text-gray-500">Gemini 2.5 Flash</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Project Type</label>
            <select 
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none bg-white"
            >
                <option>Residential House</option>
                <option>Commercial Building</option>
                <option>Boundary Wall</option>
                <option>Garage/Outhouse</option>
            </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Area (Sq. Ft)</label>
                <input 
                    type="number" 
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none"
                />
            </div>
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Floors</label>
                <input 
                    type="number" 
                    value={floors}
                    onChange={(e) => setFloors(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none"
                />
            </div>
        </div>
        
        <button 
            onClick={generateBOQ}
            disabled={loading}
            className={`w-full bg-secondary text-primary font-bold py-3 rounded hover:bg-yellow-400 transition flex items-center justify-center gap-2 ${loading ? 'opacity-70' : ''}`}
        >
            {loading ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} />}
            {loading ? 'Generating Estimate...' : 'Generate BOQ'}
        </button>
      </div>

      {boqResult && (
        <div className="flex-grow bg-gray-50 p-4 rounded border border-gray-200 overflow-auto max-h-96 text-sm">
            <div className="prose prose-sm max-w-none">
                {/* Simple markdown rendering by replacing newlines. For a real app, use a markdown parser. */}
                <pre className="whitespace-pre-wrap font-sans text-gray-700">{boqResult}</pre>
            </div>
        </div>
      )}
    </div>
  );
};

export default BOQGenerator;