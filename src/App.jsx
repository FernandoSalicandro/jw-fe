import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import HomePage from "./Pages/Homepage.jsx";
import ProductPage from "./Pages/ProductPage.jsx";
import RingPage from "./Pages/RingPage.jsx";
import SearchPage from './Pages/SearchPage.jsx'
import GuestLayout from "./layout/GuestLayout.jsx";
import Loader from "./components/Loader.jsx";
import AutoScrollTop from "./components/autoScrollTop.jsx";
import { useEffect, useState } from "react";
import EarringsPage from "./pages/EarringsPage.jsx";
import BraceletsPage from "./pages/BraceletsPage.jsx";
import NecklacesPage from "./pages/NecklacesPage.jsx";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simula caricamento iniziale (es: fetch config, immagini, ecc.)
    const simulateInitLoad = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsLoading(false);
    };
    simulateInitLoad();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <>
      <BrowserRouter>
        <AutoScrollTop />
        <Routes>
          <Route element={<GuestLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/productDetails/:slug" element={<ProductPage />} />
            <Route path="/rings" element={<RingPage />} />
            <Route path="/earrings" element={<EarringsPage />} />
            <Route path="/bracelets" element={<BraceletsPage />} />
            <Route path="/necklaces" element={<NecklacesPage />} />
            <Route path='/search' element={<SearchPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
