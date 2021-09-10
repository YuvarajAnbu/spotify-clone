import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../App';
import Album from '../Album';

function Profile() {
  const { user } = useContext(UserContext);

  const res = {
    img: 'https://i.scdn.co/image/ab6775700000ee859dcd4682008374c5d9ffc8c6',
    type: 'profile',
    color: '#524d49',
    name: user.username,
  };
  console.log(user);
  useEffect(() => {
    document.title = `Spotify - ${res.name}`;
  }, [user]);
  return <Album res={res} />;
}

export default Profile;
