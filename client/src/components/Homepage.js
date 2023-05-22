import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home-page">
      <h1 className="home-title">Welcome to Jeopardy Jamboree</h1>
      <p className="home-message">Where it's 7:30 All the Time!</p>
      <Link to="/games/1" className="play-button">Play A Game!</Link>
    </div>
  );
};

export default HomePage;
