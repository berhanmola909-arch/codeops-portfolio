import { useState } from 'react'
import menu from '../data/menu.json'
import DishCard from '../components/DishCard'

const menuItems = Array.isArray(menu) ? menu : menu.data

export default function MenuPage({ onAdd }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const categories = ['All', ...new Set(menuItems.map((dish) => dish.category))]
  const filteredMenu = menuItems.filter((dish) => (category === 'All' || dish.category === category) && `${dish.nameEn} ${dish.nameAm}`.toLowerCase().includes(search.toLowerCase()))
  return <section className="menu-page"><div className="page-heading"><p className="eyebrow">WELCOME TO THE TABLE</p><h1>Eat well,<br /><em>share more.</em></h1><p className="intro">Honest Ethiopian cooking, slow mornings, and a seat waiting for you.</p></div><div className="search-wrap"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search the menu" aria-label="Search menu" /></div><div className="category-row">{categories.map((item) => <button key={item} className={category === item ? 'category active' : 'category'} onClick={() => setCategory(item)}>{item}</button>)}</div><div className="menu-grid">{filteredMenu.map((dish) => <DishCard key={dish.id} dish={dish} onAdd={onAdd} />)}</div>{filteredMenu.length === 0 && <p className="empty-state">No dishes found. Try another search.</p>}</section>
}
