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
    loadBookmarks: (state, action) => { state.value.bookmarkedPOIs = action.payload },
    addBookmark: (state, action) => { state.value.bookmarkedPOIs.push(action.payload) },
    removeBookmark: () => { console.log('removed poi from bookmarks') },
    niktamere: (state) => { state.value = { POIs: [], bookmarkedPOIs: [] } }
  },
});

export const { setPOIs, loadBookmarks, niktamere, addBookmark, removeBookmark } = poiSlice.actions;

export default poiSlice.reducer;
