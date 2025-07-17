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
    }, [cart, formData, navigate]); 

    return (
        <div className="container py-5" style={{ marginTop: "100px" }}>
            <h1 className="mb-4">Conferma e paga</h1>
            <div className="row">
                {/* --- COLONNA SINISTRA --- */}
                <div className="col-md-6">
                    <h4>Riepilogo Ordine</h4>
                    <ul className="list-group mb-4">
                        {cart && cart.map((item) => (
                            <li key={item.id} className="list-group-item border-0">
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
                                        <small>Quantità: {item.quantity}</small>
                                    </div>
                                    <div>{(item.price * item.quantity).toFixed(2)} €</div>
                                </div>
                            </li>
                        ))}
                        <li className="list-group-item d-flex justify-content-between fw-bold border-0">
                            <span>Totale</span>
                            <span>{cart && cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)} €</span>
                        </li>
                    </ul>

                    <h4>Dati di spedizione</h4>
                    <ul className="list-group">
                        <li className="list-group-item border-0">{formData.firstName} {formData.lastName}</li>
                        <li className="list-group-item border-0">
                            {formData.address}{formData.apartment && `, ${formData.apartment}`}
                        </li>
                        <li className="list-group-item border-0">
                            {formData.city}, {selectedRegion}, {selectedCountry}
                        </li>
                        <li className="list-group-item border-0">{formData.postalCode}</li>
                        <li className="list-group-item border-0">{formData.email} — {formData.phone}</li>
                    </ul>
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
