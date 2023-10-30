"use client";

import Loader from "@/components/Loader";
import NoItems from "@/components/NoItems";
import NotloggedIn from "@/components/NotloggedIn";
import Wrapper from "@/components/Wrapper";
import OrderedItems from "@/components/orders/OrderedItems";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const page = () => {
  const [orders, setOrders] = useState([]);
  const [loader, setLoader] = useState(true);
  const User = useSelector((state) => state.user);
  // let orders = []

  const getOrderDetails = async () => {
    try {
      if (User.isLoggedIn) {
        const res = await axios.get("/orders/all", {
          headers: {
            Authorization: User.token,
          },
        });
        console.log(res)
        // console.log(res.data.orders);
        if (res.status === 200) {
          setOrders(res?.data?.orders);
          // orders = res.data.orders
        }
        setLoader(false);
        console.log(loader)
      }else{
        setLoader(false)
      }
    } catch (err) {
      console.log(err);
    }
    console.log(orders);
  };

  useEffect(() => {
    console.log("User->",User)
    getOrderDetails();
  }, []);
  return (
    <div className="w-full md:py-20">
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0 ">
          <div className="text-[20px] md:text-[34px] mb-5 font-semibold leading-tight">
            Your Orders
          </div>
        </div>
        {!loader ? (
          User.isLoggedIn ? (
            !orders.length > 0 ? (
              <NoItems category="Orders" />
            ) : (
              <div className="flex flex-col justify-between">
                {orders.map((order, idx) => (
                  <OrderedItems orderDet={order} key={idx} />
                ))}
              </div>
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


        {/* {
          User.isLoggedIn ? (


          ):(
            <NotloggedIn />
          )
        } */}
      </Wrapper>
    </div>
  );
};

export default page;
