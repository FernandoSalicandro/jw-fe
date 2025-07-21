import { useLocation, useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '../Context/CartContext';
import { useState, useEffect } from 'react';
import StripeForm from '../components/StripeForm';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51RlUTcQKQGhBKiFRXR1HO0pQhxcVpUcdJ3yrJ1YF0AlFfVfVvqKPJdFEFQTprciFSyyijkKqf6dla1M1sFV9XSfn00E4eEJ8Nn');

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const [clientSecret, setClientSecret] = useState(null);
  const [paymentIntentId, setPaymentIntentId] = useState(null);
  const [originalPaymentIntentId, setOriginalPaymentIntentId] = useState(null);
  const [redeemCode, setRedeemCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountMessage, setDiscountMessage] = useState('');
  const [currentDiscount, setCurrentDiscount] = useState(null);

  const { cart, formData, selectedCountry, selectedRegion } = location.state || {};

  useEffect(() => {
    if (!cart || !formData || cart.length === 0) return;

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    axios.post('http://localhost:3000/products/create-payment-intent', {
      amount: subtotal,
      customerEmail: formData.email,
      items: cart
    }).then(resp => {
      setClientSecret(resp.data.clientSecret);
      setPaymentIntentId(resp.data.paymentIntentId);
      setOriginalPaymentIntentId(resp.data.paymentIntentId);
    }).catch(err => {
      console.error('Errore creazione payment intent:', err);
    });
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("sconto");
    if (!stored || !cart || cart.length === 0) return;

    const parsed = JSON.parse(stored);
    axios.post('http://localhost:3000/products/verify-discount', {
      code: parsed.code,
      currentDate: new Date().toISOString().slice(0, 19).replace('T', ' ')
    }).then(response => {
      if (response.data.valid) {
        const discount = response.data.discount;
        const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const discountValue = (subtotal * discount.value) / 100;

        setDiscountAmount(discountValue);
        setDiscountApplied(true);
        setDiscountMessage(`Code ${discount.code} already Redeemed!`);
        setCurrentDiscount({ code: discount.code, value: discount.value });

        return axios.post('http://localhost:3000/products/create-payment-intent', {
          amount: subtotal - discountValue,
          customerEmail: formData.email,
          items: cart,
          originalPaymentIntentId
        });
      } else {
        localStorage.removeItem("sconto");
      }
    }).then(resp => {
      if (resp) {
        setClientSecret(resp.data.clientSecret);
        setPaymentIntentId(resp.data.paymentIntentId);
      }
    }).catch(err => {
      console.error("Errore sconto:", err);
    });
  }, [cart]);

  const handleRedeemCode = () => {
    axios.post('http://localhost:3000/products/verify-discount', {
      code: redeemCode,
      currentDate: new Date().toISOString().slice(0, 19).replace('T', ' ')
    }).then(response => {
      if (response.data.valid) {
        const discount = response.data.discount;
        const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const discountValue = (subtotal * discount.value) / 100;

        setDiscountApplied(true);
        setDiscountAmount(discountValue);
        setDiscountMessage(`Codice sconto ${discount.code} applicato con successo!`);
        setCurrentDiscount(discount);

        localStorage.setItem("sconto", JSON.stringify({
          code: discount.code,
          value: discount.value,
          amount: discountValue
        }));

        return axios.post('http://localhost:3000/products/create-payment-intent', {
          amount: subtotal - discountValue,
          customerEmail: formData.email,
          items: cart,
          originalPaymentIntentId
        });
      } else {
        throw new Error("Codice non valido");
      }
    }).then(resp => {
      if (resp) {
        setClientSecret(resp.data.clientSecret);
        setPaymentIntentId(resp.data.paymentIntentId);
      }
    }).catch(err => {
      console.error("Errore redeem:", err);
      setDiscountMessage('Codice sconto non valido o scaduto');
      setDiscountApplied(false);
      setDiscountAmount(0);
      setCurrentDiscount(null);
      localStorage.removeItem("sconto");
    });
  };

  return (
    <div className="page-main container py-5">
      <h1 className="mb-4">Confirm and pay</h1>
      <div className="row">
        {/* COLONNA SINISTRA */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header mb-3">
              Mr/Mrs <strong>{formData.firstName} {formData.lastName}</strong>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><strong>Address:</strong> {formData.address}</li>
              <li className="list-group-item"><strong>Apartment:</strong> {formData.apartment || "Non Specified"}</li>
              <li className="list-group-item"><strong>City:</strong> {formData.city}</li>
              <li className="list-group-item"><strong>Postal Code:</strong> {formData.postalCode}</li>
              <li className="list-group-item"><strong>Phone Number:</strong> {formData.phone}</li>
              <li className="list-group-item"><strong>E-mail:</strong> {formData.email}</li>
            </ul>
          </div>

          <div className='mt-4'>
            <h3>Do you have a Coupon? Please redeem your discount!</h3>
            <div className="mb-3">
              <input
                value={redeemCode}
                onChange={(e) => setRedeemCode(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Coupon Code"
              />
              <button
                onClick={handleRedeemCode}
                className='btn border-black show-details mt-2'
                disabled={discountApplied}
              >
                Redeem
              </button>
              {discountMessage && (
                <div className={`alert ${discountApplied ? 'alert-success' : 'alert-danger'} mt-2`}>
                  {discountMessage}
                </div>
              )}
            </div>
          </div>

          {/* Riepilogo Ordine */}
          <h4 className="mt-5">Order Summary</h4>
          <ul className="list-group">
            {cart && cart.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between">
                <div>{item.name} × {item.quantity}</div>
                <div>
                  {discountApplied ? (
                    <>
                      <s className="text-muted">{(item.price * item.quantity).toFixed(2)} €</s>
                      <span className="ms-2 text-success">
                        {(item.price * item.quantity * (1 - (discountAmount / cart.reduce((a, i) => a + i.price * i.quantity, 0)))).toFixed(2)} €
                      </span>
                    </>
                  ) : `${(item.price * item.quantity).toFixed(2)} €`}
                </div>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between">
              <strong>Total:</strong>
              <strong>{(cart.reduce((acc, i) => acc + i.price * i.quantity, 0) - discountAmount).toFixed(2)} €</strong>
            </li>
          </ul>
        </div>

        {/* COLONNA DESTRA */}
        <div className="col-md-6">
          {clientSecret ? (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <StripeForm
                clientSecret={clientSecret}
                navigate={navigate}
                clearCart={clearCart}
                cart={cart}
                formData={formData}
                paymentIntentId={paymentIntentId}
                originalPaymentIntentId={originalPaymentIntentId}
                selectedCountry={selectedCountry}
                selectedRegion={selectedRegion}
              />
            </Elements>
          ) : (
            <p>Caricamento modulo di pagamento...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
