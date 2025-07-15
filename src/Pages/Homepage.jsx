import { useContext, useRef } from 'react';
import { useParams, useNavigate }  from 'react-router-dom';
import { ProductContext } from '../Context/ProductContext.jsx';

export default function HomePage() {
    const { products } = useContext(ProductContext);
    const carouselRef = useRef(null);
    const {slug} = useParams();
    const navigate = useNavigate();


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
                                            onClick={() => navigate(`/productDetails/${curProduct.slug}`)} 
                                        />
                                        <p className='text-center mt-1 mb-2 text-em'>
                                        {curProduct.name}
                                        </p>
                                    </div>    
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}