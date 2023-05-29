import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import getCurrentUser from "../services/getCurrentUser";

const HomePage = (props) => {
  const [game, setGame] = useState({
    id: "",
    score: "",
    userId: "",
  });
  const [redirect, setRedirect] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserLogin = async () => {
      try {
        const user = await getCurrentUser();
        const userLoggedIn = user !== null;
        const userIdExists = !!user?.id;
        setIsLoggedIn(userLoggedIn && userIdExists);
      } catch (err) {
        console.log(`Error in fetch: ${err.message}`);
        setIsLoggedIn(false);
      }
    };

    checkUserLogin();
  }, []);

  const getGame = async () => {
    try {
      const response = await fetch(`/api/v1/games`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const data = await response.json();
      setGame(data.game);
      setRedirect(true);
    } catch (err) {
      console.log(`Error in fetch: ${err.message}`);
    }
  };

  if (redirect) {
    return <Redirect to={`games/${game.id}`} />;
  }

  return (
    <div className="home-page">
      <h1 className="home-title">Welcome to Jeopardy Jamboree</h1>
      <p className="home-message">Where it's 7:30 All the Time!</p>
      {isLoggedIn ? (
        <div to="#" className="play-button" onClick={getGame}>
          Play A Game!
        </div>
      ) : (
        <p>You must be signed in to play a game.</p>
      )}
    </div>
  );
};

export default HomePage;
