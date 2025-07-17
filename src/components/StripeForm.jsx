import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';

//-- correzione : aggiungo cart e formData come props per poterli usare in local storage
const StripeForm = ({ clientSecret, navigate, clearCart, cart, formData, snapShotCart }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [paying, setPaying] = useState(false);

    //funzione handlepayment 
    const handlePayment = (e) => {
        e.preventDefault();
        setPaying(true);

        //--correzione: aggiungo local storage per salvare i dati anche dopo il redirect di stripe diobastianich
        localStorage.setItem('orderData', JSON.stringify({
            cart,
            formData
        }))

        stripe.confirmPayment({
            elements, 
            confirmParams: {
                //qua possiamo modificare a piacimento per rimandare alla pagina che vogliamo, l'ho settata per la thankyou page
                return_url: undefined
            },
            redirect: "if_required"

        }).then(result => {
            if (result.error) {
                console.log('Errore durante il pagamento:', result.error.message);
                setPaying(false);
            } else {
                console.log('Pagamento avvenuto con successo');
                //dopo la conferma che non c'è stato intoppo svuotiamo il carrello
                clearCart();
                navigate("thank-you", {
                    snapShotCart: snapShotCart,
                    customer: formData
                })
            }
        }).catch(err => {
            console.log('Errore durante il pagamento:', err.message);
            setPaying(false);
        });
    }

    return (
        <form onSubmit={handlePayment}>
            <PaymentElement />
            <button type='submit' disabled={!stripe || paying} className="btn btn-outline-danger mt-3">
                {paying ? 'Processing...' : 'Pay Now'}
            </button>
        </form>
    );
}

export default StripeForm;
