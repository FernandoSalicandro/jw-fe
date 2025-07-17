import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import axios from 'axios';

const StripeForm = ({ clientSecret, navigate, clearCart, cart, formData }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [paying, setPaying] = useState(false);

    const handlePayment = async (e) => {
        e.preventDefault();
        setPaying(true);

        try {
            // Salva i dati dell'ordine
            localStorage.setItem('orderData', JSON.stringify({
                cart,
                formData
            }));

            // Prima prova a scalare lo stock
            console.log("Tentativo di scaling stock...", cart);
            
            await axios.post("http://localhost:3000/products/scale-stock", {
                items: cart
            });
            
            console.log("Stock scalato con successo");

            // Poi procedi con il pagamento Stripe
            const result = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: window.location.origin + "/thankyou"
                },
            });

            if (result.error) {
                console.log('Errore durante il pagamento:', result.error.message);
                setPaying(false);
                
                // Se il pagamento fallisce, ripristina lo stock
                // TODO: implementare endpoint di ripristino stock
            }
        } catch (err) {
            console.log('Errore generale:', err);
            setPaying(false);
        }
    };

    return (
        <form onSubmit={handlePayment}>
            <PaymentElement />
            <button 
                type='submit' 
                disabled={!stripe || paying} 
                className="btn btn-outline-danger mt-3"
            >
                {paying ? 'Processing...' : 'Pay Now'}
            </button>
        </form>
    );
};

export default StripeForm;