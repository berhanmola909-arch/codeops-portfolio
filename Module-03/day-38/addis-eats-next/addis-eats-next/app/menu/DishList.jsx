import DishCard from "./dishCard";

export default function DishList({ dishes }) {
  const grouped = {};
  dishes.forEach((dish) => {
    if (!grouped[dish.category]) grouped[dish.category] = [];
    grouped[dish.category].push(dish);
  });

  return (
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
  );
}