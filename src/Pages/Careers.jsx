import React from "react";

export default function Careers() {
  return (
    <div className="container my-5" style={{ maxWidth: "900px" }}>
      <h1 className="text-center mb-4" style={{ marginTop: "200px" }}>
        Careers at JW Lux
      </h1>
      <img
        className="d-none d-lg-block"
        src="./img/jw_logo.png"
        alt="JW Logo"
        style={{
          position: "absolute",
          top: 0,
          right: "30px",
          zIndex: 10,
          opacity: 0.9,
          marginTop: "200px",
          height: "90px",
          objectFit: "contain",
        }}
      />

      <p className="lead text-center text-muted mb-5">Join our passionate team and help shape the future of luxury jewelry.</p>

      {/* Company Values */}
      <section className="mb-5">
        <h3 className="mb-3">Who We Are</h3>
        <p>
          At <strong>JW Lux</strong>, we don’t just sell jewelry — we craft experiences, tell stories, and celebrate timeless beauty. We are a fast-growing luxury brand that values creativity,
          authenticity, and attention to detail in everything we do.
        </p>
        <p>Our team is composed of artisans, designers, developers, marketers and storytellers from across the globe, united by one mission: to make elegance accessible through digital innovation.</p>
      </section>

      {/* Open Positions */}
      <section className="mb-5">
        <h3 className="mb-3">Open Positions</h3>
        <div className="list-group">
          <div className="list-group-item">
            <h5 className="mb-1">✨ E-Commerce & Digital Marketing Specialist</h5>
            <p className="mb-1">Help us grow our brand awareness and online reach across international markets.</p>
            <small className="text-muted">Location: Remote / Bologna HQ</small>
          </div>
          <div className="list-group-item">
            <h5 className="mb-1">💎 Jewelry Product Designer</h5>
            <p className="mb-1">Collaborate with our artisans and transform ideas into stunning, timeless pieces.</p>
            <small className="text-muted">Location: Bologna HQ</small>
          </div>
          <div className="list-group-item">
            <h5 className="mb-1">📦 Logistics & Customer Operations Manager</h5>
            <p className="mb-1">Ensure every delivery reflects the luxury and reliability our customers expect.</p>
            <small className="text-muted">Location: Bologna HQ</small>
          </div>
        </div>
      </section>

      {/* Application Instructions */}
      <section className="mb-5">
        <h3 className="mb-3">How to Apply</h3>
        <p>
          Send your resume and a brief motivation letter to <strong>teamjwshop@gmail.com</strong>. Please specify the position you’re applying for in the subject line.
        </p>
        <p>We review every application with care and will contact selected candidates for interviews. We value passion, uniqueness, and attention to detail — just like our jewels.</p>
      </section>

      {/* Culture */}
      <section>
        <h3 className="mb-3">Why Work With Us</h3>
        <ul>
          <li>🌍 International, inclusive and innovative work environment</li>
          <li>💼 Flexible remote work options</li>
          <li>🎓 Training and personal growth opportunities</li>
          <li>💖 Employee discounts on our luxury collections</li>
        </ul>
      </section>

      <hr className="my-5" />
      <p className="text-center text-muted small">JW Lux is an equal opportunity employer. We celebrate diversity and are committed to creating an inclusive workplace.</p>
    </div>
  );
}
