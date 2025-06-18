"use client";
import React, { FormEvent } from "react";
import { useState } from "react";
import GradientButton from "./gradient-button";
const SubscribeToList = ({ className }: { className: string }) => {
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
    <form
      onSubmit={handleSubmit}
      className={`mt-[13px] h-[54px] lg:w-[444px] flex items-center rounded-[24px] text-[15px] text-white pr-[8px] placeholder:text-[#3A3A3A] pl-[24px] poppins bg-[#1E1E1E66] ${className}`}
    >
      <input
        type="email"
        value={email}
        placeholder="Enter your email"
        onChange={(e) => {
          setEmail(e.target.value);
          setError("");
        }}
        className="w-[308px] focus:outline-none"
      ></input>
      <GradientButton
        height="38px"
        text={"Subscribe"}
        width="128px"
        textSize={`10px`}
        className="rounded-[24px] ml-[8px] text-[10px] text-center poppins"
      />
    </form>
  );
};

export default SubscribeToList;
