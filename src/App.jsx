import {BrowserRouter, Routes, Route} from 'react-router-dom';
function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}  />
      <Route path='/productDetails' element={<ProductPage />} />
    </Routes>
    
    
    
    </BrowserRouter>

    </>
  )
}

export default App
