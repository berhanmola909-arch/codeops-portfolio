import { Link } from 'react-router-dom'

export default function FloatingCartBar({ itemCount, total }) {
  return <Link to="/cart" className="floating-cart"><span>{itemCount} {itemCount === 1 ? 'item' : 'items'} in basket</span><strong>{total} ETB <i>→</i></strong></Link>
}
