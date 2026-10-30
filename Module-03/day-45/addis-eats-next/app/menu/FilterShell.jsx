"use client";

import { useState } from "react";

export default function FilterShell({ categories, children }) {
  const [selected, setSelected] = useState("All");
  const options = ["All", ...categories];

  return (
    <div>
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
      {/* Pass selected down via React context-like prop through clone */}
      {typeof children === "function" ? children(selected) : children}
    </div>
  );
}