import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./sllices/UserSlice";
import postsReducer from "./sllices/UserPosts";
import generalReducer from "./sllices/GeneralSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    general: generalReducer,
  },
});
