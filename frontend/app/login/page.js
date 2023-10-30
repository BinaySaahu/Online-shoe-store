"use client";

import Wrapper from "@/components/Wrapper";
import axios from "axios";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import {useDispatch } from "react-redux";
import { addUser,setToken } from "../redux/slices/userSlice";
import { addMultipleToWishlist } from "../redux/slices/wishListSlice";
import { addMultipleToCart } from "../redux/slices/cartSlice";


const page = () => {
  const router = useRouter();
  const[loading,setLaoding] = useState(false);


  // const User = useSelector((state)=>state);
  const dispatch = useDispatch();
  
  const [user, setUser] = useState({
    Email: "",
    Password: "",
  });
  const [err, setErr] = useState("");
  const dataInp = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (value === "") {
      e.target.style.border = "2px solid  #FF0000";
      e.target.style.outline = "none";
    } else {
      e.target.style.border = "2px solid  black";
    }
    if (name === "Email") {
      if (value.indexOf("@") === -1 || value.indexOf(".") === -1) {
        e.target.style.border = "2px solid  #FF0000";
        e.target.style.outline = "none";
      } else {
        e.target.style.borderBottom = "2px solid  black";
      }
    }
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async () => {
    setLaoding(true);
    if (user.Email && user.Password) {
      try{
        const response = await axios.post(
          "/auth/login",
          user
        );
        console.log(response)
        
        if (response.status === 200) {
          router.push('/');
          dispatch(addUser(response.data.user))
          dispatch(setToken(response.data.secrete_token));
          await dispatch(
            addMultipleToWishlist([
              ...response?.data?.wishlistItems,
            ])
          );
          await dispatch(
            addMultipleToCart([
              ...response?.data?.cartItems,
            ])
          );
          console.log("Logged in");
        } else {
          console.log("error");
        }

      }catch(err){
        setLaoding(false);
        if(err.response.data.code === 2){
          setErr("Invalid email");
          return;
        }
        if(err.response.data.code === 4){
          setErr("Invalid password");
          return;
        }
        if(err.response.data.code === 3){
          setErr("User does not exists");
          return;
        }
        setErr("Unwanted error")
        console.log(err);
      }
    } else {
      setErr("Please enter all the fields");
    }
  };

  useEffect(()=>{
    setErr("");
  },[user])

  return (
    <div>
      <Wrapper className="flex flex-col items-center md:max-w-[420px] p-[28px] max-w-[340px]">
        {/* Heading start */}
        <div className="text-center max-w-[800px] mx-auto my-[20px] md:my-[20px] flex flex-col justify-center items-center">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            <img
              src="/assets/logo.svg"
              alt="Company logo"
              className=" object-contain h-[20px]"
            />
          </div>
          <div className="text-[26px] font-extrabold font-oswald">
            YOUR ACCOUNT FOR EVERYTHING NIKE
          </div>
        </div>
        {/* Heading end */}
        <form
          className="flex flex-col items-center w-full mx-auto my-[20px]"
          onChange={dataInp}
        >
          <input
            type="email"
            placeholder="Email address"
            className="border-[1px] border-solid border-[#e5e5e5] rounded-[3px] text-[#8d8d8d] h-[40px] px-[16px] w-full mb-[20px]"
            name="Email"
          />
          <input
            type="password"
            placeholder="Password"
            className="border-[1px] border-solid border-[#e5e5e5] rounded-[3px] text-[#8d8d8d] h-[40px] px-[16px] w-full "
            name="Password"
          />
        </form>
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name=""
              id=""
              className="w-[20px] h-[20px] rounded-[3px] border-[1px] border-solid border-[#bcbcbc] checked:accent-[#e8e8e8] checked:border-[1px] checked:border-solid checked:border-[#bcbcbc]"
            />
            <label className="md:text-[12px] text-[10px]">
              Keep me signed in
            </label>
          </div>
          <Link href="/" className="md:text-[12px] text-[10px] text-[#bcbcbc]">
            Forgotten your password?
          </Link>
        </div>
        <div className="text-center my-[30px]">
          <p className="text-[12px]">
            By logging in, you agree to Nike's{" "}
            <a href="/" className="font-bold underline">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="/" className="font-bold underline">
              Terms of Use
            </a>
            .
          </p>
        </div>
        <div className="w-full">
          {loading?(
            <button className="w-full bg-black text-white rounded-[3px] text-[15px] font-oswald font-extrabold px-[16px] h-[40px] flex justify-center items-center opacity-75 cursor-not-allowed">
              <Loader primaryColor="#fff" secondaryColor="#e0e0e0" height={20} width={20}/>
            </button>
          ):(<button
            className="w-full bg-black text-white rounded-[3px] text-[15px] font-oswald font-extrabold px-[16px] h-[40px] flex justify-center items-center"
            onClick={handleSubmit}
          >
            SIGN IN
          </button>)}
        </div>
        {err != "" && <div className="text-red-600 mt-1">{err}</div>}
        <div className="text-center my-[30px]">
          <p className="text-[12px]">
            Not a Member?{" "}
            <a href="/signup" className="font-bold underline">
              Join Us
            </a>
            .
          </p>
        </div>
      </Wrapper>
    </div>
  );
};

// exports.module =  withAuth(Profile);

export default page;
