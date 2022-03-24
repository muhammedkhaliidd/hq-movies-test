import React, { useState, useEffect, useRef } from "react";
import "./Detail.scss";
import tmdbAPI from "../../api/tmdbAPI";

const VideoList = (props) => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const getVideos = async () => {
      const response = await tmdbAPI.getVideos(props.category, props.id);
      setVideos(response.results.slice(0, 5));
    };
    getVideos();
  }, [props.category, props.id]);

  return (
    <>
      {videos.map((item, i) => (
        <Video key={i} item={item} />
      ))}
    </>
  );
};

const Video = (props) => {
  const item = props.item;
  const iframeRef = useRef(null);

  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + "px";
    iframeRef.current.setAttribute("height", height);
  }, []);

  return (
    <div className="video">
      <div className="video__title">
        <h2>{item.name}</h2>
      </div>
      <iframe
        src={`https://www.youtube.com/embed/${item.key}`}
        ref={iframeRef}
        title="video"
        width="100%"
      ></iframe>
    </div>
  );
};

export default VideoList;
