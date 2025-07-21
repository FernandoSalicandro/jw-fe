import { useState } from "react";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import countryRegionData from "../data/countryRegionData.js";

const CheckoutPage = () => {
  const { cart, setCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [showSummary, setShowSummary] = useState(false);

  const countries = countryRegionData.map((c) => c.countryName);
  const regions = countryRegionData.find((c) => c.countryName === selectedCountry)?.regions.map((r) => r.name) || [];

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity < item.stock_quantity ? item.quantity + 1 : item.quantity,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(item.quantity - 1, 1),
            }
          : item
      )
    );
  };

  //qua tengo tutti i dati che l'utente inserisce nel form
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  //funzione per aggiornare formData man mano che l'utente digita
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //quando l'utente clicca su "Proceed to Payment" lo portiamo alla pagina vera del pagamento, passando i dati
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const fullFormData = {
      ...formData,
      country: selectedCountry,
      province: selectedRegion,
    };

    // ✅ Salvo i dati nel localStorage
    localStorage.setItem("formData", JSON.stringify(fullFormData));
    localStorage.setItem("cart", JSON.stringify(cart));

    // Navigo alla pagina pagamento con i dati nello state (opzionale)
    navigate("/payment", {
      state: {
        formData: fullFormData,
        cart,
      },
    });
  };

  return (
    <div className="container py-5" style={{ marginTop: "100px" }}>
      <h1 className="mb-4">Checkout</h1>

      {cart.length === 0 ? (
        //se l'utente arriva qua senza nulla, gli diciamo gentilmente di tornare a comprare roba lol
        <p>Il tuo carrello è vuoto.</p>
      ) : (
        <>
          {/* riepilogo ordine */}
          <div className="d-flex justify-content-between align-items-center mb-3 mt-4">
            <h4 className="m-0">Order Summary</h4>
            <button className="btn btn-sm" onClick={() => setShowSummary((prev) => !prev)} aria-expanded={showSummary} aria-controls="orderSummary">
              {showSummary ? "Hide ▲" : "Show ▼"}
            </button>
          </div>

          {showSummary && (
            <div id="orderSummary">
              <ul className="list-group mb-4">
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
                        <div className="d-flex align-items-center gap-2">
                          <button className="btn btn-outline-secondary btn-sm" onClick={() => decreaseQuantity(item.id)} disabled={item.quantity === 1}>
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button className="btn btn-outline-secondary btn-sm" onClick={() => increaseQuantity(item.id)} disabled={item.quantity >= item.stock_quantity}>
                            +
                          </button>
                          <div className="d-flex justify-content-between align-items-center">
                            <button className="btn-close" aria-label="Remove" onClick={() => removeFromCart(item.id)}></button>
                          </div>
                        </div>
                      </div>
                      <div>
                        <span>{((item.is_promo === 1 && parseFloat(item.discount_price) > 0 ? item.discount_price : item.price) * item.quantity).toFixed(2)} €</span>
                      </div>
                    </div>
                  </li>
                ))}
                <hr />
                <li className="list-group-item d-flex justify-content-between fw-bold border-0">
                  <span>Subtotal</span>
                  <span>{cart.reduce((acc, item) => acc + (item.is_promo === 1 && parseFloat(item.discount_price) > 0 ? item.discount_price : item.price) * item.quantity, 0).toFixed(2)} €</span>
                </li>
              </ul>
            </div>
          )}

          {/* form per i dati del cliente */}
          <form onSubmit={handleSubmit}>
            <h4 className="mt-4 mb-3">Contact</h4>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" name="email" required className="form-control" onChange={handleChange} />
            </div>

            <h4 className="mt-4 mb-3">Shipping Details</h4>
            {/* paese */}
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

            {/* nome e cognome */}
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

            {/* indirizzo */}
            <div className="mb-3">
              <label className="form-label">Address</label>
              <input type="text" name="address" required className="form-control" onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">Apartment/Suite (optional)</label>
              <input type="text" name="apartment" className="form-control" onChange={handleChange} />
            </div>

            {/* città, cap, provincia */}
            <div className="row g-3 mb-3">
              <div className="col-md-4">
                <label className="form-label">City</label>
                <input type="text" name="city" className="form-control" placeholder="Enter a city" required onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label className="form-label">Postal code (optional)</label>
                <input type="text" name="postalCode" className="form-control" placeholder="Postal code" />
              </div>
              <div className="col-md-4">
                <label className="form-label">Select Region/Province</label>
                <select className="form-select mb-3" value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
                  <option value="">Select Region/Province</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* telefono */}
            <div className="mb-4">
              <label className="form-label">Phone</label>
              <input type="text" name="phone" required className="form-control" onChange={handleChange} />
            </div>

            {/* pulsante per andare al pagamento */}
            <button type="submit" className="btn btn-outline show-details mt-2" style={{ border: "1px solid black" }} disabled={isLoading}>
              {isLoading ? "Processing..." : "Proceed to Payment"}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
