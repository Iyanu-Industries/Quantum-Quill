import React from "react";
const GradientButton = ({
  text,
  width,
  height,
  type,
  disabled = false,
  borderRadius,
  textSize = "16px",
  className = "",
}: {
  text: string;
  type?: "submit" | "reset" | "button" | undefined;
  width?: string;
  height: string;
  disabled?: boolean;
  borderRadius?: string;
  className?: string;
  textSize?: string;
}) => {
  return (
    <button
      type={type}
      style={{ width, height, fontSize: textSize, borderRadius }}
      className={`${
        disabled
          ? "bg-[#66666699]"
          : "bg-gradient-to-tr from-[#5D1EED] to-[#D97BFE]"
      } text-white text-center font-[500] shadow-md hover:opacity-90 transition ${className}`}
    >
      {text}
    </button>
  );
};

export default GradientButton;
