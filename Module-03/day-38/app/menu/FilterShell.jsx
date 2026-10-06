"use client";

import { useState } from "react";

export default function FilterShell({ categories, children }) {
  const [selected, setSelected] = useState("All");

  const options = ["All", ...categories];

  return (
    <div className="filter-shell" data-selected={selected}>
      <div className="filter-bar">
        {options.map((cat) => (
          <button
            key={cat}
            className={selected === cat ? "filter-btn active" : "filter-btn"}
            onClick={() => setSelected(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* The server-rendered DishList arrives here, already as HTML */}
      {children}
    </div>
  );
}