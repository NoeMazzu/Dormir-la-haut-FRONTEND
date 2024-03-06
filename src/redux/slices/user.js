import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { username: null, token: null, location: null },
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
      console.log(action.payload);
      state.value.location = action.payload;
    },
  },
});

export const { setUsername, setToken, setLocation } = userSlice.actions;
export default userSlice.reducer;
