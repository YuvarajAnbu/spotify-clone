import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getTempArr } from "../../redux/songs/songsSlice";
import HomeDefault from "../SmallComponents/HomeDefault";
import "../Home/index.css";

function Section() {
  const { tempArr } = useSelector((state) => state.songs);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(getTempArr());
    setLoaded(true);
  }, [dispatch]);

  return (
    loaded &&
    (tempArr && tempArr.length <= 0 ? (
      <Redirect to="/" />
    ) : (
      <section className="home__section__default-section wrap">
        <div className="home__section__default-section__title">
          <h2 className="a">More albums</h2>
        </div>
        <HomeDefault arr={tempArr} wrap={true} />
      </section>
    ))
  );
}

export default Section;
