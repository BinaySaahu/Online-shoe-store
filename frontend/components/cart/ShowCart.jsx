"use client";

import React, { useMemo } from "react";
import CartItem from "../CartItem";
import { useSelector, useDispatch } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { emptyCart } from "@/app/redux/slices/cartSlice";

const ShowCart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const User = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, val) => total + parseInt(val.selectedQuantityPrice),
      0
    );
  }, [cartItems]);

  const makePayment = async () => {
    console.log("Func called");
    const stripe = await loadStripe(
      "pk_test_51LRdGMSHvE1Ajub2joDHbioEO55qNtevuRhFB3tun0hzsUxvYMhAjU9cBwnbpe14txF5ikFSjFdOQqnZsuVs3WMx00iMhyYIlQ"
    );
    // const body = { product };
    // const headers = {
    //   "Content-Type": "application/json",
    // };
    const obj = {
      ...cartItems,
      subtotal:subtotal
    }

    const response = await axios.post("/order/payment", {
      products: cartItems,
    },{
      headers:{
        Authorization: User.token
      }
    });

    console.log(response);

    if(response.status === 200){
      const result = stripe.redirectToCheckout({
        sessionId: response.data.id,
      });
      if (result.error) {
        console.log(result.error);
      }else{
        const res = await axios.delete('/cart/empty',{
          headers:{
            Authorization: User.token
          }
        });
        if(res.status === 200){
          dispatch(emptyCart())
        }
      }
    }
  };
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-12 py-10">
        <div className="flex-[2]">
          <div className="text-lg font-bold">Cart Items</div>
          {cartItems?.map((cartItem, idx) => (
            <CartItem key={idx} cartItem={cartItem} />
          ))}
        </div>
        <div className="flex-[1]">
          <div className="text-lg font-bold">Summary</div>
          <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
            <div className="flex justify-between">
              <div className="uppercase text-md md:text-lg font-medium text-black">
                SUBTOTAL
              </div>
              <div className="text-md md:text-lg font-medium text-black">
                ${subtotal}
              </div>
            </div>
            <div className="text-sm md:text-md py-5 border-t mt-5">
              The subtotal reflects the total price of your order, including
              duties and taxes, before any applicable discounts. It does not
              include delivery costs and international transaction fees.
            </div>
          </div>
          <button
            className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center"
            onClick={makePayment}
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default ShowCart;
