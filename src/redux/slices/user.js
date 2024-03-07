import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { username: null, token: null, location: null, POIs: null },
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
    setPOIs: (state, action) => {
      state.value.POIs = action.payload;
    },
  },
});

export const { setUsername, setToken, setLocation, setPOIs } =
  userSlice.actions;
export default userSlice.reducer;
