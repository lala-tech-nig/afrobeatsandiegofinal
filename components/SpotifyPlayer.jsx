// components/SpotifyPlayer.js
import { FaSpotify, FaPlay, FaUndoAlt } from 'react-icons/fa';

export default function SpotifyPlayer() {
  return (
    <div className="bg-[#17336b] text-white max-w-4xl rounded-2xl overflow-hidden flex items-center px-6 py-4 space-x-6">
      {/* Podcast Image */}
      <img
        src="/logo.png"
        alt="Life at Spotify Podcast"
        className="w-32 h-32 rounded-lg object-cover"
      />

      {/* Podcast Details */}
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Life at Spotify</span>
          <FaSpotify className="text-white text-xl" />
        </div>

        <h2 className="text-lg font-bold mt-1">My Path to Spotify: Women in Engineering</h2>
        <p className="text-sm text-gray-300 mt-1">Jul 2021 • Life at Spotify: The Podcast</p>

        {/* Follow Button */}
        <button className="mt-2 bg-white text-[#17336b] text-sm font-semibold py-1 px-4 rounded hover:bg-gray-100 transition">
          Follow
        </button>

        {/* Progress Bar */}
        <div className="mt-4 flex items-center space-x-3">
          <FaUndoAlt className="text-white text-sm" />
          <div className="flex-1 h-1 bg-gray-600 rounded-full overflow-hidden">
            <div className="w-2/5 h-full bg-white" />
          </div>
          <span className="text-sm">35:52</span>
          <FaPlay className="text-white bg-white/20 p-2 rounded-full w-8 h-8" />
        </div>
      </div>
    </div>
  );
}