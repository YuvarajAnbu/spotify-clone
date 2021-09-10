import React, { useContext, useEffect } from 'react';
import { ActiveContext } from '../../App';
import Album from '../Album';

function YourPlaylist() {
  const { setActiveComponent } = useContext(ActiveContext);

  const res = {
    img: 'guyhgvjhv',
    type: 'song',
    color: 'rgb(83, 83, 83)',
    name: 'your library',
  };

  useEffect(() => {
    setActiveComponent('playlists');
    document.title = 'Spotify - Your Library';
  }, [setActiveComponent]);

  return <Album res={res} />;
}

export default YourPlaylist;
