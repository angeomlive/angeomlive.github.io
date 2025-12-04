import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'katex/dist/katex.min.css'
import './styles/custom.css'

const root = createRoot(document.getElementById('root')!)
root.render(<App />)