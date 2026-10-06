'use client'

import Link from 'next/link'
import { StoreProvider, useStore } from '../components/Store'

function HomeContent() {
  const { menu, cart, addToCart, updateQty, total } = useStore()
  const categories = [...new Set(menu.map(x => x.category))]

  return (
    <main>
      <header className="hero">
        <nav><strong>SUTTIKU</strong><div><a href="#menu">Menu</a><Link href="/admin">Admin</Link></div></nav>
        <div className="heroCopy">
          <p className="eyebrow">SUSHI • LEBANON</p>
          <h1>Fresh sushi,<br/>made to order.</h1>
          <p>Order your favorite rolls, nigiri, sashimi and more. Pay online or cash on delivery.</p>
          <a className="primary" href="#menu">Order now</a>
        </div>
      </header>

      <section id="menu" className="section">
        <div className="sectionHead"><div><p className="eyebrow">OUR MENU</p><h2>Made fresh for every order</h2></div><div className="cartPill">{cart.reduce((a,b)=>a+b.qty,0)} items • ${total.toFixed(2)}</div></div>
        {categories.map(category => (
          <div key={category} className="category">
            <h3>{category}</h3>
            <div className="grid">
              {menu.filter(x => x.category === category).map(item => (
                <article className="card" key={item.id}>
                  <div className="imagePlaceholder">🍣</div>
                  <div className="cardBody">
                    <div className="row"><h4>{item.name}</h4><strong>${item.price.toFixed(2)}</strong></div>
                    <p>{item.description}</p>
                    <button disabled={!item.available} onClick={() => addToCart(item)}>{item.available ? 'Add to cart' : 'Sold out'}</button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>

      <aside className="cartBox">
        <h3>Your order</h3>
        {cart.length === 0 ? <p>Your cart is empty.</p> : cart.map(item => (
          <div className="cartItem" key={item.id}>
            <div><strong>{item.name}</strong><span>${(item.price * item.qty).toFixed(2)}</span></div>
            <div className="qty"><button onClick={()=>updateQty(item.id,item.qty-1)}>-</button><span>{item.qty}</span><button onClick={()=>updateQty(item.id,item.qty+1)}>+</button></div>
          </div>
        ))}
        <div className="total"><span>Total</span><strong>${total.toFixed(2)}</strong></div>
        <Link className={`primary full ${cart.length === 0 ? 'disabled' : ''}`} href={cart.length ? '/checkout' : '#'}>Checkout</Link>
      </aside>
    </main>
  )
}

export default function Page(){ return <StoreProvider><HomeContent/></StoreProvider> }
