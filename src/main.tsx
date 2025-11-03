import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App.tsx'
import { queryClient } from './lib/queryClient'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Analytics />
    </QueryClientProvider>
  </StrictMode>,
)
