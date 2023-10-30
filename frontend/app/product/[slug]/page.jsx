"use client";

import ProductDeatilsCrousel from "@/components/ProductDeatilsCrousel";
import RelatedProducts from "@/components/RelatedProducts";
import Wrapper from "@/components/Wrapper";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/app/redux/slices/cartSlice";
import { addToWishlist } from "@/app/redux/slices/wishListSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const productDetails = ({ params }) => {
  const productName = decodeURI(params.slug);
  const [productDetails, setProductDetails] = useState();
  const [selectedSize, setselectedSize] = useState(0);
  const [isWhishListed, setIsWishListed] = useState(false);
  const [err, setErr] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const User = useSelector((state) => state.user);
  const { WishlistItems } = useSelector((state) => state.wishlist);
  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `/product/productDetails/${productName}`
      );
      console.log(response.data.product);
      setProductDetails(response.data.product);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchProductDetails();
  }, []);

  useEffect(() => {
    WishlistItems.forEach((item) => {
      if (item._id === productDetails?._id) {
        setIsWishListed(true);
      }
    });
  }, []);

  const addItem = async () => {
    if (selectedSize !== 0) {

      const obj = {
        ProductId: productDetails._id,
        ...productDetails
      }
      await dispatch(
        addToCart({
          ...obj,
          selectedSize,
          selectedQuantityPrice: productDetails?.price,
        })
      );
      console.log(cart.cartItems);
      const cartObj = {
        _id: productDetails._id,
        UserId: User.User_id,
        name: productDetails.name,
        subtitle: productDetails.subtitle,
        price: productDetails.price,
        // selectedQuantityPrice,
        selectedSize: selectedSize,
        desc: productDetails.desc,
        sizes: productDetails.sizes,
        images: productDetails.images,
        category: productDetails.category,
        thumbnail: productDetails.thumbnail,
      };
      const res = await axios.post(
        "/cart/addtocart",
        cartObj,
        {
          headers:{
            Authorization: User.token
          }
        }
      );
      if (res.status === 200) {
        toast.success("Item added to cart !", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else if (res.status === 201) {
        toast.success("Cart updated!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        toast.success("Something went wrong! Please Try Again Later !", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        // alert("Something went wrong! Please Try Again Later!");
      }
    } else {
      setErr(true);
    }
    // localStorage.setItem("cartItems",cart);
  };
  const addToWishList = async () => {
    // console.log(cart.cartItems)
    const wishlistObj = {
      ProductId: productDetails?._id,
      UserId: User.User_id,
      name: productDetails.name,
      subtitle: productDetails.subtitle,
      price: productDetails.price,
      desc: productDetails.desc,
      sizes: productDetails.sizes,
      images: productDetails.images,
      category: productDetails.category,
      thumbnail: productDetails.thumbnail,
    };
    const res = await axios.post(
      "/wishlist/addtowishlist",
      wishlistObj,{
        headers:{
          Authorization: User.token
        }
      }
    );
    if (res.status === 200) {
      await dispatch(
        addToWishlist({
          ...productDetails,
        })
      );
      toast.success("Item added to wishlist !", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (res.status === 201) {
      toast.success("Already in the wishlist !!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.success("Something went wrong! Please Try Again Later !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      // alert("Something went wrong! Please Try Again Later!");
    }
  };
  // localStorage.setItem("cartItems",cart);
  useEffect(() => {
    setErr(false);
  }, [selectedSize]);
  return (
    <div className="w-full md:py-20">
      <Wrapper>
        <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
          {/* Left col start */}
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] md:max-w-full mx-auto lg:mx-0">
            <ProductDeatilsCrousel productDetails={productDetails} />
          </div>
          {/* Left col end */}
          {/* Right col start */}
          <div className="flex-[1] py-3">
            <div className="text-[34px] font-semibold mb-2 leading-tight">
              {productDetails?.name}
            </div>
            <div className="text-lg mb-5 font-semibold">
              {productDetails?.subtitle}
            </div>
            {/* Product price */}
            <div className="text-lg font-semibold">
              MRP: ${productDetails?.price}
            </div>
            <div className="text-md font-medium text-black/[0.5]">
              incl of all taxes
            </div>
            <div className="text-md font-medium text-black/[0.5] mb-20">
              {"(Also includes all applicable duties)"}
            </div>
            {/* product size start */}
            <div className="mb-10">
              <div className="flex justify-between mb-2">
                <div className="text-md font-semibold">Select size</div>
                <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                  Select guide
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {productDetails?.sizes?.map((size, idx) => (
                  <div
                    className={
                      size.enabled
                        ? `border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer ${
                            selectedSize === size.size && "border-black"
                          }`
                        : `border rounded-md text-center py-3 font-medium hover:border-black cursor-not-allowed bg-black/[0.1] opacity-50`
                    }
                    key={idx}
                    onClick={() => setselectedSize(size.size)}
                  >
                    {size.size}
                  </div>
                ))}
              </div>
              {err && (
                <div className="text-red-600 mt-1">
                  Size selection is required
                </div>
              )}
            </div>
            {/* product size end */}
            <button
              className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-90 mb-3 hover:opacity-75"
              onClick={addItem}
            >
              <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
              />
              Add to Cart
            </button>
            <button
              className="w-full py-4 rounded-full bg-white text-black text-lg font-medium transition-transform active:scale-90 mb-10 hover:opacity-75 flex justify-center items-center gap-2 border border-black"
              onClick={addToWishList}
            >
              Wishlist
              {isWhishListed ? <IoMdHeart /> : <IoMdHeartEmpty />}
            </button>
            <div>
              <div className="text-lg font-bold mb-5">Product Details</div>
              <div className="text-md mb-5">{productDetails?.desc}</div>
            </div>
          </div>
          {/* Right col end */}
        </div>
        <RelatedProducts />
      </Wrapper>
    </div>
  );
};

export default productDetails;
