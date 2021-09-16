import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ScrollToTop from '../../ScrollToTop';
import Album from '../Album';

function Profile() {
  const { user } = useSelector((state) => state.user);

  const res = {
    img: 'https://i.scdn.co/image/ab6775700000ee859dcd4682008374c5d9ffc8c6',
    type: 'profile',
    color: '#524d49',
    name: user.username,
  };
  useEffect(() => {
    document.title = `Spotify - ${res.name}`;
  }, [res.name]);
  return (
    <>
      <ScrollToTop />
      <Album res={res} />
    </>
  );
}

export default Profile;
