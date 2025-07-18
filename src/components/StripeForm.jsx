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
    // Recupera l'ordine dal localStorage per ottenere l'ID originale
    const orderData = JSON.parse(localStorage.getItem('orderData'));
    
    await axios.post("http://localhost:3000/products/scale-stock", {
      items: cart,
    });

    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    console.log('DEBUG - Payment Result:', {
      hasError: !!result.error,
      paymentIntentId: result.paymentIntent?.id,
      paymentStatus: result.paymentIntent?.status,
      originalPaymentIntentId: orderData?.paymentIntentId // log per debug
    });

    if (result.error) {
      console.error("Errore nel pagamento:", result.error.message);
      await axios.post("http://localhost:3000/products/update-payment-status", {
        payment_intent_id: orderData?.paymentIntentId || result.paymentIntent?.id || "unknown",
        status: "failed"
      });
      setPaying(false);
      return;
    }

    if (!orderData?.paymentIntentId) {
      console.error("PaymentIntent ID originale mancante");
      setPaying(false);
      return;
    }

    // Aggiorna DB con stato succeeded usando l'ID originale
    const updateResponse = await axios.post("http://localhost:3000/products/update-payment-status", {
      payment_intent_id: orderData.paymentIntentId,
      status: "succeeded"
    });

    console.log('Risposta aggiornamento stato:', updateResponse.data);

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