import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BraceletsPage = () => {
  const [bracelets, setBracelets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/products?category=bracelets")
      .then((res) => res.json())
      .then((data) => setBracelets(data))
      .catch((err) => console.error("Error fetch bracelets:", err));
  }, []);

  return (
    <main>
      <div className="black-div"></div>
      <div className="hero-section">
        <img src="/img/hero-bracelets.png" alt="" />
      </div>
      <div className="container py-5">
        <h1 className="mb-4">Bracelets</h1>
        <div className="row">
          {bracelets.map((product) => (
            <div className="col-md-4 mb-4 image-price" key={product.id}>
              <div className="card h-100 border-0 mb-5">
                <div className={product.is_promo === 1 ? "image-price card-custom overflow border-0 rounded" : "image-price overflow border-0 rounded"}>
                  <img onClick={() => navigate(`/productDetails/${product.slug}`)} src={product.image_url} alt={product.name} className="card-img-top  hover-img" />
                  {product.is_promo === 1 && <img className="discount-logo" src="img/jw_logo_discount.png" alt="logo-discount" />}
                </div>
              </div>
              <div className="card-body text-center">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text prezzo">{product.price} €</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
export default BraceletsPage;
