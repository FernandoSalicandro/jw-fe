import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function RingPage() {
  const [rings, setRings] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:3000/products?category=rings")
      .then((res) => res.json())
      .then((data) => setRings(data))
      .catch((err) => console.error("Error fetching rings:", err));
  });

  return (
    <>
    <div className="black-div"></div>
      <div className="hero-section">
        <img src="./img/hero-rings.png" />
      </div>
      <div className="container py-5">
        <h1 className="mb-4">Rings</h1>
        <div className="row">
          {rings.map((ring) => (
            <div className="col-md-4 mb-4 " key={ring.id}>
              <div className="card h-100 border-0  mb-5 img-discount">
                <div className={ring.is_promo === 1 ? "image-price card-custom overflow border-0 rounded" : "image-price overflow border-0 rounded"}>
                  <img onClick={() => navigate(`/productDetails/${ring.slug}`)} src={ring.image_url} alt={ring.name} className="card-img-top  hover-img" />
                  {ring.is_promo === 1 && <img className="discount-logo" src="img/jw_logo_discount.png" alt="logo-discount" />}
                </div>
                <div className="card-body text-center">
                  <h5 className="card-title">{ring.name}</h5>
                  <p className="card-text prezzo">{ring.price} €</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
