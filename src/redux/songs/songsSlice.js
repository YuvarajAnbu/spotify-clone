import { createSlice } from "@reduxjs/toolkit";
import songs from "./songs";

export const songsSlice = createSlice({
  name: "songs",
  initialState: {
    initialQueue: songs,
    prevQueue: [],
    queue: [],
    tempArr: [],
    queueType: "",
    currentSong: songs.find((e) => e.id === 0),
    currentIndex: 0,
    isPlaying: false,
    duration: 0,
    currentTime: 0,
    volume: 1,
    muted: false,
    suffle: false,
    repeat: "disable", // "disable", "enable", "once"
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
      const volume = localStorage.getItem("volume");
      if (volume) {
        state.volume = JSON.parse(volume);
      }
    },

    setVolume: (state, { payload }) => {
      state.volume = payload;
      localStorage.setItem("volume", JSON.stringify(payload));
    },

    mute: (state) => {
      state.muted = true;
    },

    unMute: (state) => {
      state.muted = false;
    },

    getCurrentSong: (state) => {
      const cSong = localStorage.getItem("csong");
      if (cSong)
        state.currentSong = songs.find(
          (e) => Number(e.id) === Number(JSON.parse(cSong))
        );
    },

    changeCurrentSong: (state, { payload }) => {
      // state.currentSong = payload.song;
      localStorage.setItem("csong", JSON.stringify(payload.song));
      state.currentSong = songs.find((e) => e.id === payload.song);
      state.currentIndex = payload.index;
      state.isPlaying = true;
    },

    setQueue: (state, { payload }) => {
      if (payload) {
        state.queue = payload.songs;
        state.currentSong = payload.songs[0];

        localStorage.setItem(
          "queue",
          JSON.stringify(payload.songs.map((e) => e.id))
        );
      } else {
        const lqueue = localStorage.getItem("queue");
        const pqueue = JSON.parse(lqueue);

        if (pqueue) {
          if (!state.currentSong)
            state.currentSong = songs.find(
              (k) => Number(k.id) === Number(pqueue[0])
            );
          state.queue = [
            state.currentSong,
            ...pqueue
              .map((e) => songs.find((k) => Number(k.id) === Number(e)))
              .filter((k) => Number(state.currentSong.id) !== Number(k.id)),
          ];
        } else {
          if (!state.currentSong)
            state.currentSong = songs.find(
              (k) => Number(k.id) === Number(state.initialQueue[0])
            );
          state.queue = [
            state.currentSong,
            ...state.initialQueue.filter((e) => e.id !== state.currentSong.id),
          ];
        }
      }
    },

    setQueueType: (state, { payload }) => {
      state.queueType = payload.type;
    },

    prevSong: (state) => {
      state.currentIndex -= 1;
      state.currentSong = state.queue[state.currentIndex];

      localStorage.setItem("csong", JSON.stringify(state.currentSong.id));
    },

    nextSong: (state) => {
      if (state.currentIndex < state.queue.length - 1) {
        state.currentIndex += 1;
        state.currentSong = state.queue[state.currentIndex];
      } else {
        state.currentIndex = 0;
        state.currentSong = state.queue[state.currentIndex];
        if (state.repeat !== "enable") {
          state.isPlaying = false;
        }
      }
      localStorage.setItem("csong", JSON.stringify(state.currentSong.id));
    },

    getShuffle: (state) => {
      const suffle = localStorage.getItem("suffle");
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

      localStorage.setItem("suffle", JSON.stringify(true));
      state.prevQueue = [...state.queue];

      const suffledArr = shuffle([
        ...state.queue.filter((e) => e.id !== state.currentSong.id),
      ]);

      state.queue = [state.currentSong, ...suffledArr];
      state.currentIndex = 0;
      state.suffle = true;

      localStorage.setItem(
        "queue",
        JSON.stringify(state.queue.map((e) => e.id))
      );
    },

    disableShuffle: (state) => {
      localStorage.setItem("suffle", JSON.stringify(false));

      state.queue = [
        state.currentSong,
        ...state.prevQueue.filter((e) => e.id !== state.currentSong.id),
      ];
      state.currentIndex = 0;
      state.suffle = false;

      localStorage.setItem(
        "queue",
        JSON.stringify(state.queue.map((e) => e.id))
      );
    },

    getRepeat: (state) => {
      const repeat = localStorage.getItem("repeat");
      if (repeat) {
        state.repeat = repeat;
      }
    },

    enableRepeat: (state) => {
      localStorage.setItem("repeat", "enable");
      state.repeat = "enable";
    },

    disableRepeat: (state) => {
      localStorage.setItem("repeat", "disable");
      state.repeat = "disable";
    },

    onceRepeat: (state) => {
      localStorage.setItem("repeat", "once");
      state.repeat = "once";
    },

    setTempArr: (state, { payload }) => {
      state.tempArr = payload;
      localStorage.setItem("tempArr", JSON.stringify(payload));
    },

    getTempArr: (state) => {
      let arr = localStorage.getItem("tempArr");

      if (arr) {
        arr = JSON.parse(arr);
        if (arr.length > 0) state.tempArr = arr;
      }
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
  setQueueType,
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
  setTempArr,
  getTempArr,
  getCurrentSong,
} = songsSlice.actions;
