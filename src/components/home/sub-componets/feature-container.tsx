import React from "react";

const FeatureContainer = ({
  styles,
  featureName,
  featureDescription,
}: {
  styles: { [key: string]: string };
  featureName: string;
  featureDescription: string;
}) => {
  return (
    <div className="border-[#1A1A1A] z-20 bg-[#0D0D0D] rounded-[6.52px] md:rounded-[12px] pt-[9.79px] pb-[12.64px] md:pt-[16.895px] lg:pt-[24px] md:pb-[22.32px] lg:pb-[32px] px-[9.79px] md:px-[16.895px] lg:px-[24px] border-[1.63px] md:border-[4px] w-[163.5px] h-[154.93765258789062px] md:w-[282.25px] md:h-[267.4688262939453px] lg:w-[27.84722vw] lg:h-[26.389vw] isolate">
      <div
        className={`lg:w-[6.8056vw] w-[39.95760726928711px]  md:w-[69px] md:h-[69px] ${styles.borderGradient} lg:h-[6.8056vw] h-[39.95760726928711px] inline-block bg-gradient-to-t from-[#D97BFE]/12  rounded-[4.89px] md:rounded-[12px]`}
      ></div>
      <div
        style={{
          fontSize:
            "clamp(16.895px, 16.895px + 0.01057 * (100vw - 53.33vw), 24px)",
        }}
        className="poppins mt-[47.3px] md:mt-[81.65px] lg:mt-[8.0556vw] font-[500]  text-[9.79px] md:text-[16.895px] lg:text-[20px] xl:text-[24px] leading-[100%] text-white"
      >
        {featureName}
      </div>

      <div className="md:[5.86px] lg:mt-[8px] mt-[3.36px] manrope text-[#909090] md:text-[11.26px] lg:text-[12px] xl:text-[16px] text-[6.52px] leading-[100%] font-[400]">
        {featureDescription}
      </div>
    </div>
  );
};

export default FeatureContainer;
