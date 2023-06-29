import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from "react-error-boundary";

const root = ReactDOM.createRoot(document.getElementById('root'));
const clearLocalStorage = () => {
  localStorage.clear();
};
function fallbackRender({ error }) {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold mb-6">Something went wrong</h1>
          <div>
            <code>{error.message}</code>
          </div>
          <button onClick={() => window.location.reload()} className="btn btn-error mt-6">Try reloading</button>
        </div>
      </div>
    </div>
  );
}
root.render(
  <React.StrictMode>
    <ErrorBoundary fallbackRender={fallbackRender} onError={clearLocalStorage}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
