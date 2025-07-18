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
    const [activeSection, setActiveSection] = useState('workshop');

    const sectionContent = {
        workshop: {
            image: "img/brand-story-img.png",
            title: "Our Workshop",
            text: "In the heart of our atelier, unique and rare jewels are born—each one meticulously handcrafted with care and passion. Every creation is the result of a precious art that blends tradition, elegance, and refinement. Our mission is to offer the world exclusive pieces that tell timeless stories of beauty and embody the essence of true luxury."
        },
        about: {
            image: "img/sopha-img.png",
            title: "We Are JW LUX",
            text: "At JW LUX, we are more than just a jewelry brand. We are artisans, dreamers, and storytellers. Our commitment to excellence and dedication to craftsmanship defines who we are. Each piece we create carries with it our heritage and vision for the future of luxury jewelry."
        },
        boutique: {
            image: "img/sopha-2-img.png",
            title: "Our Boutique",
            text: "Step into our elegant boutique where luxury meets personal service. Our carefully curated spaces offer an intimate shopping experience where each client can discover their perfect piece. Our expert staff is dedicated to guiding you through our collections and helping you find jewelry that speaks to your soul."
        }
    };

    useEffect(() => {
        requestProducts();
    }, []);

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
                <div className="black-div"></div>
                <div className="hero-section">
                    <img src="./img/hero-homepage.png" alt="" />
                </div>

                <h2 className="text-center my-5">JW FOR ...</h2>
                <div className="container position-relative">
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

                    <div
                        ref={carouselRef}
                        className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 carousel-container"
                    >
                        {products && products.map(curProduct => (
                            <div className="col border-0" key={curProduct.id}>
                                <div className="card-body border-0 d-flex flex-column align-items-center gap-2">
                                    <div className={curProduct.is_promo === 1 ? "image-price card-custom overflow border-0 rounded" : "image-price overflow border-0 rounded"}>
                                        <img
                                            onClick={() => navigate(`/productDetails/${curProduct.slug}`)}
                                            src={curProduct.image_url}
                                            alt={curProduct.name}
                                            className="card-img-top hover-img"
                                        />
                                        {curProduct.is_promo === 1 && <img className="discount-logo" src="img/jw_logo_discount.png" alt="logo-discount" />}
                                    </div>
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

                <Quotes
                    text={`"We have woven our hands, our passion, and our time to create jewelry that doesn't follow trends, but tells stories meant to last through time."`}
                    author={"JW LUX"}
                />

                <div className="section-separator"></div>

                <div className="brand-multi-sub mx-5 my-5">
                    <h2 className='text-center'>The World Of JW LUX</h2>
                    <div className='container d-flex gap-3 justify-content-center my-5'>
                        <p
                            onClick={() => setActiveSection('workshop')}
                            className={`position-relative text-decoration-none ${activeSection === 'workshop' ? 'fw-bold' : ''}`}
                            style={{ cursor: 'pointer' }}
                        >
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
                        <p
                            onClick={() => setActiveSection('about')}
                            className={`position-relative text-decoration-none ${activeSection === 'about' ? 'fw-bold' : ''}`}
                            style={{ cursor: 'pointer' }}
                        >
                            We Are JW LUX
                            <span className='position-absolute start-0'
                                style={{
                                    backgroundColor: 'black',
                                    height: '1px',
                                    width: '100%',
                                    bottom: '-8px'
                                }}>
                            </span>
                        </p>
                        <p
                            onClick={() => setActiveSection('boutique')}
                            className={`position-relative text-decoration-none ${activeSection === 'boutique' ? 'fw-bold' : ''}`}
                            style={{ cursor: 'pointer' }}
                        >
                            Our Boutique
                            <span className='position-absolute start-0'
                                style={{
                                    backgroundColor: 'black',
                                    height: '1px',
                                    width: '100%',
                                    bottom: '-8px'
                                }}>
                            </span>
                        </p>
                    </div>

                    <div className="container">
                        <div className="row row-cols-2 d-flex text-center brand-story-img">
                            <div className="col p-0">
                                <img src={sectionContent[activeSection].image} alt="" />
                            </div>
                            <div className="col p-0 text-center px-3">
                                <h3>{sectionContent[activeSection].title}</h3>
                                <p>{sectionContent[activeSection].text}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row row-cols-2 d-flex text-center brand-story-img mt-5">
                        <div className="col p-0 d-flex flex-column justify-content-center align-items-center px-4">
                            <h3>Book an appointment with us</h3>
                            <p className="mb-4">
                                Experience the epitome of luxury with a personalized consultation in our boutique.
                                Our expert team is ready to guide you through our exclusive collections.
                            </p>
                            <button
                                onClick={() => navigate('/contact')}
                                className="btn btn-dark px-4 py-2"
                            >
                                Contact Us
                            </button>
                        </div>
                        <div className="col p-0">
                            <img src="img/brand-story-img.png" alt="Boutique interior" />
                        </div>
                    </div>
                </div>


            </main>
        </>
    );
}