import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { Link } from "react-router-dom"


export default function ProductPage() {

    const urlApi = "http://localhost:3000/products"
    const { slug } = useParams();
    const [gioiello, setgioiello] = useState(null)
    const [promo, setPromo] = useState(false)



    useEffect(() => {
        axios.get(`${urlApi}/${slug}`).then((resp) => {
            setgioiello(resp.data)
            console.table(resp.data)
        })
    }, [])





    return (
        <> {gioiello ?
            <body className="body">
                <main className="main">
                    <div className="container">
                        <div className="card margin-top">
                            <img src={gioiello.image_url} className="card-img-top" alt={gioiello.name} />
                            <div className="card-body">
                                <h5 className="card-title">{gioiello.name}</h5>
                                <p className="card-text">{gioiello.description}</p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className={`list-group-item`}><p className={`${gioiello.is_promo === 1 ? 'no-promo' : ''}`}>Price: {gioiello.price}$ </p></li>
                                {gioiello.is_promo === 1 &&
                                    <li className="list-group-item"><p className="promo">Discount Price: {gioiello.discount_price}$
                                    </p></li>
                                }
                                <li className="list-group-item"><p>Stock Quantity: {gioiello.stock_quantity}</p></li>
                            </ul>
                            <div className="card-body">
                                <span><Link className="btn btn-primary">Aggiungi al carrello</Link></span>
                                <span><Link className="btn btn-danger">Aggiungi alla Wishlist</Link></span>
                            </div>
                        </div>
                    </div>
                </main>
            </body>
            : <p>Caricamento in corso...</p>}

        </>
    )

}
