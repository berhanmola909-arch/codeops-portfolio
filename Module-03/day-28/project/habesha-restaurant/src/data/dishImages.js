const dishImages = [
  'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=700',
  'https://images.unsplash.com/photo-1544025162-d76694265947?w=700',
  'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=700',
  'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=700',
  'https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=700',
  'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=700',
]

export function getDishImage(dish) {
  const imageIndex = Number.parseInt(dish.id.replace('menu-', ''), 10) - 1
  return dish.image || dishImages[imageIndex % dishImages.length]
}
