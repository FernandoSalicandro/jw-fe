import { useEffect, useState, useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { ProductContext } from "../Context/ProductContext.jsx";
import { useCart } from "../Context/CartContext.jsx";
import Loader from "../components/Loader.jsx";
import { useNavigate } from "react-router-dom";

export default function ProductPage() {
  const urlApi = "http://localhost:3000/products";
  const { slug } = useParams();
  const [gioiello, setgioiello] = useState(null);
  const { products } = useContext(ProductContext);
  const {addToCart} = useCart()
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

//   Funzione per aggiungere al carello
const handleAdd = (event) => {
    event.preventDefault()
    addToCart({... gioiello, quantity: 1})
}


  

  // Funzione per randomizzare 4 elementi
  const getRandomSubset = (arr, count) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const randomItems = useMemo(() => getRandomSubset(products, 4), [products]);

  console.log(randomItems);

  useEffect(() => {
    axios.get(`${urlApi}/${slug}`).then((resp) => {
      setgioiello(resp.data);
      setLoading(false)
      console.table(resp.data);
    });
  }, [slug]);

  if (loading) return <Loader />

  return (
    <>
      {gioiello ? (
        <main className="main">
          <div className="container">
            <div className="row g-4 margin-top">
              <div className="col-lg-6 mb-4 ">
                <img src={gioiello.image_url} alt={gioiello.name} className="img-fluid" />
              </div>
              <div className="col-lg-6 ">
                {/* Nome prodotto e prezzo */}
                <h2>{gioiello.name}</h2>
                <div className="price-box">
                  <p className={gioiello.is_promo === 1 ? "no-promo" : "promo"}>Price: {gioiello.price} € </p>
                  {gioiello.is_promo === 1  ? <p className="promo">Dicount Price: {gioiello.discount_price} € </p> : ""}
                </div>
                {/* Bottoni
                 */}
                <button className="btn btn-dark w-50 d-block show-details" onClick={handleAdd} >ADD TO CART</button>
                <button className="btn btn-dark w-50 d-block mt-3 show-details">ADD TO WISHLIST</button>
                {/* Accordion */}

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
                        original condition and must be accompanied with the original packaging and sales slip. Please note that JW LUX does not offer refunds for purchases from our boutiques or online
                        store.<br></br>
                        Custom-ordered pieces are final sale and cannot be returned or exchanged. For more information, please contact us at (555) 123-4567, or email us at info@jwlux.com.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pb-4">
            <p className="text-center h2 mt-5">YOU MAY ALSO LIKE...</p>
            <div className="row row-cols-lg-4 p-3">
              {randomItems.map((curItem, id) => (
                <div key={id} className="col image-price mt-5">
                  <div>
                    <img role="button"  className="w-100 mb-3" src={curItem.image_url} alt={curItem.name} onClick={() => {navigate(`/productDetails/${curItem.slug}`)}}  />
                  </div>
                  <div className="ge-height">
                    <p className="text-center h6">{curItem.name}</p>
                    <p className="prezzo">{curItem.price} €</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      ) : (
        <p>Caricamento in corso...</p>
      )}
    </>
  );
}

