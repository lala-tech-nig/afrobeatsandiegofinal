'use client';
import React from 'react';
import { CheckCircle } from 'lucide-react';

const VideoCard = ({ data }) => {
  if (!data) return null;

  const handleClick = () => {
    window.open(data.link, "_blank");
  };

  return (
    <div
      className="max-w-sm rounded-lg overflow-hidden shadow-md bg-gray-900 text-white cursor-pointer transition-transform hover:scale-105"
      onClick={handleClick}
      tabIndex={0}
      role="button"
      aria-label="Open video"
    >
      {/* Thumbnail */}
      <div className="relative">
        <img
          src={data.thumbnail}
          alt="Video Thumbnail"
          className="w-full h-48 object-cover"
        />
        {data.trending && (
          <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1.5 py-0.5 rounded">
            Trending
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex gap-3">
        {/* Profile Image */}
        <img
          src={data.profileImage}
          alt={data.author}
          className="w-10 h-10 rounded-full"
        />

        {/* Text Info */}
        <div>
          <h3 className="text-base font-semibold mb-1 line-clamp-2">
            {data.title}
          </h3>
          <div className="text-sm text-gray-400 flex items-center gap-1">
            <span>~{data.author}</span>
            <CheckCircle size={14} className="text-blue-500" />
          </div>
          <div className="text-xs text-gray-400">{data.views} views • {data.timeAgo}</div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
