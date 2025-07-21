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
  originalPaymentIntentId,
  selectedCountry,
  selectedRegion
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paying, setPaying] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setPaying(true);
    const snapShotCart = cart.map(item => ({ ...item }));

    try {
      // Scala lo stock
      await axios.post("http://localhost:3000/products/scale-stock", { items: cart });

      // Conferma il pagamento
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

      // Calcolo importi sconto/totale
      const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      const discountData = localStorage.getItem("sconto")
        ? JSON.parse(localStorage.getItem("sconto"))
        : null;

      const discountAmount = discountData?.amount || 0;
      const discountCode = discountData?.code || null;
      const total = subtotal - discountAmount;

      // Crea l'ordine
      await axios.post("http://localhost:3000/products/orders", {
        formData,
        cart,
        selectedCountry,
        selectedRegion,
        subtotal_price: subtotal,
        discount_code: discountCode,
        discount_value: discountAmount,
        total_price: total,
        payment_method: 'stripe',
        payment_intent_id: paymentIntentId,
        original_payment_intent_id: originalPaymentIntentId
      });

      // ✅ Aggiorna lo stato del pagamento (dopo creazione ordine)
      await axios.post("http://localhost:3000/products/update-payment-status", {
        payment_intent_id: paymentIntentId,
        original_payment_intent_id: originalPaymentIntentId,
        status: "succeeded"
      });

      // Invia email di conferma
      await axios.post("http://localhost:3000/products/send-order-emails", {
        orderDetails: {
          cart: snapShotCart,
          customer: formData,
          paymentIntentId,
          totalAmount: total.toFixed(2)
        }
      });

      // Cleanup
      clearCart();
      localStorage.removeItem("sconto");

      // Vai alla Thank You Page
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
