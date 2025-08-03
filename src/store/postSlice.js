import { createSlice } from "@reduxjs/toolkit";

export const getPost = (state, slug) => {
  return state.find((post) => post.slug === slug);
};

const initialState = [
  //   {
  //     title: "Sample Title",
  //     content: "Sample Content",
  //     featuredImage: "Featured Image",
  //     slug: "Sample Slug",
  //     userId: "Sample userId",
  //     status: "active",
  //   },
];

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearPosts(state) {
      return [];
    },
    setPosts(state, action) {
      return action.payload;
    },
    addPost(state, action) {
      state.push(action.payload);
    },
    editPost(state, action) {
      return state.map((post) => {
        if (post.slug === action.payload[0]) {
          return action.payload[1];
        }
        return post;
      });
    },
    deletePost(state, action) {
      return state.filter((post) => post.slug === action.payload);
    },
  },
});

export const { clearPosts, setPosts, addPost, editPost, deletePost } =
  postSlice.actions;

export default postSlice.reducer;
