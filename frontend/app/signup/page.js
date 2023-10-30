"use client";
import Loader from "@/components/Loader";
import Wrapper from "@/components/Wrapper";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { TiTick } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { addUser, setToken } from "../redux/slices/userSlice";
import { addMultipleToWishlist } from "../redux/slices/wishListSlice";
import { addMultipleToCart } from "../redux/slices/cartSlice";

const Signup = () => {
  const router = useRouter();
  const [loading, setLaoding] = useState(false);
  const [active, setActive] = useState("");
  const [user, setUser] = useState({
    Email: "",
    Password: "",
    Fname: "",
    Lname: "",
    Gender: "",
    DateOfBirth: "",
    Country: "",
  });
  const dispatch = useDispatch();
  const [err, setErr] = useState("");
  const dataInp = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    console.log("name->", name);
    console.log("value->", value);

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

  console.log(user);

  const handleSubmit = async () => {
    setLaoding(true);
    const { Email, Password, Fname, Lname, Gender, DateOfBirth, Country } =
      user;
    if (Email && Password && Fname && Lname && Gender && DateOfBirth && Country) {
      const obj = {
        Email,
        Password,
        Username: Fname + " " + Lname,
        Gender,
        DateOfBirth,
        Country,
      };
      try {
        const response = await axios.post(
          "/auth/register",
          obj
        );
        console.log(response);

        if (response.status === 200) {
          console.log("Logged in");
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
          router.push("/");
        } else {
          console.log("error");
        }
      } catch (err) {
        setLaoding(false)
        if (err.response.data.code === 2) {
          setErr("Invalid email");
          return;
        }
        if (err.response.data.code === 1) {
          setErr("User already exists");
          return;
        }
        setErr("Unwanted error");
        console.log(err);
      }
    } else {
      setLaoding(false);
      setErr("Please enter all the fields");
    }
  };
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
            BECOME A NIKE MEMBER
          </div>
          <div className="text-[14px]/[22px] font-normal text-center text-[#8d8d8d] py-[14px]">
            Create your Nike Member profile and get first access to the very
            best of Nike products, inspiration and community.
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
            className="border-[1px] border-solid border-[#e5e5e5] rounded-[3px] text-[#8d8d8d] h-[40px] px-[16px] w-full mb-[20px]"
            name="Password"
          />
          <input
            type="text"
            placeholder="First name"
            className="border-[1px] border-solid border-[#e5e5e5] rounded-[3px] text-[#8d8d8d] h-[40px] px-[16px] w-full mb-[20px]"
            name="Fname"
          />
          <input
            type="text"
            placeholder="Last name"
            className="border-[1px] border-solid border-[#e5e5e5] rounded-[3px] text-[#8d8d8d] h-[40px] px-[16px] w-full mb-[20px]"
            name="Lname"
          />
          <input
            type="date"
            placeholder="Date of birth"
            className="border-[1px] border-solid border-[#e5e5e5] rounded-[3px] text-[#8d8d8d] h-[40px] px-[16px] w-full mb-[20px]"
            name="DateOfBirth"
          />
          <div className="text-[11px] text-center py-[8px] text-[#8d8d8d]">
            Get a Nike Member Reward every year on your Birthday.
          </div>
          <select
            className="border-[1px] border-solid border-[#e5e5e5] rounded-[3px] text-[#8d8d8d] h-[40px] px-[16px] w-full mb-[20px] mt-[20px] cursor-pointer"
            name="Country"
          >
            <option hidden>Select a country</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="Germany">Germany</option>
            <option value="London">London</option>
            <option value="Canada">Canada</option>
          </select>
          <div className="flex w-full justify-around items-center">
            <button
              className={`border-[1px] border-solid border-[#e5e5e5] rounded-[3px] h-[40px] w-full mx-[2px] hover:border-black flex justify-center items-center ${
                active == "male" ? "border-black" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                setActive("male");
                dataInp(e);
              }}
              name="Gender"
              value="male"
            >
              {" "}
              {active == "male" && <TiTick />}Male
            </button>
            <button
              className={`border-[1px] border-solid border-[#e5e5e5] rounded-[3px] h-[40px] w-full mx-[2px] hover:border-black flex justify-center items-center ${
                active == "female" ? "border-black" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                setActive("female");
                dataInp(e);
              }}
              name="Gender"
              value="female"
            >
              {" "}
              {active == "female" && <TiTick />}Female
            </button>
          </div>
        </form>
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
          {loading ? (
            <button className="w-full bg-black text-white rounded-[3px] text-[15px] font-oswald font-extrabold px-[16px] h-[40px] flex justify-center items-center opacity-75 cursor-not-allowed">
              <Loader
                primaryColor="#fff"
                secondaryColor="#e0e0e0"
                height={20}
                width={20}
              />
            </button>
          ) : (
            <button
              className="w-full bg-black text-white rounded-[3px] text-[15px] font-oswald font-extrabold px-[16px] h-[40px]"
              onClick={handleSubmit}
            >
              SIGN UP
            </button>
          )}
        </div>
        {err != "" && <div className="text-red-600 mt-1">{err}</div>}
        <div className="text-center my-[30px]">
          <p className="text-[12px]">
            Already a member?{" "}
            <a href="/login" className="font-bold underline">
              Login
            </a>
            .
          </p>
        </div>
      </Wrapper>
    </div>
  );
};

export default Signup;
