import React from "react";

const ReviewCard = ({
  review,
  user,
  occupation,
}: {
  review: string;
  user: string;
  occupation: string;
}) => {
  return (
    <div className="lg:w-[510px] w-[255px] h-[156px] min-w-[255px] lg:min-w-[510px] lg:h-[312px] bg-[#0D0D0DE5] flex flex-col items-center border-[0.5px] lg:border-[1px] border-[#1A1A1A] rounded-[12px]">
      <p className="text-[10px] lg:text-[20px] poppins text-[#A9A9A9] w-[210.99998474121094px] lg:w-[374px] text-center mt-[28.5px] lg:mt-[57px] font-[400]">
        {review}
      </p>
      <h2 className="lg:mt-[32px] mt-[16px] text-[12px] lg:text-[24px] text-[#CACACA] poppins">
        {user}
      </h2>
      <p className="text-[8px] lg:text-[16px] clash-display text-[#A9A9A9] leading-[100%] mt-[10.98px] lg:mt-[20.98px]">
        {occupation}
      </p>
    </div>
  );
};

export default ReviewCard;
