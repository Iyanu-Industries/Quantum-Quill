import React from "react";
import { SubscribeToList } from "../sub-components";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="bg-[#0A0A0A] px-[5px] pt-[120px] md:pl-[92px] w-full md:pr-[94px]">
      <div className="flex flex-col gap-6 lg:flex-row xl:gap-[84px] poppins">
        <div>
          <h1 className="poppins text-[26px] text-center md:text-left font-[500] text-[#DDDDDD] tracking-[0%]">
            Subscribe to Newsletter
          </h1>
          <p className="text-[#8A8A8A] text-center md:text-left leading-[120%] mt-[19px] text-[14px] font-[400] manrope">
            Get Monthly insights from founders around the globe.
            <br /> No spam - promise.
          </p>
          <SubscribeToList className="mt-[24px] w-[full]" />
        </div>
        <div className="flex flex-col space-y-6">
          <h1 className="poppins text-[24px] font-[500] text-[#DDDDDD] tracking-[0%]">
            Company
          </h1>
          <Link
            href={"/"}
            className="text-[#8A8A8A] hover:text-[#DDDDDD] text-[18px] tracking-[0%]"
          >
            About
          </Link>
          <Link
            href={"/"}
            className="text-[#8A8A8A] hover:text-[#DDDDDD] text-[18px] tracking-[0%]"
          >
            Careers
          </Link>
          <Link
            href={"/"}
            className="text-[#8A8A8A] hover:text-[#DDDDDD] text-[18px] tracking-[0%]"
          >
            Blog
          </Link>
        </div>
        <div className="flex flex-col space-y-6">
          <h1 className="poppins text-[24px] font-[500] text-[#DDDDDD] tracking Reserva-[0%]">
            Product
          </h1>
          <Link
            href={"/"}
            className="text-[#8A8A8A] hover:text-[#DDDDDD] text-[18px] tracking-[0%]"
          >
            Features
          </Link>
          <Link
            href={"/"}
            className="text-[#8A8A8A] hover:text-[#DDDDDD] text-[18px] tracking-[0%]"
          >
            Pricing
          </Link>
          <Link
            href={"/"}
            className="text-[#8A8A8A] hover:text-[#DDDDDD] text-[18px] tracking-[0%]"
          >
            FAQs
          </Link>
        </div>
        <div className="flex flex-col space-y-6">
          <h1 className="poppins text-[24px] font-[500] text-[#DDDDDD] tracking-[0%]">
            Support
          </h1>
          <Link
            href={"/"}
            className="text-[#8A8A8A] hover:text-[#DDDDDD] text-[18px] tracking-[0%]"
          >
            Help Center
          </Link>
          <Link
            href={"/"}
            className="text-[#8A8A8A] hover:text-[#DDDDDD] text-[18px] tracking-[0%]"
          >
            Contact
          </Link>
        </div>
      </div>
      <div className="flex flex-col md:flex-row mt-[120px] mb-[59px] items-center">
        <div className="flex items-center poppins font-[600] text-[16.67px] lg:text-[25.33px] tracking-[0]">
          <Image
            src={`/logos/logo.svg`}
            alt="Q logo"
            height={38}
            width={34.18}
            className="hidden lg:block"
          />
          <Image
            src={`/logos/logo.svg`}
            alt="Q logo"
            height={25}
            width={22.47}
            className="block lg:hidden"
          />
          <span className="ml-[7.922px] text-white">Quantum Quill</span>
        </div>
        <div className="h-[44px] w-[1px] bg-[#2A2A2A] ml-[36px] hidden lg:block"></div>
        <p className="font-[400] text-[16px] leading-[100%] tracking-[0%] poppins md:ml-[36px] text-[#8A8A8A]">
          @2024 Gen 1. All rights reserved
        </p>
        <div className="flex items-center text-[16px] font-[400] md:ml-auto leading-[50px] gap-[12px] tracking-[0] text-[#8A8A8A] poppins">
          Privacy Policy
          <div className="bg-[#DDDDDD] h-[5px] w-[5px] rounded-[50%]"></div>
          Terms & Conditions
        </div>
      </div>
    </div>
  );
};

export default Footer;
