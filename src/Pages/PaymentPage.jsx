// Import utili da React Router per navigare e leggere lo stato passato dalla pagina precedente
import { useLocation, useNavigate } from 'react-router-dom';

// Stripe tools: Elements è il provider, loadStripe inizializza Stripe la chiave pubblica che abbiamo in env
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

//per svuptare il carrello quando ci pare
import { useCart } from '../Context/CartContext';

import { useState, useEffect } from 'react';

// il form personalizzato
import StripeForm from '../components/StripeForm';
import axios from 'axios';

// Inizializziamo Stripe con la  chiave pubblica (devo occultare la chiave)
const stripePromise = loadStripe('pk_test_51RlUTcQKQGhBKiFRXR1HO0pQhxcVpUcdJ3yrJ1YF0AlFfVfVvqKPJdFEFQTprciFSyyijkKqf6dla1M1sFV9XSfn00E4eEJ8Nn');

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // per svuotare il carrello post-pagamento

    const { clearCart } = useCart();
    //Per la foto del carello e del customer
    const [snapShotCart, setSnapShotCart] = useState([]);



    // Riceviamo i dati dallo state passato da CheckoutPage
    const { cart, formData, selectedCountry, selectedRegion } = location.state || {};

    // Qui salveremo il client secret restituito dal backend (serve per Stripe Elements)
    const [clientSecret, setClientSecret] = useState(null);

    useEffect(() => {
        // se non abbiamo i dati torniamo al checkout
        if (!cart || !formData || cart.length === 0) {
            navigate('/checkout');
            return;
        }


        
        const snapshot = cart.map((obj) => ({ ...obj }));
        setSnapShotCart(snapshot);  // salva la foto nel state


        // Calcoliamo il totale del carrello (attenzione: usiamo direttamente item.price * item.quantity)
        const amount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

        // Chiamata al backend per generare il paymentIntent (Stripe)
        axios.post("http://localhost:3000/products/create-payment-intent", {
            amount,
            // mandiamo anche l'email per eventuali scontrini
            customerEmail: formData.email, 
            // utile lato backend per gestire lo stock /inviare ricevuta
            items: cart 
        })
            .then(resp => {
                // Salviamo il client secret, che ci serve per inizializzare Stripe Elements
                setClientSecret(resp.data.clientSecret);
            })
            .catch((err) => {
                console.log('Errore durante la creazione del paymentIntent:', err);
            });
            // Attiviamo useEffect solo se i dati qua sotto in [] cambiano
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
                            <input type="email" className="form-control" id="" placeholder="Coupon Code" />
                            <button className='btn border-black show-details mt-2'>Redeem</button>
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
                            <li className="list-group-item"><strong>Apartment:</strong> {formData.apartment !== "" ? formData.apartment : "Non Specified"}</li>
                            <li className="list-group-item"><strong>City:</strong> {formData.city}</li>
                            <li className="list-group-item"><strong>Postal Code:</strong> {formData.postalCode}</li>
                            <li className="list-group-item"><strong>Phone Number:</strong> {formData.phone}</li>
                            <li className="list-group-item"><strong>E-mail:</strong> {formData.email}</li>
                        </ul>
                    </div>
                    

                    

                </div>

                {/* --- COLONNA DESTRA (Stripe Elements) --- */}
                <div className="col-md-6">
                    {clientSecret ? (
                        // Appena abbiamo il clientSecret, Stripe Elements può essere renderizzato
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
