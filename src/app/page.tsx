import {
  Navbar,
  HeroSection,
  FeaturesSection,
  WhySection,
  ReviewSection,
  SubscribeToList,
  GetStarted,
  Footer,
} from "@/components/home";
export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <WhySection />
      <ReviewSection />
      <SubscribeToList />
      <GetStarted />
      <Footer />
    </div>
  );
}
