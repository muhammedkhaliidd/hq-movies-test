import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./MovieList.scss";

import { Swiper, SwiperSlide } from "swiper/react";

import tmdbAPI, { category } from "../../api/tmdbAPI";
import MovieCard from "../MovieCard/MovieCard";

const MovieList = (props) => {
  const [items, setItems] = useState([]);
  const params = {};

  useEffect(() => {
    const getList = async () => {
      let response = null;
      if (props.type !== "similar") {
        switch (props.category) {
          case category.movie:
            response = await tmdbAPI.getMoviesList(props.type, { params });
            break;
          default:
            response = await tmdbAPI.getTvList(props.type, { params });
        }
      } else {
        response = await tmdbAPI.similar(props.category, props.id);
      }
      setItems(response ? response.results : "");
    };
    getList();
  }, []);

  return (
    <div className="movie-list">
      <Swiper
        // modules={[Autoplay, Navigation, Pagination, Controller, EffectFade]}
        grabCursor={true}
        spaceBetween={10}
        slidesPerView={"auto"}
        // autoplay={{ delay: 2000 }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} className="pt-2">
            <MovieCard
              item={item}
              category={props.category}
              className="homeCard"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default MovieList;
