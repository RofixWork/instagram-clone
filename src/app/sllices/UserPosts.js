import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const UserPosts = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const { getPosts } = UserPosts.actions;
export default UserPosts.reducer;
