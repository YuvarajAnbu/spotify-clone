import React, { useContext, useEffect, useState } from 'react';
import { FormContext } from '../..';

import { useForm } from 'react-hook-form';
import { message, Popover } from 'antd';

import './two.css';
import Player from './subComponents/Player';
import { useDispatch, useSelector } from 'react-redux';
import { pauseSong } from '../../../../redux/songs/songsSlice';

function Two({ prev, next }) {
  const { form, setForm } = useContext(FormContext);

  //songSlice redux
  const playbar = useSelector((state) => state.songs);
  const dispatch = useDispatch();

  // default beats
  const [beats] = useState(['drums', 'guitar', 'piano']);

  // tracking dynamic songs
  const [songs, setSongs] = useState([]);
  const [count, setCount] = useState(0);

  // add icon popover
  const [hidePopOver, setHidePopover] = useState(false);

  // songs form popup
  const [showPopup, setShowPop] = useState(false);
  const [currentPopup, setCurrentPopup] = useState(0);

  // React hook form
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // audio status and current audio
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(-1);

  //pausing global playbar if its playing
  useEffect(() => {
    if (playbar.isPlaying) {
      if (isPlaying) {
        dispatch(pauseSong());
      }
    }
  }, [isPlaying, dispatch, playbar.isPlaying]);

  // setting default songs on start if exists
  useEffect(() => {
    const arr = form.songs.components.map((e, i) => {
      return {
        ...e,
        count: i + 1,
      };
    });
    setSongs([{ ...form.songs.master, count: 0 }, ...arr]);
    setCount(form.songs.components.length + 1);
  }, [form.songs]);

  // scroll to bottom when adding songs
  useEffect(() => {
    const el = document.querySelector('.two__container');
    el.scrollTop = el.scrollHeight;
  }, [songs]);

  const goBack = () => {
    const filteredCount = songs.map((e) => {
      delete e.count;
      return e;
    });
    const master = filteredCount[0];
    filteredCount.shift();

    const components = filteredCount;

    setForm((prev) => {
      prev.songs.master = master;
      prev.songs.components = components;

      return prev;
    });
    prev();
  };

  const OnSubmit = () => {
    const filteredCount = songs.map((e) => {
      delete e.count;
      return e;
    });
    const master = filteredCount[0];
    filteredCount.shift();

    const components = filteredCount.filter((e) => e.song);

    if (master.song) {
      if (components.length > 0) {
        setForm((prev) => {
          prev.songs.master = master;
          prev.songs.components = components;

          return prev;
        });
        next();
      } else {
        message.error('Upload atleast one Audio and one master Audio');
      }
    } else {
      message.error('Upload atleast one Audio and one master Audio');
    }
  };

  return (
    <div className="two">
      <div className="two__container">
        <h1>{form?.type.slice(0, -1)} Stems</h1>
        <div className="two__container__p">
          <p>Lets add your individual beat stems. ( .wav, .aiff, .mp3 )</p>
          <p>
            Upload a master mp3 of your complete tracks as a reference point
          </p>
        </div>
        <p>
          PRO TIP " Be kind to our vocalists and provide a click beat leading
          into your stems so that they can find the east tempo easily. "
        </p>

        <div className="upload__songs">
          {songs.map((e, i) => {
            if (!e.song) {
              return (
                <div
                  key={e.count}
                  className={
                    i === 0
                      ? 'upload__songs__song upload__songs__container master'
                      : 'upload__songs__song upload__songs__container'
                  }
                >
                  <div className="upload__songs__song__img-container">
                    <div
                      className="upload__songs__song__img-container__img"
                      onClick={() => {
                        setCurrentPopup(e.count);
                        setShowPop(true);
                      }}
                    >
                      {i === 0 ? (
                        <svg
                          role="img"
                          height="24"
                          width="24"
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 6.159v10.899A3.485 3.485 0 006.5 16C4.57 16 3 17.57 3 19.5S4.57 23 6.5 23s3.5-1.57 3.5-3.5V6.969L21 4.63v10.178a3.485 3.485 0 00-2.5-1.058c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5V3.395L9 6.159zM6.5 22C5.122 22 4 20.878 4 19.5S5.122 17 6.5 17 9 18.122 9 19.5 7.878 22 6.5 22zm12-2.25a2.503 2.503 0 01-2.5-2.5c0-1.379 1.122-2.5 2.5-2.5s2.5 1.121 2.5 2.5c0 1.378-1.122 2.5-2.5 2.5z"></path>
                        </svg>
                      ) : (
                        <svg
                          version="1.1"
                          id="Capa_1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 60 60"
                          // style="enable-background:new 0 0 60 60;"
                          xmlSpace="preserve"
                        >
                          <g>
                            <path d="M60,19.787c0-3.316-2.688-6.359-7.598-8.665l6.866-6.866c0.975-0.975,0.975-2.561,0-3.535   c-0.944-0.945-2.592-0.945-3.536,0l-8.497,8.497C42.215,7.763,36.278,6.988,30,6.988c-6.278,0-12.215,0.774-17.235,2.229   L4.268,0.721c-0.944-0.945-2.592-0.945-3.536,0c-0.975,0.975-0.975,2.561,0,3.535l6.866,6.866C2.688,13.428,0,16.471,0,19.787   c0,0.053,0.008,0.105,0.009,0.157C0.008,19.96,0,19.973,0,19.988v24.564l4.349,3.669c0.092,0.082,0.2,0.16,0.296,0.242   l8.461-16.922c0.021-0.042,0.057-0.068,0.082-0.106c0.047-0.069,0.089-0.14,0.153-0.196c0.073-0.064,0.159-0.105,0.246-0.145   c0.031-0.014,0.053-0.039,0.085-0.051c0.002-0.001,0.004,0,0.005-0.001c0.089-0.03,0.184-0.035,0.279-0.039   c0.171-0.008,0.338,0.014,0.487,0.088c0.002,0.001,0.003,0.001,0.005,0.001c0.031,0.016,0.05,0.043,0.079,0.061   c0.08,0.051,0.16,0.102,0.223,0.174c0.064,0.073,0.105,0.159,0.145,0.246c0.014,0.031,0.039,0.053,0.05,0.085l0.003,0.01   c0,0.001,0.001,0.002,0.001,0.004l7.147,20.546l7.985-18.677c0.021-0.048,0.059-0.081,0.086-0.124   c0.04-0.064,0.074-0.132,0.128-0.186c0.063-0.063,0.14-0.105,0.216-0.149c0.035-0.02,0.059-0.051,0.097-0.067   c0.003-0.001,0.006-0.001,0.01-0.002c0.086-0.036,0.179-0.046,0.272-0.057c0.038-0.004,0.074-0.021,0.112-0.021   c0.031,0,0.063,0.015,0.094,0.018c0.099,0.01,0.197,0.022,0.287,0.06c0.004,0.002,0.008,0.001,0.012,0.002   c0.045,0.019,0.076,0.055,0.116,0.08c0.068,0.041,0.138,0.078,0.195,0.135c0.057,0.057,0.093,0.127,0.134,0.194   c0.025,0.041,0.061,0.072,0.081,0.117l8.021,18.762l8.042-21.402c0.016-0.044,0.049-0.074,0.071-0.113   c0.039-0.072,0.074-0.146,0.13-0.207c0.053-0.058,0.119-0.096,0.183-0.139c0.041-0.028,0.071-0.067,0.117-0.089   c0.004-0.002,0.009-0.001,0.013-0.003c0.081-0.038,0.17-0.051,0.258-0.066c0.04-0.007,0.079-0.026,0.119-0.028   c0.047-0.002,0.094,0.016,0.141,0.02c0.082,0.008,0.165,0.011,0.242,0.039c0.005,0.002,0.009,0,0.014,0.002   c0.051,0.019,0.088,0.057,0.134,0.084c0.064,0.036,0.13,0.066,0.185,0.116c0.063,0.058,0.106,0.129,0.152,0.2   c0.024,0.036,0.058,0.062,0.078,0.102l7.639,15.819L60,44.413V19.988c0-0.015-0.008-0.028-0.009-0.043   C59.993,19.892,60,19.84,60,19.787z M9.105,12.629l11.16,11.16c0.499,0.499,1.036,0.974,1.597,1.41l1.748,1.359   c0.002,0.001,0.004,0.002,0.005,0.003c0.129,0.1,0.268,0.178,0.409,0.246c0,0,0.001,0,0.001,0c0.278,0.132,0.574,0.207,0.879,0.207   c0.471,0,0.915-0.181,1.282-0.468c0.036-0.026,0.067-0.057,0.101-0.086c0.081-0.072,0.162-0.141,0.233-0.225   c0.114-0.131,0.215-0.274,0.294-0.435c0.355-0.727,0.264-1.55-0.244-2.203l-1.359-1.747c-0.433-0.558-0.907-1.095-1.41-1.598   l-9.418-9.418C18.992,9.625,24.351,8.988,30,8.988s11.007,0.637,15.617,1.848l-9.419,9.418c-0.502,0.503-0.976,1.04-1.409,1.597   l-1.36,1.748c-0.19,0.245-0.302,0.517-0.374,0.796c-0.12,0.465-0.092,0.953,0.13,1.407c0.079,0.161,0.18,0.304,0.294,0.435   c0.072,0.086,0.155,0.157,0.238,0.23c0.031,0.026,0.06,0.054,0.093,0.078c0.368,0.289,0.812,0.471,1.285,0.471   c0.463,0,0.91-0.158,1.294-0.457l1.749-1.359c0.558-0.434,1.094-0.908,1.596-1.409l11.161-11.161   C55.483,14.628,58,17.156,58,19.787c0,0.053-0.009,0.106-0.011,0.159c0,0.001-0.001,0.002-0.001,0.003   C57.756,25.881,44.938,30.893,30,30.893S2.244,25.881,2.011,19.949c0-0.001-0.001-0.002-0.001-0.003   C2.009,19.893,2,19.841,2,19.787C2,17.156,4.517,14.628,9.105,12.629z" />
                            <path d="M6.279,49.667c3.431,2.188,8.547,3.818,14.435,4.665l-6.879-19.777L6.279,49.667z" />
                            <path d="M30,56.988c-11.641,0-21.973-2.781-26.964-7.258l-3.025-2.552C0.238,54.377,13.325,59.988,30,59.988   c16.704,0,29.812-5.631,29.992-12.91l-3.333,2.918C51.543,54.313,41.334,56.988,30,56.988z" />
                            <path d="M49.033,33.791L41.447,53.98c5.966-1.094,10.972-3.022,13.908-5.5l0.543-0.475L49.033,33.791z" />
                            <path d="M38.667,54.413L31,36.481l-7.764,18.161c2.187,0.223,4.452,0.347,6.764,0.347C32.982,54.988,35.9,54.784,38.667,54.413z" />
                          </g>
                        </svg>
                      )}
                    </div>
                    {i !== 0 && (
                      <div
                        className="upload__songs__song__img-container__icon"
                        onClick={() => {
                          setSongs((prev) => {
                            const arr = prev.filter((k) => k.count !== e.count);
                            return arr;
                          });
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24px"
                          height="24px"
                        >
                          <path
                            fillRule="evenodd"
                            d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div
                    className="upload__songs__song__playbar"
                    onClick={() => {
                      setCurrentPopup(e.count);
                      setShowPop(true);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="icon"
                    >
                      <path d="M24 12l-12-9v5h-12v8h12v5l12-9z" />
                    </svg>
                  </div>
                  <div className="upload__songs__song__lyrics"></div>
                </div>
              );
            } else {
              return (
                <div
                  key={e.count}
                  className={
                    i === 0
                      ? 'upload__songs__song master'
                      : 'upload__songs__song'
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
                    {i !== 0 && (
                      <div
                        className="upload__songs__song__img-container__icon"
                        onClick={() => {
                          if (currentAudio === e.count) {
                            setIsPlaying(false);
                            setCurrentAudio(-1);
                          }

                          setTimeout(() => {
                            setSongs((prev) => {
                              const arr = prev.filter(
                                (k) => k.count !== e.count
                              );
                              return arr;
                            });
                          }, 100);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24px"
                          height="24px"
                        >
                          <path
                            fillRule="evenodd"
                            d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"
                          />
                        </svg>
                      </div>
                    )}
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
                  {/* <div
                    className="upload__songs__song__edit"
                    onClick={() => {
                      setCurrentPopup(e.count);
                      setShowPop(true);
                      // const
                      setTimeout(() => {
                        Object.keys(e).forEach((l) => {
                          const input = document.querySelector(
                            `.two__container__popup input[name=${l}]`
                          );
                          if (input) {
                            console.log(input);
                            // = e[l];
                            if (l === 'name') {
                              setValue(l, e[l]);
                            } else {
                              // let list = new DataTransfer();
                              // if (list) {
                              //   if (list.items) {
                              //     list.items.add(e[l]);
                              //     setValue(l, list);
                              //   }
                              // }
                            }
                          }
                        });
                      }, 100);

                      // setValue('notRegisteredInput', e);
                      // if (currentAudio === e.count) {
                      //   setIsPlaying(false);
                      //   setCurrentAudio(-1);
                      // }
                      // setTimeout(() => {
                      //   setSongs((prev) => {
                      //     const arr = prev.filter((k) => k.count !== e.count);
                      //     return arr;
                      //   });
                      // }, 100);
                    }}
                  >
                    <svg
                      fill="#000000"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="20px"
                      height="20px"
                    >
                      <path d="M 19.171875 2 C 18.448125 2 17.724375 2.275625 17.171875 2.828125 L 16 4 L 20 8 L 21.171875 6.828125 C 22.275875 5.724125 22.275875 3.933125 21.171875 2.828125 C 20.619375 2.275625 19.895625 2 19.171875 2 z M 14.5 5.5 L 3 17 L 3 21 L 7 21 L 18.5 9.5 L 14.5 5.5 z" />
                    </svg>
                  </div> */}
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
              );
            }
          })}

          <div className="upload__songs__song upload__songs__container upload__songs__add">
            <Popover
              placement="rightTop"
              visible={hidePopOver}
              onVisibleChange={(e) => setHidePopover(e)}
              content={
                <div className="upload__songs__song__img-container__select">
                  {beats.map((el, i) => (
                    <p
                      key={i}
                      onClick={() => {
                        if (form.type === 'beats') {
                          setSongs((prev) => [...prev, { count, name: el }]);
                        } else {
                          setSongs((prev) => [...prev, { count }]);
                        }

                        setCount((prev) => prev + 1);
                        setHidePopover(false);
                      }}
                    >
                      {el}
                    </p>
                  ))}
                </div>
              }
              trigger="click"
            >
              <div className="upload__songs__song__img-container">
                <div className="upload__songs__song__img-container__img">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24px"
                    height="24px"
                  >
                    <path
                      fillRule="evenodd"
                      d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"
                    />
                  </svg>
                </div>
                <div className="upload__songs__song__img-container__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24px"
                    height="24px"
                  >
                    <path
                      fillRule="evenodd"
                      d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"
                    />
                  </svg>
                </div>
              </div>
            </Popover>
            <div className="upload__songs__song__playbar"></div>
            <div className="upload__songs__song__lyrics"></div>
          </div>
        </div>

        {showPopup && (
          <div className="two__container__popup">
            <div
              className="two__container__popup__background"
              onClick={() => {
                setCurrentPopup(0);
                setShowPop(false);
                reset();
              }}
            ></div>
            <div className="two__container__popup__content">
              <form
                onSubmit={handleSubmit(async (data) => {
                  Object.keys(data).forEach((e) => {
                    if (['image', 'song', 'lyrics'].includes(e)) {
                      data[e] = data[e][0];
                    }
                  });
                  setSongs((prev) => {
                    const index = prev.findIndex(
                      (e) => e.count === currentPopup
                    );

                    if (index < 0) {
                      return prev;
                    } else {
                      prev[index] = { ...prev[index], ...data };
                      return prev;
                    }
                  });

                  setCurrentPopup(0);
                  setShowPop(false);
                  reset();
                })}
              >
                <div className="two__container__popup__content__input-container upload__input-container">
                  <label htmlFor="image">Image</label>
                  <input
                    {...register('image', {
                      required: 'Required',
                      validate: {
                        type: (e) => {
                          if (e[0].type === 'image/jpeg') {
                            return true;
                          } else {
                            return 'Invalid file type';
                          }
                        },
                        valid: async (e) => {
                          const doesImageExist = (url) =>
                            new Promise((resolve) => {
                              const img = new Image();

                              img.src = url;
                              img.onload = () => resolve(true);
                              img.onerror = () => resolve('Invalid file');
                            });

                          return await doesImageExist(
                            URL.createObjectURL(e[0])
                          );
                        },
                      },
                    })}
                    type="file"
                  />

                  <p className="upload__input-container__error">
                    {errors.image ? errors.image.message : ''}
                  </p>
                </div>

                {form.type === 'beats' && currentPopup === 0 ? (
                  <div className="two__container__popup__content__input-container upload__input-container">
                    <label htmlFor="name">Name</label>
                    <input
                      {...register('name', {
                        required: 'Required',
                      })}
                      type="text"
                    />

                    <p className="upload__input-container__error">
                      {errors.image ? errors.image.message : ''}
                    </p>
                  </div>
                ) : (
                  form.type !== 'beats' && (
                    <div className="two__container__popup__content__input-container upload__input-container">
                      <label>Name</label>
                      <input
                        {...register('name', {
                          required: 'Required',
                        })}
                        type="text"
                      />

                      <p className="upload__input-container__error">
                        {errors.image ? errors.image.message : ''}
                      </p>
                    </div>
                  )
                )}

                <div className="two__container__popup__content__input-container upload__input-container">
                  <label>Song</label>
                  <input
                    {...register('song', {
                      required: 'Required',
                      validate: {
                        type: (e) => {
                          if (e[0].type === 'audio/mpeg') {
                            return true;
                          } else {
                            return 'invalid file type';
                          }
                        },
                        valid: async (e) => {
                          const doesAudioExist = (url) =>
                            new Promise((resolve) => {
                              const a = new Audio();

                              a.src = url;
                              a.onloadeddata = () => resolve(true);
                              a.onerror = () => resolve('Invalid file');
                            });
                          return await doesAudioExist(
                            URL.createObjectURL(e[0])
                          );
                        },
                      },
                    })}
                    type="file"
                  />

                  <p className="upload__input-container__error">
                    {errors.song ? errors.song.message : ''}
                  </p>
                </div>

                <div className="two__container__popup__content__input-container upload__input-container">
                  <label>Lyrics</label>
                  <input
                    {...register('lyrics', {
                      required: 'Required',
                      validate: {
                        type: (e) => {
                          if (e[0].name.includes('.lrc')) {
                            return true;
                          } else {
                            return 'invalid file type';
                          }
                        },
                        valid: async (e) => {
                          const doesLrcExist = (url) =>
                            new Promise((resolve) => {
                              let k = new FileReader();
                              k.readAsText(url);
                              k.onload = () => {
                                if (k.result.includes('[00:')) {
                                  return resolve(true);
                                } else {
                                  return resolve('Invalid file');
                                }
                              };
                            });
                          return await doesLrcExist(e[0]);
                        },
                      },
                    })}
                    type="file"
                  />

                  <p className="upload__input-container__error">
                    {errors.lyrics ? errors.lyrics.message : ''}
                  </p>
                </div>

                <div className="two__container__popup__content__btns">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPopup(0);
                      setShowPop(false);
                      reset();
                    }}
                  >
                    cancel
                  </button>
                  <button
                    className="two__container__popup__content__btns__add"
                    type="submit"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <div className="upload__btns">
        <button
          className="upload__btns__prev"
          type="button"
          onClick={() => {
            goBack();
          }}
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
            Back <span>to " let's create "</span>
          </span>
        </button>
        <button
          type="button"
          onClick={() => {
            OnSubmit();
          }}
        >
          <span>
            Next <span>to " Basic Info "</span>
          </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M24 12l-12-9v5h-12v8h12v5l12-9z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Two;
