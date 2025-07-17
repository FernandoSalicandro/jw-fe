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
        // Scatta una "foto" del carrello per thankyou
        const snapShotCart = cart.map(item => ({ ...item }));
        try {
            // Salva l'ordine nel localStorage
            localStorage.setItem('orderData', JSON.stringify({ cart, formData }));
            // Prima scala lo stock
            console.log("Tentativo di scaling stock...", cart);
            await axios.post("http://localhost:3000/products/scale-stock", { items: cart });
            console.log("Stock scalato con successo");
            // Poi conferma il pagamento
            const result = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: window.location.origin + "/thankyou"
                },
                redirect: "if_required"
            });
            if (result.error) {
                console.log('Errore durante il pagamento:', result.error.message);
                setPaying(false);
            } else {
                // Paga tutto ok
                console.log('Pagamento avvenuto con successo');
                clearCart();
                navigate("/thankyou", {
                    state: {
                        snapShotCart,
                        customer: formData
                    }
                });
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
                className="btn show-details border-black mt-3"
            >
                {paying ? 'Processing...' : 'Pay Now'}
            </button>
        </form>
    );
};
export default StripeForm;