import { useEffect, useState } from "react";

const NecklacesPage = () => {
  const [necklaces, setNecklaces] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/products?category=necklaces")
      .then((res) => res.json())
      .then((data) => setNecklaces(data))
      .catch((err) => console.error("Error fetch necklaces:", err));
  }, []);

  return (
    <main>
      <div className="hero-section">
        <img src="/img/hero-necklaces.png" alt="" />
      </div>
      <div className="container py-5">
        <h1 className="mb-4">Necklaces</h1>
        <div className="row">
          {necklaces.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card h-100">
                <img src={product.image_url} alt={product.name} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.price} €</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
export default NecklacesPage;
