import { useLocation, useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '../Context/CartContext';
import { useState, useEffect, useRef } from 'react';
import StripeForm from '../components/StripeForm';
import axios from 'axios';
const stripePromise = loadStripe('pk_test_51RlUTcQKQGhBKiFRXR1HO0pQhxcVpUcdJ3yrJ1YF0AlFfVfVvqKPJdFEFQTprciFSyyijkKqf6dla1M1sFV9XSfn00E4eEJ8Nn');
const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { clearCart } = useCart();
    const [snapShotCart, setSnapShotCart] = useState([]);
    const [clientSecret, setClientSecret] = useState(null);
    const [redeemCode, setRedeemCode] = useState('');
    const orderCreatedRef = useRef(false);
    const { cart, formData, selectedCountry, selectedRegion } = location.state || {};


    // :segno_spunta_bianco: Ordine nel database (solo se dati cambiano)
    useEffect(() => {
        if (!cart || !formData || cart.length === 0) {
            navigate('/checkout');
            return;
        }
        if (orderCreatedRef.current) return;
        orderCreatedRef.current = true;
        const amount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        axios
            .post('http://localhost:3000/products/orders', {
                formData,
                cart,
                selectedCountry,
                selectedRegion,
                subtotal_price: amount,
                discount_value: 0,
                total_price: amount,
                payment_method: 'stripe',
            })
            .then((resp) => {
                localStorage.setItem(
                    'orderData',
                    JSON.stringify({
                        orderId: resp.data.orderId,
                        paymentIntentId: resp.data.paymentIntentId,
                        formData,
                        cart,
                    })
                );
            })
            .catch((err) => {
                console.error('Errore creazione ordine:', err);
            });
    }, [cart, formData, selectedCountry, selectedRegion, navigate]);
    // :segno_spunta_bianco: PaymentIntent Stripe (una sola volta, non reinvoca su cambio quantità)
    useEffect(() => {
        if (!cart || !formData || cart.length === 0) return;
        const snapshot = cart.map((obj) => ({ ...obj }));
        setSnapShotCart(snapshot);
        const amount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        axios
            .post('http://localhost:3000/products/create-payment-intent', {
                amount,
                customerEmail: formData.email,
                items: cart,
            })
            .then((resp) => {
                setClientSecret(resp.data.clientSecret);
            })
            .catch((err) => {
                console.log('Errore durante la creazione del paymentIntent:', err);
            });
    }, []);
    return (
        <div className="container py-5" style={{ marginTop: "100px" }}>
            <h1 className="mb-4">Confirm and pay</h1>
            <div className="row">
                {/* --- COLONNA SINISTRA --- */}
                <div className="col-md-6">
                    <h4>Order Summary</h4>
                    <ul className="list-group mb-4">
                        {cart && cart.map((item) => (
                            <li key={item.id} className="list-group-item border rounded border-warning">
                                <div className="d-flex align-items-center">
                                    <img
                                        src={item.image_url}
                                        alt={item.name}
                                        style={{
                                            width: "60px",
                                            height: "60px",
                                            marginRight: "10px",
                                            objectFit: "cover",
                                            borderRadius: "6px"
                                        }}
                                    />
                                    <div className="flex-grow-1">
                                        <strong>{item.name}</strong><br />
                                        <small>Quantity: {item.quantity}</small>
                                    </div>
                                    <div>{(item.price * item.quantity).toFixed(2)} €</div>
                                </div>
                            </li>
                        ))}
                        <li className="list-group-item d-flex justify-content-between fw-bold border-0">
                            <span>Total</span>
                            <span>{cart && cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)} €</span>
                        </li>
                    </ul>
                    <div className='mt-4'>
                        <h3>Do you have a Coupon? Please reedem your discount!</h3>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label"></label>
                            <input 
                            value={redeemCode}
                            onChange={(e) => setRedeemCode(e.target.value)}
                            type="email" className="form-control" id="" placeholder="Coupon Code" />
                            <button 
                            className='btn border-black show-details mt-2'>Redeem</button>
                        </div>
                    </div>
                    <h4 className='mb-4'>Shipping Details</h4>
                    <div className='mb-5'>
                        <p className='fs-5'>Your order will be dispatched to the address provided. We ivite you to verify that all shipping details are correct before proceeding.</p>
                        <p className='text-secondary text-end fs-6'>– Kindly: JW-LUX Team</p>
                    </div>
                    <div className="card">
                        <div className="card-header mb-3">
                            Mr/Mrs <strong>{formData.firstName} {formData.lastName}</strong>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><strong>Address:</strong> {formData.address}</li>
                            <li className="list-group-item"><strong>Apartment:</strong> {formData.apartment !== '' ? formData.apartment : 'Non Specified'}</li>
                            <li className="list-group-item"><strong>City:</strong> {formData.city}</li>
                            <li className="list-group-item"><strong>Postal Code:</strong> {formData.postalCode}</li>
                            <li className="list-group-item"><strong>Phone Number:</strong> {formData.phone}</li>
                            <li className="list-group-item"><strong>E-mail:</strong> {formData.email}</li>
                        </ul>
                    </div>
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