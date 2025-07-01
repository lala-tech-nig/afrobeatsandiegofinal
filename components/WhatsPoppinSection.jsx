"use client";
import React, { useState } from "react";
import VideoCard from "./CardOption";

const INITIAL_COUNT = 8;
const LOAD_MORE_COUNT = 4;

const WhatsPoppinSection = () => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [loading, setLoading] = useState(false);
  
  // Simulate loading more cards (replace with real data if needed)
  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + LOAD_MORE_COUNT);
      setLoading(false);
    }, 800); // Simulate network delay
  };

  return (
    <div
      className="w-full bg-cover bg-center bg-no-repeat py-16 px-6 text-white"
      style={{ backgroundImage: `url('/africabg.png')` }}
    >
      <div className="flex flex-wrap gap-6 justify-center">
        {[...Array(visibleCount)].map((_, i) => (
          <div key={i} className="w-full sm:w-[45%] md:w-[22%]">
            <VideoCard />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        {loading ? (
          <button
            className="bg-white text-black px-6 py-2 rounded-full font-semibold shadow disabled:opacity-60"
            disabled
          >
            Loading...
          </button>
        ) : (
          <button
            className="bg-white text-black px-6 py-2 rounded-full font-semibold shadow hover:bg-gray-200 transition"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default WhatsPoppinSection;
