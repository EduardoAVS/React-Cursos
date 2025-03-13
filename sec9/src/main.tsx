import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { CounterContextProvider } from './context/CounterContext.tsx'
import { TitleColorProvider } from './context/TitleColorContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CounterContextProvider>
      <TitleColorProvider>
        <App />
      </TitleColorProvider>
    </CounterContextProvider>
  </StrictMode>,
)
