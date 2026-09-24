import { Link } from 'react-router-dom'
import menu from '../data/menu.json'
import specials from '../data/specials.json'
import DishCard from '../components/DishCard'

const menuItems = Array.isArray(menu) ? menu : menu.data
const specialItems = Array.isArray(specials) ? specials : specials.data

export default function LandingPage() {
  const highlights = specialItems.slice(0, 3).map((special) => menuItems.find((dish) => dish.id === special.id)).filter(Boolean)
  return <section className="landing-page"><div className="hero-panel"><div className="hero-copy"><p className="eyebrow">FROM ADDIS, WITH LOVE</p><h1>A table full<br />of <em>stories.</em></h1><p>Mesob House brings the warmth of an Ethiopian gathering to every plate.</p><Link className="primary-button" to="/">Explore the menu <span>↗</span></Link></div></div><div className="story-strip"><p className="eyebrow">OUR TRADITION</p><h2>Food tastes better<br /><em>when shared.</em></h2><p>Gather around the mesob and make room for one more. Our dishes are made slowly, generously, and with a little bit of home.</p></div><div className="section-title"><div><p className="eyebrow">HOUSE FAVORITES</p><h2>Worth coming back for</h2></div><Link to="/">See all ↗</Link></div><div className="highlight-row">{highlights.map((dish) => <DishCard key={dish.id} dish={dish} onAdd={() => {}} />)}</div></section>
}
