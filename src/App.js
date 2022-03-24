import "./App.scss";
import React from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import RoutesMain from "./config/RoutesMain.jsx";

import "swiper/swiper.min.css";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <RoutesMain />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
