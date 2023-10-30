"use client";

import Loader from "@/components/Loader";
import NoItems from "@/components/NoItems";
import NotloggedIn from "@/components/NotloggedIn";
import Wrapper from "@/components/Wrapper";
import ShowCart from "@/components/cart/ShowCart";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [loggedin, setLoggedin] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  useEffect(()=>{
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    // if(cartItems){
    //   setLoading(false)
    //   if(!isLoggedIn){
    //     setLoggedin(false)
    //   }
    // }
    if(isLoggedIn){
      setLoggedin(true);
    }
    if(cartItems){
      setLoading(false);
    }

  },[])
  return (
    <div className="w-full md:py-20">
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0 ">
          <div className="text-[20px] md:text-[34px] mb-5 font-semibold leading-tight">
            Shopping Cart
          </div>
        </div>

        {!loading ? (
          loggedin ? (
            cartItems.length > 0 ? (
              <ShowCart />
            ) : (
              <NoItems category = "Cart"/>
            )
          ) : (
            <NotloggedIn />
          )
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Loader
              primaryColor="#000000"
              secondaryColor="#e0e0e0"
              height={50}
              width={50}
            />
            <p className="md:text-[12px] text-[10px] text-[#bcbcbc]">
              Loading the products...
            </p>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default Cart;
