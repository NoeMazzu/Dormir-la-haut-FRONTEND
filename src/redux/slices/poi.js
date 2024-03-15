import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { POIs: [], bookmarkedPOIs: [] },
};

export const poiSlice = createSlice({
  name: "poi",
  initialState,
  reducers: {
    setPOIs: (state, action) => {
      state.value.POIs = action.payload;
    },
    loadBookmarks: (state, action) => {
      state.value.bookmarkedPOIs = action.payload;
    },
    addBookmark: (state, action) => {
      state.value.bookmarkedPOIs.push(action.payload);
    },
    removeBookmark: (state, action) => {
      state.value.bookmarkedPOIs = state.value.bookmarkedPOIs.filter(
        (name) => name !== action.payload
      );
    },
    purgePersistor: (state) => {
      state.value = { POIs: [], bookmarkedPOIs: [] };
    },
  },
});

export const {
  setPOIs,
  loadBookmarks,
  purgePersistor,
  addBookmark,
  removeBookmark,
} = poiSlice.actions;

export default poiSlice.reducer;
