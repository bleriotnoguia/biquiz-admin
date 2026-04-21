import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './i18n'

const queryClient = new QueryClient()

const container = document.getElementById('root');
if (!container) throw new Error('Root element #root not found in index.html');

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

serviceWorkerRegistration.register();
