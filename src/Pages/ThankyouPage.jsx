import { useContext, useEffect } from 'react';
import { ProductContext } from '../Context/ProductContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext.jsx'

export default function ThankYouPage() {
  const { requestProducts } = useContext(ProductContext)
  const navigate = useNavigate()
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    localStorage.removeItem("cart");
    localStorage.removeItem("orderData");
    requestProducts();
  }, [])


  return (

    <>
      <div className="container py-5 text-center" style={{ marginTop: "120px" }}>
        <h1>Grazie per il tuo ordine!</h1>
        <p>Riceverai una conferma via email a breve.</p>
      </div>

      <button className="btn btn-dark mt-4" onClick={() => navigate('/')}>
        Torna alla Home
      </button>
    </>

  );
}