import { useEffect, useState, useContext, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ProductContext } from "../Context/ProductContext.jsx";
import { useCart } from "../Context/CartContext.jsx";
import { useWishList } from "../Context/WishListContext.jsx";
import Loader from "../components/Loader.jsx";
import AiAssistantProva from "../Pages/AiAssistantProva.jsx";
import { div } from "framer-motion/client";

export default function ProductPage() {
  const urlApi = "http://localhost:3000/products";
  const { slug } = useParams();
  const navigate = useNavigate();

  // States
  const [gioiello, setGioiello] = useState(null);
  const [loading, setLoading] = useState(true);
  const [limitReached, setLimitReached] = useState(false);
  const isOutOfStock = gioiello?.stock_quantity === 0;
  const [alreadyInWishlist, setAlreadyInWishlist] = useState(false);

  // Contexts
  const { products } = useContext(ProductContext);
  const { addToCart, setIsCartOpen, cart } = useCart();
  const { addToWishList, setIsWishListOpen, wishList } = useWishList();

  // Funzione per ottenere la quantità nel carrello
  const getQuantityInCart = (product) => {
    if (!product) return 0;
    const item = cart.find((item) => item.id === product.id);
    return item ? item.quantity : 0;
  };

  // Gestione aggiunta al carrello
  const handleAdd = (event) => {
    event.preventDefault();

    if (!gioiello) return;

    const currentQuantity = getQuantityInCart(gioiello);

    if (currentQuantity >= gioiello.stock_quantity) {
      setLimitReached(true);
      return;
    }

    addToCart({ ...gioiello, quantity: 1 });
    setIsCartOpen(true);
    setLimitReached(false);
  };

  // Gestione aggiunta alla wishlist
  const handleWishListAdd = (event) => {
    event.preventDefault();

    if (!gioiello) return;

    const isAlready = wishList.some((item) => item.id === gioiello.id);

    if (isAlready) {
      setAlreadyInWishlist(true);
      setIsWishListOpen(true);
      return;
    }

    addToWishList({ ...gioiello, quantity: 1 });
    setIsWishListOpen(true);
    setAlreadyInWishlist(true);
  };

  // Gestione stato wishlist
  useEffect(() => {
    if (!gioiello) {
      setAlreadyInWishlist(false);
      return;
    }

    const isInWishlist = wishList.some((item) => item.id === gioiello.id);
    setAlreadyInWishlist(isInWishlist);
  }, [wishList, gioiello]);

  // Gestione limite stock
  useEffect(() => {
    if (!gioiello) return;

    const currentQuantity = getQuantityInCart(gioiello);

    if (currentQuantity < gioiello.stock_quantity && limitReached) {
      setLimitReached(false);
    }
  }, [cart, gioiello, limitReached]);

  // Fetch dati prodotto
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setGioiello(null);

      try {
        const response = await axios.get(`${urlApi}/${slug}?nocache=${Date.now()}`, {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        });
        setGioiello(response.data);
      } catch (error) {
        console.error("Errore nel caricamento del prodotto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  // Prodotti correlati
  const randomItems = useMemo(() => {
    const getRandomSubset = (arr, count) => {
      return [...arr].sort(() => 0.5 - Math.random()).slice(0, count);
    };
    return getRandomSubset(products, 4);
  }, [products]);

  if (loading) return <Loader />;

  return (
    <>
      {gioiello ? (
        <>
          {" "}
          <AiAssistantProva
            productInfo={{
              name: gioiello.name,
              price: gioiello.price, // prezzo originale
              discount_price: gioiello.discount_price, // prezzo scontato
              is_promo: gioiello.is_promo === 1, // flag promozione
              description: gioiello.description,
              stockQuantity: gioiello.stock_quantity,
              category: gioiello.category,
            }}
          />
          <main className="main">
            <div className="container">
              <div className="row g-4 margin-top">
                {/* Immagine prodotto */}
                <div className="col-lg-6 mb-4">
                  <img src={gioiello.image_url} alt={gioiello.name} className="img-fluid" />
                </div>

                {/* Dettagli prodotto */}
                <div className="col-lg-6">
                  <h2>{gioiello.name}</h2>

                  {/* Prezzi */}
                  <div className="price-box">
                    <p className={gioiello.is_promo === 1 ? "no-promo" : "promo"}>Price: {gioiello.price} €</p>
                    {gioiello.is_promo === 1 && <p className="promo">Discount Price: {gioiello.discount_price} €</p>}
                  </div>

                  {/* Pulsanti azione */}
                  <button className="btn btn-outline w-50 d-block show-details" onClick={handleAdd} disabled={isOutOfStock} style={{ border: "1px solid black" }}>
                    {isOutOfStock ? "OUT OF STOCK" : "ADD TO CART"}
                  </button>

                  {isOutOfStock ? <div className="text-danger mt-2">Currently unavailable</div> : limitReached && <div className="text-danger mt-2">Maximum stock limit reached </div>}

                  <button className="btn btn-outline w-50 d-block mt-3 show-details" onClick={handleWishListAdd} disabled={alreadyInWishlist} style={{ border: "1px solid black" }}>
                    ADD TO WISHLIST
                  </button>

                  {alreadyInWishlist && <div className="alert alert-warning mt-2">This product is in your wishlist.</div>}

                  {/* Accordion informazioni */}
                  <div className="accordion mt-5" id="accordionExample">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                          DETAILS
                        </button>
                      </h2>
                      <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          <strong>{gioiello.description}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                          SHIPPING & RETURNS
                        </button>
                      </h2>
                      <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          For purchases from our boutiques or JWLUX.com, JW LUX will arrange an exchange or issue a store credit within 30 days of original purchase. All exchanges must be in the
                          original condition and must be accompanied with the original packaging and sales slip. Please note that JW LUX does not offer refunds for purchases from our boutiques or
                          online store. Custom-ordered pieces are final sale and cannot be returned or exchanged.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Prodotti correlati */}
            <div className="pb-4">
              <p className="text-center h2 mt-5">YOU MAY ALSO LIKE...</p>
              <div className="row row-cols-lg-4 p-3">
                {randomItems.map((curItem, id) => (
                  <div key={id} className="col image-price mt-5">
                    <div>
                      <img role="button" className="w-100 mb-3" src={curItem.image_url} alt={curItem.name} onClick={() => navigate(`/productDetails/${curItem.slug}`)} />
                    </div>
                    <div className="ge-height">
                      <p className="text-center h6">{curItem.name}</p>
                      <p className="prezzo">{curItem.price} €</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>{" "}
        </>
      ) : (
        <p>Caricamento in corso...</p>
      )}
    </>
  );
}
