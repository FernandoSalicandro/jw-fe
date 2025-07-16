import { useState } from "react";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import countryRegionData from "../data/countryRegionData.js";

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  const countries = countryRegionData.map((c) => c.countryName);
  const regions = countryRegionData.find((c) => c.countryName === selectedCountry)?.regions.map((r) => r.name) || [];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    paymentMethod: "credit_card",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dati Cliente:", formData);
    console.log("Carrello:", cart);

    // Qui potresti inviare l'ordine a un backend se necessario

    clearCart();
    navigate("/thank-you");
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Checkout</h1>

      {cart.length === 0 ? (
        <p>Il tuo carrello è vuoto.</p>
      ) : (
        <>
          <div className="mb-4" style={{ marginTop: "60px" }}>
            <h4>Riepilogo Ordine</h4>
          </div>
          <ul className="list-group">
            {cart.map((item) => (
              <li key={item.id} className="list-group-item border-0">
                <div className="d-flex align-items-center">
                  <img src={item.image_url} alt={item.name} style={{ width: "60px", height: "60px", objectFit: "cover", marginRight: "10px", borderRadius: "6px" }} />
                  <div className="flex-grow-1">
                    <p className="m-0 fw-bold">{item.name}</p>
                    <small>Quantità: {item.quantity}</small>
                  </div>
                  <div>
                    <span>{(item.price * item.quantity).toFixed(2)} €</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <form onSubmit={handleSubmit}>
            <h4 className="mt-4 mb-3">Contact</h4>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" name="email" required className="form-control" onChange={handleChange} />
            </div>
            <h4 className="mt-4 mb-3">Shipping Details</h4>
            <div className="mb-3">
              <select
                className="form-select mb-3"
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setSelectedRegion(""); // reset regione
                }}
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input type="text" name="firstname" required className="form-control" onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input type="text" name="lastname" required className="form-control" onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label className="form-label">Address</label>
              <input type="text" name="address" required className="form-control" onChange={handleChange} />
            </div>
            <div className="mb-3">
              <select
                className="form-select mb-3"
                value={selectedRegion}
                onChange={(e) => {
                  setSelectedRegion(e.target.value);
                  setSelectedCountry(""); // reset regione
                }}
              >
                <option value="">Select Region</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            <h4 className="mb-3">Metodo di Pagamento</h4>
            <div className="mb-3">
              <select name="paymentMethod" className="form-select" onChange={handleChange}>
                <option value="credit_card">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="wire-transfer">Wire Transfer</option>
              </select>
            </div>

            <button type="submit" className="btn btn-outline show-details mt-2" style={{ border: "1px solid black" }}>
              Continue to shipping
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
