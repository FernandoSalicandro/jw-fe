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
      <div className="hero-section">
        <img src="./img/hero-rings.png" />
      </div>
      <div className="container py-5">
        <h1 className="mb-4">Rings</h1>
        <div className="row">
          {rings.map((ring) => (
            <div className="col-md-4 mb-4" key={ring.id}>
              <div className="card h-100 border-0">
                <img src={ring.image_url} className="card-img-top hover-img" alt={ring.name} />
                <div className="card-body text-center">
                  <h5 className="card-title">{ring.name}</h5>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
