import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeDefault from "../SmallComponents/HomeDefault/index.js";
import "./index.css";
import ScrollToTop from "../../ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveComponent } from "../../redux/activeComponent/activeComponentSlice.js";
import songs from "../../redux/songs/songs.js";
import {
  changeCurrentSong,
  pauseSong,
  playSong,
  setCurrentTime,
  setQueue,
  setQueueType,
  setTempArr,
} from "../../redux/songs/songsSlice.js";
import { useMemo } from "react";

function Home() {
  const dispatch = useDispatch();

  const { isPlaying, currentSong, queueType } = useSelector(
    (state) => state.songs
  );
  const { liked } = useSelector((state) => state.list);

  const lSongs = liked.map((e) => songs.find((k) => k.id === e));

  const arr = useMemo(
    () => [
      { type: "album", id: 13 },
      { type: "album", id: 11 },
      { type: "album", id: 5 },
      { type: "album", id: 3 },
      { type: "album", id: 7 },
      { type: "album", id: 6 },
      { type: "album", id: 12 },
      { type: "album", id: 8 },
      { type: "album", id: 1 },
    ],
    []
  );

  const arr1 = [
    { type: "album", id: 3 },
    { type: "album", id: 10 },
    {
      type: "artist",
      id: 1,
    },
    { type: "album", id: 1 },
    {
      type: "artist",
      id: 2,
    },
    { type: "album", id: 5 },
    { type: "album", id: 6 },
    { type: "album", id: 12 },
    { type: "album", id: 8 },
  ];

  const arr2 = [
    { type: "album", id: 5 },
    { type: "album", id: 6 },
    { type: "album", id: 2 },
    { type: "album", id: 11 },
    { type: "album", id: 1 },
    { type: "album", id: 13 },
    { type: "album", id: 9 },
    { type: "album", id: 4 },
    { type: "album", id: 7 },
  ];

  const arr3 = [
    { type: "album", id: 1 },
    { type: "album", id: 12 },
    { type: "album", id: 6 },
    { type: "album", id: 10 },
    { type: "album", id: 7 },
    { type: "album", id: 8 },
    { type: "album", id: 6 },
    { type: "album", id: 11 },
    { type: "album", id: 13 },
  ];

  const [color, setColor] = useState("#121212");

  useEffect(() => {
    let r = Math.floor(Math.random() * 10);
    let c;
    if (r === 9) {
      c = "#4b25eb";
    } else {
      c = songs.find((k) => k.id === arr[r].id).color;
    }

    if (c) setColor(c);
  }, [arr]);

  var today = new Date();
  var curHr = today.getHours();

  useEffect(() => {
    dispatch(changeActiveComponent("home"));
    document.title = "Spotify - Web Player";
  }, [dispatch]);

  return (
    <div className="home">
      <ScrollToTop />
      <div
        style={{
          backgroundColor: color,
        }}
        className="home__top-background"
      ></div>

      <div className="home__section">
        <section className="home__section__top-section">
          <h2>
            Good{" "}
            {curHr >= 6 && curHr < 12
              ? "Morning"
              : curHr >= 12 && curHr < 18
              ? "Afternoon"
              : "Night"}
          </h2>

          <div className="home__section__top-section__songs">
            <div
              className="home__section__top-section__songs__song"
              draggable="false"
            >
              <Link to="/collection/tracks" draggable="false">
                <div className="home__section__top-section__songs__song__desc">
                  <div className="home__section__top-section__songs__song__desc__image-container">
                    <div className="home__section__top-section__songs__song__desc__image-container__image">
                      <img
                        loading="lazy"
                        draggable="false"
                        src="https://misc.scdn.co/liked-songs/liked-songs-640.png"
                        alt=""
                        onError={(e) => {
                          e.target.insertAdjacentHTML(
                            "afterend",
                            `<svg
                            role="img"
                            height="24"
                            width="24"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                          >
                            <path d="M9 6.159v10.899A3.485 3.485 0 006.5 16C4.57 16 3 17.57 3 19.5S4.57 23 6.5 23s3.5-1.57 3.5-3.5V6.969L21 4.63v10.178a3.485 3.485 0 00-2.5-1.058c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5V3.395L9 6.159zM6.5 22C5.122 22 4 20.878 4 19.5S5.122 17 6.5 17 9 18.122 9 19.5 7.878 22 6.5 22zm12-2.25a2.503 2.503 0 01-2.5-2.5c0-1.379 1.122-2.5 2.5-2.5s2.5 1.121 2.5 2.5c0 1.378-1.122 2.5-2.5 2.5z"></path>
                          </svg>`
                          );
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                  </div>
                  <p className="one-line">Liked songs</p>
                </div>
              </Link>
              <button
                type="button"
                onClick={() => {
                  if (queueType === `collection/tracks`) {
                    if (isPlaying) {
                      dispatch(pauseSong());
                    } else {
                      dispatch(playSong());
                    }
                  } else {
                    dispatch(setQueueType({ type: `collection/tracks` }));
                    dispatch(setQueue({ songs: lSongs }));
                    dispatch(
                      changeCurrentSong({
                        song: lSongs[0].id,
                        index: 0,
                      })
                    );
                    dispatch(setCurrentTime(0));
                  }
                }}
              >
                {isPlaying && queueType === `collection/tracks` ? (
                  <svg
                    height="16"
                    role="img"
                    width="16"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <rect
                      x="5"
                      y="3"
                      width="4"
                      height="18"
                      fill="currentColor"
                    ></rect>
                    <rect
                      x="15"
                      y="3"
                      width="4"
                      height="18"
                      fill="currentColor"
                    ></rect>
                  </svg>
                ) : (
                  <svg
                    height="16"
                    role="img"
                    width="16"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <polygon
                      points="21.57 12 5.98 3 5.98 21 21.57 12"
                      fill="currentColor"
                    ></polygon>
                  </svg>
                )}
              </button>
            </div>
            {arr.map((e, i) => {
              let song = songs.find((k) => k.id === e.id);
              return (
                <div
                  key={i}
                  className="home__section__top-section__songs__song"
                >
                  <Link to={`/album/${e.id}`} draggable="false">
                    <div className="home__section__top-section__songs__song__desc">
                      <div className="home__section__top-section__songs__song__desc__image-container">
                        <div className="home__section__top-section__songs__song__desc__image-container__image">
                          <img
                            loading="lazy"
                            draggable="false"
                            src={song.img}
                            alt="song"
                            onError={(e) => {
                              e.target.insertAdjacentHTML(
                                "afterend",
                                '<svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" class="Svg-sc-1bi12j5-0 gSLhUO"><path d="M9 6.159v10.899A3.485 3.485 0 006.5 16C4.57 16 3 17.57 3 19.5S4.57 23 6.5 23s3.5-1.57 3.5-3.5V6.969L21 4.63v10.178a3.485 3.485 0 00-2.5-1.058c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5V3.395L9 6.159zM6.5 22C5.122 22 4 20.878 4 19.5S5.122 17 6.5 17 9 18.122 9 19.5 7.878 22 6.5 22zm12-2.25a2.503 2.503 0 01-2.5-2.5c0-1.379 1.122-2.5 2.5-2.5s2.5 1.121 2.5 2.5c0 1.378-1.122 2.5-2.5 2.5z"></path></svg>'
                              );
                              e.target.style.display = "none";
                            }}
                          />
                        </div>
                      </div>
                      <p className="one-line">{song.name}</p>
                    </div>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      if (currentSong.id === e.id) {
                        if (isPlaying) {
                          dispatch(pauseSong());
                        } else {
                          dispatch(playSong());
                        }
                      } else {
                        dispatch(setQueueType({ type: `album/${e.id}` }));
                        dispatch(setQueue({ songs: [song] }));
                        dispatch(
                          changeCurrentSong({
                            song: e.id,
                            index: 0,
                          })
                        );
                        dispatch(setCurrentTime(0));
                      }
                    }}
                  >
                    {isPlaying && currentSong.id === e.id ? (
                      <svg
                        height="16"
                        role="img"
                        width="16"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <rect
                          x="5"
                          y="3"
                          width="4"
                          height="18"
                          fill="currentColor"
                        ></rect>
                        <rect
                          x="15"
                          y="3"
                          width="4"
                          height="18"
                          fill="currentColor"
                        ></rect>
                      </svg>
                    ) : (
                      <svg
                        height="16"
                        role="img"
                        width="16"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <polygon
                          points="21.57 12 5.98 3 5.98 21 21.57 12"
                          fill="currentColor"
                        ></polygon>
                      </svg>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </section>
        {[
          ["Recomended for today", arr1],
          ["Your top Picks", arr2],
          ["Popular albums", arr3],
        ].map((e, i) => (
          <section key={i} className="home__section__default-section">
            <div className="home__section__default-section__title">
              <h2>
                <Link
                  to="/section"
                  onClick={() => {
                    dispatch(setTempArr(e[1]));
                  }}
                >
                  {e[0]}
                </Link>
              </h2>
              <span>
                <Link
                  to="/section"
                  onClick={() => {
                    dispatch(setTempArr(e[1]));
                  }}
                >
                  SEE ALL
                </Link>
              </span>
            </div>
            <HomeDefault arr={e[1]} />
          </section>
        ))}
      </div>
    </div>
  );
}

export default Home;
