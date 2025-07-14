import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import HomePage from './Pages/Homepage.jsx'
import ProductPage from './Pages/ProductPage.jsx'
import RingPage from './Pages/RingPage.jsx'
import GuestLayout from './layout/GuestLayout.jsx'


function App() {


  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route element={<GuestLayout />} >
            <Route path='/' element={<HomePage />} />
            <Route path='/productDetails/:slug' element={<ProductPage />} />
            <Route path='/rings' element={<RingPage />} />
           
          </Route>
        </Routes>
        
      </BrowserRouter>

    </>
  )
}

export default App
