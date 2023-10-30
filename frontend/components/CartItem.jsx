"use client"

import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri"
import { updateCart,removeFromCart } from "@/app/redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const CartItem = ({cartItem}) => {
  const dispatch = useDispatch();
  const User = useSelector((state)=>state.user)
  const updateCartItem = async (e,key)=>{
    var payload = {
      key,
      val: key == "quantity"?parseInt(e.target.value):e.target.value,
      id:cartItem.ProductId
    }
    console.log(payload)
    dispatch(updateCart(payload));
      // const cartObj = {
      //   ProductId: cartItem?._id,
      //   Quantity: payload.val,
      //   UserId: User.User_id,
      // };
      const res = await axios.post(
        "/cart/updateCart",
        payload,{
          headers:{
            Authorization: User.token
          }
        }
      );
      if(res.status === 201){
        console.log("Updated")
  
      }   

  }

  const removeCart = async ()=>{
    const res = await axios.delete(`/cart/delete/${cartItem.ProductId}`,{
      headers:{
        Authorization: User.token
      }
    })
    if(res.status === 200){
      dispatch(removeFromCart(cartItem.ProductId));
    }

  }
  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
        <img src={cartItem.thumbnail} alt={cartItem.name} height={120} width={120} ></img>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
            {cartItem.name}
          </div>
          <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
            {cartItem.subtitle}
          </div>
          <div className="text-sm md:text-md font-medium text-black/[0.5] block mt-2">
            MRP : ${cartItem.price}
          </div>
        </div>
        <div className="text-sm md:text-md font-medium text-black/[0.5] md:block hidden">
          {cartItem.subtitle}
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
            <div className="flex items-center gap-1">
              <div className="font-semibold">Size:</div>
              <select className="hover:text-black" onChange={(e)=> updateCartItem(e,"selectedSize")} >
                {cartItem?.sizes?.map((size,i)=>{
                  return(
                    <option value={size.size} key={i} disabled = {!size.enabled} selected = {size.size === cartItem.selectedSize}>{size.size}</option>
                  )
                })}
              </select>
            </div>
            <div className="flex items-center gap-1">
              <div className="font-semibold">Quantity:</div>
              <select className="hover:text-black" onChange={(e)=> updateCartItem(e,"Quantity")}>
              {Array.from({length:10},(_,i)=>i+1).map((q,i)=>{
                return(
                  <option value={q} key={i} selected = {q === cartItem.Quantity}>{q}</option>

                )
              })}
                
                {/* <option value="1">2</option>
                <option value="1">3</option>
                <option value="1">4</option>
                <option value="1">5</option>
                <option value="1">6</option>
                <option value="1">7</option>
                <option value="1">8</option>
                <option value="1">9</option> */}
              </select>
            </div>
          </div>
          <RiDeleteBin6Line className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]" onClick={removeCart}/>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
 