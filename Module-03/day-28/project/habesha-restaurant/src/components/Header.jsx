import { Link } from 'react-router-dom'

export default function Header({ itemCount }) {
  return <header className="site-header"><Link to="/home" className="brand"><span className="brand-mark">M</span><span><strong>Mesob House</strong><small>HABESHA RESTAURANT</small></span></Link><div className="header-actions"><Link to="/login" className="avatar" aria-label="Open account">A</Link><Link to="/cart" className="basket" aria-label={`Cart with ${itemCount} items`}>bag <b>{itemCount}</b></Link></div></header>
}
