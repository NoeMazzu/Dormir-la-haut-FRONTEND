import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const poiSlice = createSlice({
  name: "poi",
  initialState,
  reducers: {
    setPOIs: (state, action) => {
      console.log(JSON.stringify(action.payload, null, 2));
      state.value = action.payload;
    },
  },
});

export const { setPOIs } = poiSlice.actions;

export default poiSlice.reducer;
