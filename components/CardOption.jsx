import React from 'react';
import { CheckCircle } from 'lucide-react';

const VideoCard = () => {
  const handleClick = () => {
    window.open("https://www.facebook.com/", "_blank");
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
          src="https://d.newsweek.com/en/full/2207676/tems-95th-academy-awards.webp?w=790&f=f62ea5c89c2edd6dfad3f60de3cf057d" // Replace with the image you uploaded
          alt="Video Thumbnail"
          className="w-full h-48 object-cover"
        />
        <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1.5 py-0.5 rounded">
          Trending
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex gap-3">
        {/* Profile Image */}
        <img
          src="post.jpeg" // Replace with actual image URL if available
          alt="SarahGrace"
          className="w-10 h-10 rounded-full"
        />

        {/* Text Info */}
        <div>
          <h3 className="text-base font-semibold mb-1 line-clamp-2">
            Tems faced significant backlash in 2023 for her dress at the Academy Awards
          </h3>
          <div className="text-sm text-gray-400 flex items-center gap-1">
            <span>~Cierra</span>
            <CheckCircle size={14} className="text-blue-500" />
          </div>
          <div className="text-xs text-gray-400">111K views • 1 day ago</div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
