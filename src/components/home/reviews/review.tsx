import React from "react";
import { ReviewCard, ReviewRow } from "../sub-componets";
import { reviews } from "../data/review";
import Marquee from "react-fast-marquee";
const Reviews = () => {
  return (
    <div className="w-screen overflow-hidden">
      <h1 className="font-[600] leading-[110.00000000000001%] tracking-[0%] mt-[172px] text-center text-white poppin text-[48px]">
        What our Users have
        <br /> to say about us.
      </h1>
      <div className="mt-[74px]"></div>
      <Marquee autoFill={true} speed={100} direction="left" pauseOnHover>
        <ReviewRow reviews={reviews} direction="left" />
      </Marquee>
      <div className="mt-[14px]"></div>
      <Marquee autoFill={true} speed={100} direction="right" pauseOnHover>
        <ReviewRow reviews={reviews} direction="left" />
      </Marquee>
    </div>
  );
};

export default Reviews;
