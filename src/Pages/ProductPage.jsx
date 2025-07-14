import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { ProductContext } from "../Context/ProductContext.jsx";

export default function ProductPage() {
  const urlApi = "http://localhost:3000/products";
  const { slug } = useParams();
  const [gioiello, setgioiello] = useState(null);
  const { products } = useContext(ProductContext);

  // Funzione per randomizzare 4 elementi
  const getRandomSubset = (arr, count) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const randomItems = getRandomSubset(products, 4);

  console.log(randomItems);

  useEffect(() => {
    axios.get(`${urlApi}/${slug}`).then((resp) => {
      setgioiello(resp.data);
      console.table(resp.data);
    });
  }, []);

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
                  {gioiello.is_promo && <p className="promo">Dicount Price: {gioiello.discount_price} € </p>}
                </div>
                {/* Bottoni
                 */}
                <button className="btn btn-dark w-50 d-block">ADD TO CART</button>
                <button className="btn btn-dark w-50 d-block mt-3">ADD TO WISHLIST</button>
                {/* Accordion */}

                <div class="accordion mt-5" id="accordionExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        DETAILS
                      </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <strong>{gioiello.description}</strong>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        SHIPPING & RETURNS
                      </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
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
              {randomItems.map((curItem) => (
                <div className="col image-price mt-5">
                  <div>
                    <img className="w-100 mb-3" src={curItem.image_url} alt={curItem.name} />
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

// <body className="body">
//                 <main className="main">
//                     <div className="container">
//                         <div className="card margin-top">
//                             <img src={gioiello.image_url} className="card-img-top" alt={gioiello.name} />
//                             <div className="card-body">
//                                 <h5 className="card-title">{gioiello.name}</h5>
//                                 <p className="card-text">{gioiello.description}</p>
//                             </div>
//                             <ul className="list-group list-group-flush">
//                                 <li className={`list-group-item`}><p className={`${gioiello.is_promo === 1 ? 'no-promo' : ''}`}>Price: {gioiello.price}$ </p></li>
//                                 {gioiello.is_promo === 1 &&
//                                     <li className="list-group-item"><p className="promo">Discount Price: {gioiello.discount_price}$
//                                     </p></li>
//                                 }
//                                 <li className="list-group-item"><p>Stock Quantity: {gioiello.stock_quantity}</p></li>
//                             </ul>
//                             <div className="card-body">
//                                 <span><Link className="btn btn-primary">Aggiungi al carrello</Link></span>
//                                 <span><Link className="btn btn-danger">Aggiungi alla Wishlist</Link></span>
//                             </div>
//                         </div>
//                     </div>
//                 </main>
//             </body>
