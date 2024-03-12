import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { username: null, token: null, location: null, massif: null },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
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
    setMassif: (state, action) => {
      state.value.massif = action.payload;
    },
  },
});

export const { setUsername, setToken, setLocation, setLogout, setMassif } =
  userSlice.actions;

export default userSlice.reducer;
