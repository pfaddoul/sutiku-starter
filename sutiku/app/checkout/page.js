'use client'

import Link from 'next/link'
import { useState } from 'react'
import { StoreProvider, useStore } from '../../components/Store'

function CheckoutContent(){
  const { cart, total, createOrder } = useStore()
  const [done, setDone] = useState(null)
  const [form, setForm] = useState({ name:'', phone:'', email:'', address:'', landmark:'', notes:'', payment:'cash' })

  if(done) return <main className="checkoutPage"><div className="success"><div className="bigIcon">✓</div><h1>Order received!</h1><p>Thank you, {done.customer.name}. Your order <strong>{done.id}</strong> was submitted successfully.</p><p>Payment: <strong>{done.customer.payment === 'cash' ? 'Cash on delivery' : 'Online payment'}</strong></p><p>In production, Sutiku will send notifications by email, SMS and WhatsApp here.</p><Link className="primary" href="/">Back to menu</Link></div></main>

  if(!cart.length) return <main className="checkoutPage"><div className="success"><h1>Your cart is empty</h1><Link className="primary" href="/">Browse menu</Link></div></main>

  const submit = e => { e.preventDefault(); setDone(createOrder(form)) }

  return <main className="checkoutPage">
    <div className="checkoutWrap">
      <div>
        <Link href="/">← Back to menu</Link><p className="eyebrow">CHECKOUT</p><h1>Delivery details</h1>
        <form onSubmit={submit} className="formGrid">
          <label>Full name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label>
          <label>Phone number<input required placeholder="+961" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></label>
          <label>Email<input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label>
          <label className="wide">Delivery address<textarea required value={form.address} onChange={e=>setForm({...form,address:e.target.value})}/></label>
          <label>Landmark<input value={form.landmark} onChange={e=>setForm({...form,landmark:e.target.value})}/></label>
          <label>Order notes<input value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}/></label>
          <fieldset className="wide"><legend>Payment method</legend>
            <label className="radio"><input type="radio" name="payment" checked={form.payment==='cash'} onChange={()=>setForm({...form,payment:'cash'})}/> Cash on delivery</label>
            <label className="radio"><input type="radio" name="payment" checked={form.payment==='online'} onChange={()=>setForm({...form,payment:'online'})}/> Pay online</label>
          </fieldset>
          <button className="primary wide" type="submit">Place order • ${total.toFixed(2)}</button>
        </form>
      </div>
      <div className="summary"><h3>Order summary</h3>{cart.map(i=><div className="summaryRow" key={i.id}><span>{i.qty}× {i.name}</span><span>${(i.qty*i.price).toFixed(2)}</span></div>)}<div className="total"><span>Total</span><strong>${total.toFixed(2)}</strong></div></div>
    </div>
  </main>
}

export default function Page(){ return <StoreProvider><CheckoutContent/></StoreProvider> }
