import { useContext, useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductContext } from '../Context/ProductContext.jsx';
import { motion } from 'framer-motion';
import Quotes from '../components/Quotes.jsx';

export default function HomePage() {
    const { products, requestProducts } = useContext(ProductContext);
    const carouselRef = useRef(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const [isWorkShop, setIsWorkShop] = useState(false)


useEffect(() => {
    requestProducts();
}, [])

    const handleScroll = (direction) => {
        if (carouselRef.current) {
            const scrollAmount = 300;
            const scrollLeft = carouselRef.current.scrollLeft;
            carouselRef.current.scrollTo({
                left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
                behavior: 'smooth'
            });
        }
    }

    return (
        <>
            <main>
                <div class="black-div"></div>
                <div className="hero-section">
                    <img src="./img/hero-homepage.png" alt="" />
                </div>

                <h2 className="text-center my-5">JW FOR ...</h2>
                <div className="container position-relative">
                    {/* Bottoni di navigazione */}
                    <button
                        className="carousel-btn carousel-btn-left"
                        onClick={() => handleScroll('left')}
                        aria-label="Scroll left"
                    >
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>

                    <button
                        className="carousel-btn carousel-btn-right"
                        onClick={() => handleScroll('right')}
                        aria-label="Scroll right"
                    >
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>

                    {/* Carousel Container */}
                    <div
                        ref={carouselRef}
                        className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 carousel-container"
                    >
                        {products && products.map(curProduct => (
                            <div className="col border-0" key={curProduct.id}>

                                <div className="card-body border-0 d-flex flex-column align-items-center gap-2">
                                    <img
                                        src={curProduct.image_url}
                                        alt={curProduct.name}
                                        className="product-image hover-img"
                                    />
                                    <p className='text-center mt-1 mb-2 text-em'>
                                        {curProduct.name}
                                    </p>
                                    <button
                                        onClick={() => navigate(`/productDetails/${curProduct.slug}`)}
                                        className="btn btn-outline border-0 show-details">
                                        Discover More
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

                {/* Brand Story*/}
                {/* Quotes Section */}
                <Quotes text={`"We have woven our hands, our passion, and our time to create jewelry that doesn’t follow trends, but tells stories meant to last through time."`} author={"JW LUX"} />
                <div className="section-separator"></div>
                {/* Brand Story Sub-section */}
                <div className="brand-multi-sub mx-5 my-5 ">
                    <h2 className='text-center'>The World Of JW LUX</h2>
                    <div className='container d-flex gap-3 justify-content-center my-5'>



                        <p type='button' className='position-relative text-decoration-none'>
                            Our WorkShop
                            <span className='position-absolute start-0'
                                style={{
                                    backgroundColor: 'black',
                                    height: '1px',
                                    width: '100%',
                                    bottom: '-8px'
                                }}>
                            </span>
                        </p>
                        <button type="button" className="btn btn-link">We Are JW Lux</button>
                     <button type="button" className="btn btn-link">We Are JW Lux</button>

                    </div>



                </div>

                <div className="container">
                    <div className="row row-cols-2 d-flex text-cente brand-story-img">
                        <div className="col p-0"><img src="img/brand-story-img.png" alt="" /></div>
                        <div className="col p-0 text-center">Ciao</div>
                    </div>
                    <div className="row row-cols-2 d-flex text-cente brand-story-img">
                        <div className="col p-0">Ciao</div>
                        <div className="col p-0"><img src="img/brand-story-img.png" alt="" /></div>

                    </div>


                </div>


            </main>
        </>
    );
}