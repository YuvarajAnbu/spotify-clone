import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import artists from "../../redux/songs/artists";
import songs from "../../redux/songs/songs";
import ScrollToTop from "../../ScrollToTop";
import Album from "../Album";

function Artist() {
  const { id } = useParams();

  const artist = artists.find((e) => Number(e.id) === Number(id));
  const fSongs = songs.filter((e) => e.artists.includes(Number(id)));

  // const res = {
  //   img: 'https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png',
  //   type: 'artist',
  //   color: '#065bd4',
  //   name: 'selena gomez',
  // };

  useEffect(() => {
    document.title = `Spotify - ${artist?.name}`;
  }, [artist]);
  return (
    <>
      <ScrollToTop />
      <Album artist={{ ...artist, songs: fSongs }} />
    </>
  );
}

export default Artist;
