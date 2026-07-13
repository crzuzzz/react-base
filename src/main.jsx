import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Authentification from './View/Authentification.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authentification />
  </StrictMode>,
)
