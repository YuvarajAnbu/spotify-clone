import React, { useEffect } from 'react';
import ScrollToTop from '../../ScrollToTop';
import Album from '../Album';
import { useDispatch } from 'react-redux';
import { changeActiveComponent } from '../../redux/activeComponent/activeComponentSlice.js';

function YourPlaylist() {
  const dispatch = useDispatch();

  const res = {
    img: 'guyhgvjhv',
    type: 'song',
    color: 'rgb(83, 83, 83)',
    name: 'your library',
  };

  useEffect(() => {
    dispatch(changeActiveComponent('playlists'));
    document.title = 'Spotify - Your Library';
  }, [dispatch]);

  return (
    <>
      <ScrollToTop />
      <Album res={res} />
    </>
  );
}

export default YourPlaylist;
