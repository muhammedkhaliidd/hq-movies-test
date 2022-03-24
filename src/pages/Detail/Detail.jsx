import React, { useState, useEffect } from "react";
import "./Detail.scss";
import { useParams } from "react-router";
import tmdbAPI from "../../api/tmdbAPI";
import apiConfig from "../../api/apiConfig";
import CastList from "./CastList";
import VideoList from "./VideoList";
import MovieList from "../../components/MovieList/MovieList";
import defaultImg from "../../assets/default.jpg";

const Detail = () => {
  const { category, id } = useParams();

  const [item, setItem] = useState(null);
  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbAPI.detail(category, id, { params: {} });
      setItem(response);
      window.scrollTo(0, 0);
    };
    getDetail();
    return () => {};
  }, [category, id]);

  const hendleImage = (first, second) => {
    if (first) {
      return `url(${apiConfig.originalImage(first)})`;
    } else if (second) {
      return `url(${apiConfig.originalImage(second)})`;
    } else {
      return `url(${defaultImg})`;
    }
  };

  return (
    <>
      {/* <PageHeader /> */}
      {item && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: hendleImage(
                item.backdrop_path,
                item.poster_path
              ),
            }}
          ></div>
          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: hendleImage(
                    item.poster_path,
                    item.backdrop_path
                  ),
                }}
              ></div>
            </div>
            <div className="movie-content__info">
              <h1 className="title">{item.title || item.name}</h1>
              <div className="genres">
                {item.genres &&
                  item.genres.slice(0, 5).map((genre, i) => (
                    <span className="genres__item" key={i}>
                      {genre.name}
                    </span>
                  ))}
              </div>
              <p className="overview">{item.overview}</p>
              <div className="cast">
                <div className="section__header">
                  <h2>Cast</h2>
                </div>
                <CastList category={category} id={id} />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="section mb-3">
              <VideoList id={item.id} category={category} />
            </div>
            <div className="section mb-3">
              <div className="section__header ">
                <h1>Similar</h1>
              </div>
              <MovieList category={category} type="similar" id={item.id} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Detail;
