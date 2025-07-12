import {useContext, useRef} from 'react';
import {ProductContext} from '../Context/ProductContext.jsx';

export default function HomePage() {
    const {products} = useContext(ProductContext);
    const carouselRef = useRef(null);

    const handleScroll = (direction) => {
        if(carouselRef.current) {
            const scrollAmount = 300;
            const scrollLeft = carouselRef.current.scrollLeft;
            carouselRef.current.scrollTo({
                left : direction === 'left' ? scrollLeft -scrollAmount : scrollLeft + scrollAmount,
                behavior : 'smooth'
            
            })
        }
    }
    return (
        <>
            <main>
                <div className="hero-section">
                    <img src="img\heroFullscreen.png" alt="" />
                </div>

                <h2 className="text-center my-5">JW FOR ...</h2>
                <div className="container">
                    <div
                    ref={carouselRef} 
                    className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-2 carousel-container">
                        {products.map(curProduct => (
                             <div className="col" key={curProduct.id}>
                            <div className="card">
                                <p className='text-center mt-1 mb-0 text-em'>{curProduct.name}</p>
                                <div className="card-body"><img src={curProduct.image_url} alt="" /></div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
               
            </main>

        </>
    )
}