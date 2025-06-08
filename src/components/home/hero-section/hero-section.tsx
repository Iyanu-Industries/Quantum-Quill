import React from "react";
import { GradientButton } from "../sub-componets";
import Image from "next/image";
import styles from "./hero-section.module.css";
const HeroSection = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <div
        className={`poppins ${styles.poweredButton} md:inline-block hidden   mt-[72px] font-[500] h-[51px] w-[248px] rounded-[36px]  text-white leading-[100%] tracking-[0%]  place-content-center`}
      >
        Powered by Scribe ai
      </div>
      <div className="text-white mt-[32px] poppins hidden md:block leading-[70px] tracking-[0] font-[500]  text-[76px] text-center">
        Your Intelligent
        <br />
        <div className={`${styles.gradientText}`}>Academic Co-Author</div>
      </div>
      {/* mobile view of above text */}
      <div className="mt-[32px] text-white md:hidden leading-[44px] tracking-[-2%] font-[500] text-[36px] text-center">
        Your Intelligent
        <br /> Academic Co-
        <br />
        Author
      </div>

      <div className="manrope text-[#AAAAAA] mt-[16px] leading-[140%] md:text-[16px] text-center text-[18px] font-[400]">
        QuantumQuill helps you draft, edit and
        <br className="md:hidden block" /> publish research-grade writing with
        AI
        <br className="md:hidden block" /> precision.
      </div>

      <GradientButton
        className="mt-[24px] text-[16px] tracking-[0] font-[500] w-[91%] md:w-[212px] poppins rounded-[8px] md:rounded-[100px]"
        height="51px"
        text="Start Writing Now"
      ></GradientButton>

      <div
        className={` mt-[-50px]  ${styles.backgroundBleed} relative w-[100vw] overflow-hidden`}
      >
        <Image
          src="/images/HeroImage.png"
          width={1440}
          height={684}
          alt="hero image"
          className=" w-[100vw] lg:block hidden"
        />
      </div>
      {/* <video
          src={"/videos/herovideo.mp4"}
          loop={true}
          autoPlay={true}
          controls={true}
          className="w-[100vw]"
        ></video> */}
    </div>
  );
};

export default HeroSection;
