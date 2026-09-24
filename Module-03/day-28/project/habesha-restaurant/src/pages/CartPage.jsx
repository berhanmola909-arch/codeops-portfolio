import { Link } from 'react-router-dom'
import EmptyPage from '../components/EmptyPage'
import { getDishImage } from '../data/dishImages'

export default function CartPage({ cart, onUpdate, onRemove }) {
  const subtotal = cart.reduce((sum, item) => sum + (item.priceETB || item.price || 0) * item.quantity, 0)
  const delivery = cart.length > 0 ? 80 : 0
  return <section className="cart-page"><p className="eyebrow">YOUR ORDER</p><h1>Your basket <em>({cart.length})</em></h1>{cart.length === 0 ? <EmptyPage title="Your basket is waiting" /> : <><div className="cart-list">{cart.map((item) => <article className="cart-item" key={item.cartId}><img src={getDishImage(item)} alt={item.nameEn || item.name} /><div className="cart-item-copy"><h2>{item.nameEn || item.name}</h2><p>{item.spiceLevel || item.spice}</p><strong>{(item.priceETB || item.price || 0) * item.quantity} ETB</strong></div><div className="quantity"><button onClick={() => onUpdate(item.cartId, -1)}>-</button><span>{item.quantity}</span><button onClick={() => onUpdate(item.cartId, 1)}>+</button></div><button className="remove" onClick={() => onRemove(item.cartId)}>×</button></article>)}</div><div className="totals"><p><span>Subtotal</span><b>{subtotal} ETB</b></p><p><span>Delivery</span><b>{delivery} ETB</b></p><p className="grand-total"><span>Total</span><b>{subtotal + delivery} ETB</b></p></div><Link className="primary-button full" to="/checkout">Continue to checkout <span>→</span></Link></>}</section>
}
