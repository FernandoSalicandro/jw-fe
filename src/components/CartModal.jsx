import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../Context/CartContext';

const CartModal = ({ isOpen, onClose }) => {
  const { cart, removeFromCart } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="cart-modal"
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
        >
          <div className="d-flex justify-content-between align-items-start">
            <p className="m-0">Il tuo carrello è qui!</p>
            <button onClick={onClose} className="btn-close ms-3" aria-label="Chiudi carrello"></button>
          </div>

          {cart.length > 0 ? (
            <ul className="mt-3 list-unstyled d-flex flex-column">
              {cart.map(item => (
                <li key={item.id} className="mb-3 border-bottom pb-2">
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="mb-1 fw-bold">{item.name}</p>
                      <p className="mb-1">Quantità: {item.quantity}</p>
                      <p className="mb-1">Prezzo: {item.price} €</p>
                    </div>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Rimuovi
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3">Il carrello è vuoto.</p>
          )}

          {cart.length > 0 && (
            <p className="fw-bold mt-3">
              Totale: {cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)} €
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartModal;
