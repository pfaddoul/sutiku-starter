'use client'

import Link from 'next/link'
import { useState } from 'react'
import { StoreProvider, useStore } from '../../components/Store'

function AdminContent(){
  const { menu, setMenu, orders, setOrders } = useStore()
  const [tab,setTab]=useState('menu')
  const [draft,setDraft]=useState({name:'',category:'Classic Rolls',description:'',price:'',available:true})
  const add=()=>{ if(!draft.name||!draft.price)return; setMenu([...menu,{...draft,id:`item-${Date.now()}`,price:Number(draft.price)}]); setDraft({name:'',category:'Classic Rolls',description:'',price:'',available:true}) }
  const update=(id,key,val)=>setMenu(menu.map(x=>x.id===id?{...x,[key]:key==='price'?Number(val):val}:x))
  const updateOrder=(id,status)=>setOrders(orders.map(o=>o.id===id?{...o,status}:o))
  return <main className="adminPage">
    <aside className="sidebar"><h2>SUTIKU</h2><button onClick={()=>setTab('menu')}>Menu</button><button onClick={()=>setTab('orders')}>Orders</button><Link href="/">View website</Link></aside>
    <section className="adminContent">
      <div className="adminTop"><div><p className="eyebrow">ADMIN</p><h1>{tab==='menu'?'Menu management':'Orders'}</h1></div></div>
      {tab==='menu' ? <>
        <div className="panel"><h3>Add menu item</h3><div className="adminForm"><input placeholder="Item name" value={draft.name} onChange={e=>setDraft({...draft,name:e.target.value})}/><input placeholder="Category" value={draft.category} onChange={e=>setDraft({...draft,category:e.target.value})}/><input placeholder="Description" value={draft.description} onChange={e=>setDraft({...draft,description:e.target.value})}/><input placeholder="Price USD" type="number" value={draft.price} onChange={e=>setDraft({...draft,price:e.target.value})}/><button onClick={add}>Add item</button></div></div>
        <div className="panel"><h3>Current menu</h3>{menu.map(item=><div className="adminRow" key={item.id}><input value={item.name} onChange={e=>update(item.id,'name',e.target.value)}/><input value={item.category} onChange={e=>update(item.id,'category',e.target.value)}/><input type="number" value={item.price} onChange={e=>update(item.id,'price',e.target.value)}/><label><input type="checkbox" checked={item.available} onChange={e=>update(item.id,'available',e.target.checked)}/> Available</label><button onClick={()=>setMenu(menu.filter(x=>x.id!==item.id))}>Delete</button></div>)}</div>
      </> : <div className="panel"><h3>Incoming orders</h3>{orders.length===0?<p>No orders yet. Place a test order from the website.</p>:orders.map(o=><div className="orderCard" key={o.id}><div className="row"><strong>{o.id}</strong><span>${o.total.toFixed(2)}</span></div><p>{o.customer.name} • {o.customer.phone}</p><p>{o.customer.address}</p><p>{o.items.map(i=>`${i.qty}× ${i.name}`).join(', ')}</p><select value={o.status} onChange={e=>updateOrder(o.id,e.target.value)}><option>New</option><option>Confirmed</option><option>Preparing</option><option>Out for Delivery</option><option>Delivered</option><option>Cancelled</option></select></div>)}</div>}
    </section>
  </main>
}
export default function Page(){return <StoreProvider><AdminContent/></StoreProvider>}
