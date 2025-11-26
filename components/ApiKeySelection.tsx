import React, { useEffect, useState } from 'react';

const ApiKeySelection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Inject the provided API Key directly into process.env
    const key = "AIzaSyCTvUAlhsHI_r54x6j3Ku7cEP01I3CgJlc";
    
    // Ensure process.env exists (shim for browser environments)
    if (typeof process === 'undefined') {
      (window as any).process = { env: {} };
    }
    if (!process.env) {
      (process as any).env = {};
    }
    
    process.env.API_KEY = key;
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
           <p className="text-gray-600 font-medium">Initializing Janak AI Services...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ApiKeySelection;