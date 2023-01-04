import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import songs from "../../redux/songs/songs";
import Album from "../Album";

function Song() {
  const { id } = useParams();

  const song = songs.find((e) => Number(e.id) === Number(id));

  useEffect(() => {
    document.title = `Spotify - ${song.name}`;
  }, [song]);
  return <Album song={song} />;
}

export default Song;
