import React, { useEffect } from 'react';
import Album from '../Album';

function Artist() {
  const res = {
    img: 'https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png',
    type: 'artist',
    color: '#065bd4',
    name: 'selena gomez',
  };

  useEffect(() => {
    document.title = `Spotify - ${res.name}`;
  }, [res.name]);
  return <Album res={res} />;
}

export default Artist;
