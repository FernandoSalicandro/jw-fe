import { div } from "framer-motion/client";
import React from "react";

export default function CustomerService() {
  return (
    <div className="container my-5 page-main" style={{ maxWidth: "900px" }}>
      <h1 className="mb-4 text-center" style={{ marginTop: "200px" }}>
        Customer Service
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
      <p className="lead text-center text-muted mb-5">We're here to help you. Our mission is to provide you with an experience as exceptional as our jewels.</p>

      <div className="accordion" id="customerServiceAccordion">
        {/* Contact Us */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingContact">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseContact">
              Contact Us
            </button>
          </h2>
          <div id="collapseContact" className="accordion-collapse collapse show" data-bs-parent="#customerServiceAccordion">
            <div className="accordion-body">
              <p>You can contact our Customer Service team via:</p>
              <ul>
                <li>
                  Email: <strong>teamjwshop@gmail.com</strong>
                </li>
                <li>
                  Phone: <strong>+39 051 1234567</strong> (Mon–Fri, 9am–6pm)
                </li>
                <li>Live Chat: available in the bottom-right corner of the screen</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Shipping & Delivery */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingShipping">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseShipping">
              Shipping & Delivery
            </button>
          </h2>
          <div id="collapseShipping" className="accordion-collapse collapse" data-bs-parent="#customerServiceAccordion">
            <div className="accordion-body">
              <p>All orders are shipped with tracked and insured express couriers.</p>
              <ul>
                <li>
                  <strong>Italy:</strong> Free Express Shipping (1–2 working days)
                </li>
                <li>
                  <strong>Europe:</strong> €15 Flat Rate (2–4 working days)
                </li>
                <li>
                  <strong>International:</strong> €25 Flat Rate (3–6 working days)
                </li>
              </ul>
              <p>You will receive a confirmation email with your tracking number as soon as your order is dispatched.</p>
            </div>
          </div>
        </div>

        {/* Returns & Exchanges */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingReturns">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseReturns">
              Returns & Exchanges
            </button>
          </h2>
          <div id="collapseReturns" className="accordion-collapse collapse" data-bs-parent="#customerServiceAccordion">
            <div className="accordion-body">
              <p>We want you to be 100% satisfied with your purchase.</p>
              <ul>
                <li>
                  You may return any item within <strong>14 days</strong> of delivery for a full refund or exchange.
                </li>
                <li>Items must be unused, in original packaging, and with authenticity certificates.</li>
                <li>
                  To start a return, please email us at <strong>teamjwshop@gmail.com</strong>.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Care & Warranty */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingCare">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCare">
              Product Care & Warranty
            </button>
          </h2>
          <div id="collapseCare" className="accordion-collapse collapse" data-bs-parent="#customerServiceAccordion">
            <div className="accordion-body">
              <p>All our jewels are handcrafted with precision and undergo strict quality control.</p>
              <ul>
                <li>
                  Each piece is covered by a <strong>2-year international warranty</strong>.
                </li>
                <li>We recommend storing your jewel in a dry place and avoiding direct contact with perfumes or water.</li>
                <li>For care instructions, refer to the booklet included in your packaging.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFAQ">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFAQ">
              Frequently Asked Questions
            </button>
          </h2>
          <div id="collapseFAQ" className="accordion-collapse collapse" data-bs-parent="#customerServiceAccordion">
            <div className="accordion-body">
              <p>
                <strong>Can I customize a jewel?</strong>
                <br />
                Yes! We offer customization for most pieces. Contact our team for more info.
              </p>
              <p>
                <strong>Do you offer gift wrapping?</strong>
                <br />
                Absolutely. All our jewels come in luxurious packaging, and gift messages are available at checkout.
              </p>
              <p>
                <strong>What if my item is damaged?</strong>
                <br />
                Contact us immediately with photos and order info. We'll assist you with a repair or replacement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
