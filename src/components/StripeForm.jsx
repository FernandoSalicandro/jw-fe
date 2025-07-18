import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import axios from 'axios';

const StripeForm = ({ 
  clientSecret, 
  navigate, 
  clearCart, 
  cart, 
  formData,
  paymentIntentId,
  originalPaymentIntentId 
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paying, setPaying] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setPaying(true);
    const snapShotCart = cart.map(item => ({ ...item }));

    try {
      await axios.post("http://localhost:3000/products/scale-stock", {
        items: cart,
      });

      const result = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (result.error) {
        console.error("Errore nel pagamento:", result.error.message);
        await axios.post("http://localhost:3000/products/update-payment-status", {
          payment_intent_id: paymentIntentId,
          original_payment_intent_id: originalPaymentIntentId,
          status: "failed"
        });
        setPaying(false);
        return;
      }

      // Aggiorna DB con stato succeeded
      await axios.post("http://localhost:3000/products/update-payment-status", {
        payment_intent_id: paymentIntentId,
        original_payment_intent_id: originalPaymentIntentId,
        status: "succeeded"
      });

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