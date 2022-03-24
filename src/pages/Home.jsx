import React from "react";
import { Link } from "react-router-dom";
import { OutlineButton } from "../components/Button/Button";
import HeroSlide from "../components/HeroSlide/HeroSlide";
import MovieList from "../components/MovieList/MovieList";

import { category, tvType, movieType } from "../api/tmdbAPI";

const Home = () => {
  return (
    <>
      <HeroSlide />
      <div className="container">
        {/* Trending Movies */}
        <div className="section mb-3">
          <SectionHeader textTitle="Trending Movies" linkTo="/movie" />
          <MovieList category={category.movie} type={movieType.popular} />
        </div>
        {/* Trending Movies */}

        {/* Top Rated Movies */}
        <div className="section mb-3">
          <SectionHeader textTitle="Top Rated Movies" linkTo="/movie" />
          <MovieList category={category.movie} type={movieType.top_rated} />
        </div>
        {/* Top Rated Movies */}

        {/* Trending TV Movies */}
        <div className="section mb-3 ">
          <SectionHeader textTitle="Trending TV Movies" linkTo="/tv" />
          <MovieList category={category.tv} type={tvType.popular} />
        </div>
        {/* Trending TV Movies */}

        {/* Top Rated Movies */}
        <div className="section mb-3">
          <SectionHeader textTitle="Top Rated Movies" linkTo="/tv" />
          <MovieList category={category.tv} type={tvType.top_rated} />
        </div>
        {/* Top Rated Movies */}
      </div>
    </>
  );
};

const SectionHeader = (props) => (
  <div className="section__header">
    <h1>{props.textTitle}</h1>
    <Link to={props.linkTo}>
      <OutlineButton className="small">View More</OutlineButton>
    </Link>
  </div>
);

export default Home;
