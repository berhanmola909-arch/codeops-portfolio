"use client";

import { useState } from "react";
import DishCard from "./DishCard";

export default function DishList({ dishes, categories }) {
  const [selected, setSelected] = useState("All");

  const filtered =
    selected === "All"
      ? dishes
      : dishes.filter((d) => d.category === selected);

  const grouped = {};
  filtered.forEach((dish) => {
    if (!grouped[dish.category]) grouped[dish.category] = [];
    grouped[dish.category].push(dish);
  });

  const options = ["All", ...categories];

  return (
    <div>
      {/* Filter bar */}
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

      {/* Filtered dish list */}
      <div className="dish-list">
        {Object.entries(grouped).map(([category, items]) => (
          <section key={category} className="category-section">
            <h2 className="category-heading">{category}</h2>
            <div className="dish-grid">
              {items.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}