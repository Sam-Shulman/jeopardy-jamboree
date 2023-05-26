import { useEffect, useState } from "react";
import React  from "react";
import { Link, Redirect } from "react-router-dom";

const HomePage = (props) => {
  const [game, setGame] = useState({
    id: "",
    score: "",
    userId: "",
  })
  const [redirect, setRedirect] = useState(false)
  
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
      setRedirect(true)
    } catch (err) {
      console.log(`Error in fetch: ${err.message}`);
    }
  };


  if(redirect){
    return <Redirect to={`games/${game.id}`} />
  }


  return (
    <div className="home-page">
      <h1 className="home-title">Welcome to Jeopardy Jamboree</h1>
      <p className="home-message">Where it's 7:30 All the Time!</p>
      <div to="#" className="play-button" onClick={getGame}>
        Play A Game!
      </div>
    </div>
  );
};

export default HomePage;
