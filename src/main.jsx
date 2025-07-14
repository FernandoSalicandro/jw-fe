import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ProductProvider } from './Context/ProductContext.jsx'
import { SearchProvider } from './Context/SearchContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SearchProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
    </SearchProvider>
  </StrictMode>,
)
