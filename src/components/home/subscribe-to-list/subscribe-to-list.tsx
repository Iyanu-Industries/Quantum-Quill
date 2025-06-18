"use client";
import React, { useState, FormEvent } from "react";
import { GradientButton } from "../sub-components";
const SubscribeToList = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setEmail("");
      setError("");
    } catch (err) {
      setError("Failed to subscribe. Please try again.");
    }
  };
  return (
    <div className="px-[16px] md:px-0 w-screen flex flex-col items-center">
      <div className="md:mt-[149px] flex-col md:flex-row relative mt-[24px] w-[95%] lg:w-full md:mx-0  max-w-[1240px] flex gap-[10px] items-center pl-0  md:pl-[30px] lg:pl-[80px] border border-[#2A2A2A] rounded-[12px] h-[158px] md:h-[241px] bg-gradient-to-r from-[#1A1A1A] via-[#141414E5]/90 via to-[from-[#1A1A1A]">
        <div className="hidden md:block">
          <h1 className="font-[500] text-[30px] lg:text-[36px] text-white poppins leading-[110.00000000000001%] tracking-[0%]">
            Subscribe to our list
          </h1>
          <p className="w-[302px] font-[400] text-[16px] text-[#DADADA] poppins leading-[20px] tracking-[0%] mt-[19px]">
            Stay up to date with the new updates. Don’t worry we won’t spam.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-[#0A0A0ACC] hidden md:block relative  placeholder:text-[#5A5A5A] text-[16px] font-[400] poppins text-white  w-[500px] lg:w-[536px] h-[71px] ml-auto rounded-[12px] mr-[80px]"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            className="bg-[#0A0A0ACC] pl-[32px] focus:outline-none placeholder:text-[#5A5A5A] text-[16px] font-[400] poppins text-white w-[536px] h-[71px] ml-auto rounded-[12px]"
            placeholder="Enter your email"
          ></input>
          <button
            type="submit"
            className="bg-[#1A1A1A] w-[163px]  hover:bg-[#1A1A1A]/50 focus:bg-[#1A1A1A]/50 transition-colors  h-[63px] text-[16px] font-[500] leading-[20px] tracking-[0%] right-[4px] bottom-[4px] top-[4px] rounded-[12px] absolute"
          >
            Subscribe
          </button>
        </form>
        {error && (
          <p className="absolute -bottom-6 left-0 text-red-500 text-sm poppins">
            {error}
          </p>
        )}
        {/* mobile view */}
        <div className="block md:hidden">
          <h1 className="font-[500]  w-full poppins text-white mt-[20px] text-[18px] leading-[117%] tracking-[-3%] text-center">
            Subscribe to our list
          </h1>{" "}
          <h2 className="text-[#9E9E9E] text-[12px] mt-[8px] text-center leading-[100%] tracking-[-3%] poppins">
            Stay up to date with the new updates.
            <br /> Don’t worry we won’t spam.
          </h2>
          <form onSubmit={handleSubmit} className="mt-[13px]">
            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className="border focus:outline-none text-white border-[#E5E5E5] w-[200px] h-[40px] rounded-[32px] pl-[16px] text-[10px] leading-[117%] tracking-[-3%]"
            ></input>
            <GradientButton
              height="40px"
              text={"Subscribe"}
              width="91.16666412353516px"
              textSize={`10px`}
              className="rounded-[35.33px] ml-[8px] text-[10px] text-center poppins"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubscribeToList;
