import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function CheckoutPage() {
  const [method, setMethod] = useState('Delivery')
  return <section className="checkout-page"><Link to="/cart" className="back-link">← Your basket</Link><p className="eyebrow">ALMOST THERE</p><h1>Make it <em>yours.</em></h1><div className="toggle-row">{['Delivery', 'Pick-up'].map((item) => <button key={item} className={method === item ? 'selected' : ''} onClick={() => setMethod(item)}>{item}</button>)}</div><label>Full name<input placeholder="e.g. Selam Tesfaye" /></label><label>Phone number<input placeholder="+251 9..." /></label>{method === 'Delivery' && <label>Delivery address<input placeholder="Street, neighborhood" /></label>}<h2 className="payment-title">Payment method</h2><button className="payment-option selected">Cash on {method.toLowerCase()} <span>✓</span></button><button className="primary-button full" onClick={() => alert('Thank you! Your order has been received.')}>Place order <span>→</span></button><p className="secure-note">You can pay when your order arrives.</p></section>
}
