import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { POIs: null },
};

export const poiSlice = createSlice({
  name: "poi",
  initialState,
  reducers: {
    setPOIs: (state, action) => {
      state.value.POIs = action.payload;
    },
  },
});

export const { setPOIs } = poiSlice.actions;

export default poiSlice.reducer;
