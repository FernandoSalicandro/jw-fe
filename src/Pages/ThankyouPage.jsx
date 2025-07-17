import { useContext, useEffect } from 'react';
import { ProductContext } from '../Context/ProductContext.jsx';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../Context/CartContext.jsx';

export default function ThankYouPage() {
  const { requestProducts } = useContext(ProductContext);
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const { snapShotCart, customer } = location.state || {};

  useEffect(() => {
    clearCart();
    localStorage.removeItem("cart");
    localStorage.removeItem("orderData");
    requestProducts();
  }, []);


console.log(snapShotCart)
console.log(customer)

  return (
    <div className="container py-5 text-center" style={{ marginTop: "120px" }}>
      <h1>Grazie per il tuo ordine!</h1>
      <p>Riceverai una conferma via email a breve.</p>
      <ul>
        {snapShotCart.map((item) => (
          <li>
            {item.name}
          </li>
        ))}

        nome: {customer.firstName}
        </ul>
    </div>


 

  );
}
