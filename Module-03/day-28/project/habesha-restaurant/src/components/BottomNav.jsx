import { NavLink } from 'react-router-dom'

export default function BottomNav({ itemCount }) {
  const links = [['/home', '⌂', 'Home'], ['/', '◈', 'Menu'], ['/cart', '▱', 'Cart'], ['/login', '○', 'Profile']]
  return <nav className="bottom-nav">{links.map(([path, icon, label]) => <NavLink key={path} to={path} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}><span>{icon}{label === 'Cart' && itemCount > 0 && <i>{itemCount}</i>}</span>{label}</NavLink>)}</nav>
}
