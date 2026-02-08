import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

const container = document.getElementById('root');

if (!container) {
  // Fail fast and clearly in development if the root container is missing.
  throw new Error('Root container missing in index.html');
}

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

