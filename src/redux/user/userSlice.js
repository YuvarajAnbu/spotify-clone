import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk("user/getUser", async (_, thunkAPI) => {
  const userArr = localStorage.getItem("user");
  if (thunkAPI.getState().user.isLoggedIn) {
    if (userArr) {
      const userObj = JSON.parse(userArr);
      return userObj[0];
    } else {
      return thunkAPI.rejectWithValue();
    }
  } else {
    return thunkAPI.rejectWithValue();
  }
});

export const signUp = createAsyncThunk("user/signUp", async (_, thunkAPI) => {
  const userArr = localStorage.getItem("user");
  if (userArr) {
    localStorage.setItem(
      "user",
      JSON.stringify([_, ...JSON.parse(localStorage.getItem("user"))])
    );
  } else {
    localStorage.setItem("user", JSON.stringify([_]));
  }
  localStorage.setItem("isLogged", JSON.stringify(true));
  return _;
});

export const logIn = createAsyncThunk("user/logIn", async (_, thunkAPI) => {
  const userArr = localStorage.getItem("user");

  if (userArr) {
    const userObj = JSON.parse(userArr).find(
      (e) => e.username === _.username && e.password === _.password
    );
    if (userObj) {
      localStorage.setItem(
        "user",
        JSON.stringify([userObj, ...JSON.parse(localStorage.getItem("user"))])
      );
      localStorage.setItem("isLogged", JSON.stringify(true));
      return userObj;
    } else {
      return thunkAPI.rejectWithValue("Incorrect username or password");
    }
  } else {
    return thunkAPI.rejectWithValue("Incorrect username or password");
  }
});

export const logOut = createAsyncThunk("user/logOut", async (_, thunkAPI) => {
  localStorage.setItem("isLogged", JSON.stringify(false));
});

export const userSlice = createSlice({
  name: "user",

  initialState: {
    user: {},
    isGetLoading: false,
    isLoggedIn: false,
    isLoading: false,
    successMsg: "",
    errorMsg: "",
  },

  reducers: {
    checkLogged: (state) => {
      const isLogged = localStorage.getItem("isLogged");
      if (!isLogged) {
        localStorage.setItem("isLogged", JSON.stringify(false));
      } else {
        state.isLoggedIn = JSON.parse(isLogged);
      }
    },
    clearErrorMsg: (state) => {
      state.errorMsg = "";
    },
  },

  extraReducers: {
    [getUser.pending]: (state) => {
      state.isGetLoading = true;
    },
    [getUser.fulfilled]: (state, { payload }) => {
      state.isGetLoading = false;
      state.user = payload;
    },
    [getUser.rejected]: (state) => {
      state.isGetLoading = false;
    },
    [signUp.pending]: (state) => {
      state.isLoading = true;
    },
    [signUp.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
      state.isLoggedIn = true;
    },
    [signUp.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    },
    [logIn.pending]: (state) => {
      state.isLoading = true;
    },
    [logIn.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
      state.isLoggedIn = true;
      state.errorMsg = "";
    },
    [logIn.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    },
    [logOut.pending]: (state) => {
      state.isLoading = true;
    },
    [logOut.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.user = {};
      state.isLoggedIn = false;
    },
    [logOut.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMsg = payload;
    },
  },
});

export const { checkLogged, clearErrorMsg } = userSlice.actions;

export const userSelector = (state) => state.user;
