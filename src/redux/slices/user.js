import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {
      username: null,
      token: null,
      location: null,
    },
  },
  reducers: {
    setUsername: (state, action) => {
      state.value.username = action.payload;
    },
    setToken: (state, action) => {
      state.value.token = action.payload;
    },
    setLocation: (state, action) => {
      state.value.location = action.payload;
    },
    setLogout: (state) => {
      state.value = { username: null, token: null, location: null };
    },
    initUser: (state, action) => {
      state.value.token = action.payload;
    },
  },
});

export const { setUsername, setToken, setLocation, setLogout, initUser } =
  userSlice.actions;

export default userSlice.reducer;