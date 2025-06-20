import React from "react";
import Image from "next/image";
import styles from "./authBackground.module.css";
const Background = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <div
        className={`w-[100%] lg:w-[58%] bg-white pl-[6.11vw] pr-[6.25vw] overflow-scroll pb-[163px] ${styles.scrollbarNone}`}
      >
        {children}
      </div>
      <div className="w-[42%] lg:block hidden h-screen relative overflow-hidden">
        <Image
          src="/images/HeroImage.png"
          alt="bg-image"
          height={1440}
          width={684}
          className="object-cover absolute top-0 bottom-0 right-0 left-0 mt-72"
          style={{ transform: "rotate(90deg) scale(2.2) scaleX(-1)" }}
        />
      </div>
    </div>
  );
};

export default Background;
