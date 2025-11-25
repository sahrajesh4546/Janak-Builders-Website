import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Search, Upload, Loader2, FileText, ScanEye } from 'lucide-react';

const ImageAnalyzer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            const base64 = result.split(',')[1];
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(selectedFile);
      });

      const userPrompt = prompt || "Analyze this construction or architectural image. Identify key materials, structural elements, style, and any visible defects or safety observations.";

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: selectedFile.type,
              },
            },
            {
              text: userPrompt,
            },
          ],
        },
      });

      setResult(response.text || "No analysis could be generated.");

    } catch (err: any) {
      console.error(err);
      setResult("Failed to analyze image. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border-t-8 border-secondary h-full flex flex-col">
       <div className="flex items-center gap-4 mb-8">
        <div className="bg-primary/10 p-4 rounded-full text-primary">
            <ScanEye size={28} />
        </div>
        <div>
            <h3 className="text-2xl font-bold text-gray-900">Site Analyzer</h3>
            <p className="text-sm text-gray-500 font-medium">Gemini 3.0 Pro</p>
        </div>
      </div>

      <div className="space-y-6 flex-grow">
         <div className="border-4 border-dashed border-gray-200 rounded-xl p-8 text-center hover:bg-gray-50 hover:border-secondary transition relative overflow-hidden min-h-[250px] flex flex-col justify-center bg-gray-50">
            <input 
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            {previewUrl ? (
                <div className="relative h-64 w-full">
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-contain rounded-lg" />
                    <div className="absolute bottom-4 right-4 bg-primary text-white text-xs px-3 py-1 rounded-full shadow-lg z-20 pointer-events-none font-bold">Change Image</div>
                </div>
            ) : (
                <div className="flex flex-col items-center text-gray-400">
                    <Upload size={48} className="mb-4 text-secondary" />
                    <p className="text-lg font-bold text-gray-700">Upload site photo</p>
                    <p className="text-sm font-medium mt-1 text-gray-500">For material or structural analysis</p>
                </div>
            )}
        </div>

        <div>
            <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-3">Analysis Questions</label>
            <input 
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., 'Assess the brickwork quality' or 'Identify safety hazards'"
                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-secondary focus:ring-0 outline-none text-gray-900 font-medium bg-white"
            />
             <button 
                onClick={handleAnalyze}
                disabled={loading || !selectedFile}
                className={`mt-4 w-full bg-primary text-white font-bold text-lg py-4 rounded-xl hover:bg-blue-900 transition flex items-center justify-center gap-3 shadow-lg ${loading || !selectedFile ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {loading ? <Loader2 size={24} className="animate-spin" /> : <Search size={24} />}
                {loading ? 'Analyzing...' : 'Analyze Image'}
            </button>
        </div>

        {result && (
            <div className="mt-6 bg-slate-50 p-6 rounded-xl border border-gray-200 animate-in fade-in slide-in-from-bottom-4 shadow-inner">
                <div className="flex items-center gap-2 mb-4 text-primary font-bold border-b border-gray-200 pb-2">
                    <FileText size={20} /> Analysis Report
                </div>
                <div className="text-gray-900 leading-relaxed whitespace-pre-line max-h-80 overflow-y-auto text-sm font-medium">
                    {result}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default ImageAnalyzer;