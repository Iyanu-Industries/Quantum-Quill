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
    <div className="w-[510px] min-w-[510px] h-[312px] bg-[#0D0D0DE5] flex flex-col items-center border-[1px] border-[#1A1A1A] rounded-[12px]">
      <p className="text-[20px] poppins text-[#A9A9A9] w-[374px] text-center mt-[57px] font-[400]">
        {review}
      </p>
      <h2 className="mt-[32px] text-[24px] text-[#CACACA] poppins">{user}</h2>
      <p className="text-[16px] clash-display text-[#A9A9A9] leading-[100%] mt-[20.98px]">
        {occupation}
      </p>
    </div>
  );
};

export default ReviewCard;
