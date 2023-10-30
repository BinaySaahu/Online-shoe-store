"use client"

import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const ProductDeatilsCrousel = ({productDetails}) => {
  const images = productDetails?.images
  return (
    <div className='text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]'>
        <Carousel
            infiniteLoop = {false}
            thumbWidth={60}
            showIndicators = {false}
            showStatus = {false}
            className='productCarousel'
        >
            {images?.map((image,idx)=>{
              return(
                <img src={image} key={idx}></img>
              )
            })}

        </Carousel>
      
    </div>
  )
}

export default ProductDeatilsCrousel
