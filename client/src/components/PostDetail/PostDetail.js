import {
  CircularProgress,
  Divider,
  Paper,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById, getPostsBySearch } from "../../actions/posts";
import CommentSection from "./CommentSection";

import useStyles from "./styles";

const PostDetail = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const classes = useStyles();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getPostById(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(
        getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
    }
  }, [post]);

  if (!post) return null;

  const openPost = (_id) => {
    navigate(`/posts/${_id}`);
  };

  if (isLoading) {
    return (
      <Paper>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <CommentSection post={post} />
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
        </div>
      </div>
      {recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <div
            className={classes.recommendedPosts}
            style={{ cursor: "pointer" }}
          >
            {recommendedPosts.map((post) => (
              <div
                style={{ margin: "20px" }}
                key={post._id}
                onClick={() => openPost(post._id)}
              >
                <Typography gutterBottom variant="h6">
                  {post.title}
                </Typography>
                <Typography gutterBottom variant="subtitle2">
                  {post.name}
                </Typography>
                <Typography gutterBottom variant="subtitle2">
                  {post.message}
                </Typography>
                <Typography gutterBottom variant="subtitle1">
                  {post.likes.length}
                </Typography>
                <img src={post.selectedFile} width="200px" />
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetail;
