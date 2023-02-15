import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from "../constants/constansTypes.js";

export default (posts = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ALL:
      return payload;
    case CREATE:
      return [...posts, payload];
    case UPDATE:
      return posts.map((post) => (post._id === payload._id ? payload : post));
    case LIKE:
      return posts.map((post) =>
        post._id === payload._id ? action.payload : post
      );
    case DELETE:
      return posts.filter((post) => post._id !== payload);
    default:
      return posts;
  }
};
