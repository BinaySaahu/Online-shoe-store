import Image from "next/image";
import Link from "next/link";
import React from "react";

const NoItems = ({category}) => {
  return (
    <>
      <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
        <Image
          src="/assets/empty-cart.jpg"
          width={300}
          height={300}
          className="w-[300px] md:w-[400px]"
        />
        <span className="text-xl font-bold">No item in your {category}</span>
        <span className="text-center mt-4">
          Looks like you have not added anything in your wishlist.
          <br />
          Go ahead and explore top categories.
        </span>
        <Link
          href="/"
          className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8"
        >
          Continue Shopping
        </Link>
      </div>
    </>
  );
};

export default NoItems;
