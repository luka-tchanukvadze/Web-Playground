import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  counter: 0,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    increase(state, action) {
      state.counter = state.counter + 1;
    },
  },
});


export const {increase}