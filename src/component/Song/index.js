import React, { useEffect } from 'react';
import Album from '../Album';

function Song() {
  const res = {
    img: 'https://i.scdn.co/image/ab67706f000000027cda1a881997b0bb1ca0eb92',
    type: 'song',
    color: 'rgb(216, 88, 104)',
    name: 'this is selena gomez',
  };

  useEffect(() => {
    document.title = `Spotify - ${res.name}`;
  }, []);
  return <Album res={res} />;
}

export default Song;
