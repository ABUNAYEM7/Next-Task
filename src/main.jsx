import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './Routes/AppRoutes.jsx'
import AuthProvider from './AuthProvider/AuthProvider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <BrowserRouter>
    <AppRoutes/>
    </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
