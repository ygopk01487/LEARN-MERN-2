const { default: mongoose, Mongoose } = require("mongoose");
const PostMessage = require("../models/postsMessage");

//get
const getPosts = async (req, res) => {
  const { page } = req.query;

  try {
    const limit = 6;

    const startIndex = (Number(page) - 1) * limit;

    const total = await PostMessage.countDocuments({});

    const postMessages = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(limit)
      .skip(startIndex);

    res.status(200).json({
      success: true,
      getPosts: postMessages,
      currentPage: Number(page),
      numberOfPage: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//get by id
const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await PostMessage.findById(id);

    res.status(200).json({ success: true, post: data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//create post
const createPost = async (req, res) => {
  const { title, message, tags, name, selectedFile } = req.body;

  const newPost = new PostMessage({
    title: title.trim(),
    name,
    message: message.trim(),
    tags: tags.map((tag) => tag.trim()),
    selectedFile,
    creator: req.userId,
    createAt: new Date().toISOString(),
  });

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

  const { title, message, tags, name, selectedFile } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No post with that id" });
  }

  try {
    const updatePost = await PostMessage.findByIdAndUpdate(
      id,
      {
        title: title.trim(),
        name,
        message: message.trim(),
        tags: tags.map((tag) => tag.trim()),
        selectedFile,
      },
      {
        new: true,
      }
    );

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

  if (!req.userId) {
    return res.status(404).json({ message: "Unauthenticated" });
  }

  try {
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updateLikePost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });

    res.status(200).json({ success: true, updateLikePost: updateLikePost });
  } catch (error) {
    res.status(404).json({ success: false, message: "Like not found" });
  }
};

//search
const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, "i");

    // const tagsRegex = tags.map((tag) => new RegExp(tag, "i"));

    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });

    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

//search, pagination
const getPostsBySearchAndPagination = async (req, res) => {
  let searchQuery = req.query.searchQuery;
  const page = parseInt(req.query.page) || 1;
  let tags = req.query.tags;
  const pageSize = 2;

  if (searchQuery !== "" && tags === "") tags = "none";
  else if (searchQuery === "" && tags !== "") searchQuery = "none";

  try {
    const title = new RegExp(searchQuery, "i");
    const tagsTrim = tags.split(",").map((tag) => {
      return tag.trim();
    });

    const tagsRegex = tagsTrim.map((tag) => new RegExp(tag, "i"));

    const total = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tagsRegex } }],
    }).count();

    const post = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tagsRegex } }],
    })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.status(200).json({
      success: true,
      totalPage: Math.ceil(total / pageSize),
      page: page,
      data: post,
      pageSize,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

//comment
const commentPost = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  try {
    const posts = await PostMessage.findById(id);
    posts.comments.push(value);
    const updatePost = await PostMessage.findByIdAndUpdate(id, posts, {
      new: true,
    });
    res.status(200).json({ success: true, post: updatePost });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostsBySearch,
  getPostById,
  commentPost,
  getPostsBySearchAndPagination,
};
