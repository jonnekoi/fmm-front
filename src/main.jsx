import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
      <div className="circle-background-second">
        <div className="circle-background">
          <App/>
        </div>
      </div>
    </StrictMode>
,
)
