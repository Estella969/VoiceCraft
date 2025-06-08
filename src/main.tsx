import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Initialize stagewise toolbar in development mode only
// Temporarily disabled to check if it affects styling
// if (process.env.NODE_ENV === 'development') {
//   import('@stagewise/toolbar-react').then(({ StagewiseToolbar }) => {
//     const stagewiseConfig = {
//       plugins: []
//     };

//     // Create a separate root for the toolbar to avoid interfering with the main app
//     const toolbarContainer = document.createElement('div');
//     toolbarContainer.id = 'stagewise-toolbar';
//     document.body.appendChild(toolbarContainer);

//     const toolbarRoot = createRoot(toolbarContainer);
//     toolbarRoot.render(<StagewiseToolbar config={stagewiseConfig} />);
//   }).catch(() => {
//     // Silently fail if stagewise is not available
//   });
// }
