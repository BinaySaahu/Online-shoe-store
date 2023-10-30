import React, { useEffect } from 'react'
import Products from './Products'

const OrderedItems = ({orderDet}) => {
  return (
    <div className='flex flex-col h-fit border-[1px] mb-2 rounded-xl shadow-card'>
      <div className='flex justify-between p-2 border-b border-slate-400'>
        <div className=' text-slate-400 text-xs'>Order id: {orderDet.OrderId}</div>
        <div className=' text-slate-400 text-xs'>Total amount: {orderDet.totalAmount}</div>
      </div>
      <div className='flex flex-col p-2 items-center'>
        {orderDet.products.map((product,idx)=>(
          <Products productDet = {product} key={idx}/>
        ))}
      </div>
    </div>
  )
}

export default OrderedItems
