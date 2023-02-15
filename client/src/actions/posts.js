import * as api from "../api/index.js";
import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from "../constants/constansTypes.js";

//Action get
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: FETCH_ALL, payload: data.getPosts });
  } catch (error) {
    console.log(error.message);
  }
};

//create
export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data.newPost });
  } catch (error) {
    console.log(error.message);
  }
};

//update
export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data.updatePost });
  } catch (error) {
    console.log(error.message);
  }
};

//delete
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

//like
export const updateLikePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.updateLikePost(id);
    dispatch({ type: LIKE, payload: data.updateLikePost });
  } catch (error) {
    console.log(error.message);
  }
};
