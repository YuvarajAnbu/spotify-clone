import React from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { setTempArr } from "../../redux/songs/songsSlice";
import HomeDefault from "../SmallComponents/HomeDefault";

import "./index.css";

function Genre(props) {
  const dispatch = useDispatch();

  const getRandomIds = () => {
    let arr = [];
    function recursion() {
      let r = Math.floor(Math.random() * 14);
      if (!arr.includes(r)) return r;
      return recursion();
    }
    for (let i = 0; i < 10; i++) {
      let re = recursion();
      if (re) arr.push(re);
    }
    return arr;
  };

  const arr = getRandomIds().map((e) => {
    return { type: "album", id: e };
  });

  const { id } = useParams();

  return (
    <div className="genre">
      <div className="genre__info">
        <div
          className="genre__info__background"
          style={{
            backgroundColor: `#${new URLSearchParams(props.location.search).get(
              "c"
            )}`,
          }}
        ></div>
        <div className="genre__info__background-noise"></div>

        <div className="genre__info__desc">
          <h1 className="one-line">{id}</h1>
        </div>
      </div>

      <div
        className="genre__background"
        style={{ backgroundColor: "rgb(39, 133, 106)" }}
      ></div>
      <div className="genre__section">
        <section className="genre__section__default-section">
          <div className="genre__section__default-section__title">
            <h2>
              <Link
                to="/section"
                onClick={() => {
                  dispatch(setTempArr(arr));
                }}
              >
                Albums
              </Link>
            </h2>
            <span>
              <Link
                to="/section"
                onClick={() => {
                  dispatch(setTempArr(arr));
                }}
              >
                SEE ALL
              </Link>
            </span>
          </div>
          <HomeDefault arr={arr} />
        </section>
      </div>
    </div>
  );
}

export default Genre;
