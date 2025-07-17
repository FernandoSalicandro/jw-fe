import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  // Funzione per ricaricare i prodotti
  const requestProducts = () => {
    return axios
      .get('http://localhost:3000/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Errore nel caricamento prodotti:', err));
  };

  useEffect(() => {
    requestProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, setProducts, requestProducts }}>
      {children}
    </ProductContext.Provider>
  );
}