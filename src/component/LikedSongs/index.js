import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeActiveComponent } from '../../redux/activeComponent/activeComponentSlice';
import ScrollToTop from '../../ScrollToTop';
import Album from '../Album';

function LikedSongs() {
  const dispatch = useDispatch();

  const res = {
    img: 'https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png',
    type: 'song',
    color: 'rgb(80, 56, 160)',
    name: 'liked songs',
  };

  useEffect(() => {
    dispatch(changeActiveComponent('liked'));
    document.title = 'Spotify - Liked Songs';
  }, [dispatch]);

  return (
    <>
      <ScrollToTop />
      <Album res={res} />
    </>
  );
}

export default LikedSongs;
