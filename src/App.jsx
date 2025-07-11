import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './Pages/Homepage.jsx'
import ProductPage from './Pages/ProductPage.jsx'


function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage />}  />
      <Route path='/productDetails' element={<ProductPage />} />
    </Routes>
    
    
    
    </BrowserRouter>

    </>
  )
}

export default App
