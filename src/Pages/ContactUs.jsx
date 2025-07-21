import React, { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Qui puoi aggiungere la tua logica per invio tramite email/Nodemailer/API
    console.log("Form data:", formData);
    setSubmitted(true);
  };

  return (
    <div className="container my-5" style={{ maxWidth: "800px" }}>
      <h1 className="mb-4 text-center" style={{ marginTop: "200px" }}>
        Contact Us
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
      <p className="lead text-center text-muted mb-5">Whether you have a question about a jewel, an order, or anything else, our team is here to assist you.</p>

      <div className="row g-5">
        {/* Contact Info */}
        <div className="col-md-6">
          <h5 className="mb-3">Customer Care</h5>
          <p>
            <strong>Email:</strong> teamjwshop@gmail.com
          </p>
          <p>
            <strong>Phone:</strong> +39 051 1234567
          </p>
          <p>
            <strong>Opening hours:</strong> Monday–Friday, 09:00 – 18:00
          </p>

          <h5 className="mt-4 mb-3">Visit Us</h5>
          <p>
            <strong>Showroom:</strong>
            <br />
            Via della Bellezza 12, 40100 Bologna, Italy
          </p>
        </div>

        {/* Contact Form */}
        <div className="col-md-6">
          {submitted ? (
            <div className="alert alert-success">Thank you for reaching out! We’ll get back to you shortly.</div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea className="form-control" id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required />
              </div>
              <button style={{ border: "1px solid black" }} type="submit" className="btn btn-outline show-details w-100">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
