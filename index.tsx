import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("FATAL: Could not find root element to mount to");
  throw new Error("Could not find root element to mount to");
}

console.log("Mounting React Application...");

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("React Application Mounted Successfully.");
} catch (error) {
  console.error("Error mounting React Application:", error);
  rootElement.innerHTML = '<div style="color:red; padding: 20px;">Failed to load application. Please check console for errors.</div>';
}