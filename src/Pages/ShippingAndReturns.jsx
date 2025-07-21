import React from "react";

export default function ShippingAndReturns() {
  return (
    <div className="container my-5 page-main" style={{ maxWidth: "900px" }}>
      <h1 className="mb-4 text-center" style={{ marginTop: "200px" }}>
        Shipping & Returns
      </h1>
      <img
        src="./img/jw_logo.png"
        alt="JW Logo"
        style={{
          position: "absolute",
          top: 0,
          right: "30px",
          height: "50px",
          zIndex: 10,
          opacity: 0.9,
          marginTop: "200px",
          height: "90px",
          objectFit: "contain",
        }}
      />
      <p className="lead text-center text-muted mb-5">Discover our shipping options and return policies. We aim to make every step of your experience effortless and luxurious.</p>

      {/* Shipping Section */}
      <section className="mb-5">
        <h3 className="mb-3">Shipping Information</h3>
        <p>We offer secure, insured, and trackable shipping worldwide. All orders are handled with utmost care and packaged in our signature luxury boxes.</p>
        <ul>
          <li>
            <strong>Italy:</strong> Free Express Shipping (1–2 business days)
          </li>
          <li>
            <strong>Europe:</strong> €15 Flat Rate (2–4 business days)
          </li>
          <li>
            <strong>International:</strong> €25 Flat Rate (3–6 business days)
          </li>
        </ul>
        <p>Orders are typically processed within 24 hours. Once dispatched, you will receive an email with your tracking number.</p>
        <p className="text-muted small">Note: Delivery times may vary during peak periods or due to customs procedures.</p>
      </section>

      {/* Returns Section */}
      <section className="mb-5">
        <h3 className="mb-3">Return & Exchange Policy</h3>
        <p>
          Your satisfaction is our priority. If you are not completely satisfied with your purchase, you can return or exchange it within <strong>14 days</strong> of delivery.
        </p>
        <ul>
          <li>Items must be returned in unused condition, with original packaging and authenticity certificates.</li>
          <li>Personalized or engraved items are not eligible for return unless defective.</li>
          <li>Return shipping costs are the responsibility of the customer, unless the item is faulty or incorrect.</li>
        </ul>
        <p>
          To request a return, please contact us at <strong>teamjwshop@gmail.com</strong> with your order number and reason for return.
        </p>
        <p>Once your return is approved, we will provide instructions and a return label if applicable. Refunds are processed within 5–7 business days after we receive and inspect the item.</p>
      </section>

      {/* Exchange Instructions */}
      <section>
        <h3 className="mb-3">Exchanges</h3>
        <p>
          To request an exchange (e.g. for a different size or model), please email us at <strong>teamjwlux@gmail.com</strong>. We'll guide you through the process and ensure you receive the perfect
          piece.
        </p>
      </section>

      <hr className="my-5" />

      <p className="text-center text-muted small">
        If you have any further questions, feel free to reach out via our <a href="/customer-service">Customer Service page</a>.
      </p>
    </div>
  );
}
