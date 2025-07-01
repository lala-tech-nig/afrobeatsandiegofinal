// components/SpotifyPlayer.js
import { FaSpotify, FaPlay, FaUndoAlt } from 'react-icons/fa';

export default function SpotifyPlayer() {
  return (
    <div className="bg-[#1DB954] text-white max-w-xs sm:max-w-md rounded-xl overflow-hidden flex items-center px-2 py-2 space-x-2 sm:space-x-6 shadow-lg w-full scale-[0.77] sm:scale-100">
      {/* Podcast Image */}
      <img
        src="/logo.png"
        alt="Life at Spotify Podcast"
        className="w-12 h-12 sm:w-24 sm:h-24 rounded-lg object-cover"
      />

      {/* Podcast Details */}
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <span className="text-[10px] sm:text-sm font-medium">Life at Spotify</span>
          <FaSpotify className="text-white text-base sm:text-xl" />
        </div>

        <h2 className="text-xs sm:text-lg font-bold mt-1">My Path to Spotify: Women in Engineering</h2>
        <p className="text-[10px] sm:text-sm text-gray-100 mt-1">Jul 2021 • Life at Spotify: The Podcast</p>

        {/* Follow Button */}
        <button className="mt-2 bg-white text-[#1DB954] text-[10px] sm:text-sm font-semibold py-1 px-2 sm:px-4 rounded hover:bg-gray-100 transition">
          Follow
        </button>

        {/* Progress Bar */}
        <div className="mt-3 flex items-center space-x-1 sm:space-x-3">
          <FaUndoAlt className="text-white text-[10px] sm:text-sm" />
          <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
            <div className="w-2/5 h-full bg-white" />
          </div>
          <span className="text-[10px] sm:text-sm">35:52</span>
          <FaPlay className="text-white bg-white/20 p-1 sm:p-2 rounded-full w-5 h-5 sm:w-8 sm:h-8" />
        </div>
      </div>
    </div>
  );
}