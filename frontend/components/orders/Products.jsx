import Image from 'next/image'
import React from 'react'

const Products = ({productDet}) => {
  return (
    <div className='flex justify-between w-3/4 items-center border-b border-slate-300 border-t p-2'>
        <div>
            <img
                src={productDet.image}
                height={30}
                width={30}
            />
        </div>
        <div className='text-sm'>{productDet?.name}</div>
        <div className='text-slate-400 text-sm'>Price: {productDet.price}</div>
        <div className='text-slate-400 text-xs'>Qty: {productDet.Quantity}</div>
        <div className='text-slate-400 text-xs'>Size: {productDet.size}</div>
      
    </div>
  )
}

export default Products
