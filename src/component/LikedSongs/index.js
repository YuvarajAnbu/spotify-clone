import React, { useContext, useEffect } from 'react';
import { ActiveContext } from '../../App';
import Album from '../Album';

function LikedSongs() {
  const { setActiveComponent } = useContext(ActiveContext);

  const res = {
    img: 'https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png',
    type: 'song',
    color: 'rgb(80, 56, 160)',
    name: 'liked songs',
  };

  useEffect(() => {
    setActiveComponent('liked');
    document.title = 'Spotify - Liked Songs';
  }, [setActiveComponent]);

  return <Album res={res} />;
}

export default LikedSongs;
