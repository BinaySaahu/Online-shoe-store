import Link from "next/link";
import React from "react";
import { BsCart, BsPerson } from "react-icons/bs";
import { CgLogIn } from "react-icons/cg";
import { IoMdHeartEmpty } from "react-icons/io";
import { useSelector } from "react-redux";
import { BiShoppingBag } from "react-icons/bi";
import { IoLogOutOutline } from "react-icons/io5"

const ProfileMenu = () => {
  const User = useSelector((state) => state.user);

  const logOut = ()=>{
    localStorage.clear();
    window.location.reload();
  }
  return (
    <>
      {!User.isLoggedIn ? (
        <div className="flex flex-col top-9 bg-white absolute right-0">
          {" "}
          <Link
            href="/login"
            className=" text-black w-[130px] rounded-sm border-b"
          >
            <li className="h-12 flex justify-between items-center px-3 hover:bg-black/[0.03] rounded-md w-full text-[12px]">
              <p>Login/Sign up</p>
              <span>
                <CgLogIn className="text-[15px] md:text-[20px]" />
              </span>
            </li>
          </Link>
          
          <Link href="/" className="text-black w-[130px] rounded-sm border-b">
            <li className="h-12 flex justify-between items-center px-3 hover:bg-black/[0.03] rounded-md w-full text-[12px] md:hidden">
              <p className="w-full">Wishlist</p>
              <span>
                <IoMdHeartEmpty className="text-[15px] md:text-[20px] w-full" />
              </span>
            </li>
          </Link>
          <Link
            href="/cart"
            className="text-black w-[130px] rounded-sm border-b"
          >
            <li className="h-12 flex justify-between items-center px-3 hover:bg-black/[0.03] rounded-md w-full text-[12px] md:hidden">
              <p>Your cart</p>
              <span>
                <BsCart className="text-[15px] md:text-[20px]" />
              </span>
            </li>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col top-9 bg-white absolute right-0">
          {" "}
          <Link
            href="/orders"
            className=" text-black w-[130px] rounded-sm border-b"
          >
            <li className="h-12 flex justify-between items-center px-3 hover:bg-black/[0.03] rounded-md w-full text-[12px]">
              <p>Orders</p>
              <span>
                <BiShoppingBag className="text-[18px] md:text-[27px]" />
              </span>
            </li>
          </Link>
          
          <Link href="/" className="text-black w-[130px] rounded-sm border-b">
            <li className="h-12 flex justify-between items-center px-3 hover:bg-black/[0.03] rounded-md w-full text-[12px] md:hidden">
              <p className="w-full">Wishlist</p>
              <span>
                <IoMdHeartEmpty className="text-[15px] md:text-[20px] w-full" />
              </span>
            </li>
          </Link>
          <Link
            href="/cart"
            className="text-black w-[130px] rounded-sm border-b"
          >
            <li className="h-12 flex justify-between items-center px-3 hover:bg-black/[0.03] rounded-md w-full text-[12px] md:hidden">
              <p>Your cart</p>
              <span>
                <BsCart className="text-[15px] md:text-[20px]" />
              </span>
            </li>
          </Link>
          <div
            className=" text-black w-[130px] rounded-sm border-b"
            onClick={logOut}
          >
            <li className="h-12 flex justify-between items-center px-3 hover:bg-black/[0.03] rounded-md w-full text-[12px]">
              <p>Logout</p>
              <span>
                <IoLogOutOutline className="text-[18px] md:text-[27px]" />
              </span>
            </li>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileMenu;
