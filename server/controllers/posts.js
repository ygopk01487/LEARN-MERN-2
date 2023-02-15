const { default: mongoose, Mongoose } = require("mongoose");
const PostMessage = require("../models/postsMessage");

//get
const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json({ success: true, getPosts: postMessages });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//create post
const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json({ success: true, newPost: newPost });
  } catch (error) {
    res.status(409).json({ success: false, message: error.message });
  }
};

//update post
const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No post with that id" });
  }
  try {
    const updatePost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.status(200).json({ success: true, updatePost: updatePost });
  } catch (error) {
    res.status(400).json({ success: false, message: "Not found!" });
  }
};

//delete
const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).send("Not found with that id");
  }
  try {
    await PostMessage.findByIdAndRemove(id);
    res
      .status(200)
      .json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Not found!" });
  }
};

const likePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Not found with that id");
  }
  try {
    const post = await PostMessage.findById(id);
    const updateLikePost = await PostMessage.findByIdAndUpdate(
      id,
      {
        likeCount: post.likeCount + 1,
      },
      { new: true }
    );
    res.status(200).json({ success: true, updateLikePost: updateLikePost });
  } catch (error) {
    res.status(404).json({ success: false, message: "Like not found" });
  }
};

module.exports = { getPosts, createPost, updatePost, deletePost, likePost };
