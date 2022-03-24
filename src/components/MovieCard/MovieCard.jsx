import React from "react";
import { Link } from "react-router-dom";
import apiConfig from "../../api/apiConfig";
import { category } from "../../api/tmdbAPI";
import Button from "../Button/Button";
import "./MovieCard.scss";

import defaultImg from "../../assets/default.jpg";

const MovieCard = (props) => {
  const item = props.item;

  const link = `/${category[props.category]}/${item.id}`;
  const handleImage = (first, second) => {
    if (first) {
      return apiConfig.w500Image(first);
    } else if (second) {
      return apiConfig.w500Image(second);
    } else {
      return null;
    }
  };
  const bg =
    item.poster_path || item.backdrop_path
      ? handleImage(item.poster_path, item.backdrop_path)
      : defaultImg;

  return (
    <Link to={link}>
      <div
        className={`${props.className ? props.className : ""} movie-card`}
        style={{ backgroundImage: `url(${bg ? bg : defaultImg})` }}
      >
        <Button>
          <i className="bx bx-play"></i>
        </Button>
        <div className={`${!item.overview ? "hide" : ""} movie-card__overview`}>
          <p>{item.overview}</p>
        </div>
      </div>
      <h3 className="card-title">{item.title || item.name}</h3>
    </Link>
  );
};

export default MovieCard;
