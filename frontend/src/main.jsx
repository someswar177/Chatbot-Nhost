import React from 'react'
import { createRoot } from 'react-dom/client'
import { NhostProvider } from '@nhost/react'
import { nhost } from './lib/nhost.js'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NhostProvider nhost={nhost}>
      <App />
    </NhostProvider>
  </React.StrictMode>,
)