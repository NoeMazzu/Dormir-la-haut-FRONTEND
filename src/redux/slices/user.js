import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { username: null, token: null, coordinate:{latitude: null, longitude: null} },
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
