import { Link } from 'react-router-dom'

export default function EmptyPage({ title }) {
  return <div className="empty-page"><span>◌</span><h2>{title}</h2><Link to="/" className="primary-button">Browse the menu</Link></div>
}
