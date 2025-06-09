import React from "react";
import Image from "next/image";
const Why = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="font-[600] text-[48px] poppins leading-[110.00000000000001%] tracking-[0%] mt-[110px] text-white">
        Why QuantumQuill?
      </div>
      <div className="grid grid-cols-2 h-[371.9092102050781px] max-w-[1240px] mt-[116.91px]">
        <div className="relative">
          <Image
            src={"/images/Total Revenue__.png"}
            width={468}
            height={254.93775939941406}
            alt="Revenue__"
            className="absolute top-[91.98px]"
          />
          <Image
            src={"/images/Target Vs Reality___.png"}
            width={272}
            height={92.97730255126953}
            alt="Target Vs Reality"
            className="top-[43px] absolute left-[268px]"
          />
          <Image
            src={"/images/Ellipse 9970.png"}
            width={472}
            height={471.9092102050781}
            alt="elipse"
            className="absolute z-[-1] top-[-100px] rotate-180"
          />
        </div>
        <div className="flex items-center justify-center">
          <div>
            <h1 className="font-[500] text-[32px] leading-[50px] tracking-[0] text-white poppins">
              Accuracy That Matters
            </h1>
            <p className="font-[400] mt-[22.9px] w-[590px] text-[16px] leading-[100%] tracking-normal poppins text-[#AAAAAA]">
              Seamlessly gather data from multiple sources including CRM
              systems, user feedback, website analytics, and more. Our platform
              integrates effortlessly with your existing tools to provide a
              holistic view of your business.
            </p>
            <button className="bg-[#1A1A1A] focus:hover:bg-[#1A1A1A]/50 text-white flex gap-[22px] items-center h-[42.989505767822266px] w-[175px] pl-[25px] mt-[31.99px] rounded-[8px] poppins">
              Learn More
              <svg
                width="16"
                height="12"
                viewBox="0 0 16 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 5.14819C0.585786 5.14819 0.25 5.48398 0.25 5.89819C0.25 6.31241 0.585786 6.64819 1 6.64819L1 5.14819ZM15.5303 6.42852C15.8232 6.13563 15.8232 5.66076 15.5303 5.36786L10.7574 0.594893C10.4645 0.302 9.98959 0.302 9.6967 0.594893C9.40381 0.887787 9.40381 1.36266 9.6967 1.65555L13.9393 5.89819L9.6967 10.1408C9.40381 10.4337 9.40381 10.9086 9.6967 11.2015C9.98959 11.4944 10.4645 11.4944 10.7574 11.2015L15.5303 6.42852ZM1 6.64819L15 6.64819L15 5.14819L1 5.14819L1 6.64819Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Why;
