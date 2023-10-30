"use client"

import Loader from "@/components/Loader";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import axios from "axios";
import React, { useEffect, useState } from "react";


const page = ({ params }) => {
  const [loading, setLoading] = useState(true);
  console.log("Id", params.slug);
  const [productDet,setProductDet] = useState([]);
  const fetchCategoryData = async ()=>{
    try{
      const response = await axios.get(`/product/${params.slug}`);
      if(response.status === 200){
        console.log(response.data);
        setProductDet([...response.data.products]);
        setLoading(false);

      }else{
        setLoading(false);
        console.log("not found");
      }

    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    fetchCategoryData()
  },[])
  return (
    <div className="w-full md:py-20">
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
           {params.slug}
          </div>
        </div>
        {/* Product Grid start */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {productDet?.map((product, idx) => (
              <ProductCard productDet={product} key={idx} />
            ))}
        </div> */}
        {!loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
            {productDet?.map((product, idx) => (
              <ProductCard productDet={product} key={idx} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Loader primaryColor="#000000" secondaryColor="#e0e0e0" height = {50} width = {50}/>
            <p className="md:text-[12px] text-[10px] text-[#bcbcbc]">Loading the products...</p>
          </div>
        )}
        {/* Product Grid end */}
      </Wrapper>
    </div>
  );
};

export default page;
