"use client";
import VideoCard from "./CardOption";

const WhatsPoppinSection = () => {
  return (
    <div
      className="w-full bg-cover bg-center bg-no-repeat py-16 px-6 text-white"
      style={{ backgroundImage: `url('/africabg.png')` }}
    >
      <div className="flex flex-wrap gap-6 justify-center">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-full sm:w-[45%] md:w-[22%]">
            <VideoCard />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatsPoppinSection;
