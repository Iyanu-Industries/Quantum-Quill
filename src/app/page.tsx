import GradientButton from "@/components/home/sub-componets/gradient-button";
import styles from "./home.module.css";
import {
  Navbar,
  HeroSection,
  FeaturesSection,
  WhySection,
  ReviewSection,
} from "@/components/home";
export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <WhySection />
      <ReviewSection />
    </div>
  );
}
