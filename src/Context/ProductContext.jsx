import {createContext} from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';

export const ProductContext = createContext();

export const ProductProvider = ({children}) => {
    const [products, setProducts] = useState([]);


    useEffect(()=>{

        axios.get('http://localhost:3000/products')
        .then(res => setProducts(res.data))
        .catch(err => console.log(err))
    }, [])

    return (
        <ProductContext.Provider value={{products, setProducts}}>
            {children}
        </ProductContext.Provider>
    )
}
