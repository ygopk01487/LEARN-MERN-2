import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import useStyles from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, getPostsBySearchAndPage } from "../actions/posts";

const Paginate = ({ page, search, tags }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { numberOfPage } = useSelector((state) => state.posts);

  useEffect(() => {
    if (page) {
      dispatch(getPostsBySearchAndPage({ search, tags: tags.join(",") }, page));
    }
  }, [page]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPage}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <Link
          to={
            !search && tags.length === 0
              ? `/posts?page=${item.page}`
              : search && tags.length === 0
              ? `/posts/search?searchQuery=${search}&page=${item.page}`
              : !search && tags.length > 0
              ? `/posts/search?tags=${tags.join(",")}&page=${item.page}`
              : search && tags.length > 0
              ? `/posts/search?searchQuery=${search}&tags=${tags.join(
                  ","
                )}&page=${item.page}`
              : "/"
          }
        >
          <PaginationItem {...item} />
        </Link>
      )}
    />
  );
};

export default Paginate;
