import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app';

const root = document.getElementById('root');

if (!root) {
  throw new TypeError('The root is not found in the index.html!');
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
