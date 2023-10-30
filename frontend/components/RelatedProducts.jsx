"use client";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "./ProductCard";
import axios from "axios";
import Loader from "./Loader";

const RelatedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const loadData = async () => {
    try {
      const res = await axios.get(
        "/product/getAllProducts"
      );
      if (res.status === 200) {
        setProducts([...res?.data?.products]);
        setLoading(false);
      } else {
        setLoading(false);
        alert("Error fetching products");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="mt-[50px] md:mt-[100px] mb-[100px] md:mb-0">
      <div className="text-2xl font-bold mb-5">You might also like!</div>
      {loading ? (
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
      ) : (
        <Carousel
          responsive={responsive}
          containerClass="-mx-[10px]"
          itemClass="px-[10px]"
        >
          {products?.map((product, idx) => (
            <ProductCard productDet={product} key={idx} />
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default RelatedProducts;
