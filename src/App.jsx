import {BrowserRouter, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import HomePage from './Pages/Homepage.jsx'
import ProductPage from './Pages/ProductPage.jsx'
import GuestLayout from './layout/GuestLayout.jsx'


function App() {


  return (
    <>
    <BrowserRouter>
    <GuestLayout />
    <Routes>
      <Route path='/' element={<HomePage />}  />
      <Route path='/productDetails/:id' element={<ProductPage />} />
    </Routes>
    
    
    
    </BrowserRouter>

    </>
  )
}

export default App
