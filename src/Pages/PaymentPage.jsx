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
    const [discountApplied, setDiscountApplied] = useState(false);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [discountMessage, setDiscountMessage] = useState('');
    const [paymentIntentId, setPaymentIntentId] = useState(null);
    const [originalPaymentIntentId, setOriginalPaymentIntentId] = useState(null);
    const orderCreatedRef = useRef(false);
    const { cart, formData, selectedCountry, selectedRegion } = location.state || {};

    // Primo PaymentIntent e inizializzazione
    useEffect(() => {
        if (!cart || !formData || cart.length === 0) return;
        
        const snapshot = cart.map((obj) => ({ ...obj }));
        setSnapShotCart(snapshot);
        const amount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        
        axios.post('http://localhost:3000/products/create-payment-intent', {
            amount,
            customerEmail: formData.email,
            items: cart
        })
        .then((resp) => {
            setClientSecret(resp.data.clientSecret);
            setPaymentIntentId(resp.data.paymentIntentId);
            setOriginalPaymentIntentId(resp.data.paymentIntentId);
        })
        .catch((err) => {
            console.error('Errore durante la creazione del paymentIntent:', err);
        });
    }, []);

    // Gestione del codice sconto
    const handleRedeemCode = () => {
        axios.post('http://localhost:3000/products/verify-discount', {
            code: redeemCode,
            currentDate: new Date().toISOString().slice(0, 19).replace('T', ' ')
        })
        .then(response => {
            if (response.data.valid) {
                const discount = response.data.discount;
                const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
                const discountValue = (subtotal * discount.value) / 100;

                setDiscountApplied(true);
                setDiscountAmount(discountValue);
                setDiscountMessage(`Codice sconto ${discount.code} applicato con successo!`);

                const newAmount = subtotal - discountValue;

                localStorage.removeItem('orderData');
                orderCreatedRef.current = false;

                return axios.post('http://localhost:3000/products/create-payment-intent', {
                    amount: newAmount,
                    customerEmail: formData.email,
                    items: cart,
                    originalPaymentIntentId
                });
            }
        })
        .then(resp => {
            if (resp) {
                setClientSecret(resp.data.clientSecret);
                setPaymentIntentId(resp.data.paymentIntentId);
            }
        })
        .catch(error => {
            setDiscountMessage('Codice sconto non valido o scaduto');
            setDiscountApplied(false);
            setDiscountAmount(0);
            console.error('Errore:', error);
        });
    };

    // Creazione ordine
    useEffect(() => {
        if (!cart || !formData || cart.length === 0) {
            navigate('/checkout');
            return;
        }

        if (orderCreatedRef.current && !discountApplied) return;

        orderCreatedRef.current = true;
        const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const total = subtotal - discountAmount;
        const discountFactor = discountAmount > 0 ? (discountAmount / subtotal) : 0;

        const cartWithDiscounts = cart.map(item => ({
            ...item,
            original_price: item.price,
            discounted_price: item.price * (1 - discountFactor),
            subtotal: item.price * item.quantity * (1 - discountFactor)
        }));

        axios.post('http://localhost:3000/products/orders', {
            formData,
            cart: cartWithDiscounts,
            selectedCountry,
            selectedRegion,
            subtotal_price: subtotal,
            discount_code: discountApplied ? redeemCode : null,
            discount_value: discountAmount,
            total_price: total,
            payment_method: 'stripe',
            payment_intent_id: paymentIntentId,
            original_payment_intent_id: originalPaymentIntentId
        })
        .then((resp) => {
            localStorage.setItem('orderData', JSON.stringify({
                orderId: resp.data.orderId,
                paymentIntentId: paymentIntentId,
                originalPaymentIntentId: originalPaymentIntentId,
                formData,
                cart: cartWithDiscounts,
                discountApplied,
                discountAmount,
                redeemCode
            }));
        })
        .catch((err) => {
            console.error('Errore creazione ordine:', err);
        });
    }, [cart, formData, selectedCountry, selectedRegion, navigate, discountAmount, 
        discountApplied, redeemCode, paymentIntentId, originalPaymentIntentId]);

    return (
        <div className="page-main container py-5">
            <h1 className="mb-4">Confirm and pay</h1>
            <div className="row">
                {/* COLONNA SINISTRA */}
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
                        <li className="list-group-item d-flex justify-content-between border-0">
                            <span>Subtotal</span>
                            <span>{cart && cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)} €</span>
                        </li>
                        {discountApplied && (
                            <li className="list-group-item d-flex justify-content-between text-success border-0">
                                <span>Discount</span>
                                <span>-{discountAmount.toFixed(2)} €</span>
                            </li>
                        )}
                        <li className="list-group-item d-flex justify-content-between fw-bold border-0">
                            <span>Total</span>
                            <span>
                                {cart && (cart.reduce((acc, item) => acc + item.price * item.quantity, 0) - discountAmount).toFixed(2)} €
                            </span>
                        </li>
                    </ul>

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

                    <h4 className='mb-4'>Shipping Details</h4>
                    <div className='mb-5'>
                        <p className='fs-5'>
                            Your order will be dispatched to the address provided.
                            We invite you to verify that all shipping details are correct before proceeding.
                        </p>
                        <p className='text-secondary text-end fs-6'>– Kindly: JW-LUX Team</p>
                    </div>

                    <div className="card">
                        <div className="card-header mb-3">
                            Mr/Mrs <strong>{formData.firstName} {formData.lastName}</strong>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><strong>Address:</strong> {formData.address}</li>
                            <li className="list-group-item">
                                <strong>Apartment:</strong> {formData.apartment !== '' ? formData.apartment : 'Non Specified'}
                            </li>
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
                                paymentIntentId={paymentIntentId}
                                originalPaymentIntentId={originalPaymentIntentId}
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