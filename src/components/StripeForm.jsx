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
    const snapShotCart = cart.map(item => ({ ...item }));
    try {
      // :segno_spunta_bianco: Salva ordine nel localStorage
      localStorage.setItem('orderData', JSON.stringify({ cart, formData }));
      // :segno_spunta_bianco: Scala lo stock prima del pagamento
      await axios.post("http://localhost:3000/products/scale-stock", {
        items: cart,
      });
      // :segno_spunta_bianco: Conferma il pagamento
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + "/thankyou",
        },
        redirect: "if_required",
      });
      if (result.error || !result.paymentIntent) {
        console.error("Errore nel pagamento:", result.error?.message);
        // :segno_spunta_bianco: Aggiorna DB con stato failed
        await fetch("http://localhost:3000/products/update-payment-status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            payment_intent_id: result.paymentIntent?.id || "unknown",
            status: "failed",
          }),
        });
        setPaying(false);
        return;
      }
      // :segno_spunta_bianco: Aggiorna DB con stato succeeded
      await fetch("http://localhost:3000/products/update-payment-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          payment_intent_id: result.paymentIntent.id,
          status: result.paymentIntent.status, // "succeeded"
        }),
      });
      // :segno_spunta_bianco: Pulisce carrello, reindirizza con dati
      clearCart();
      navigate("/thankyou", {
        state: {
          snapShotCart,
          customer: formData,
        },
      });
    } catch (err) {
      console.error("Errore imprevisto durante il pagamento:", err);
      setPaying(false);
    }
  };
  return (
    <form onSubmit={handlePayment}>
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || paying}
        className="btn btn-outline-danger mt-3"
      >
        {paying ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};
export default StripeForm;





