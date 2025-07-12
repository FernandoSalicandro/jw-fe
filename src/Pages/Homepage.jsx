import {useContext} from 'react';
import {ProductContext} from '../Context/ProductContext.jsx';

export default function HomePage() {
    const {products} = useContext(ProductContext);
    return (
        <>
            <main>
                <div className="hero-section">
                    <img src="img\heroFullscreen.png" alt="" />
                </div>

                <h2 className="text-center my-5">JW FOR ...</h2>
                <div className="container">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-2 carousel-container">
                        {products.map(curProduct => (
                             <div className="col" key={curProduct.id}>
                            <div className="card">
                                <div className="card-header">{curProduct.name}</div>
                                <div className="card-body"><img src={curProduct.image_url} alt="" /></div>
                            </div>
                        </div>
                        ))}
                       
                        <div className="col">
                            <div className="card">
                                <div className="card-header">TITOLO DELLA CARD</div>
                                <div className="card-body">TITOLO DELLA CARD</div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card">
                                <div className="card-header">TITOLO DELLA CARD</div>
                                <div className="card-body">TITOLO DELLA CARD</div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card">
                                <div className="card-header">TITOLO DELLA CARD</div>
                                <div className="card-body">TITOLO DELLA CARD</div>
                            </div>
                        </div>
                     
                      
                     
                    </div>
                </div>
               
                



            </main>

        </>
    )
}