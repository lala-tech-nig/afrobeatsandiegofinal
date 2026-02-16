import React, { useState } from 'react';

const SHOPIFY_LINK = "https://your-shopify-link.com"; // Replace with your actual Shopify link

const ShoppingSectionNew = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="w-full flex justify-center items-center py-20 px-2 bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-100">
      <div className="w-full max-w-7xl rounded-[3rem] border-4 border-purple-400 bg-white shadow-2xl flex flex-col items-center p-4 sm:p-10 relative overflow-hidden">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 drop-shadow-lg">
          Our Shop
        </h2>
        <p className="text-lg sm:text-xl text-center mb-10 max-w-3xl text-gray-700 font-medium">
          By shopping with us, you’re not just getting unique and quality products—you’re supporting the heartbeat of the Afrobeats community in San Diego. Every purchase helps us organize more events, empower local artists, and spread the vibrant culture of Afrobeats. Join us in keeping the rhythm alive and making a difference!
        </p>
        <div
          className="w-full relative cursor-pointer group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => window.open(SHOPIFY_LINK, "_blank")}
          tabIndex={0}
          role="button"
          aria-label="Visit our shop"
        >
          <img
            src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80"
            alt="Shop landscape"
            className={`w-full h-64 sm:h-96 object-cover rounded-3xl border-2 border-purple-200 shadow-lg transition duration-500 ${isHovered ? "blur-sm brightness-90 scale-105" : ""}`}
          />
          {/* Overlay for clickable indication */}
          <div className={`absolute inset-0 flex flex-col items-center justify-center rounded-3xl transition duration-500 ${isHovered ? "bg-black/30" : "bg-transparent"}`}>
            <span className={`text-white text-xl sm:text-2xl font-bold opacity-0 group-hover:opacity-100 transition duration-500 ${isHovered ? "opacity-100" : ""}`}>
              Click to Shop Now
            </span>
            <svg className={`mt-4 w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition duration-500 ${isHovered ? "opacity-100" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18m-6-6l6 6-6 6" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingSectionNew;