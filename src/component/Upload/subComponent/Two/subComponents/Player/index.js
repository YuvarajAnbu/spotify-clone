import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  mute,
  setVolume,
  unMute,
} from '../../../../../../redux/songs/songsSlice';

function Player({
  song,
  count,
  isPlaying,
  setIsPlaying,
  currentAudio,
  setCurrentAudio,
}) {
  const { volume, muted } = useSelector((state) => state.songs);
  const dispatch = useDispatch();

  const [blob] = useState(URL.createObjectURL(song));
  const [audio] = useState(new Audio(blob));

  const [isLoaded, setIsLoaded] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [isSliderChanging, setIsSliderChanging] = useState(false);

  // check audio error
  useEffect(() => {
    audio.addEventListener('error', (e) => {
      message.error('Loading song Failed. Try reloading the page');
    });
    return () => {
      audio.removeEventListener('error', (e) => {
        message.error('Loading song Failed. Try reloading the page');
      });
    };
  }, [audio]);

  //check audio loaded
  useEffect(() => {
    audio.addEventListener('loadeddata', (e) => {
      setIsLoaded(true);
      setDuration(audio.duration);
    });
    return () => {
      audio.removeEventListener('loadeddata', (e) => {
        setIsLoaded(true);
        setDuration(audio.duration);
      });
    };
  }, [audio]);

  // get currentDuration
  useEffect(() => {
    if (isLoaded) {
      audio.addEventListener('timeupdate', (e) => {
        setCurrentTime(e.target.currentTime);
      });
      return () => {
        audio.removeEventListener('timeupdate', (e) => {
          setCurrentTime(e.target.currentTime);
        });
      };
    }
  }, [isLoaded, audio]);

  //on ended
  useEffect(() => {
    if (isLoaded) {
      audio.addEventListener('ended', (e) => {
        setCurrentTime(0);
        setSliderValue(0);
        setIsPlaying(false);
      });
      return () => {
        audio.removeEventListener('ended', (e) => {
          setCurrentTime(0);
          setSliderValue(0);
          setIsPlaying(false);
        });
      };
    }
  }, [isLoaded, audio, setIsPlaying]);

  //play and pause when isPlaying changes
  useEffect(() => {
    if (isLoaded) {
      if (isPlaying && currentAudio === count) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, isLoaded, audio, count, currentAudio]);

  // changing slider value
  useEffect(() => {
    if (!isSliderChanging) {
      setSliderValue(currentTime);
    }
  }, [currentTime, isSliderChanging]);

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

  return (
    <div className="upload__songs__song__playbar">
      <button
        type="button"
        className="play"
        title={isPlaying && currentAudio === count ? 'Pause' : 'Play'}
        onClick={() => {
          if (currentAudio !== count) {
            setCurrentAudio(count);
            setIsPlaying(true);
          } else {
            if (isPlaying && currentAudio === count) {
              setIsPlaying(false);
            } else {
              setIsPlaying(true);
            }
          }
        }}
      >
        {isPlaying && currentAudio === count ? (
          <svg role="img" height="12" width="12" viewBox="0 0 16 16">
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
      <div className="upload__songs__song__playbar__song">
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
            setCurrentTime(e.target.value);
            audio.currentTime = e.target.value;
            setTimeout(() => {
              setIsSliderChanging(false);
            }, 1000);
          }}
          onTouchEnd={(e) => {
            setSliderValue(e.target.value);
            setCurrentTime(e.target.value);
            audio.currentTime = e.target.value;
            setTimeout(() => {
              setIsSliderChanging(false);
            }, 1000);
          }}
        />
      </div>
      <div className="upload__songs__song__playbar__sound">
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
          <svg role="presentation" height="16" width="16" viewBox="0 0 16 16">
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
      </div>
    </div>
  );
}

export default Player;
