import React from "react";
import styles from "./get-started.module.css";
import { GradientButton } from "../sub-components";
import Image from "next/image";

const GetStared = () => {
  return (
    <div className="relative h-[200px] md:h-[573px] overflow-hidden w-full">
      <Image
        src="/images/[removal 3.png"
        fill
        alt="vb"
        style={{ transform: "scale(1)" }}
        className="object-cover z-[-1] aspect-video"
      />
      <div className="poppins font-[500] text-[36px] md:text-[64px] text-white leading-[100%] tracking-[0%] text-center my-[20px] md:mt-[195px] md:mb-[222px]">
        Ready to improve your
        <br /> writing and research with
        <br /> <span className={`${styles.gradientText}`}>Quantum Quill</span>?
        <br />
        <GradientButton
          className="leading-[0] mt-[60px] mx-auto md:block hidden"
          height="53px"
          width="188px"
          text="Get Started"
          borderRadius="36px"
        />
        <GradientButton
          className="leading-[0] mx-auto mt-[10px] md:hidden block"
          height="53px"
          width="188px"
          text="Get Started"
          borderRadius="36px"
        />
      </div>
    </div>
  );
};

export default GetStared;
