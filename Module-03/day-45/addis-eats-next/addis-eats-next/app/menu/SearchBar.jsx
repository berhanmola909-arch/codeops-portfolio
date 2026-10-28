"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce logic: wait 500ms after typing stops
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 500);
    return () => clearTimeout(timer);
  }, [query]);

  const { data, isLoading } = useSWR(
    debouncedQuery ? `/api/dishes?q=${debouncedQuery}` : null,
    fetcher
  );

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search dishes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      {isLoading && <p className="search-status">Searching...</p>}
      {data && debouncedQuery && (
        <div className="search-results">
          {data.data.length === 0 ? (
            <p className="search-item">No dishes found.</p>
          ) : (
            data.data.map((dish) => (
              <div key={dish.id} className="search-item">
                {dish.nameEn} - Br {dish.priceETB}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}