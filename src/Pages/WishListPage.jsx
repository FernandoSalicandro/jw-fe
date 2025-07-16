import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useWishList } from '../Context/WishListContext.jsx'
import { ProductContext } from '../Context/ProductContext.jsx'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'

export default function WishListPage() {
    const { products } = useContext(ProductContext);
    const { wishList } = useWishList()
    const navigate = useNavigate();
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        if (wishList.length === 0) return;

        const requests = wishList.map(item => {
            return axios.get(`http://localhost:3000/products/related/${item.slug}`)
                .then(response => response.data)
                .catch(error => {
                    console.log("Errore nel caricamento dei correlati per", item.slug, error);
                    return [];
                });
        });

        Promise.all(requests)
            .then(results => {
                const allRelated = results.flat();

                const uniqueRelated = allRelated.filter((product, index, self) => {
                    const isInWishlist = wishList.some(w => w.id === product.id);
                    const isFirstOccurrence = index === self.findIndex(p => p.id === product.id);
                    return !isInWishlist && isFirstOccurrence;
                });

                setRelatedProducts(uniqueRelated);
            })
            .catch(error => {
                console.error("Errore durante il recupero dei prodotti correlati:", error);
            });

    }, [wishList]);





    return (
        <>
            <main className="main-page">

                <div className="container section-separator p-2"><h1>Your Desires...</h1></div>
                <div className="container row row-cols-1 row-cols-md-2 row-cols-lg-3">
                    {wishList.length > 0 && wishList.map(curWish => (
                        <>
                            <div className="col-md-4 mb-4 image-price" key={curWish.id}>
                                <div className="card h-100 border-0 mb-5">
                                    <img onClick={() => navigate(`/productDetails/${curWish.slug}`)} src={curWish.image_url} className="card-img-top hover-img" alt={curWish.name} />
                                    <div className="card-body text-center">
                                        <h5 className="card-title">{curWish.name}</h5>
                                        <p className="card-text prezzo">{curWish.price} €</p>
                                    </div>
                                </div>
                            </div>

                        </>
                    ))}

                </div>
              
                {relatedProducts.length > 0 && (
                    <>
                        <h2 className="text-center mb-5">May You Like Also...</h2>
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
                            {relatedProducts.map(product => (
                                <div className="col mb-4 image-price" key={product.id}>
                                    <div className="card h-100 border-0 mb-5">
                                        <img
                                            onClick={() => navigate(`/productDetails/${product.slug}`)}
                                            src={product.image_url}
                                            className="card-img-top hover-img"
                                            alt={product.name}
                                        />
                                        <div className="card-body text-center">
                                            <h5 className="card-title">{product.name}</h5>
                                            <p className="card-text prezzo">{product.price} €</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}


            </main>
        </>
    )
}