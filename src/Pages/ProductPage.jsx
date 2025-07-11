import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import {Link} from "react-router-dom"

export default function ProductPage() {

    const urlApi = "http://localhost:3000/products"
    const { id } = useParams();
    const [gioiello, setgioiello] = useState(null)



    useEffect(() => {
        axios.get(`${urlApi}/${id}`).then((resp) => {
            setgioiello(resp.data[0])
        })
    }, [])



    return (
        <> {gioiello ?
            <div className="card">
                <img src={gioiello.image_url} className="card-img-top" alt={gioiello.name} />
                <div className="card-body">
                    <h5 className="card-title">{gioiello.name}</h5>
                    <p className="card-text">{gioiello.description}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Price: {gioiello.price}$</li>
                    <li className="list-group-item">Discount Price: {gioiello.discount_price}$</li>
                    <li className="list-group-item">Stock Quantity: {gioiello.stock_quantity}</li>
                </ul>
                <div class="card-body">
                        <span><Link className="btn btn-primary">Aggiungi al carrello</Link></span>
                        <span><Link className="btn btn-danger">Aggiungi alla Wishlist</Link></span>
                    </div>
            </div>
            : <p>Caricamento in corso...</p>}

        </>
    )
}
