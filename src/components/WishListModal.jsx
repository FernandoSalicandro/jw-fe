import { motion, AnimatePresence } from 'framer-motion';
import { useWishList } from '../Context/WishListContext';

const WishListModal = ({ isOpen, onClose }) => {
    const { wishList, removeFromWishList, setWishList } = useWishList();

    const increaseQuantity = (id) => {
        setWishList(prevWishlist => prevWishlist.map(
            item => item.id === id ? {
                ...item,
                quantity: item.quantity < item.stock_quantity
                    ? item.quantity + 1
                    : item.quantity
            } : item
        ));
    };

    const decreaseQuantity = (id) => {
        setWishList(prevWishList => prevWishList.map(
            item => item.id === id ? {
                ...item,
                quantity: Math.max(item.quantity - 1, 1)
            } : item
        ));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="cart-modal"
                    initial={{ x: 350, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 350, opacity: 0 }}
                    transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
                >
                    <div className="d-flex justify-content-between align-items-start">
                        <p className="m-0">I gioielli che desideri</p>
                        <button
                            onClick={onClose}
                            className="btn-close position-absolute top-0 end-0 m-3"
                            aria-label="Chiudi wishlist"
                        ></button>
                    </div>

                    {wishList.length > 0 ? (
                        <ul className="mt-3 list-unstyled d-flex flex-column">
                            {wishList.map(item => (
                                <li key={item.id} className="mb-3 border-bottom pb-2">
                                    <div className="card border-0 mb-3 rounded">
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img src={item.image_url} className="img-fluid rounded" alt={item.name} />
                                            </div>
                                            <div className="col-md-8 d-flex flex-column justify-content-center">
                                                <div className="card-body">
                                                    <h5 className="card-title h6">{item.name}</h5>
                                                    <button
                                                        className="btn btn-outline border-0 text-black show-details mt-2"
                                                        onClick={() => {
                                                            onClose();
                                                            window.location.href = `/productDetails/${item.slug}`;
                                                        }}
                                                    >
                                                        Scopri di più
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}

                        </ul>
                    ) : (
                        <p className="mt-3">La tua wishlist è vuota.</p>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WishListModal;
