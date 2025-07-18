import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EarringsPage = () => {
  const [earrings, setEarrings] = useState([]);
  const navigate = useNavigate();  

  useEffect(() => {
    fetch("http://localhost:3000/products?category=earrings")
      .then((res) => res.json())
      .then((data) => setEarrings(data))
      .catch((err) => console.error("Errore fetch earrings:", err));
  }, []);

  return (
    <main>
      <div className="hero-section">
        <img src="/img/hero-earrings.png" alt="" />
      </div>
      <div className="container py-5">
        <h1 className="mb-4">Earrings</h1>
        <div className="row">
          {earrings.map((product) => (
            <div className="col-md-4 mb-4 image-price" key={product.id}>
              <div className="card h-100 border-0 mb-5">
               <div className={product.is_promo === 1 ? "image-price card-custom overflow border-0 rounded" : "image-price overflow border-0 rounded"}>
                  <img onClick={() => navigate(`/productDetails/${product.slug}`)} src={product.image_url} alt={product.name} className="card-img-top  hover-img" />
                  {product.is_promo === 1 && <img className="discount-logo" src="img/jw_logo_discount.png" alt="logo-discount" />}
                </div>
                <div className="card-body text-center">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text prezzo">{product.price} €</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
export default EarringsPage;
