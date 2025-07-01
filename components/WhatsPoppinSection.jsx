"use client";
import React, { useState, useEffect } from "react";
import VideoCard from "./CardOption";
import afrobeatsData from "../data/afrobeats";

function getCounts() {
  if (typeof window !== "undefined" && window.innerWidth < 640) {
    // Mobile: initial 3, load more 2
    return { initial: 3, loadMore: 2 };
  }
  // Desktop/tablet: initial 4, load more 4
  return { initial: 4, loadMore: 4 };
}

const WhatsPoppinSection = () => {
  const [counts, setCounts] = useState(getCounts());
  const [visibleCount, setVisibleCount] = useState(counts.initial);
  const [loading, setLoading] = useState(false);

  // Update counts on resize (for responsive behavior)
  useEffect(() => {
    const handleResize = () => {
      const newCounts = getCounts();
      setCounts(newCounts);
      setVisibleCount((prev) =>
        prev < newCounts.initial ? newCounts.initial : prev
      );
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line
  }, []);

  const visibleItems = afrobeatsData.slice(0, visibleCount);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + counts.loadMore);
      setLoading(false);
    }, 800);
  };

  return (
    <div
      className="w-full bg-cover bg-center bg-no-repeat py-16 px-6 text-white"
      style={{ backgroundImage: `url('/africabg.png')` }}
    >
      {/* Section Header */}
<div className="flex flex-col items-center mb-10">
  <div className="w-full max-w-xs sm:max-w-md rounded-2xl bg-white flex justify-center">
    <h2 className="py-5 text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg text-center w-full">
      What's poppin
    </h2>
  </div>
  <div className="mt-3 w-24 sm:w-32 h-3 rounded-2xl bg-white"></div>
</div>

      <div className="flex flex-wrap gap-6 justify-center">
        {visibleItems.map((item) => (
          <div key={item.id} className="w-full sm:w-[45%] md:w-[22%]">
            <VideoCard data={item} />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        {visibleCount >= afrobeatsData.length ? null : loading ? (
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
