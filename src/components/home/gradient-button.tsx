import React from "react";

const GradientButton = ({
  text,
  width,
  height,
  borderRadius,
  textSize = "16px",
  className = "",
}: {
  text: string;
  width?: string;
  height: string;
  borderRadius?: string;
  className?: string;
  textSize?: string;
}) => {
  return (
    <button
      style={{ width, height, borderRadius }}
      className={`bg-gradient-to-tr from-[#5D1EED] to-[#D97BFE] text-white font-[500] shadow-md hover:opacity-90 transition ${className}`}
    >
      {text}
    </button>
  );
};

export default GradientButton;
