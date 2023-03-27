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

export default (state = { isLoading: true, posts: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        posts: payload.getPosts,
        currentPage: payload.currentPage,
        numberOfPage: payload.numberOfPage,
      };
    case GET_POSTS_BY_SEARCH_AND_PAGE:
      return {
        ...state,
        posts: payload.data,
        currentPage: payload.page,
        numberOfPage: payload.totalPage,
        pageSize: payload.pageSize,
      };
    case SEARCH:
      return { ...state, posts: payload };
    case FETCH_BY_ID:
      return { ...state, post: payload.post };
    case CREATE:
      return { ...state, posts: [...state.posts, payload] };
    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload._id ? payload : post
        ),
      };
    case COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === payload._id) {
            return payload;
          }
          return post;
        }),
      };
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload._id ? action.payload : post
        ),
      };
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
      };
    default:
      return state;
  }
};
