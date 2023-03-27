const express = require("express");
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostsBySearch,
  getPostById,
  commentPost,
  getPostsBySearchAndPagination,
} = require("../controllers/posts.js");

const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", getPosts);
router.get("/search", getPostsBySearch);
router.get("/searchPagination", getPostsBySearchAndPagination);
router.get("/:id", getPostById);

router.post("/", auth, createPost);
router.post("/:id/commentPost", auth, commentPost);

router.put("/:id", auth, updatePost);
router.put("/:id/likePost", auth, likePost);

router.delete("/:id", auth, deletePost);

module.exports = router;
