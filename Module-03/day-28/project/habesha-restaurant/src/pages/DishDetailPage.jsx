import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import menu from '../data/menu.json'
import EmptyPage from '../components/EmptyPage'
import OptionGroup from '../components/OptionGroup'
import { getDishImage } from '../data/dishImages'

const menuItems = Array.isArray(menu) ? menu : menu.data

export default function DishDetailPage({ onAdd }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const dish = menuItems.find((item) => item.id === id)
  const [spice, setSpice] = useState(dish?.spiceLevel || '')
  if (!dish) return <EmptyPage title="Dish not found" />
  function addDish() { onAdd(dish, { spice, injera }); navigate('/cart') }
  return <section className="detail-page"><Link to="/" className="back-link">← Back to menu</Link><img className="detail-image" src={getDishImage(dish)} alt={dish.nameEn} /><div className="detail-copy"><p className="eyebrow">{dish.category.toUpperCase()}</p><h1>{dish.nameEn}<span>{dish.nameAm}</span></h1><p className="detail-description">{dish.description}. {dish.servings}.</p><strong className="detail-price">{dish.priceETB} <small>ETB</small></strong><OptionGroup title="Spice profile" options={[dish.spiceLevel]} selected={spice} onSelect={setSpice} /><button className="primary-button full" onClick={addDish}>Add to basket <span>+</span></button></div></section>
}
