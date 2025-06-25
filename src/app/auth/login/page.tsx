import React from "react";
import { AuthBackground } from "@/components/auth/sub-components";
import Link from "next/link";
import GradientButton from "@/components/gradient-button";
import { signUp } from "@/actions/auth"; // Import the server action

const Login = () => {
  return (
    <AuthBackground>
      <div className=" poppins text-black lg:max-w-[665px] w-full">
        <h1 className="font-[500] text-[32px] tracking-[0]">
          Login to QuantumQuill
        </h1>
        <p className="font-[400] text-[16px] mt-[4px] leading-[100%]">
          Don't have an account?{" "}
          <Link href="/login" className="underline">
            Sign Up
          </Link>
        </p>
        <form>
          <div className="w-full mt-[32px]">
            <h1 className="text-[#666666] tracking-[0] leading-[100%]">
              Email
            </h1>
            <input
              type="email"
              name="email"
              required
              className="w-[100%] pl-[10px] h-[56px] mt-[4px] rounded-[12px] border border-[#66666659]"
            />
          </div>
          <div className="w-full mt-[32px] flex flex-wrap">
            <span className="text-[#666666] tracking-[0] leading-[100%]">
              Password
            </span>
            <button
              type="button"
              className="text-[#666666] ml-auto tracking-[0] leading-[100%]"
            >
              Hide
            </button>
            <input
              type="password"
              name="password"
              required
              className="w-[100%] pl-[10px] h-[56px] mt-[4px] rounded-[12px] border border-[#66666659]"
            />
          </div>
          <GradientButton
            type="submit"
            text="Create an Account"
            textSize="22px"
            height="64px"
            className="w-full rounded-[32px] mt-[40px]"
          />
        </form>
      </div>
    </AuthBackground>
  );
};

export default Login;
