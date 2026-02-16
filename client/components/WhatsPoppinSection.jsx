"use client";
import React, { useState, useEffect } from "react";
import VideoCard from "./CardOption";
import apiClient from "../lib/api";

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
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await apiClient.get('/news');
        setPosts(response.data || []);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

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
  }, []);

  const visibleItems = posts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + counts.loadMore);
      setLoadingMore(false);
    }, 800);
  };

  if (loading) {
    return (
      <div className="w-full py-16 px-6 flex justify-center items-center text-white" style={{ minHeight: '400px', backgroundImage: `url('/africabg.png')` }}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

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
        {visibleItems.length > 0 ? (
          visibleItems.map((item) => (
            <div key={item._id || item.id} className="w-full sm:w-[45%] md:w-[22%]">
              <VideoCard data={item} />
            </div>
          ))
        ) : (
          <p className="text-xl text-white">No news posts available at the moment.</p>
        )}
      </div>

      <div className="flex justify-center mt-8">
        {visibleCount >= posts.length ? null : loadingMore ? (
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
