import { useRef, } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductsCarousel = ({ products, onCloseSearch }) => {
    const carouselRef = useRef(null);
    const navigate = useNavigate();

    const handleScroll = (direction) => {
        const scrollAmount = 300;
        if (carouselRef.current) {
            carouselRef.current.scrollTo({
                left: direction === 'left' ? carouselRef.current.scrollLeft - scrollAmount : carouselRef.current.scrollLeft + scrollAmount,
                behavior: 'smooth'
            });
        }
    }

    if (!products.length) return null;

    return (
        <div className="container position-relative">
            {/* Bottoni freccia */}
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

            {/* Container con scroll orizzontale */}
            <div
                ref={carouselRef}
                className="d-flex overflow-auto gap-3 pb-2 carousel-container"
                style={{ scrollBehavior: 'smooth' }}
            >
                {products.map(product => (
                    <div
                        key={product.id}
                        className="card flex-shrink-0"
                        style={{ minWidth: '250px', maxWidth: '250px' }}
                    >
                        <img
                            src={product.image_url}
                            className="card-img-top"
                            alt={product.name}
                            style={{ height: '180px', objectFit: 'cover' }}
                        />
                        <div className="card-body text-center">
                            <h6 className="card-title"><strong>{product.name}</strong></h6>
                            <p className="card-text text-muted">{product.price} €</p>
                            <button
                                onClick={() => {
                                    onCloseSearch();
                                    navigate(`/productDetails/${product.slug}`)}}
                                className="btn btn-outline border-0 show-details"
                            >
                                Scopri di Più
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default ProductsCarousel;