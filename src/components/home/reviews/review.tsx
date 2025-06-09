import React from "react";
import { ReviewRow } from "../sub-componets";
import { reviews } from "../data/review";
import Marquee from "react-fast-marquee";
import Image from "next/image";
const Reviews = () => {
  return (
    <div className="w-screen overflow-hidden relative">
      <Image
        src={"/images/Star 3.png"}
        width={626.236328125}
        height={626.236328125}
        alt="Star Background"
        className="absolute top-[100px] left-[-100px] z-[-1]"
      />{" "}
      <Image
        src={"/images/Polygon 8 2.png"}
        width={754.5191955566406}
        height={906.4485168457031}
        alt="Star Background"
        className="absolute top-[200px] right-[-350px] z-[-1]"
      />
      <Image
        src={"/images/Polygon 8 2.png"}
        width={754.5191955566406}
        height={906.4485168457031}
        alt="Star Background"
        className="absolute top-[200px] right-[-350px] z-[-1]"
      />
      <h1 className="font-[600] leading-[110.00000000000001%] tracking-[0%] mt-[172px] text-center text-white poppin text-[48px]">
        What our Users have
        <br /> to say about us.
      </h1>
      <div className="mt-[74px]"></div>
      <Marquee
        autoFill={true}
        speed={100}
        direction="left"
        pauseOnHover
        gradient
        gradientColor="#0a0a0a"
        gradientWidth={70}
      >
        <ReviewRow reviews={reviews} direction="left" />
      </Marquee>
      <div className="mt-[14px]"></div>
      <Marquee
        autoFill={true}
        speed={100}
        direction="right"
        pauseOnHover
        gradient
        gradientColor="#0a0a0a"
        gradientWidth={70}
      >
        <ReviewRow reviews={reviews} direction="left" />
      </Marquee>
    </div>
  );
};

export default Reviews;
