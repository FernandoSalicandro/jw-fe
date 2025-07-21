import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../Context/CartContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const CartModal = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, setCart, setIsCartOpen } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      setIsCartOpen(false);
    }
  }, [location]);

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity < item.stock_quantity // Per evitare di poter ordinare più dello stock
                  ? item.quantity + 1
                  : item.quantity,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) } // evita valori < 1
          : item
      )
    );
  };

  const handleViewCard = () => {
    setIsCartOpen(false);
    navigate("/cart");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="cart-modal" initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 300, opacity: 0 }} transition={{ ease: "easeInOut", duration: 0.5 }}>
          <div className="d-flex justify-content-between align-items-start">
            <p className="m-0">Here’s your cart!</p>
            <button onClick={onClose} className="btn-close ms-3" aria-label="Chiudi carrello"></button>
          </div>

          {cart.length > 0 ? (
            <ul className="mt-3 list-unstyled d-flex flex-column">
              {[...cart].reverse().map((item) => (
                <li key={item.id} className="mb-3 border-bottom pb-">
                  <div class="card mb-3 rounded">
                    <div class="row g-0">
                      <div class="col-md-4">
                        <img
                          src={item.image_url}
                          className="img-fluid rounded"
                          alt={item.name}
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            onClose();
                            navigate(`/productDetails/${item.slug}`);
                          }}
                        />
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                          <h5
                            className="card-title h6"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              onClose();
                              navigate(`/productDetails/${item.slug}`);
                            }}
                          >
                            {item.name}
                          </h5>

                          <p className="card-text">
                            {" "}
                            <small>Price: {item.is_promo === 1 ? item.discount_price : item.price} €</small>
                          </p>
                          <p class="card-text">
                            <span>
                              <button onClick={() => decreaseQuantity(item.id)} className="btn btn-outline-secondary" disabled={item.quantity === 1}>
                                -
                              </button>
                            </span>
                            <span className="mx-2">{item.quantity}</span>
                            <span>
                              <button onClick={() => increaseQuantity(item.id)} className="btn btn-outline-secondary" disabled={item.quantity >= item.stock_quantity}>
                                +
                              </button>
                            </span>
                          </p>
                          <button className="btn btn-outline-danger w-100" onClick={() => removeFromCart(item.id)}>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3">Your cart is currently empty.</p>
          )}

          {cart.length > 0 && (
            <>
              <div className="d-flex justify-content-between align-items-center">
                <p className="fw-bold">Total: {cart.reduce((sum, item) => sum + (item.is_promo === 1 ? item.discount_price : item.price) * item.quantity, 0).toFixed(2)} €</p>
                <p onClick={handleViewCard} style={{ cursor: "pointer" }}>
                  View All
                </p>
              </div>
              <button
                className="btn btn-outline show-details w-100 mt-2"
                onClick={() => {
                  onClose();
                  navigate("/checkout");
                }}
                style={{ border: "1px solid black" }}
              >
                Go to Checkout
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartModal;
