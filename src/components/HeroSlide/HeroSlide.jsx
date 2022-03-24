import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSlide.scss";
import SwiperCore, {
  Autoplay,
  Navigation,
  Pagination,
  Controller,
  EffectFade,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import tmdbAPI, { category, movieType } from "../../api/tmdbAPI";
import apiCofnig from "../../api/apiConfig";
import Button, { OutlineButton } from "../Button/Button";
import { useRef } from "react";
import Modal, { ModalContent } from "../Modal/Modal";

const HeroSlide = () => {
  SwiperCore.use([Autoplay]);
  const [movieItems, setMovieItems] = useState({});
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const response = await tmdbAPI.getMoviesList(movieType.popular, {
          params,
        });
        setMovieItems(response.results.slice(0, 4));
        setIsActive(true);
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, []);
  return (
    <div className="hero-slide">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, Controller, EffectFade]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        autoplay={{ delay: 4000 }}
      >
        {isActive &&
          movieItems.map((item, index) => (
            <SwiperSlide key={index}>
              {({ isActive }) => (
                <HeroSlideItem
                  item={item}
                  kay={index}
                  className={isActive ? "active" : ""}
                />
              )}
            </SwiperSlide>
          ))}
      </Swiper>

      {isActive &&
        movieItems.map((item, index) => (
          <TrailerModal key={index} item={item} active={isActive} />
        ))}
    </div>
  );
};

const HeroSlideItem = ({ item, className }) => {
  let navigate = useNavigate();
  const background = apiCofnig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );

  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`);

    await tmdbAPI
      .getVideos(category.movie, item.id)
      .then((response) => {
        if (response.results.length > 0) {
          const videoSrc =
            "https://www.youtube.com/embed/" + response.results[0].key;
          modal
            .querySelector(".modal__content > iframe")
            .setAttribute("src", videoSrc);
        } else {
          modal.querySelector(".modal__content").innerHTML = "No Trailer";
        }
        modal.classList.toggle("active");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      className={`hero-slide__item ${className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="hero-slide__item__content__container">
        <div className="hero-slide__item__content__container__info">
          <h2 className="title">{item.title}</h2>
          <div className="overview">{item.overview}</div>
          <div className="btns">
            <Button
              onClick={() => {
                const counter = 1;
                if (counter > 0) {
                  navigate("/movie/" + item.id);
                }
              }}
            >
              Watch Now
            </Button>
            <OutlineButton onClick={setModalActive}>
              Watch Trailer
            </OutlineButton>
          </div>
        </div>
        <div className="hero-slide__item__content__container__poster">
          <img src={apiCofnig.w500Image(item.poster_path)} alt="" />
        </div>
      </div>
    </div>
  );
};

const TrailerModal = ({ item }) => {
  const iframeRef = useRef(null);

  const onClose = () => iframeRef.current.setAttribute("src", "");

  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe
          ref={iframeRef}
          width="100%"
          height="500px"
          title="trailer"
        ></iframe>
      </ModalContent>
    </Modal>
  );
};

export default HeroSlide;
