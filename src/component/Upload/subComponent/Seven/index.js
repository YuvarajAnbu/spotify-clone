import { message } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormContext } from '../..';
import { pauseSong } from '../../../../redux/songs/songsSlice';
import Player from '../Two/subComponents/Player';

import './index.css';

function Seven({ prev }) {
  const { form } = useContext(FormContext);

  //songSlice redux
  const playbar = useSelector((state) => state.songs);
  const dispatch = useDispatch();

  const [songs, setSongs] = useState([]);

  // audio status and current audio
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(-1);

  //getting songs
  useEffect(() => {
    if (form.songs.master.song) {
      setSongs([{ ...form.songs.master, count: 0 }]);
    }
  }, [form.songs]);

  //pausing global playbar if its playing
  useEffect(() => {
    if (playbar.isPlaying) {
      if (isPlaying) {
        dispatch(pauseSong());
      }
    }
  }, [isPlaying, dispatch, playbar.isPlaying]);

  const OnSubmit = () => {
    console.log(form);
    message.success('Upload Success');
  };

  return (
    <div className="seven">
      <div className="seven__container">
        <h1>Complete</h1>
        <p>
          Congratulations, your upload " Flume - Skitz ( Studio Beat )" is
          complete. Please ensure your upload complys with our terms of use and
          you do not infringe on anyone elses rights.
        </p>
        <div className="upload__songs">
          {songs.map((e, i) => (
            <div
              key={e.count}
              className={
                i === 0 ? 'upload__songs__song master' : 'upload__songs__song'
              }
            >
              <div className="upload__songs__song__img-container">
                <div className="upload__songs__song__img-container__img">
                  <img
                    loading="lazy"
                    draggable="false"
                    src={URL.createObjectURL(e.image)}
                    alt=""
                    onError={(e) => {
                      e.target.insertAdjacentHTML(
                        'afterend',
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
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              </div>
              <Player
                {...{
                  song: e.song,
                  count: e.count,
                  isPlaying,
                  setIsPlaying,
                  currentAudio,
                  setCurrentAudio,
                }}
              />
              <div className="upload__songs__song__lyrics">
                <span>
                  <p>{e.lyrics.name}</p>
                </span>
              </div>
              <div className="upload__songs__song__name">
                <span>
                  <p>{e.name}</p>
                </span>
              </div>
            </div>
          ))}
          <div className="upload__songs__values">
            <p>Bpm : {form?.bpm}</p>
            <p>Key : {form?.key}</p>
            <p>Genre : {form?.genre}</p>
          </div>
        </div>
      </div>
      <div className="upload__btns">
        <button
          className="upload__btns__prev"
          type="button"
          onClick={() => prev()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M24 12l-12-9v5h-12v8h12v5l12-9z" />
          </svg>
          <span>
            Back <span>to " Finalising "</span>
          </span>
        </button>
        <button
          type="button"
          className="upload__btns__upload"
          onClick={() => {
            OnSubmit();
          }}
        >
          <span>Upload</span>
        </button>
      </div>
    </div>
  );
}

export default Seven;
