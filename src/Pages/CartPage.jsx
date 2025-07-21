import { useContext } from "react";
import { useCart } from "../Context/CartContext.jsx";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const getTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <main className="page-main">
      <div className="container section-separator p-2">
        <h1>Your Cart</h1>
      </div>

      {cart.length === 0 ? (
        <div className="container d-flex justify-content-center align-items-center py-5">
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <>
          <div className="container py-4">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
              {cart.map((item) => (
                <div className="col mb-4" key={item.id}>
                  <div className="card h-100 border-0">
                    <img onClick={() => navigate(`/productDetails/${item.slug}`)} src={item.image_url} className="card-img-top hover-img" alt={item.name} style={{ cursor: "pointer" }} />
                    <div className="card-body text-center">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">Quantity: {item.quantity}</p>
                      <p className="card-text">Price: {((item.is_promo === 1 ? item.discount_price : item.price) * item.quantity).toFixed(2)} €</p>
                      <button className="btn btn-sm btn-outline show-details mt-2" onClick={() => removeFromCart(item.id)} style={{ border: "1px solid black" }}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-end mt-4">
              <h4>Total: {getTotal()} €</h4>
              <button className="btn btn-outline text-black show-details me-2" onClick={clearCart} style={{ border: "1px solid black" }}>
                Clear Cart
              </button>
              <button className="btn btn-outline show-details" onClick={() => navigate("/checkout")} style={{ border: "1px solid black" }}>
                Go to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
