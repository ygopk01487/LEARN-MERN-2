import * as api from "../api/index.js";
import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  SEARCH,
  START_LOADING,
  END_LOADING,
  FETCH_BY_ID,
  COMMENT,
  GET_POSTS_BY_SEARCH_AND_PAGE,
} from "../constants/constansTypes.js";

//Action get
export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPosts(page);

    dispatch({ type: FETCH_ALL, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

//create
export const createPost = (post, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data.newPost });

    navigate(0);
  } catch (error) {
    console.log(error.message);
  }
};

//update
export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data.updatePost });
    console.log(data);
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

//comment
export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);
    dispatch({ type: COMMENT, payload: data.post });
    return data.post.comments;
  } catch (error) {
    console.log(error.message);
  }
};

//search
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });

    const { data } = await api.getPostsBySearch(searchQuery);

    dispatch({ type: SEARCH, payload: data.data });

    // dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

//get post by search and page
export const getPostsBySearchAndPage =
  (searchQuery, page) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });

      const { data } = await api.getPostsBySearchAndPagination(
        searchQuery,
        page
      );

      dispatch({ type: GET_POSTS_BY_SEARCH_AND_PAGE, payload: data });

      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error.message);
    }
  };

//get post by id
export const getPostById = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.getPostById(id);

    dispatch({ type: FETCH_BY_ID, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};
