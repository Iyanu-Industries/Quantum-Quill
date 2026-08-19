"use client";
import React from "react";
import { ReviewCard } from "../sub-components";

interface Review {
  review: string;
  user: string;
  occupation: string;
}

interface RowProps {
  reviews: Review[];
}

const Row = ({ reviews }: RowProps) => {
  const extendedReviews = [...reviews, ...reviews]; // Duplicate for seamless loop
  return (
    <div className=" overflow-hidden">
      <div className={`flex gap-[14px] `} style={{ width: "screen" }}>
        {extendedReviews.map((review, index) => (
          <ReviewCard
            key={index}
            user={review.user}
            review={review.review}
            occupation={review.occupation}
          />
        ))}
      </div>
    </div>
  );
};

export default Row;
