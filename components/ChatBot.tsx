import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles, BrainCircuit } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Namaste! I am the Chief AI Engineer for Janak Builders. You can ask me ANYTHING related to Civil Engineering, construction, or design!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Expanded System Prompt for Comprehensive Engineering Knowledge
      const systemInstruction = `
        You are 'Janak AI', an advanced Senior Civil Engineer and Technical Consultant for 'Janak Builders Pvt. Ltd.' in Nepal.
        
        YOUR CAPABILITIES:
        You possess deep, expert-level knowledge in ALL fields of Civil Engineering, including but not limited to:
        1. **Structural Engineering**: Analysis, design (RCC/Steel), load calculations, seismic resistance (IS 1893, NBC 105).
        2. **Construction Management**: Estimation, BOQ, site safety, project scheduling (CPM/PERT).
        3. **Concrete Technology**: Mix designs, admixtures, curing, testing (slump, cube test).
        4. **Geotechnical Engineering**: Soil mechanics, bearing capacity, foundation design.
        5. **Hydraulics & Fluid Mechanics**: Pipe flow, open channel, pumps, hydrology.
        6. **Surveying**: Leveling, theodolite, contouring, GPS.
        7. **Transportation**: Highway alignment, pavement design.
        
        GUIDELINES:
        - Provide accurate, technical, and practical answers.
        - Use Nepali context (IS Codes, Nepal Building Code) where relevant, but answer general engineering questions universally.
        - You can solve mathematical engineering problems if asked.
        - Be professional, polite, and authoritative yet accessible.
        - If asked about prices, provide rough Nepal market estimates but mention they vary by location.
        - If the user asks a non-engineering question, politely steer them back to engineering/construction topics.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
            ...messages.map(m => ({
                role: m.role,
                parts: [{ text: m.text }]
            })),
            { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
            systemInstruction: systemInstruction,
        }
      });

      const botResponse = response.text || "I'm calculating the load... please try again (Network Error).";
      
      setMessages(prev => [...prev, { role: 'model', text: botResponse }]);

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Connection error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="pointer-events-auto bg-white dark:bg-gray-900 w-[350px] md:w-[400px] h-[550px] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col mb-4 overflow-hidden animate-in fade-in slide-in-from-bottom-10 origin-bottom-right">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-blue-900 p-4 flex justify-between items-center text-white shadow-md">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm border border-white/10 relative">
                <Bot size={24} className="text-secondary" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-primary rounded-full"></span>
              </div>
              <div>
                <h3 className="font-bold text-base tracking-wide">Janak AI Engineer</h3>
                <p className="text-[10px] text-blue-200 uppercase font-semibold tracking-wider">Civil Engineering Expert</p>
              </div>
            </div>
            <button 
                onClick={() => setIsOpen(false)} 
                className="text-white/70 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-950 scroll-smooth">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                    msg.role === 'user' ? 'bg-secondary text-primary' : 'bg-gradient-to-br from-primary to-blue-700 text-white'
                }`}>
                  {msg.role === 'user' ? <User size={16} /> : <BrainCircuit size={16} />}
                </div>
                <div className={`max-w-[80%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                    ? 'bg-secondary text-primary rounded-tr-none font-semibold' 
                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-200 dark:border-gray-700'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex gap-3">
                 <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
                    <BrainCircuit size={16} />
                 </div>
                 <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl rounded-tl-none border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-secondary" />
                    <span className="text-xs text-gray-500 font-medium">Analyzing Engineering Data...</span>
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-[0_-5px_10px_rgba(0,0,0,0.02)]">
            <div className="relative flex items-center group">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask technical question..."
                className="w-full pl-5 pr-12 py-3.5 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-secondary/50 text-sm font-medium transition-all shadow-inner"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 p-2 bg-gradient-to-r from-primary to-blue-800 text-white rounded-full hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all duration-300"
              >
                <Send size={18} />
              </button>
            </div>
          </div>

        </div>
      )}

      {/* Cool Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`pointer-events-auto relative p-0 rounded-full shadow-2xl transition-all duration-500 group ${isOpen ? 'rotate-90 scale-90' : 'hover:scale-110'}`}
        aria-label="Toggle Chat"
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-secondary rounded-full blur-lg opacity-40 group-hover:opacity-70 animate-pulse transition-opacity"></div>
        
        {/* Main Button Body */}
        <div className="relative bg-gradient-to-br from-secondary to-yellow-600 text-primary w-16 h-16 flex items-center justify-center rounded-full border-[3px] border-white dark:border-gray-800 shadow-xl overflow-hidden">
             
             {/* Icon Logic */}
             {isOpen ? (
                 <X size={32} className="font-bold relative z-10" />
             ) : (
                 <>
                    <Bot size={32} className="relative z-10 font-bold" />
                    <Sparkles size={16} className="absolute top-3 right-3 text-white z-10 animate-bounce" />
                 </>
             )}
        </div>

        {/* Floating Label (Only when closed) */}
        {!isOpen && (
            <div className="absolute bottom-full right-0 mb-3 w-48 pointer-events-none">
                <div className="bg-primary text-white text-xs font-bold py-2 px-3 rounded-lg shadow-xl text-center relative animate-bounce">
                    Need Engineering Help?
                    <div className="absolute top-full right-6 -mt-1 border-4 border-transparent border-t-primary"></div>
                </div>
            </div>
        )}
      </button>
    </div>
  );
};

export default ChatBot;