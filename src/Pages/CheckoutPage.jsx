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
    apartment: "",
    city: "",
    postalCode: "",
    phone: "",
    email: "",
    paymentMethod: "credit_card",
    cardHolder: "",
    cardNumber: "",
    cvv: "",
    expiryMonth: "",
    expiryYear: "",
    paypalEmail: "",
    iban: "",
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
    <div className="container py-5" style={{ marginTop: "100px" }}>
      <h1 className="mb-4">Checkout</h1>

      {cart.length === 0 ? (
        <p>Il tuo carrello è vuoto.</p>
      ) : (
        <>
          <div className="mb-4 mt-4">
            <h4>Order Summary</h4>
          </div>
          <ul className="list-group">
            {cart.map((item) => (
              <li key={item.id} className="list-group-item border-0">
                <div className="d-flex align-items-center">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      marginRight: "10px",
                      borderRadius: "6px",
                    }}
                  />
                  <div className="flex-grow-1">
                    <p className="m-0 fw-bold">{item.name}</p>
                    <small>Quantity: {item.quantity}</small>
                  </div>
                  <div>
                    <span>{(item.price * item.quantity).toFixed(2)} €</span>
                  </div>
                </div>
              </li>
            ))}
            <hr />
            <li className="list-group-item d-flex justify-content-between fw-bold border-0">
              <span>Subtotal</span>
              <span>{cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)} €</span>
            </li>
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
                  setSelectedRegion("");
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
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label">First Name</label>
                <input type="text" name="firstName" required className="form-control" onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Last Name</label>
                <input type="text" name="lastName" required className="form-control" onChange={handleChange} />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <input type="text" name="address" required className="form-control" onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Apartment/Suite (optional)</label>
              <input type="text" name="apartment" required className="form-control" onChange={handleChange} />
            </div>
            <div className="row g-3 mb-3">
              <div className="col-md-4">
                <label className="form-label">City</label>
                <input type="text" name="city" className="form-control" placeholder="Enter a city" />
              </div>
              <div className="col-md-4">
                <label className="form-label">Postal code (optional)</label>
                <input type="text" name="postalCode" className="form-control" placeholder="Postal code" />
              </div>
              <div className="col-md-4">
                <label className="form-label">Select Region/Province</label>
                <select
                  className="form-select mb-3"
                  value={selectedRegion}
                  onChange={(e) => {
                    setSelectedRegion(e.target.value);
                  }}
                >
                  <option value="">Select Region/Province</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="form-label">Phone</label>
              <input type="text" name="phone" required className="form-control" onChange={handleChange} />
            </div>

            <h4 className="mb-3">Payment Method</h4>
            <div className="mb-3">
              <select name="paymentMethod" className="form-select" onChange={handleChange}>
                <option value="credit_card">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="wire-transfer">Wire Transfer</option>
              </select>
            </div>
            {/* Credit Card inputs */}
            {formData.paymentMethod === "credit_card" && (
              <>
                <div className="row g-3 mb-3">
                  <div className="col-md-8">
                    <label className="form-label">Card Holder</label>
                    <input type="text" name="cardHolder" className="form-control" value={formData.cardNumber} onChange={handleChange} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">CVV</label>
                    <input type="text" name="cvv" className="form-control" value={formData.cardHolder} onChange={handleChange} />
                  </div>
                </div>
                <div className="row g-3 mb-3">
                  <div className="col-md-8">
                    <label className="form-label">Card Number</label>
                    <input type="text" name="cardNumber" className="form-control" value={formData.cardNumber} onChange={handleChange} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Expiration Date</label>
                    <div className="d-flex gap-2">
                      <select className="form-select" name="expiryMonth" value={formData.expiryMonth || ""} onChange={handleChange}>
                        <option value="">Month</option>
                        {Array.from({ length: 12 }, (_, i) => (
                          <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                            {String(i + 1).padStart(2, "0")}
                          </option>
                        ))}
                      </select>

                      <select className="form-select" name="expiryYear" value={formData.expiryYear || ""} onChange={handleChange}>
                        <option value="">Year</option>
                        {Array.from({ length: 10 }, (_, i) => {
                          const year = new Date().getFullYear() + i;
                          return (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* PayPal input */}
            {formData.paymentMethod === "paypal" && (
              <div className="mb-3">
                <label className="form-label">PayPal Email</label>
                <input type="email" name="paypalEmail" className="form-control" value={formData.paypalEmail} onChange={handleChange} />
              </div>
            )}

            {/* Wire Transfer input */}
            {formData.paymentMethod === "wire-transfer" && (
              <div className="mb-3">
                <label className="form-label">IBAN</label>
                <input type="text" name="iban" className="form-control" value={formData.iban} onChange={handleChange} />
              </div>
            )}

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
