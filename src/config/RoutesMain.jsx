import React from "react";

import { Route, Routes } from "react-router-dom";
import Catalog from "../pages/Catalog";
import Detail from "../pages/Detail/Detail";
import Home from "../pages/Home";

const RoutesMain = () => {
  return (
    <Routes>
      <Route exact path={`/:category/search/:keyword`} element={<Catalog />} />
      <Route exact path={`/:category/:id`} element={<Detail />} />
      <Route exact path={`/:category`} element={<Catalog />} />
      <Route exact path={`/`} element={<Home />} />
    </Routes>
  );
};

export default RoutesMain;
