import { useEffect, useState } from "react"
export default function RingPage() {
      const [rings, setRings] = useState([]);
      useEffect(() => {
            fetch("http://localhost:3000/products?category=rings")
                  .then((res) => res.json())
                  .then((data) => setRings(data))
                  .catch((err) => console.error("Error fetching rings:", err));
      })

      return (
            <>
                  <div className="hero-section">
                        <img src="./public/img/emerald-dome-ring.png" />
                  </div>
                  <div className="container py-5">
                        <h1 className="mb-4">Rings</h1>
                        <div className="row">
                              {rings.map((ring) => (
                                    <div className="col-md-4 mb-4" key={ring.id}>
                                          <div className="card">
                                                <img src={ring.image_url} className="card-img-top" alt={ring.name} />
                                                <div className="card-body">
                                                      <h5 className="card-title">{ring.name}</h5>
                                                      <p className="card-text">{ring.description}</p>
                                                      <p className="card-text">${ring.price}</p>
                                                </div>
                                          </div>
                                    </div>
                              ))}
                        </div>
                  </div>
            </>
      );
}