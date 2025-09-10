"use client";
import React, { useState } from "react";
import { AuthBackground } from "@/components/auth/sub-components";
import Link from "next/link";
import GradientButton from "@/components/gradient-button";
import styles from "./sign-up.module.css";
import { useRouter } from "next/navigation";

interface SignUpProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function SignUp({ searchParams }: SignUpProps) {
  const router = useRouter();
  interface ApiResponse {
    message: string;
  }

  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const { firstname, lastname, email, password } = userData;
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/routes/user/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstname, lastname, email, password }),
      });

      const data: ApiResponse = await res.json();
      const message = data.message;

      if (res.status === 400) {
        setError(message || "Invalid input");
        setLoading(false);
      } else if (res.status === 200) {
        setError(null);
        router.push("/application/login");
        setLoading(false);
      } else {
        setError("Something went wrong");
      }
    } catch (error: any) {
      setLoading(false);
    } finally {
      setLoading(false);
      router.push("/application/login");
    }
  };
  return (
    <AuthBackground scroll={true}>
      <div className="pt-[88px] poppins text-black overflow-scroll lg:max-w-[665px]">
        <h1 className="font-[500] text-[32px] tracking-[0]">
          Welcome to QuantumQuill
        </h1>
        <p className="font-[400] text-[16px] mt-[4px] leading-[100%]">
          Already have an account?{" "}
          <Link href="/application/login" className="underline">
            Log in
          </Link>
        </p>
        {error && <div className="text-red-500 mt-[16px]">{error}</div>}
        <form onSubmit={onSignUp} className="flex w-full mt-[32px] flex-wrap">
          <div className={`${styles.inputText}`}>
            <h1 className="text-[#666666] tracking-[0] leading-[100%]">
              First Name
            </h1>
            <input
              type="text"
              name="firstname"
              onChange={(e) =>
                setUserData({ ...userData, firstname: e.target.value })
              }
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
              name="lastname"
              onChange={(e) =>
                setUserData({ ...userData, lastname: e.target.value })
              }
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
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
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
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              minLength={8}
              maxLength={20}
              required
              className="w-[100%] pl-[10px] h-[56px] mt-[4px] rounded-[12px] border border-[#66666659]"
            />
          </div>
          <div className="flex mt-[8px] flex-wrap gap-x-[26px] gap-y-[16px]">
            {(() => {
              const checkPassword = (password: string) => ({
                length: password.length >= 8,
                uppercase: /[A-Z]/.test(password),
                lowercase: /[a-z]/.test(password),
                special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
                number: /\d/.test(password),
              });
              const checks = checkPassword(userData.password);
              const getDotClass = (valid: boolean) =>
                `w-[8px] h-[8px] rounded-[50%] ${
                  valid ? "bg-[#5D1EED]" : "bg-[#66666699]"
                }`;
              const getTextClass = (valid: boolean) =>
                `font-[400] text-[14px] leading-[100%] tracking-[0] ${
                  valid ? "text-[#5D1EED]" : "text-[#66666699]"
                }`;
              return (
                <>
                  <div className="font-[400] text-[14px] leading-[100%] tracking-[0] text-[#66666699] flex items-center gap-[8px]">
                    <div className={getDotClass(checks.length)}></div>
                    <div className={getTextClass(checks.length)}>
                      Use 8 or more characters
                    </div>
                  </div>
                  <div className="font-[400] text-[14px] leading-[100%] tracking-[0] text-[#66666699] flex items-center gap-[8px]">
                    <div className={getDotClass(checks.uppercase)}></div>
                    <div className={getTextClass(checks.uppercase)}>
                      One Uppercase character
                    </div>
                  </div>
                  <div className="font-[400] text-[14px] leading-[100%] tracking-[0] text-[#66666699] flex items-center gap-[8px]">
                    <div className={getDotClass(checks.lowercase)}></div>
                    <div className={getTextClass(checks.lowercase)}>
                      One lowercase character
                    </div>
                  </div>
                  <div className="font-[400] text-[14px] leading-[100%] mr-[21.5px] tracking-[0] text-[#66666699] flex items-center gap-[8px]">
                    <div className={getDotClass(checks.special)}></div>
                    <div className={getTextClass(checks.special)}>
                      One special character
                    </div>
                  </div>
                  <div className="font-[400] text-[14px] leading-[100%] tracking-[0] text-[#66666699] flex items-center gap-[8px]">
                    <div className={getDotClass(checks.number)}></div>
                    <div className={getTextClass(checks.number)}>
                      One number
                    </div>
                  </div>
                </>
              );
            })()}
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
            loading={loading}
            className="w-full rounded-[32px] mt-[40px]"
          />
        </form>
      </div>
    </AuthBackground>
  );
}
