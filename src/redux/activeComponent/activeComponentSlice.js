import { createSlice } from '@reduxjs/toolkit';

export const activeComponentSlice = createSlice({
  name: 'activeComponent',

  initialState: {
    active: '',
  },

  reducers: {
    changeActiveComponent: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { changeActiveComponent } = activeComponentSlice.actions;
