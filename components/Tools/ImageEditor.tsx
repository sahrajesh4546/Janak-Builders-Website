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
            // Remove data:image/jpeg;base64, prefix
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

      // Iterate through parts to find the image part. 
      // Sometimes model returns text thoughts before the image.
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
    <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-secondary h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary/10 p-3 rounded-full text-primary">
            <ImagePlus size={24} />
        </div>
        <div>
            <h3 className="text-2xl font-bold text-primary">AI Image Editor</h3>
            <p className="text-xs text-gray-500">Gemini 2.5 Flash Image</p>
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
                    <p className="text-sm font-semibold">Upload photo to edit</p>
                    <p className="text-xs mt-1">JPG, PNG supported</p>
                </div>
            )}
        </div>

        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">What should we change?</label>
            <div className="flex gap-2">
                <input 
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g. 'Add a retro filter', 'Remove background'"
                    className="flex-grow p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none text-gray-900"
                />
                <button 
                    onClick={handleGenerate}
                    disabled={loading || !selectedFile || !prompt}
                    className={`bg-secondary text-primary font-bold px-6 rounded hover:bg-yellow-400 transition flex items-center gap-2 ${loading || !selectedFile || !prompt ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {loading ? <Loader2 size={20} className="animate-spin" /> : <Wand2 size={20} />}
                    {loading ? '' : 'Edit'}
                </button>
            </div>
        </div>

        {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded border border-red-100">
                {error}
            </div>
        )}

        {generatedImage && (
            <div className="mt-6 space-y-3 animate-in fade-in slide-in-from-bottom-4">
                <p className="text-sm font-bold text-gray-700">Result:</p>
                <div className="border rounded-lg overflow-hidden bg-gray-50">
                    <img src={generatedImage} alt="Generated" className="w-full h-auto" />
                </div>
                <a 
                    href={generatedImage} 
                    download="janak-ai-edit.png"
                    className="block w-full bg-primary text-white text-center py-2 rounded font-bold hover:bg-blue-900 transition flex items-center justify-center gap-2"
                >
                    <Download size={16} /> Download Image
                </a>
            </div>
        )}
      </div>
    </div>
  );
};

export default ImageEditor;