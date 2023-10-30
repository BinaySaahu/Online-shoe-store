"use client";
import React, { useEffect, useState } from "react";
import Wrapper from "./Wrapper";
import Link from "next/link";
import Menu from "./Menu";
import Image from "next/image";

import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import MenuMobile from "./MenuMobile";
import { BsPerson } from "react-icons/bs";
import ProfileMenu from "./ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { addUser, setToken } from "@/app/redux/slices/userSlice";
import axios from "axios";
import { addMultipleToWishlist } from "@/app/redux/slices/wishListSlice";
import { addMultipleToCart } from "@/app/redux/slices/cartSlice";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatmenu, setShowCatmenu] = useState(false);
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setlastScrollY] = useState(0);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const dispatch = useDispatch();


  const User = useSelector((state)=>state.user);
  const cart = useSelector((state)=>state.cart)
  const wishlist = useSelector((state)=>state.wishlist)

  const controlNav = () => {

    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("-translate-y-[80px]");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("translate-y-0");
    }
    setlastScrollY(window.scrollY);
  };

  useEffect(() => {
    console.log(User);
    console.log(cart);
    window.addEventListener("scroll", controlNav);
    return () => {
      window.removeEventListener("scroll", controlNav);
    };
  }, [lastScrollY]);

  useEffect(()=>{
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if(isLoggedIn){
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      dispatch(addUser(userInfo));
      const token = localStorage.getItem("token")
      dispatch(setToken(token));
    }

  },[])

  const getWishListItems = async ()=>{
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const token = localStorage.getItem("token")
    if(isLoggedIn){
      const response = await axios.get(
        `/wishlist/getAllproducts`,{
          headers:{
            Authorization: token
          }
        }
      );
      if (response.status === 200) {
        console.log(response.data);
  
        await dispatch(
          addMultipleToWishlist([
            ...response?.data?.wishlistItems,
          ])
        );
      } else {
        console.log("not found");
      }

    }
    
  }
  const getCartItems = async ()=>{
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const token = localStorage.getItem("token")
    if(isLoggedIn){
      const response = await axios.get(
        `/cart/getAllproducts`,{
          headers:{
            Authorization: token
          }
        }
      );
      if (response.status === 200) {
         console.log(response.data);
  
        await dispatch(
          addMultipleToCart([
            ...response?.data?.data
          ])
        );
      } else {
        console.log("not found");
      }

    }
    
  }

  useEffect(()=>{
    getWishListItems();
    getCartItems();

  },[])



  return (
    <header
      className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}
    >
      <Wrapper className="h-[40px] flex items-center justify-between">
        <Link href="/">
          <img src="/assets/logo.svg" alt="" className="w-[40px] md:w-[60px]" />
        </Link>
        <Menu showCatmenu={showCatmenu} setShowCatmenu={setShowCatmenu} />
        {mobileMenu && (
          <MenuMobile
            showCatmenu={showCatmenu}
            setShowCatmenu={setShowCatmenu}
            setMobileMenu={setMobileMenu}
          />
        )}
        <div className="flex items-center gap-2 text-black">
          {/* Icon start */}
          <Link href='/wishlist'>
          <div className="w-8 md:w-12 h-8 md:h-12 rounded-full md:flex hidden justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
            <IoMdHeartEmpty className="text-[19px] md:text-[24px]" />
            {User.isLoggedIn && <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px] absolute">
             {wishlist?.WishlistItems?.length}
            </div>}
          </div>
          </Link>
          {/* Icon end */}
          {/* Icon start */}
          <Link href='/cart'>
            <div className="w-8 md:w-12 h-8 md:h-12 rounded-full md:flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative hidden">
              <BsCart className="text-[15px] md:text-[20px]" />
              {User.isLoggedIn && <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px] absolute">
                {cart.cartItems.length}
              </div>}
            </div>
          </Link>

          {/* Icon end */}

          {/* Icon start */}
        <div
            className="w-8 md:w-12 h-8 md:h-12 rounded-full md:flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative hidden"
            onMouseEnter={() => setShowProfileMenu(true)}
            onMouseLeave={() => setShowProfileMenu(false)}
          >
            {User.isLoggedIn?<div className=" h-3/4 object-contain overflow-hidden rounded-full"><Image src = {User.Image} width = {20} height = {20} className="h-full w-full overflow-hidden"></Image></div>:<BsPerson className="text-[18px] md:text-[27px]" />}
            
            {showProfileMenu && <ProfileMenu />}
          </div>
          <div
            className="w-8 md:w-12 h-8 md:h-12 rounded-full md:hidden justify-center items-center hover:bg-black/[0.05] cursor-pointer relative flex"
            onClick={()=>setShowProfileMenu(!showProfileMenu)}
          >
            {User.isLoggedIn?<div className=" h-3/4 object-contain overflow-hidden rounded-full"><Image src = {User.Image} width = {20} height = {20} className="h-full w-full overflow-hidden"></Image></div>:<BsPerson className="text-[18px] md:text-[27px]" />}
            {showProfileMenu && <ProfileMenu />}
          </div>
          {/* Icon end */}

          {/* Mobile icon start */}
          <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative -mr-2 md:hidden">
            {mobileMenu ? (
              <VscChromeClose
                className="text-[16px]"
                onClick={() => setMobileMenu(false)}
              />
            ) : (
              <BiMenuAltRight
                className="text-[20px]"
                onClick={() => setMobileMenu(true)}
              />
            )}
          </div>
          {/* Mobile icon end */}
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
