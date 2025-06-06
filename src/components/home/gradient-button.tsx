import React from "react";

const GradientButton = ({
  text,
  width,
  height,
  borderRadius,
  textSize = "16px",
}: {
  text: string;
  width: string;
  height: string;
  borderRadius: string;
  textSize?: string;
}) => {
  return (
    <button
      style={{ width, height, borderRadius }}
      className={`bg-gradient-to-tr from-[#5D1EED] to-[#D97BFE] rounded-[${borderRadius}] text-white font-semibold shadow-md hover:opacity-90 transition`}
    >
      {text}
    </button>
  );
};

export default GradientButton;
