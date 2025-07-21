import React from "react";

export default function AboutUs() {
  return (
    <div className="container my-5" style={{ maxWidth: "900px" }}>
      <div className="text-center mb-5">
        <h1 style={{ marginTop: "200px" }}>About JW Lux</h1>
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
        <p className="lead text-muted p-font">Timeless elegance, modern craftsmanship. Discover our story.</p>
      </div>

      {/* Section: Mission */}
      <section className="mb-5">
        <h3>Our Mission</h3>
        <p>
          At <strong>JW Lux</strong>, we believe that luxury should be personal, timeless, and meaningful. Our mission is to craft exceptional jewelry that not only enhances beauty but tells a story —
          your story.
        </p>
        <p>From sourcing the finest gemstones to perfecting each detail by hand, our commitment to quality is uncompromising.</p>
      </section>

      {/* Section: Origins */}
      <section className="mb-5">
        <h3>Our Story</h3>
        <p>
          Founded in Bologna, Italy, JW Lux was born from a love of artistry and elegance. What began as a small artisan studio has grown into a global brand known for its precision, passion, and
          distinctive style.
        </p>
        <p>We blend centuries-old techniques with modern design to create jewelry that reflects both heritage and innovation.</p>
      </section>

      {/* Section: Craftsmanship */}
      <section className="mb-5">
        <h3>Craftsmanship & Materials</h3>
        <p>
          Each piece is handcrafted by expert artisans using ethically sourced materials. We work exclusively with certified suppliers to ensure sustainability and excellence at every step of
          production.
        </p>
        <p>The result? Jewelry that is as enduring as it is beautiful.</p>
      </section>

      {/* Section: Why Choose Us */}
      <section className="mb-5">
        <h3>Why Choose JW Lux?</h3>
        <ul>
          <li>💎 Authentic, handcrafted designs</li>
          <li>🌍 Ethical sourcing & sustainability focus</li>
          <li>💼 Exceptional customer care</li>
          <li>🎁 Elegant packaging & global shipping</li>
        </ul>
      </section>
    </div>
  );
}
