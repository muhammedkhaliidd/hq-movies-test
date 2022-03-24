import React, { useRef, useEffect } from "react";
import "./Header.scss";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/hqmovie.jpg";
import { Typography } from "@material-ui/core";

const headerNav = [
  {
    display: "Home",
    path: "/",
  },
  {
    display: "Movies",
    path: "/movie",
  },
  {
    display: "TV Series",
    path: "/tv",
  },
];
const Header = () => {
  const { pathname } = useLocation();
  const headerRef = useRef(null);

  const active = headerNav.findIndex((e) => e.path === pathname);

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };
    window.addEventListener("scroll", shrinkHeader);
    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);

  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <Typography variant="h4" className="logo" component={Link} to="/">
          <img src={logo} alt="logo" />
          HQ Movies
        </Typography>
        <ul className="header__nav">
          {headerNav.map((ele, index) => (
            <li key={index} className={`${index === active ? "active" : ""}`}>
              <Link to={ele.path}>{ele.display}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
