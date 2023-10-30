"use client";

import { removeFromWishlist } from "@/app/redux/slices/wishListSlice";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

const ProductCard = ({ productDet, isWhishList }) => {
  var actualPrice = productDet?.price - 0.2 * productDet?.price;

  const User = useSelector((state)=>state.user)
  
  const dispatch = useDispatch();
  const [click,setClick] = useState(false);

  const handleDelete = async (e)=>{
    setClick(true);
    e.preventDefault();
    dispatch(removeFromWishlist({ id: productDet._id }))
    const response = await axios.delete(`/wishlist/delete/${productDet._id}`,{
      headers:{
        Authorization: User.token
      }
    });
    // if(response.status === 200){
      console.log(response)
    // }

  }

  return (
    <>
      <Link
        href={`/product/${productDet?.name}`}
        className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
      >
        <img src={productDet?.thumbnail} alt="" className="w-full" />
        <div className="p-4 text-black/[0.9]">
          <div className="flex justify-between">
            <h2 className="text-lg font-medium">{productDet?.name}</h2>
            {isWhishList && (
              <RiDeleteBin6Line
                className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px] z-20"
                onClick={handleDelete}
              />
            )}
          </div>
          <div className="flex items-center text-black/[0.9]">
            <p className="mr-2 text-lg font-semibold">${actualPrice}</p>
            <p className="text-base font-medium line-through">
              ${productDet?.price}
            </p>
            <p className="ml-auto text-base font-medium text-green-500">
              20% off
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
