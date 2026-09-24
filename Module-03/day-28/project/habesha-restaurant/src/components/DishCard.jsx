import { Link } from 'react-router-dom'
import { getDishImage } from '../data/dishImages'

export default function DishCard({ dish, onAdd }) {
  return <article className="dish-card"><Link to={`/dish/${dish.id}`}><div className="dish-image"><img src={getDishImage(dish)} alt={dish.nameEn} />{dish.isSpecial && <span className="tag special">SPECIAL</span>}{dish.isFasting && <span className="tag vegan">VEGAN / ጾም</span>}</div><div className="dish-info"><div><h2>{dish.nameEn}</h2><p className="amharic">{dish.nameAm}</p></div><strong className="price">{dish.priceETB} <small>ETB</small></strong></div><p className="dish-description">{dish.description}</p></Link><button className="add-button" onClick={() => onAdd(dish)}>Add to basket <span>+</span></button></article>
}
