import React from "react";
import Post from "../Posts/Post/Post";
import useStyles from "../Posts/styles";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";

const Posts = ({ setCurrentId }) => {
  const classes = useStyles();

  const { posts, isLoading } = useSelector((state) => state.posts);

  if (!posts?.length && !isLoading) {
    return <CircularProgress />;
  }

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => {
        return (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Posts;
