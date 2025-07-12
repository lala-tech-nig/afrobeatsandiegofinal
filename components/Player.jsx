'use client';

import React from 'react';

const SpotifyPlaylistEmbed = () => {
  return (
    <iframe
      data-testid="embed-iframe"
      style={{ borderRadius: '12px' }}
      src="https://open.spotify.com/embed/playlist/3NyG2f4X9RcMJAXIxYHH5X?utm_source=generator"
      width="100%"
      height="152"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      allowFullScreen
    ></iframe>
  );
};

export default SpotifyPlaylistEmbed;
