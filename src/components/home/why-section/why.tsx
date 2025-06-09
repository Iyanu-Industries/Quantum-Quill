import React from "react";
import Image from "next/image";
import styles from "./why.module.css";
const Why = () => {
  return (
    <div className="flex flex-col items-center justify-center isolate ">
      <div className="font-[500] md:font-[600] text-[28px] md:text-[48px] poppins leading-[110.00000000000001%] tracking-[0%] mt-[110px] text-white">
        Why QuantumQuill?
      </div>

      {/* mobile view */}
      <div
        className={`${styles.gradientBorder} flex md:hidden flex-col relative items-center justify-center mt-[10.67vw] w-[91.47vw] h-[101.33vw] rounded-[5.35vw] px-[8.91vw] z-50`}
      >
        <div className="h-[49.85vw]">
          <Image
            src={"/images/Total Revenue__.png"}
            width={235.2566680908203}
            height={128.1534423828125}
            alt="Revenue__"
            className="absolute left-[10.4vw] z-20 top-[30.06vw] w-[62.74vw] h-[34.17vw]"
          />
          <Image
            src={"/images/Target Vs Reality___.png"}
            width={136.73037719726562}
            height={46.738311767578125}
            alt="Target Vs Reality"
            className="top-[24.02vw] z-[2] absolute left-[45.52vw] w-[36.46vw] h-[12.46vw]"
          />
          <Image
            src={"/images/Ellipse 9970.png"}
            width={472}
            height={471.9092102050781}
            alt="elipse"
            className="absolute z-[1] top-[-10%] rotate-180 left-[-10%] w-[125.87vw] h-[125.84vw]"
          />
        </div>
        <div className="ml-[-13.33vw] mb-[-7.06vw] font-[600] poppins text-[7.13vw] leading-[100%] tracking-[0%] text-white">
          Accuracy That
          <br /> Matters
        </div>
      </div>
      <div className="hidden md:grid grid-cols-2 h-[371.9092102050781px] max-w-[1240px] mt-[116.91px] px-[6.944vw] xl:px-0">
        <div className="relative">
          <Image
            src={"/images/Total Revenue__.png"}
            width={468}
            height={254.93775939941406}
            alt="Revenue__"
            className="absolute top-[91.98px] w-[32.5vw] h-[17.7vw]"
          />
          <Image
            src={"/images/Target Vs Reality___.png"}
            width={272}
            height={92.97730255126953}
            alt="Target Vs Reality"
            className="top-[43px] absolute left-[18.6111vw] w-[18.88vw] h-[6.3vw]"
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
            <p className="font-[400] mt-[22.9px]  max-w-[590px] text-[16px] leading-[100%] tracking-normal poppins text-[#AAAAAA]">
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
      <div className="hidden md:grid grid-cols-2 h-[371.9092102050781px] max-w-[1240px] mt-[66.98px] px-[6.944vw] xl:px-0">
        <div className="flex items-center justify-center">
          <div>
            <h1 className="font-[500] text-[32px] leading-[50px] tracking-[0] text-white poppins">
              End to End Workflow{" "}
            </h1>
            <p className="font-[400] mt-[22.9px]  max-w-[590px] text-[16px] leading-[100%] tracking-normal poppins text-[#AAAAAA]">
              Easily interpret your data with our intuitive visualization tools.
              From interactive dashboards to detailed reports, our
              visualizations help you quickly identify trends, patterns, and
              opportunities.
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
        <div className="relative">
          <Image
            src={"/images/Total Revenue__.png"}
            width={468}
            height={254.93775939941406}
            alt="Revenue__"
            className="absolute top-[91.98px] w-[32.5vw] h-[17.7vw]"
          />
          <Image
            src={"/images/Target Vs Reality___.png"}
            width={272}
            height={92.97730255126953}
            alt="Target Vs Reality"
            className="top-[43px] absolute left-[18.6111vw] w-[18.88vw] h-[6.3vw]"
          />
          <Image
            src={"/images/Polygon 8.png"}
            width={472}
            height={471.9092102050781}
            alt="elipse"
            className="absolute z-[-1] top-[-100px] rotate-180"
          />
        </div>
      </div>
      {/* mobile view */}
      <div
        className={`${styles.gradientBorder} flex md:hidden flex-col relative items-center justify-center mt-[10.67vw] w-[91.47vw] h-[101.33vw] rounded-[5.35vw] px-[8.91vw] z-50`}
      >
        <div className="h-[49.85vw]">
          <Image
            src={"/images/Total Revenue__.png"}
            width={235.2566680908203}
            height={128.1534423828125}
            alt="Revenue__"
            className="absolute left-[10.4vw] z-20 top-[30.06vw] w-[62.74vw] h-[34.17vw]"
          />
          <Image
            src={"/images/Target Vs Reality___.png"}
            width={136.73037719726562}
            height={46.738311767578125}
            alt="Target Vs Reality"
            className="top-[24.02vw] z-[2] absolute left-[45.52vw] w-[36.46vw] h-[12.46vw]"
          />
          <Image
            src={"/images/Polygon 8.png"}
            width={272}
            height={271.9092102050781}
            alt="elipse"
            className="absolute z-[1] top-[-10%] rotate-180 left-[-10%] w-[125.87vw] h-[125.84vw]"
          />
        </div>
        <div className="ml-[0] mb-[-7.06vw] font-[600] poppins text-[7.13vw] leading-[100%] tracking-[0%] text-white whitespace-nowrap">
          End to End Workflow
        </div>
      </div>
      <div className="hidden md:grid grid-cols-2 h-[371.9092102050781px] max-w-[1240px] mt-[50.83px] px-[6.944vw] xl:px-0">
        <div className="relative">
          <Image
            src={"/images/customers.png"}
            width={468}
            height={254.93775939941406}
            alt="Revenue__"
            className="absolute top-[50.98px] left-[50px] w-[26.225vw] h-[21.913vw]"
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
              AI You Can Trust{" "}
            </h1>
            <p className="font-[400] mt-[22.9px]  max-w-[590px] text-[16px] leading-[100%] tracking-normal poppins text-[#AAAAAA]">
              Dive deep into user behavior to understand how customers interact
              with your product. Identify key touchpoints, track usage patterns,
              and uncover areas for improvement to enhance the user experience.
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
      {/* mobile view */}
      <div
        className={`${styles.gradientBorder} flex md:hidden flex-col relative items-center justify-center mt-[10.67vw] w-[91.47vw] h-[101.33vw] rounded-[5.35vw] px-[8.91vw] z-50`}
      >
        <div className="h-[49.85vw]">
          <Image
            src={"/images/customers.png"}
            width={468}
            height={254.93775939941406}
            alt="Revenue__"
            className="absolute  z-[2] top-[60.98px] left-[50px] w-[51.97vw] h-[43.43vw]"
          />

          <Image
            src={"/images/Ellipse 9970.png"}
            width={472}
            height={471.9092102050781}
            alt="elipse"
            className="absolute z-[1] top-[-10%] rotate-180 left-[-10%] w-[125.87vw] h-[125.84vw]"
          />
        </div>
        <div className="ml-[0] mb-[-7.06vw] font-[600] poppins text-[7.13vw] leading-[100%] tracking-[0%] text-white whitespace-nowrap">
          AI You Can Trust{" "}
        </div>
      </div>
    </div>
  );
};

export default Why;
