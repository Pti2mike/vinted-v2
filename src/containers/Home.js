import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const Home = () => {
  return (
    <span>
      <Link to="/offer">Offer</Link>
      <Header />
    </span>
  );
};

export default Home;
