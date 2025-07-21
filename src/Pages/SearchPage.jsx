import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSearch } from "../Context/SearchContext";
import { useState, useMemo, useEffect } from "react";
import axios from 'axios';

export default function SearchPage() {
  const { searchResults, setSearchResults } = useSearch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate()
  const query = searchParams.get('query')

  useEffect(() => {
    if (query) {
      axios.get(`http://localhost:3000/products?search=${query}`)
        .then(resp => setSearchResults(resp.data))
        .catch(error => console.log(error))
    }
  }, [query, setSearchResults])

  const [priceFilterIsOn, setPriceFilterIsOn] = useState(false);
  const [inPromoFilterIsOn, setInPromoFilterIsOn] = useState(false);
  const [relevanceFilterIsOn, setRelevanceFilterIsOn] = useState(false);

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
      <div className="nav-bar search-page-filter border-top-0 d-flex align-items-center gap-4" style={{marginTop: "170px"}}>
        {/* Sezione Sort By */}
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-outline border-0" disabled>
            Sort By
          </button>
          <div className="d-flex gap-2">
            <button
              onClick={() => setPriceFilterIsOn(!priceFilterIsOn)}
              className="btn btn-outline-dark"
              data-bs-toggle="button"
              autoComplete="off"
            >
              Price
            </button>
            <button
              onClick={() => setRelevanceFilterIsOn(!relevanceFilterIsOn)}
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
            onClick={() => setInPromoFilterIsOn(!inPromoFilterIsOn)}
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
              {filteredResults.length === searchResults.length 
                ? `${searchResults.length} items found`
                : `${filteredResults.length} of ${searchResults.length} items shown`
              }
            </p>
          </div>
          <div className="row">
            {filteredResults.map((product) => (
              <div key={product.id} className="col-md-4 mb-4">
                <div className="card border-0">
                  <img onClick={() => navigate(`/productDetails/${product.slug}`)} src={product.image_url} alt={product.name} className="card-img-top hover-img"/>
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