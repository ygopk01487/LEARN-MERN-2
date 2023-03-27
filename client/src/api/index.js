import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

export const createPost = (newPost) => API.post("/posts", newPost);

export const updatePost = (id, updatePost) =>
  API.put(`/posts/${id}`, updatePost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const updateLikePost = (id) => API.put(`/posts/${id}/likePost`);

export const signIn = (formData) => {
  return API.post("/users/signIn", formData);
};

export const signUp = (formData) => {
  return API.post("/users/signUp", formData);
};

export const getPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );

export const getPostById = (id) => API.get(`/posts/${id}`);

export const getPostsBySearchAndPagination = (searchQuery, page) =>
  API.get(
    `/posts/searchPagination?searchQuery=${searchQuery.search || ""}&tags=${
      searchQuery.tags || ""
    }&page=${page}`
  );

export const comment = (value, id) =>
  API.post(`/posts/${id}/commentPost`, { value });

export const sendMails = (emailOTP) => API.post("/users/sendMailOTP", emailOTP);

export const updatePassword = (formDataForget) =>
  API.post("/users/updatePassword", formDataForget);
