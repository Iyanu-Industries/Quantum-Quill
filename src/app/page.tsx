import GradientButton from "@/components/home/gradient-button";
import Image from "next/image";
import Link from "next/link";
import styles from "./home.module.css";
export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Navbar */}
      <div className="flex poppins items-center ml-[16px] mr-[20px] lg:ml-0 lg:mr-0 mt-[23.5px] lg:mt-[48px] w-[86%]">
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
        <input type="checkbox" id="sidebar-toggle" className="hidden" />
        <label
          htmlFor="sidebar-toggle"
          className="w-[24px] h-[24px] ml-auto flex items-center lg:hidden"
        >
          <Image
            src={`/icons/menu.svg`}
            alt="Menu Icon"
            width={18}
            height={12}
          />
        </label>

        <div
          className={`fixed ${styles.sidebar} h-[500px] w-[250px] rounded-tl-[50px] rounded-bl-[50px] transform transition-transform duration-100  bg-[#6d34c0] right-0 top-0 z-10 pt-10 pr-9`}
        >
          <div className="flex flex-col items-end gap-[24px] text-white">
            {" "}
            <label htmlFor="sidebar-toggle">
              <Image
                src={`/icons/close.svg`}
                alt="Menu Icon"
                width={24}
                height={24}
              ></Image>
            </label>
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

      {/* HERO SECTION */}

      <div className="flex flex-col items-center w-full">
        <div
          className={`poppins ${styles.poweredButton} md:inline-block hidden   mt-[72px] font-[500] h-[51px] w-[248px] rounded-[36px]  text-white leading-[100%] tracking-[0%]  place-content-center`}
        >
          Powered by Scribe ai
        </div>
        <div className="text-white mt-[32px] poppins hidden md:block leading-[70px] tracking-[0] font-[500]  text-[76px] text-center">
          Your Intelligent
          <br />
          <div className={`${styles.gradientText}`}>Academic Co-Author</div>
        </div>
        {/* mobile view of above text */}
        <div className="mt-[32px] text-white md:hidden leading-[44px] tracking-[-2%] font-[500] text-[36px] text-center">
          Your Intelligent
          <br /> Academic Co-
          <br />
          Author
        </div>

        <div className="manrope text-[#AAAAAA] mt-[16px] leading-[140%] md:text-[16px] text-center text-[18px] font-[400]">
          QuantumQuill helps you draft, edit and
          <br className="md:hidden block" /> publish research-grade writing with
          AI
          <br className="md:hidden block" /> precision.
        </div>

        <GradientButton
          className="mt-[24px] text-[16px] tracking-[0] font-[500] w-[91%] md:w-[212px] poppins rounded-[8px] md:rounded-[100px]"
          height="51px"
          text="Start Writing Now"
        ></GradientButton>

        <video></video>
      </div>
    </div>
  );
}
