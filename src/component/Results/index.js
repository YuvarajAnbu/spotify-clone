import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { changeActiveComponent } from "../../redux/activeComponent/activeComponentSlice.js";
import artists from "../../redux/songs/artists.js";
import songs from "../../redux/songs/songs.js";
import ScrollToTop from "../../ScrollToTop.js";
import HomeDefault from "../SmallComponents/HomeDefault/index.js";
import "./index.css";

function Results() {
  const { id } = useParams();
  const dispatch = useDispatch();

  let arr = [];

  artists.forEach((e) => {
    if (e.name.toLowerCase().includes(id.toLowerCase())) {
      arr.push({ type: "artist", id: e.id });
      songs.forEach((k) => {
        if (k.artists.includes(e.id)) arr.push({ type: "album", id: k.id });
      });
    }
  });

  songs.forEach((e) => {
    if (e.name.toLowerCase().includes(id.toLowerCase()))
      arr.push({ type: "album", id: e.id });
  });

  useEffect(() => {
    dispatch(changeActiveComponent("search"));
    document.title = "Spotify - Search";
  }, [dispatch]);

  return (
    <div className="results">
      <ScrollToTop />
      <div className="results__section">
        {arr.length <= 0 ? (
          <div className="results__section__no-results">
            <h1>No results found for "{id}"</h1>
            <p>
              Please make sure your words are spelled correctly or use less or
              different keywords.
            </p>
          </div>
        ) : (
          <section className="results__section__default-section wrap">
            <div className="results__section__default-section__title">
              <h2>Your Results</h2>
              {/* <span> */}
              {/* <Link to="/album/dcig">SEE ALL</Link> */}
              {/* </span> */}
            </div>
            <HomeDefault arr={arr} wrap={true} />
          </section>
        )}
      </div>
    </div>
  );
}

export default Results;
