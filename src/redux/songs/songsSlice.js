import { createSlice } from '@reduxjs/toolkit';
import songsList from './songsList';

export const songsSlice = createSlice({
  name: 'songs',
  initialState: {
    initialQueue: songsList,
    queue: [],
    currentSong: songsList.find((e) => e.id === 0),
    currentIndex: 0,
    isPlaying: false,
    duration: 0,
    currentTime: 0,
    volume: 1,
    muted: false,
    suffle: false,
    repeat: 'disable', // "disable", "enable", "once"
  },
  reducers: {
    playSong: (state) => {
      state.isPlaying = true;
    },

    pauseSong: (state) => {
      state.isPlaying = false;
    },

    setDuration: (state, { payload }) => {
      state.duration = payload;
    },

    setCurrentTime: (state, { payload }) => {
      state.currentTime = payload;
    },

    getVolume: (state) => {
      const volume = localStorage.getItem('volume');
      if (volume) {
        state.volume = JSON.parse(volume);
      }
    },

    setVolume: (state, { payload }) => {
      state.volume = payload;
      localStorage.setItem('volume', JSON.stringify(payload));
    },

    mute: (state) => {
      state.muted = true;
    },

    unMute: (state) => {
      state.muted = false;
    },

    setQueue: (state) => {
      state.queue = [
        state.currentSong,
        ...state.initialQueue.filter((e) => e.song !== state.currentSong.song),
      ];
    },

    prevSong: (state) => {
      state.currentIndex -= 1;
      state.currentSong = state.queue[state.currentIndex];
    },

    nextSong: (state) => {
      if (state.currentIndex < state.queue.length - 1) {
        state.currentIndex += 1;
        state.currentSong = state.queue[state.currentIndex];
      } else {
        state.currentIndex = 0;
        state.currentSong = state.queue[state.currentIndex];
        if (state.repeat !== 'enable') {
          state.isPlaying = false;
        }
      }
    },

    getShuffle: (state) => {
      const suffle = localStorage.getItem('suffle');
      if (suffle) {
        state.suffle = JSON.parse(suffle);
      }
    },

    enableShuffle: (state) => {
      function shuffle(array) {
        let currentIndex = array.length,
          randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;

          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
          ];
        }

        return array;
      }
      const suffledArr = shuffle(
        state.queue.filter((e) => e.song !== state.currentSong.song)
      );

      localStorage.setItem('suffle', JSON.stringify(true));
      state.queue = [state.currentSong, ...suffledArr];
      state.currentIndex = 0;
      state.suffle = true;
    },

    disableShuffle: (state) => {
      localStorage.setItem('suffle', JSON.stringify(false));

      state.queue = [
        state.currentSong,
        ...state.initialQueue.filter((e) => e.song !== state.currentSong.song),
      ];
      state.currentIndex = 0;
      state.suffle = false;
    },

    getRepeat: (state) => {
      const repeat = localStorage.getItem('repeat');
      if (repeat) {
        state.repeat = repeat;
      }
    },

    enableRepeat: (state) => {
      localStorage.setItem('repeat', 'enable');
      state.repeat = 'enable';
    },

    disableRepeat: (state) => {
      localStorage.setItem('repeat', 'disable');
      state.repeat = 'disable';
    },

    onceRepeat: (state) => {
      localStorage.setItem('repeat', 'once');
      state.repeat = 'once';
    },
    changeCurrentSong: (state, { payload }) => {
      // state.currentSong = payload.song;
      state.currentSong = songsList.find((e) => e.id === payload.song);
      state.currentIndex = payload.index;
      state.isPlaying = true;
    },
  },
});

export const {
  playSong,
  pauseSong,
  setDuration,
  setCurrentTime,
  getVolume,
  setVolume,
  mute,
  unMute,
  setQueue,
  getShuffle,
  enableShuffle,
  disableShuffle,
  prevSong,
  nextSong,
  getRepeat,
  enableRepeat,
  disableRepeat,
  onceRepeat,
  changeCurrentSong,
} = songsSlice.actions;
