import React, { useState } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";
import { Wand2, Upload, Loader2, Download, ImagePlus } from 'lucide-react';

const ImageEditor: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
      setGeneratedImage(null);
      setError(null);
    }
  };

  const handleGenerate = async () => {
    if (!selectedFile || !prompt) return;
    setLoading(true);
    setError(null);
    setGeneratedImage(null);

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

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: selectedFile.type,
              },
            },
            {
              text: prompt,
            },
          ],
        },
        config: {
          responseModalities: [Modality.IMAGE],
        },
      });

      let generatedImageUrl = null;
      const parts = response.candidates?.[0]?.content?.parts;
      if (parts) {
        for (const part of parts) {
          if (part.inlineData && part.inlineData.data) {
            generatedImageUrl = `data:image/png;base64,${part.inlineData.data}`;
            break;
          }
        }
      }

      if (generatedImageUrl) {
        setGeneratedImage(generatedImageUrl);
      } else {
        throw new Error("No image generated in the response. Please try a different prompt.");
      }

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to generate image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border-t-8 border-secondary h-full flex flex-col">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-primary/10 p-4 rounded-full text-primary">
            <ImagePlus size={28} />
        </div>
        <div>
            <h3 className="text-2xl font-bold text-gray-900">AI Image Editor</h3>
            <p className="text-sm text-gray-500 font-medium">Gemini 2.5 Flash Image</p>
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
                    <p className="text-lg font-bold text-gray-700">Upload photo to edit</p>
                    <p className="text-sm font-medium mt-1 text-gray-500">JPG, PNG supported</p>
                </div>
            )}
        </div>

        <div>
            <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-3">Edit Prompt</label>
            <div className="flex gap-3">
                <input 
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g. 'Add a retro filter', 'Remove background'"
                    className="flex-grow p-4 border-2 border-gray-300 rounded-xl focus:border-secondary focus:ring-0 outline-none text-gray-900 font-medium bg-white"
                />
                <button 
                    onClick={handleGenerate}
                    disabled={loading || !selectedFile || !prompt}
                    className={`bg-secondary text-primary font-bold px-8 rounded-xl hover:bg-yellow-400 transition flex items-center gap-2 shadow-md whitespace-nowrap ${loading || !selectedFile || !prompt ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {loading ? <Loader2 size={24} className="animate-spin" /> : <Wand2 size={24} />}
                    {loading ? '' : 'Edit'}
                </button>
            </div>
        </div>

        {error && (
            <div className="bg-red-50 text-red-700 font-medium text-sm p-4 rounded-lg border border-red-200">
                {error}
            </div>
        )}

        {generatedImage && (
            <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-4">
                <p className="text-sm font-bold text-gray-800 uppercase tracking-wide">Generated Result:</p>
                <div className="border-2 rounded-xl overflow-hidden bg-white shadow-lg">
                    <img src={generatedImage} alt="Generated" className="w-full h-auto" />
                </div>
                <a 
                    href={generatedImage} 
                    download="janak-ai-edit.png"
                    className="block w-full bg-primary text-white text-center py-4 rounded-xl font-bold hover:bg-blue-900 transition flex items-center justify-center gap-3 shadow-lg"
                >
                    <Download size={20} /> Download Image
                </a>
            </div>
        )}
      </div>
    </div>
  );
};

export default ImageEditor;