import React from "react";
import { FeatureContainer } from "../sub-componets";
import styles from "./features-section.module.css";
import { features } from "../data/features";
import Image from "next/image";
const FeaturesSection = () => {
  return (
    <div className="sm:px-[16px] lg:px-[6.5972vw] grid grid-cols-2 lg:grid-cols-3 gap-x-[2%] gap-y-[1%] sm:gap-[16.25px] md:gap-[24px] mt-[110px] relative">
      <div className={`${styles.gradientOverlay} hidden lg:block`}>
        <Image
          src="/images/Pink.svg"
          alt="Gradient Overlay"
          width={800}
          height={800}
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ zIndex: -1 }}
        />{" "}
        <Image
          src="/images/Pink.svg"
          alt="Gradient Overlay"
          width={800}
          height={800}
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ zIndex: -1 }}
        />{" "}
        <Image
          src="/images/Pink.svg"
          alt="Gradient Overlay"
          width={800}
          height={800}
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ zIndex: -1 }}
        />{" "}
        <Image
          src="/images/Pink.svg"
          alt="Gradient Overlay"
          width={800}
          height={800}
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ zIndex: -1 }}
        />{" "}
      </div>

      {features.map((feature, index) => (
        <FeatureContainer
          key={index}
          styles={styles}
          featureName={feature.featureName}
          featureDescription={feature.featureDescription}
        />
      ))}
    </div>
  );
};

export default FeaturesSection;
