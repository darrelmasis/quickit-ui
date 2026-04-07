import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/index.css'
import { QuickitThemeProvider } from '@/lib'
import DocsApp from '@/docs/DocsApp'
import { STORAGE_KEY } from '@/docs/config'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QuickitThemeProvider
      defaultTheme="system"
      storageKey={STORAGE_KEY}
    >
      <DocsApp />
    </QuickitThemeProvider>
  </StrictMode>,
)
