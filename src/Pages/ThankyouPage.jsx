import { useContext, useEffect } from 'react';
import { ProductContext } from '../Context/ProductContext.jsx';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../Context/CartContext.jsx';
import Quotes from '../components/Quotes.jsx';

export default function ThankYouPage() {
  const { requestProducts } = useContext(ProductContext);
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const { snapShotCart, customer } = location.state || {};

  const handleClick = () => {
    navigate("/")
  }

  useEffect(() => {
    clearCart();
    localStorage.removeItem("cart");
    localStorage.removeItem("orderData");
    requestProducts();
  }, []);


  console.log(snapShotCart)
  console.log(customer)

  return (
    <div className="container py-5" style={{ marginTop: "120px" }}>
      <div className=' text-center'>
        <h1> Dear, {customer.firstName} {customer.lastName} thank you for your order!</h1>
        <p className='text-secondary fs-6 text-end'>-Team JW-LUX</p>
      </div>
      <p>
        A confirmation email will be sent soon to <strong>{customer.email}</strong>. Please check your inbox.
      </p>

      <div>
        <h4 className='mt-4'>Will be packaged and dispatched with care at</h4>
        <ul className="list-group list-group-flush W-50 mx-auto">
          <li className="list-group-item"><strong>Address:</strong> {customer.address}</li>
          <li className="list-group-item"><strong>Apartment:</strong> {customer.apartment !== "" ? customer.apartment : "Non Specified"}</li>
          <li className="list-group-item"><strong>City:</strong> {customer.city}</li>
          <li className="list-group-item"><strong>Postal Code:</strong> {customer.postalCode}</li>
        </ul>
        <p className='h5 mt-3'>In case we need to reach you, we will use the phone number provided: <strong>{customer.phone}</strong></p>
      </div>
      <div className='mt-5'>
       <Quotes text={`We deeply appreciate your choice to shop with JW-LUX. Our team sends its most sincere regards.`} author={"JW LUX"} />
       <button className='btn show-details border-black d-block mx-auto' onClick={handleClick}>Keep Exploring</button>
      </div>
    </div>

  );
}


