import { createSlice } from "@reduxjs/toolkit";

export const listSlice = createSlice({
  name: "list",

  initialState: {
    liked: [],
    // library: [],
  },

  reducers: {
    getLiked: (state) => {
      const liked = localStorage.getItem("liked");
      if (liked) state.liked = JSON.parse(liked);
    },

    setLiked: (state, { payload }) => {
      if (payload) {
        if (state.liked.includes(payload.id)) {
          state.liked = state.liked.filter((e) => e !== payload.id);
        } else {
          state.liked = [...state.liked, payload.id];
        }

        localStorage.setItem("liked", JSON.stringify(state.liked));
      }
    },
  },
});

export const { getLiked, setLiked } = listSlice.actions;
