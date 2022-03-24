import React, { useState, useEffect } from "react";
import "./Detail.scss";
import apiConfig from "../../api/apiConfig";
import tmdbAPI from "../../api/tmdbAPI";
import noImage from "../../assets/no-image.jpg";

const CastList = (props) => {
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    const getCredits = async () => {
      const response = await tmdbAPI.credits(props.category, props.id);
      setCasts(response.cast.slice(0, 5));
    };
    getCredits();
  }, [props.category, props.id]);

  return (
    <div className="casts">
      {casts.map((cast, i) => (
        <div className="casts__item" key={i}>
          <div
            className="casts__item__img"
            style={{
              backgroundImage: `url(${
                cast.profile_path
                  ? apiConfig.w500Image(cast.profile_path)
                  : noImage
              })`,
            }}
          ></div>
          <p className="casts__item__name">{cast.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CastList;
