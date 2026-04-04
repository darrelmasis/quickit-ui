import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/index.css'
import DocsApp from '@/docs/DocsApp'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DocsApp />
  </StrictMode>,
)
