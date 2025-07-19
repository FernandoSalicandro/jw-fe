import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import HomePage from "./Pages/Homepage.jsx";
import ProductPage from "./Pages/ProductPage.jsx";
import RingPage from "./pages/RingPage.jsx";
import SearchPage from "./Pages/SearchPage.jsx";
import GuestLayout from "./layout/GuestLayout.jsx";
import Loader from "./components/Loader.jsx";
import AutoScrollTop from "./components/autoScrollTop.jsx";
import { useEffect, useState } from "react";
import EarringsPage from "./pages/EarringsPage.jsx";
import BraceletsPage from "./pages/BraceletsPage.jsx";
import NecklacesPage from "./pages/NecklacesPage.jsx";
import CheckoutPage from './Pages/CheckoutPage.jsx';
import ThankYouPage from "./Pages/ThankyouPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import AboutUs from './Pages/AboutUs.jsx'
import WishListPage from "./Pages/WishListPage.jsx";
import PaymentPage from './Pages/PaymentPage.jsx';
import AiAssistantProva from './Pages/AiAssistantProva.jsx';


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
            <Route path="/search" element={<SearchPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/thankyou" element={<ThankYouPage />} />
            <Route path='/about-us' element={<AboutUs />}/>
            <Route path='/wishlist' element={<WishListPage />}/>
            <Route path='/cart' element={<CartPage />}/>
            <Route path='/payment' element={<PaymentPage />} />
            <Route path='/assistant' element={<AiAssistantProva />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
