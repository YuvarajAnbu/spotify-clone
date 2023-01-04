import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveComponent } from "../../redux/activeComponent/activeComponentSlice";
import songs from "../../redux/songs/songs";
import ScrollToTop from "../../ScrollToTop";
import Album from "../Album";
import "../Results/index.css";

function LikedSongs() {
  const { liked } = useSelector((state) => state.list);
  const dispatch = useDispatch();

  const song = liked.map((e) => songs.find((k) => k.id === e));

  useEffect(() => {
    dispatch(changeActiveComponent("liked"));
    document.title = "Spotify - Liked Songs";
  }, [dispatch]);

  return song.length <= 0 ? (
    <div className="results__section__no-results">
      <h1>Songs you like will appear here</h1>
      <p>Save songs by tapping the heart icon.</p>
    </div>
  ) : (
    <>
      <ScrollToTop />
      <Album
        song={{
          name: "Liked songs",
          img: "https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png",
          color: "rgb(80, 56, 160)",
          songs: song,
        }}
      />
    </>
  );
}

export default LikedSongs;
