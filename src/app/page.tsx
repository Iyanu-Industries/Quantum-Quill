import GradientButton from "@/components/home/gradient-button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
export default function Home() {
  const [sidebar, setSidebar] = useState(false);
  return (
    <div className="flex justify-center poppins">
      {/* Navbar */}
      <div className="flex items-center ml-[16px] mr-[20px] lg:ml-0 lg:mr-0 mt-[23.5px] lg:mt-[48px] w-[86%]">
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

        <div className="h-[39px] w-[1px] ml-[29.92px] bg-[#1c1c1c] lg:block hidden"></div>
        <div className=" gap-[48px] items-center font-[400] text-[16px]t tracking-[0] text-[#ffffff]/50 ml-[42px] lg:flex hidden">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/features" className="hover:text-white transition-colors">
            Features
          </Link>
          <Link href="/pricing" className="hover:text-white transition-colors">
            Pricing
          </Link>
        </div>

        <div className="ml-auto gap-[24px] items-center lg:flex hidden">
          <Link
            href="/login"
            className="text-[#D9D9D9] hover:text-white transition-colors text-[16px] font-[400] tracking-[0]"
          >
            Login
          </Link>
          <GradientButton
            height="51px"
            width="164px"
            text="Get Started"
            borderRadius="100px"
          ></GradientButton>
        </div>

        {/* Mobile Navbar */}

        <button
          onClick={() => setSidebar(true)}
          className="w-[24px] h-[24px] ml-auto flex items-center lg:hidden"
        >
          <Image
            src={`/icons/menu.svg`}
            alt="Menu Icon"
            width={18}
            height={12}
          />
        </button>

        <div
          className={`fixed h-[500px] w-[250px] rounded-tl-[50px] rounded-bl-[50px] transform ${
            sidebar ? "translate-x-[0%]" : "translate-x-[100%]"
          }  bg-[#6d34c0] right-0 top-0 z-10 pt-10 pr-9`}
        >
          <div className="flex flex-col items-end gap-[24px] text-white">
            {" "}
            <button onClick={() => setSidebar(false)}>
              <Image
                src={`/icons/close.svg`}
                alt="Menu Icon"
                width={24}
                height={24}
              ></Image>
            </button>
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link
              href="/features"
              className="hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="hover:text-white transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/login"
              className="text-white hover:text-white transition-colors text-[16px] font-[400] tracking-[0]"
            >
              Login
            </Link>
            <GradientButton
              height="51px"
              width="164px"
              text="Get Started"
              borderRadius="100px"
            ></GradientButton>
          </div>
        </div>
      </div>
    </div>
  );
}
