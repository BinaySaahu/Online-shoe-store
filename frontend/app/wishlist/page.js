"use client";

import Loader from "@/components/Loader";
import NoItems from "@/components/NoItems";
import NotloggedIn from "@/components/NotloggedIn";
import Wrapper from "@/components/Wrapper";
import ShowWishlist from "@/components/wishlist/ShowWishlist";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const page = ({ params }) => {
  const [loading, setLoading] = useState(true);
  const [loggedin,setLoggedin] = useState(true);
  const {WishlistItems} = useSelector((state) => state.wishlist);
  
  
  console.log("Id", params.slug);
  const fetchWishlistData = async () => {
    try {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (isLoggedIn) {
        if(WishlistItems){
          setLoading(false);
        }else{
          setLoading(false);
        }
      } else {
        setLoading(false);
        setLoggedin(false);
        console.log("not found");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchWishlistData();
  }, []);
  return (
    <div className="w-full md:py-20">
      <Wrapper>
        {/* Product Grid start */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {productDet?.map((product, idx) => (
              <ProductCard productDet={product} key={idx} />
            ))}
        </div> */}
        {!loading?(
          loggedin?(
            WishlistItems.length > 0 ? (
              <ShowWishlist/>
              ) : (
              <NoItems category = "Wishlist"/>
            )

          ):(
            <NotloggedIn/>
          )
        ):(
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
        {/* Product Grid end */}
      </Wrapper>
    </div>
  );
};

export default page;
