import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../ProductCard";

const ShowWishlist = () => {
  const { WishlistItems } = useSelector((state) => state.wishlist);
  return (
    <>
      <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
        <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
          Your Wishlist
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
        {WishlistItems?.map((product, idx) => (
          <>
            <ProductCard productDet={product} key={idx} isWhishList={true} />
          </>
        ))}
      </div>
    </>
  );
};

export default ShowWishlist;
