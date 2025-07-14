import { useEffect, useState } from "react";

const BraceletsPage = () => {
  const [bracelets, setBracelets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/products?category=bracelets")
      .then((res) => res.json())
      .then((data) => setBracelets(data))
      .catch((err) => console.error("Error fetch bracelets:", err));
  }, []);

  return (
    <main>
      <div className="hero-section">
        <img src="/img/hero-bracelets.png" alt="" />
      </div>
      <div className="container py-5">
        <h1 className="mb-4">Bracelets</h1>
        <div className="row">
          {bracelets.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card h-100">
                <img src={product.image_url} alt={product.name} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.price} €</p>
                  <button className="btn btn-success">Vedi Dettagli</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
export default BraceletsPage;
