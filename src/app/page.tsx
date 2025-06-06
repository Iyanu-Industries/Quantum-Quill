import GradientButton from "@/components/home/gradient-button";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div className="flex justify-center poppins">
      {/* Navbar */}
      <div className="flex items-center mt-[48px] w-[1252px]">
        <div className="flex items-center poppins font-[600] text-[25.33px] tracking-[0]">
          <Image
            src={`/logos/logo.svg`}
            alt="Q logo"
            height={38}
            width={34.18}
          />
          <span className="ml-[7.922px] text-white">Quantum Quill</span>
        </div>

        <div className="h-[39px] w-[1px] ml-[29.92px] bg-[#1c1c1c]"></div>
        <div className="flex gap-[48px] items-center font-[400] text-[16px]t tracking-[0] text-[#ffffff]/50 ml-[42px] ">
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

        <div className="flex ml-auto gap-[24px] items-center">
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
      </div>
    </div>
  );
}
