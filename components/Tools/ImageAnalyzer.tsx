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
    <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-secondary h-full flex flex-col">
       <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary/10 p-3 rounded-full text-primary">
            <ScanEye size={24} />
        </div>
        <div>
            <h3 className="text-2xl font-bold text-primary">Site Analyzer</h3>
            <p className="text-xs text-gray-500">Gemini 3.0 Pro</p>
        </div>
      </div>

      <div className="space-y-6 flex-grow">
         <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition relative overflow-hidden min-h-[200px] flex flex-col justify-center">
            <input 
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            {previewUrl ? (
                <div className="relative h-48 w-full">
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-contain rounded" />
                    <div className="absolute bottom-0 right-0 bg-primary text-white text-xs px-2 py-1 rounded-tl z-20 pointer-events-none">Change</div>
                </div>
            ) : (
                <div className="flex flex-col items-center text-gray-500">
                    <Upload size={32} className="mb-2" />
                    <p className="text-sm font-semibold">Upload site photo</p>
                    <p className="text-xs mt-1">For material or structural analysis</p>
                </div>
            )}
        </div>

        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Questions about this image?</label>
            <input 
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., 'Assess the brickwork quality' or 'Identify safety hazards'"
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none text-gray-900"
            />
             <button 
                onClick={handleAnalyze}
                disabled={loading || !selectedFile}
                className={`mt-3 w-full bg-primary text-white font-bold py-3 rounded hover:bg-blue-900 transition flex items-center justify-center gap-2 ${loading || !selectedFile ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {loading ? <Loader2 size={20} className="animate-spin" /> : <Search size={20} />}
                {loading ? 'Analyzing...' : 'Analyze Image'}
            </button>
        </div>

        {result && (
            <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex items-center gap-2 mb-2 text-primary font-bold">
                    <FileText size={18} /> Analysis Report
                </div>
                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line max-h-60 overflow-y-auto">
                    {result}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default ImageAnalyzer;