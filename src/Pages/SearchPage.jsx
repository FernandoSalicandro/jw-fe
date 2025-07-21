import { useNavigate, useSearchParams } from "react-router-dom";
import { useSearch } from "../Context/SearchContext";
import { useState, useMemo, useEffect, useContext } from "react";
import { ProductContext } from "../Context/ProductContext.jsx";
import AiAssistantProva from './AiAssistantProva';
import axios from 'axios';


export default function SearchPage() {
  const { products: AllProducts } = useContext(ProductContext);
  const { searchResults, setSearchResults } = useSearch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("query");
  const price = searchParams.get("price") === "1";
  const promo = searchParams.get("promo") === "1";
  const relevant = searchParams.get("relevant") === "1";

  useEffect(() => {
    if (query) {
      axios
        .get(`http://localhost:3000/products?search=${query}`)
        .then((resp) => setSearchResults(resp.data))
        .catch((error) => console.log(error));
    }
  }, [query, setSearchResults]);

  const [priceFilterIsOn, setPriceFilterIsOn] = useState(price);
  const [inPromoFilterIsOn, setInPromoFilterIsOn] = useState(promo);
  const [relevanceFilterIsOn, setRelevanceFilterIsOn] = useState(relevant);

  const updateSearchParams = (newParams) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, "1");
      } else {
        params.delete(key);
      }
    });

    navigate(`?${params.toString()}`, { replace: true });
  };

  const filteredResults = useMemo(() => {
    let results = [...searchResults];

    // Filtro per promo
    if (inPromoFilterIsOn) {
      results = results.filter((product) => product.is_promo === 1);
    }

    // Ordinamento per prezzo
    if (priceFilterIsOn) {
      results.sort((a, b) => b.price - a.price);
    }

    if (relevanceFilterIsOn) {
      results.sort((a, b) => a.name.localeCompare(b.name));
    }

    return results;
  }, [searchResults, inPromoFilterIsOn, priceFilterIsOn, relevanceFilterIsOn]);

  return (
    <>
    <AiAssistantProva />
      <div className="nav-bar search-page-filter border-top-0 d-flex align-items-center gap-4" style={{marginTop: "170px"}}>

        {/* Sezione Sort By */}
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-outline border-0" disabled>
            Sort By
          </button>
          <div className="d-flex gap-2">
            <button
              onClick={() => {
                const newValue = !priceFilterIsOn;
                setPriceFilterIsOn(newValue);
                updateSearchParams({ price: newValue });
              }}
              className="btn btn-outline-dark"
              data-bs-toggle="button"
              autoComplete="off"
            >
              Price
            </button>
            <button
              onClick={() => {
                const newValue = !relevanceFilterIsOn;
                setRelevanceFilterIsOn(newValue);
                updateSearchParams({ relevant: newValue });
              }}
              className="btn btn-outline-dark"
              data-bs-toggle="button"
              autoComplete="off"
            >
              Relevant
            </button>
          </div>
        </div>

        {/* Sezione Filter */}
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-outline border-0" disabled>
            Filter
          </button>
          <button
            onClick={() => {
              const newValue = !inPromoFilterIsOn;
              setInPromoFilterIsOn(newValue);
              updateSearchParams({ promo: newValue });
            }}
            className="btn btn-outline-dark"
            data-bs-toggle="button"
            autoComplete="off"
          >
            In Promo
          </button>
        </div>
      </div>

      <div>
        <div className="container mt-5">
          <div className="mb-5">
            <h2>Your Search Results...</h2>
            <p className="text-secondary small">
              {filteredResults.length === searchResults.length ? `${searchResults.length} items found` : `${filteredResults.length} of ${searchResults.length} items shown`}
            </p>
          </div>
          <div className="row">
            {filteredResults.map((product) => (
              <div key={product.id} className="col-md-4 mb-4">
                <div className="card border-0">
                  <img onClick={() => navigate(`/productDetails/${product.slug}`)} src={product.image_url} alt={product.name} className="card-img-top hover-img" />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.price} €</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
