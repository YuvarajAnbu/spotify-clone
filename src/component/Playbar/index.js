import { message } from 'antd';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  disableRepeat,
  disableShuffle,
  enableRepeat,
  enableShuffle,
  getRepeat,
  getShuffle,
  getVolume,
  mute,
  nextSong,
  onceRepeat,
  pauseSong,
  playSong,
  prevSong,
  setCurrentTime,
  setDuration,
  setQueue,
  setVolume,
  unMute,
} from '../../redux/songs/songsSlice';
import './index.css';

function Playbar() {
  let history = useHistory();

  const { active: activeComponent } = useSelector(
    (state) => state.activeComponent
  );

  const {
    initialQueue,
    currentSong,
    currentIndex,
    isPlaying,
    duration,
    currentTime,
    volume,
    muted,
    suffle,
    repeat,
  } = useSelector((state) => state.songs);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isPlaying) {
      document.title = 'Crazy Life · Free Hexel, Free Hexel';
    } else {
      document.title = `Spotify - Web Player`;
    }
  }, [isPlaying]);

  //pop over
  const [isOpen, setIsOpen] = useState(false);

  const [audio] = useState(new Audio());
  const [sliderValue, setSliderValue] = useState(0);
  const [isSliderChanging, setIsSliderChanging] = useState(false);
  const [isLoaded, setisLoaded] = useState(false);
  const [isError, setisError] = useState(false);

  //getting from local storage if exists
  useEffect(() => {
    dispatch(getVolume());
    dispatch(setQueue());
    dispatch(getShuffle());
    dispatch(getRepeat());
  }, [dispatch]);

  //slider value
  useEffect(() => {
    if (!isSliderChanging) {
      setSliderValue(currentTime);
    }
  }, [currentTime, isSliderChanging]);

  //creating audio based on song
  useEffect(() => {
    if (initialQueue.length >= 1) {
      audio.src = currentSong.song;
    }
  }, [audio, currentSong, initialQueue]);

  //setting event listeners
  // check audio failed
  useEffect(() => {
    audio.addEventListener('error', (e) => {
      setisError(true);
      message.error('Loading song Failed. Try reloading the page');
    });
    return () => {
      audio.removeEventListener('error', (e) => {
        setisError(true);
        message.error('Loading song Failed. Try reloading the page');
      });
    };
  }, [audio]);

  //check audio loaded
  useEffect(() => {
    audio.addEventListener('loadeddata', (e) => {
      setisLoaded(true);
      dispatch(setDuration(audio.duration));
    });
    return () => {
      audio.removeEventListener('loadeddata', (e) => {
        setisLoaded(true);
        dispatch(setDuration(audio.duration));
      });
    };
  }, [dispatch, audio]);

  // get currentDuration
  useEffect(() => {
    if (isLoaded) {
      audio.addEventListener('timeupdate', (e) => {
        dispatch(setCurrentTime(e.target.currentTime));
      });
      return () => {
        audio.removeEventListener('timeupdate', (e) => {
          dispatch(setCurrentTime(e.target.currentTime));
        });
      };
    }
  }, [isLoaded, dispatch, audio]);

  //to access repeat state on event listner
  const repeatRef = useRef(repeat);
  useEffect(() => {
    repeatRef.current = repeat;
  }, [repeat]);

  //on ended
  useEffect(() => {
    if (isLoaded) {
      audio.addEventListener('ended', (e) => {
        dispatch(setCurrentTime(0));
        setSliderValue(0);
        if (repeatRef.current === 'once') {
          audio.currentTime = 0;
          audio.play();
        } else {
          dispatch(nextSong());
        }
      });
      return () => {
        audio.removeEventListener('ended', (e) => {
          dispatch(setCurrentTime(0));
          setSliderValue(0);
          if (repeatRef.current === 'once') {
            audio.currentTime = 0;
            audio.play();
          } else {
            dispatch(nextSong());
          }
        });
      };
    }
  }, [isLoaded, dispatch, audio]);

  //keypress event
  const playingRef = useRef(isPlaying);
  useEffect(() => {
    playingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 32 || e.code === 'Space') {
        if (playingRef.current) {
          audio.pause();
          dispatch(pauseSong());
        } else {
          audio.play();
          dispatch(playSong());
        }
      }
    });

    return () => {
      window.removeEventListener('keydown', (e) => {
        if (e.keyCode === 32 || e.code === 'Space') {
          if (playingRef.current) {
            audio.pause();
            dispatch(pauseSong());
          } else {
            audio.play();
            dispatch(playSong());
          }
        }
      });
    };
  }, [audio, dispatch]);

  //mute
  useEffect(() => {
    if (audio) {
      audio.muted = muted;
    }
  }, [audio, muted]);

  //change volume
  useEffect(() => {
    if (audio) {
      audio.volume = volume;
    }
  }, [audio, volume]);

  useEffect(() => {
    if (isLoaded) {
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, isLoaded, audio, currentSong]);

  const fmtMSS = (s) => {
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + ~~s;
  };

  return (
    <div className={isOpen ? 'playbar-container open' : 'playbar-container'}>
      <div
        className="playbar-container__box"
        onClick={() => {
          setIsOpen(false);
        }}
      ></div>
      <div
        className={`${
          !isError && isLoaded && initialQueue.length >= 1
            ? 'playbar'
            : 'playbar disabled'
        }`}
      >
        <div className="playbar__desc">
          <Link to="/album/sdfvk">
            <div className="playbar__desc__image-container">
              <div className="playbar__desc__image-container__image">
                <img
                  loading="lazy"
                  draggable="false"
                  src={currentSong.img}
                  alt=""
                  onError={(e) => {
                    e.target.insertAdjacentHTML(
                      'afterend',
                      `<svg
                          role="img"
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
          </Link>
          <div className="playbar__desc__name one-line">
            <p className="one-line">
              <Link to={`/album/${currentSong.name}`}>{currentSong.name}</Link>
            </p>
            <span className="one-line">
              {currentSong.artists.map((e, i) => {
                if (i < currentSong.artists.length - 1) {
                  return (
                    <div key={i}>
                      <Link to={`/artist/${e}`}>{e}</Link>,{' '}
                    </div>
                  );
                } else {
                  return (
                    <div key={i}>
                      <Link key={i} to={`/artist/${e}`}>
                        {e}
                      </Link>
                    </div>
                  );
                }
              })}
            </span>
          </div>

          <div
            className="playbar__desc__icon"
            title="Save to Your Library"
            // "Remove form Your Library"
          >
            {/* <svg class="a" role="img" height="16" width="16" viewBox="0 0 16 16">
              <path
                fill="currentColor"
                d="M13.764 2.727a4.057 4.057 0 00-5.488-.253.558.558 0 01-.31.112.531.531 0 01-.311-.112 4.054 4.054 0 00-5.487.253A4.05 4.05 0 00.974 5.61c0 1.089.424 2.113 1.168 2.855l4.462 5.223a1.791 1.791 0 002.726 0l4.435-5.195A4.052 4.052 0 0014.96 5.61a4.057 4.057 0 00-1.196-2.883zm-.722 5.098L8.58 13.048c-.307.36-.921.36-1.228 0L2.864 7.797a3.072 3.072 0 01-.905-2.187c0-.826.321-1.603.905-2.187a3.091 3.091 0 012.191-.913 3.05 3.05 0 011.957.709c.041.036.408.351.954.351.531 0 .906-.31.94-.34a3.075 3.075 0 014.161.192 3.1 3.1 0 01-.025 4.403z"
              ></path>
            </svg> */}
            <svg
              className="b"
              role="img"
              height="16"
              width="16"
              viewBox="0 0 16 16"
            >
              <path fill="none" d="M0 0h16v16H0z"></path>
              <path
                className="b"
                fill="currentColor"
                d="M13.797 2.727a4.057 4.057 0 00-5.488-.253.558.558 0 01-.31.112.531.531 0 01-.311-.112 4.054 4.054 0 00-5.487.253c-.77.77-1.194 1.794-1.194 2.883s.424 2.113 1.168 2.855l4.462 5.223a1.791 1.791 0 002.726 0l4.435-5.195a4.052 4.052 0 001.195-2.883 4.057 4.057 0 00-1.196-2.883z"
              ></path>
            </svg>
          </div>
        </div>

        <div className="playbar__controls">
          <div className="playbar__controls__buttons">
            <button
              type="button"
              title={suffle ? 'Disable suffle' : 'Enable suffle'}
              className={suffle ? 'suffle active' : 'suffle'}
              onClick={() => {
                if (suffle) {
                  dispatch(disableShuffle());
                } else {
                  dispatch(enableShuffle());
                }
              }}
            >
              <svg role="img" height="16" width="16" viewBox="0 0 16 16">
                <path d="M4.5 6.8l.7-.8C4.1 4.7 2.5 4 .9 4v1c1.3 0 2.6.6 3.5 1.6l.1.2zm7.5 4.7c-1.2 0-2.3-.5-3.2-1.3l-.6.8c1 1 2.4 1.5 3.8 1.5V14l3.5-2-3.5-2v1.5zm0-6V7l3.5-2L12 3v1.5c-1.6 0-3.2.7-4.2 2l-3.4 3.9c-.9 1-2.2 1.6-3.5 1.6v1c1.6 0 3.2-.7 4.2-2l3.4-3.9c.9-1 2.2-1.6 3.5-1.6z"></path>
              </svg>
            </button>

            <button
              type="button"
              className="prev"
              title="Previous"
              onClick={() => {
                if (repeat === 'once') {
                  dispatch(enableRepeat());
                }
                if (currentIndex > 0) {
                  dispatch(prevSong());
                } else {
                  audio.currentTime = 0;
                }
              }}
            >
              <svg role="img" height="16" width="16" viewBox="0 0 16 16">
                <path d="M13 2.5L5 7.119V3H3v10h2V8.881l8 4.619z"></path>
              </svg>
            </button>

            <button
              type="button"
              className="play"
              title={isPlaying ? 'Pause' : 'Play'}
              onClick={() => {
                if (isPlaying) {
                  dispatch(pauseSong());
                } else {
                  dispatch(playSong());
                }
              }}
            >
              {isPlaying ? (
                <svg role="img" height="16" width="16" viewBox="0 0 16 16">
                  <path className="a" fill="none" d="M0 0h16v16H0z"></path>
                  <path
                    className="b"
                    fill="#ffffff"
                    d="M3 2h3v12H3zm7 0h3v12h-3z"
                  ></path>
                </svg>
              ) : (
                <svg role="img" height="16" width="16" viewBox="0 0 16 16">
                  <path className="b" d="M4.018 14L14.41 8 4.018 2z"></path>
                </svg>
              )}
            </button>

            <button
              type="button"
              className="next"
              title="Next"
              onClick={() => {
                if (repeat === 'once') {
                  dispatch(enableRepeat());
                }
                dispatch(nextSong());
              }}
            >
              <svg role="img" height="16" width="16" viewBox="0 0 16 16">
                <path d="M11 3v4.119L3 2.5v11l8-4.619V13h2V3z"></path>
              </svg>
            </button>

            <button
              type="button"
              title={
                repeat === 'disable'
                  ? 'Enable repeat'
                  : repeat === 'enable'
                  ? 'Enable repeat one'
                  : 'Disable repeat'
              }
              className={repeat === 'disable' ? 'repeat' : 'repeat active'}
              onClick={() => {
                if (repeat === 'disable') {
                  dispatch(enableRepeat());
                } else if (repeat === 'enable') {
                  dispatch(onceRepeat());
                } else {
                  dispatch(disableRepeat());
                }
              }}
            >
              {repeat === 'once' ? (
                <svg role="img" height="16" width="16" viewBox="0 0 16 16">
                  <path className="a" fill="none" d="M0 0h16v16H0z"></path>
                  <path
                    className="b"
                    d="M5 5V4c-2.2.3-4 2.2-4 4.5 0 .6.1 1.2.4 1.8l.9-.5C2.1 9.4 2 9 2 8.5 2 6.7 3.3 5.3 5 5zm5.5 7H6v-1.5l-3.5 2 3.5 2V13h4.5c1.9 0 3.5-1.2 4.2-2.8-.5.3-1 .5-1.5.6-.7.7-1.6 1.2-2.7 1.2zm1-12C9 0 7 2 7 4.5S9 9 11.5 9 16 7 16 4.5 14 0 11.5 0zm.9 7h-1.3V3.6H10v-1h.1c.2 0 .3 0 .4-.1.1 0 .3-.1.4-.2.1-.1.2-.2.2-.3.1-.1.1-.2.1-.3v-.1h1.1V7z"
                  ></path>
                </svg>
              ) : (
                <svg role="img" height="16" width="16" viewBox="0 0 16 16">
                  <path d="M5.5 5H10v1.5l3.5-2-3.5-2V4H5.5C3 4 1 6 1 8.5c0 .6.1 1.2.4 1.8l.9-.5C2.1 9.4 2 9 2 8.5 2 6.6 3.6 5 5.5 5zm9.1 1.7l-.9.5c.2.4.3.8.3 1.3 0 1.9-1.6 3.5-3.5 3.5H6v-1.5l-3.5 2 3.5 2V13h4.5C13 13 15 11 15 8.5c0-.6-.1-1.2-.4-1.8z"></path>
                </svg>
              )}
            </button>
          </div>

          <div className="playbar__controls__slider">
            <span>{fmtMSS(sliderValue)}</span>
            <input
              className="progressBar"
              title=""
              style={{
                '--seek-before-width': `${(sliderValue / duration) * 100}%`,
              }}
              type="range"
              value={sliderValue}
              max={duration}
              onChange={(e) => {
                setIsSliderChanging(true);
                setSliderValue(e.target.value);
              }}
              onMouseUp={(e) => {
                setSliderValue(e.target.value);
                dispatch(setCurrentTime(e.target.value));
                audio.currentTime = e.target.value;
                setTimeout(() => {
                  setIsSliderChanging(false);
                }, 1000);
              }}
              onTouchEnd={(e) => {
                setSliderValue(e.target.value);
                dispatch(setCurrentTime(e.target.value));
                audio.currentTime = e.target.value;
                setTimeout(() => {
                  setIsSliderChanging(false);
                }, 1000);
              }}
            />
            <span>{fmtMSS(duration)}</span>
          </div>
        </div>

        <div className="playbar__extras">
          <button
            className={activeComponent === 'lyrics' ? 'active' : ''}
            title="Lyrics"
            onClick={(e) => {
              if (activeComponent === 'lyrics') {
                history.goBack();
              } else {
                history.push(`/lyrics`);
              }
              setIsOpen(false);
            }}
          >
            <svg role="img" height="16" width="16" viewBox="0 0 16 16">
              <path d="M8.5 1A4.505 4.505 0 004 5.5c0 .731.191 1.411.502 2.022L1.99 13.163a1.307 1.307 0 00.541 1.666l.605.349a1.307 1.307 0 001.649-.283L9.009 9.95C11.248 9.692 13 7.807 13 5.5 13 3.019 10.981 1 8.5 1zM4.023 14.245a.307.307 0 01-.388.066l-.605-.349a.309.309 0 01-.128-.393l2.26-5.078A4.476 4.476 0 007.715 9.92l-3.692 4.325zM8.5 9C6.57 9 5 7.43 5 5.5S6.57 2 8.5 2 12 3.57 12 5.5 10.429 9 8.5 9z"></path>
            </svg>
          </button>

          <button
            className={activeComponent === 'queue' ? 'active' : ''}
            title="Queue"
            onClick={(e) => {
              if (activeComponent === 'queue') {
                history.goBack();
              } else {
                history.push(`/queue`);
              }
              setIsOpen(false);
            }}
          >
            <svg
              width="16px"
              height="16px"
              version="1.1"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <g>
                  <g>
                    <path d="M3,14c-0.1689453,0-0.3369141-0.0429688-0.4892578-0.1279297C2.1953125,13.6953125,2,13.3613281,2,13V5     c0-0.3613281,0.1953125-0.6953125,0.5107422-0.8720703C2.828125,3.9521484,3.2128906,3.9580078,3.5214844,4.1464844l6.5458984,4     C10.3642578,8.328125,10.5458984,8.6513672,10.5458984,9s-0.1816406,0.671875-0.4785156,0.8535156l-6.5458984,4     C3.3613281,13.9511719,3.1806641,14,3,14z M4,6.7832031v4.4335938L7.6279297,9L4,6.7832031z" />
                  </g>
                </g>
                <g>
                  <path d="M29,10H13c-0.5527344,0-1-0.4472656-1-1s0.4472656-1,1-1h16c0.5527344,0,1,0.4472656,1,1S29.5527344,10,29,10z" />
                </g>
                <g>
                  <path d="M29,28H5c-0.5527344,0-1-0.4472656-1-1s0.4472656-1,1-1h24c0.5527344,0,1,0.4472656,1,1S29.5527344,28,29,28z" />
                </g>
                <g>
                  <path d="M29,19H5c-0.5527344,0-1-0.4472656-1-1s0.4472656-1,1-1h24c0.5527344,0,1,0.4472656,1,1S29.5527344,19,29,19z" />
                </g>
              </g>
            </svg>
          </button>

          <div className="playbar__extras__volume-bar">
            <button
              title={muted ? 'Unmute' : 'Mute'}
              onClick={() => {
                if (muted) {
                  dispatch(unMute());
                } else {
                  dispatch(mute());
                }
              }}
            >
              <svg
                role="presentation"
                height="16"
                width="16"
                viewBox="0 0 16 16"
              >
                {muted ? (
                  <path d="M0 5v6h2.804L8 14V2L2.804 5H0zm7-1.268v8.536L3.072 10H1V6h2.072L7 3.732zm8.623 2.121l-.707-.707-2.147 2.147-2.146-2.147-.707.707L12.062 8l-2.146 2.146.707.707 2.146-2.147 2.147 2.147.707-.707L13.477 8l2.146-2.147z"></path>
                ) : volume === 0 ? (
                  <path d="M0 5v6h2.804L8 14V2L2.804 5H0zm7-1.268v8.536L3.072 10H1V6h2.072L7 3.732zm8.623 2.121l-.707-.707-2.147 2.147-2.146-2.147-.707.707L12.062 8l-2.146 2.146.707.707 2.146-2.147 2.147 2.147.707-.707L13.477 8l2.146-2.147z"></path>
                ) : volume > 0 && volume <= 0.3 ? (
                  <path d="M10.04 5.984l.658-.77q.548.548.858 1.278.31.73.31 1.54 0 .54-.144 1.055-.143.516-.4.957-.259.44-.624.805l-.658-.77q.825-.865.825-2.047 0-1.183-.825-2.048zM0 11.032v-6h2.802l5.198-3v12l-5.198-3H0zm7 1.27v-8.54l-3.929 2.27H1v4h2.071L7 12.302z"></path>
                ) : volume > 0.3 && volume <= 0.6 ? (
                  <path d="M0 11.032v-6h2.802l5.198-3v12l-5.198-3H0zm7 1.27v-8.54l-3.929 2.27H1v4h2.071L7 12.302zm4.464-2.314q.401-.925.401-1.956 0-1.032-.4-1.957-.402-.924-1.124-1.623L11 3.69q.873.834 1.369 1.957.496 1.123.496 2.385 0 1.262-.496 2.385-.496 1.123-1.369 1.956l-.659-.762q.722-.698 1.123-1.623z"></path>
                ) : (
                  <path d="M12.945 1.379l-.652.763c1.577 1.462 2.57 3.544 2.57 5.858s-.994 4.396-2.57 5.858l.651.763a8.966 8.966 0 00.001-13.242zm-2.272 2.66l-.651.763a4.484 4.484 0 01-.001 6.397l.651.763c1.04-1 1.691-2.404 1.691-3.961s-.65-2.962-1.69-3.962zM0 5v6h2.804L8 14V2L2.804 5H0zm7-1.268v8.536L3.072 10H1V6h2.072L7 3.732z"></path>
                )}
              </svg>
            </button>
            <input
              type="range"
              title=""
              className="progressBar"
              style={{
                '--seek-before-width': `${volume * 100}%`,
              }}
              value={muted ? 0 : volume * 100}
              onChange={(e) => {
                dispatch(unMute());
                dispatch(setVolume(e.target.value / 100));
              }}
              onWheel={(e) => {
                if (e.deltaY < 0) {
                  if (Number(e.target.value) < 90) {
                    dispatch(setVolume((Number(e.target.value) + 10) / 100));
                  } else {
                    dispatch(setVolume(1));
                  }
                } else {
                  if (Number(e.target.value) > 10) {
                    dispatch(setVolume((Number(e.target.value) - 10) / 100));
                  } else {
                    dispatch(setVolume(0));
                  }
                }
              }}
              min={0}
              max={100}
            />
            {/* <Slider
              className="playbar__extras__slider"
              defaultValue={audioVolume * 100}
              onChange={(e) => {
                console.log(e / 100);
                audioChangeVolume(e / 100);
              }}
              min={0}
              max={100}
              handleStyle={{
                backgroundColor: '#fff',
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
              }}
            /> */}
          </div>
        </div>

        <div className="playbar__close-btn">
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <svg role="img" height="24" width="24" viewBox="0 0 24 24">
              <polyline
                points="8 4 17 12 8 20"
                fill="none"
                stroke="#181818"
              ></polyline>
            </svg>
          </button>
        </div>

        <div className="playbar__open-btn">
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <svg role="img" height="24" width="24" viewBox="0 0 24 24">
              <polyline
                points="8 4 17 12 8 20"
                fill="none"
                stroke="#181818"
              ></polyline>
            </svg>
          </button>
        </div>
        <div
          className="playbar__click-box"
          onClick={() => {
            setIsOpen(true);
          }}
        ></div>
      </div>
    </div>
  );
}

export default Playbar;
