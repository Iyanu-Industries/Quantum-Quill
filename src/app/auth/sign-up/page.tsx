import React from "react";
import { AuthBackground } from "@/components/auth/sub-components";
import Link from "next/link";
import GradientButton from "@/components/gradient-button";
import styles from "./sign-up.module.css";
import { signUp } from "@/actions/auth"; // Import the server action

interface SignUpProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function SignUp({ searchParams }: SignUpProps) {
  const error = searchParams?.error; // Access error from URL query parameters

  return (
    <AuthBackground>
      <div className="pt-[88px] poppins text-black overflow-scroll lg:max-w-[665px]">
        <h1 className="font-[500] text-[32px] tracking-[0]">
          Welcome to QuantumQuill
        </h1>
        <p className="font-[400] text-[16px] mt-[4px] leading-[100%]">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Log in
          </Link>
        </p>
        {error && <div className="text-red-500 mt-[16px]">{error}</div>}
        <form action={signUp} className="flex w-full mt-[32px] flex-wrap">
          <div className={`${styles.inputText}`}>
            <h1 className="text-[#666666] tracking-[0] leading-[100%]">
              First Name
            </h1>
            <input
              type="text"
              name="firstName"
              required
              className="w-full pl-[10px] mt-[4px] h-[56px] rounded-[12px] border border-[#66666659]"
            />
          </div>
          <div className={`ml-auto ${styles.inputText} ${styles.marginTop}`}>
            <h1 className="text-[#666666] tracking-[0] leading-[100%]">
              Last Name
            </h1>
            <input
              type="text"
              name="lastName"
              required
              className="h-[56px] w-full pl-[10px] mt-[4px] rounded-[12px] border border-[#66666659]"
            />
          </div>
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
          <div className="flex mt-[8px] flex-wrap gap-x-[26px] gap-y-[16px]">
            <div className="font-[400] text-[14px] leading-[100%] tracking-[0] text-[#66666699] flex items-center gap-[8px]">
              <div className="w-[8px] h-[8px] rounded-[50%] bg-[#66666699]"></div>
              <div>Use 8 or more characters</div>
            </div>
            <div className="font-[400] text-[14px] leading-[100%] tracking-[0] text-[#66666699] flex items-center gap-[8px]">
              <div className="w-[8px] h-[8px] rounded-[50%] bg-[#66666699]"></div>
              <div>One Uppercase character</div>
            </div>
            <div className="font-[400] text-[14px] leading-[100%] tracking-[0] text-[#66666699] flex items-center gap-[8px]">
              <div className="w-[8px] h-[8px] rounded-[50%] bg-[#66666699]"></div>
              <div>One lowercase character</div>
            </div>
            <div className="font-[400] text-[14px] leading-[100%] mr-[21.5px] tracking-[0] text-[#66666699] flex items-center gap-[8px]">
              <div className="w-[8px] h-[8px] rounded-[50%] bg-[#66666699]"></div>
              <div>One special character</div>
            </div>
            <div className="font-[400] text-[14px] leading-[100%] tracking-[0] text-[#66666699] flex items-center gap-[8px]">
              <div className="w-[8px] h-[8px] rounded-[50%] bg-[#66666699]"></div>
              <div>One number</div>
            </div>
          </div>
          <div className="mt-[40px]">
            <input
              type="checkbox"
              name="receiveEmails"
              className="w-[18px] h-[18px] checked:bg-black self-center"
            />
            <span className="ml-[11px]">
              I want to receive emails about the product, feature updates,
              events, and marketing promotions.
            </span>
          </div>
          <div className="mt-[40px]">
            By creating an account, you agree to the Terms of use and Privacy
            Policy.
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
}
