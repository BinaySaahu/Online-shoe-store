"use client";

import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import Loader from "@/components/Loader";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  axios.defaults.baseURL = "http://localhost:8001"
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    
    try {
      const res = await axios.get(
        "/product/getAllProducts"
      );
      if (res.status === 200) {
        setProducts([...res.data.products]);
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
    fetchProducts();
  }, []);


  return (
    <main>
      <HeroBanner />
      <Wrapper>
        {/* Heading and Para start */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Cushioning your Miles
          </div>
          <div className="text-md md:text-xl">
            This is a lightweight Nike ZoomX midsole is combined with increased
            stack heights to help provide cushioning during extended stretches
            of running.
          </div>
        </div>
        {/* Heading and Para end */}

        {/* Product Grid start */}
        {!loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
            {products?.map((product, idx) => (
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
    </main>
  );
}
