import { useSearch } from "../Context/SearchContext";
import { useState, useMemo } from "react";

export default function SearchPage() {
  const { searchResults } = useSearch();

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
      <div className="nav-bar search-page-filter border-top-0 page-main d-flex align-items-center">
        <button className="btn btn-outline border-0" disabled>
          Filter By
        </button>
        <div className="d-flex gap-2">
          <button onClick={() => setPriceFilterIsOn(!priceFilterIsOn)} className=" btn btn-outline-dark" data-bs-toggle="button" autocomplete="off">
            Price
          </button>
          <button onClick={() => setInPromoFilterIsOn(!inPromoFilterIsOn)} className=" btn btn-outline-dark" data-bs-toggle="button" autocomplete="off">
            In Promo
          </button>
          <button onClick={() => setRelevanceFilterIsOn(!relevanceFilterIsOn)} className=" btn btn-outline-dark" data-bs-toggle="button" autocomplete="off">
            Relevant
          </button>
        </div>
      </div>
      <div>
        <div className="container mt-5">
          <div className="mb-5">
            <h2>Your Search Results...</h2>
          </div>
          <div className="row">
            {filteredResults.map((product) => (
              <div key={product.id} className="col-md-4 mb-4">
                <div className="card border-0">
                  <img src={product.image_url} className="card-img-top hover-img" alt={product.name} />
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
