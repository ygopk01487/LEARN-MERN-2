import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import useStyles from "../../Posts/Post/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, updateLikePost } from "../../../actions/posts";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import { useNavigate } from "react-router-dom";

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("profile"));

  const [likes, setLikes] = useState(post?.likes);

  const userId = user?.result?.googleId || user?.result?._id;

  const hasLikedPost = post?.likes?.find((like) => like === userId);

  const { currentPage, posts, numberOfPage } = useSelector(
    (state) => state.posts
  );

  const deletePosts = () => {
    dispatch(deletePost(post._id));
    if (currentPage === numberOfPage && posts.length === 1) {
      navigate(`/posts?page=${currentPage - 1 === 0 ? 1 : currentPage - 1}`);
      navigate(0);
    } else if (currentPage < numberOfPage && posts.length === 1) {
      navigate(
        `/posts?page=${currentPage - 1 === 0 ? navigate(0) : navigate(0)}`
      );
    }
  };

  const handleLike = async () => {
    dispatch(updateLikePost(post._id));
    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAltIcon />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} other`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };

  return (
    <>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={post.selectedFile}
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        <div className={classes.overlay2}>
          {user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator ? (
            <Button style={{ color: "white" }} size="small">
              <MoreHorizIcon onClick={() => setCurrentId(post._id)} />
            </Button>
          ) : null}
        </div>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          component="h2"
          onClick={openPost}
          style={{ cursor: "pointer" }}
        >
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button
            size="small"
            color="primary"
            disabled={!user?.result}
            onClick={handleLike}
          >
            <Likes />
          </Button>
          {user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator ? (
            <Button size="small" color="primary" onClick={deletePosts}>
              <DeleteIcon /> Delete
            </Button>
          ) : null}
        </CardActions>
      </Card>
    </>
  );
};

export default Post;
