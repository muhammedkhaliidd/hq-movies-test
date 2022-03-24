import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router";
import tmdbAPI, { category, movieType, tvType } from "../../api/tmdbAPI";
import Button, { OutlineButton } from "../Button/Button";
import Input from "../Input/Input";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieGrid.scss";

const MovieGrid = (props) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { keyword } = useParams();

  useEffect(() => {
    const getList = async () => {
      let response = null;

      if (keyword === undefined) {
        const params = {};
        switch (props.category) {
          case category.movie:
            response = await tmdbAPI.getMoviesList(movieType.upcoming, {
              params,
            });
            break;
          default:
            response = await tmdbAPI.getTvList(tvType.popular, {
              params,
            });
        }
      } else {
        const params = {
          query: keyword,
        };
        response = await tmdbAPI.search(props.category, { params });
      }

      setItems(response.results);
      setTotalPages(response.total_pages);
    };
    getList();
  }, [props.category, keyword]);

  const loadmore = async () => {
    let response = null;
    if (keyword === undefined) {
      const params = { page: page + 1 };
      switch (props.category) {
        case category.movie:
          response = await tmdbAPI.getMoviesList(movieType.upcoming, {
            params,
          });
          break;
        default:
          response = await tmdbAPI.getTvList(tvType.popular, {
            params,
          });
      }
    } else {
      const param = {
        page: page + 1,
        query: keyword,
      };
      response = await tmdbAPI.search(props.category, { param });
    }
    setItems([...items, ...response.results]);
    setPage(page + 1);
  };

  return (
    <>
      <div className="section mb-2">
        <MovieSearch category={props.category} keyword={keyword} />
      </div>
      <div className="movie-grid">
        {items.map((item, index) => (
          <MovieCard category={props.category} item={item} key={index} />
        ))}
      </div>
      {totalPages > page ? (
        <div className="movie-grid__loadmore">
          <OutlineButton className="small" onClick={loadmore}>
            Load more
          </OutlineButton>
        </div>
      ) : null}
    </>
  );
};

const MovieSearch = (props) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");

  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      navigate(`/${category[props.category]}/search/${keyword}`);
    }
  }, [keyword, props.category, navigate]);

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };

    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [keyword, goToSearch]);

  return (
    <div className="movie-search">
      <Input
        type="text"
        value={keyword}
        placeholder="Enter Keyword"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button className="small" onClick={goToSearch}>
        Search
      </Button>
    </div>
  );
};

export default MovieGrid;
