import GradientButton from "@/components/home/sub-componets/gradient-button";
import styles from "./home.module.css";
import { Navbar, HeroSection, FeaturesSection } from "@/components/home";
export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
    </div>
  );
}
