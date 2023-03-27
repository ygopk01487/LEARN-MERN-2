import {
  AppBar,
  Button,
  Container,
  Grid,
  Grow,
  Paper,
  TextField,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getPosts,
  getPostsBySearch,
  getPostsBySearchAndPage,
} from "../../actions/posts";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import Paginate from "../Pagination";
import ChipInput from "material-ui-chip-input";
import { useNavigate, useLocation } from "react-router-dom";
import useStyles from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const dispatch = useDispatch();

  const [currentId, setCurrentId] = useState(0);

  const query = useQuery();

  const navigate = useNavigate();

  const page = query.get("page") || 1;

  const searchQuery = query.get("searchQuery");

  const classes = useStyles();

  const [search, setSearch] = useState("");

  const [tags, setTags] = useState([]);

  const changeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleAdd = (tag) => setTags([...tags, tag]);

  const handleDelete = (tagToDelete) =>
    setTags(tags.filter((tag) => tag !== tagToDelete));

  const searchPost = () => {
    if (search.trim() && tags.length === 0) {
      dispatch(getPostsBySearchAndPage({ search, tags: tags.join(",") }, page));
      navigate(`/posts/search?searchQuery=${search}`);
    } else if (!search.trim() && tags.length > 0) {
      dispatch(getPostsBySearchAndPage({ search, tags: tags.join(",") }, page));
      navigate(`/posts/search?tags=${tags.join(",")}`);
    } else if (search.trim() && tags.length > 0) {
      // dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      dispatch(getPostsBySearchAndPage({ search, tags: tags.join(",") }, page));
      navigate(`/posts/search?searchQuery=${search}&tags=${tags.join(",")}`);
    } else if (!search.trim() && tags.length === 0) {
      navigate("/");
    }
  };

  // const handleKeyPress = (e) => {
  //   console.log(e.keyCode === 13);
  //   if (e.keyCode === 13) {
  //     searchPost();
  //   }
  // };

  return (
    <Grow in>
      <Container>
        <Grid
          container
          alignItems="stretch"
          spacing={4}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={3} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                onChange={changeSearch}
                // onKeyPress={handleKeyPress}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                className={classes.Button}
                onClick={searchPost}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />

            <Paper elevation={6} className={classes.pagination}>
              <Paginate page={page} search={search} tags={tags} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
