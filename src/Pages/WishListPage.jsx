import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useWishList } from "../Context/WishListContext.jsx";
import { ProductContext } from "../Context/ProductContext.jsx";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function WishListPage() {
  const { products } = useContext(ProductContext);
  const { wishList, removeFromWishList, clearWishList } = useWishList();
  const navigate = useNavigate();
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (wishList.length === 0) return;

    const requests = wishList.map((item) => {
      return axios
        .get(`http://localhost:3000/products/related/${item.slug}`)
        .then((response) => response.data)
        .catch((error) => {
          console.log("Errore nel caricamento dei correlati per", item.slug, error);
          return [];
        });
    });

    Promise.all(requests)
      .then((results) => {
        const allRelated = results.flat();

        const uniqueRelated = allRelated.filter((product, index, self) => {
          const isInWishlist = wishList.some((w) => w.id === product.id);
          const isFirstOccurrence = index === self.findIndex((p) => p.id === product.id);
          return !isInWishlist && isFirstOccurrence;
        });

        setRelatedProducts(uniqueRelated);
      })
      .catch((error) => {
        console.error("Errore durante il recupero dei prodotti correlati:", error);
      });
  }, [wishList]);

  return wishList.length === 0 ? (
    <div className="container py-5" style={{marginTop: "100px"}}>
      <p className="text-center fs-4">Your wishlist is empty.</p>
    </div>
  ) : (
    <>
      <main className="main-page">
        <div className="container section-separator p-2 mb-5">
          <h1>Your Desires...</h1>
        </div>
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4">
            {wishList.length > 0 &&
              wishList.map((curWish) => (
                <>
                  <div className="col-md-4 mb-4 image-price" key={curWish.id}>
                    <div className="card h-100 border-0 mb-5">
                      <div className={curWish.is_promo === 1 ? "image-price card-custom overflow border-0 rounded" : "image-price overflow border-0 rounded"}>
                        <img onClick={() => navigate(`/productDetails/${curWish.slug}`)} src={curWish.image_url} alt={curWish.name} className="card-img-top  hover-img" />
                        {curWish.is_promo === 1 && <img className="discount-logo" src="img/jw_logo_discount.png" alt="logo-discount" />}
                      </div>
                      <div className="card-body text-center">
                        <h5 className="card-title">{curWish.name}</h5>
                        {curWish.is_promo === 1 ? (
                          <p className="card-text prezzo">
                            <span>{curWish.discount_price} €</span>
                          </p>
                        ) : (
                          <p className="card-text prezzo">{curWish.price} €</p>
                        )}
                        <button className="btn btn-sm btn-outline show-details mt-2 mb-3" onClick={() => removeFromWishList(curWish.id)} style={{ border: "1px solid black" }}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ))}
          </div>
          <div className="text-end mt-2 mb-4">
            <button className="btn btn-outline text-black show-details me-2" onClick={clearWishList} style={{ border: "1px solid black" }}>
              Clear Whishlist
            </button>
          </div>

          {relatedProducts.length > 0 && (
            <>
              <h2 className="text-center mb-5">May You Like Also...</h2>
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
                {relatedProducts.map((product) => {
                  console.log(product.name, product.is_promo);
                  return (
                    <div className="col mb-4 image-price" key={product.id}>
                      <div className="card h-100 border-0 mb-5">
                        <div className={product.is_promo === 1 ? "image-price card-custom overflow border-0 rounded" : "image-price overflow border-0 rounded"}>
                          <img onClick={() => navigate(`/productDetails/${product.slug}`)} src={product.image_url} alt={product.name} className="card-img-top  hover-img" />
                          {product.is_promo === 1 && <img className="discount-logo" src="img/jw_logo_discount.png" alt="logo-discount" />}
                        </div>
                        <div className="card-body text-center">
                          <h5 className="card-title">{product.name}</h5>
                          {product.is_promo === 1 ? (
                            <p className="card-text prezzo">
                              <span>{product.discount_price} €</span>
                            </p>
                          ) : (
                            <p className="card-text prezzo">{product.price} €</p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
