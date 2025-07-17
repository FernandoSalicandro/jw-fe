import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";

//-- correzione : aggiungo cart e formData come props per poterli usare in local storage
const StripeForm = ({ clientSecret, navigate, clearCart, cart, formData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paying, setPaying] = useState(false);

  //funzione handlepayment
  const handlePayment = async (e) => {
    e.preventDefault();
    setPaying(true);

    try {
      // Conferma il pagamento senza redirect automatico
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + "/thankyou",
        },
        redirect: "if_required",
      });

      if (error || !paymentIntent) {
        console.error("Errore nel pagamento:", error?.message);

        // Aggiorna nel DB lo stato "failed"
        await fetch("http://localhost:3000/products/update-payment-status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            payment_intent_id: paymentIntent?.id || "unknown",
            status: "failed",
          }),
        });

        setPaying(false);
        return;
      }

      // ✅ Se arriviamo qui, il pagamento è andato a buon fine
      await fetch("http://localhost:3000/products/update-payment-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          payment_intent_id: paymentIntent.id,
          status: paymentIntent.status, // "succeeded"
        }),
      });

      clearCart();
      navigate("/thankyou");
    } catch (err) {
      console.error("Errore imprevisto:", err);
      setPaying(false);
    }
  };

  return (
    <form onSubmit={handlePayment}>
      <PaymentElement />
      <button type="submit" disabled={!stripe || paying} className="btn btn-outline-danger mt-3">
        {paying ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default StripeForm;
