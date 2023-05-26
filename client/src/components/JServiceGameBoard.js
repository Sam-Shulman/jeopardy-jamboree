import React, { useEffect, useState } from "react";
import CategoryTile from "./CategoryTile.js";

const JServiceGameBoard = (props) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true)
  const gameId = props.match.params.id;

  const getCategories = async () => {
    try {
      const response = await fetch(`/api/v1/games/${gameId}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const data = await response.json();
      setCategories(data.game.categories);
      setLoading(false)
    } catch (err) {
      console.log(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="game-board">
      {loading ? (
        <div className="loading-screen">Loading...</div>
      ) : (
        <div className="categories-row">
          {categories.map((category, index) => (
            <CategoryTile
              gameId={gameId}
              key={category[index]}
              name={category.category}
              questions={category.clues}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default JServiceGameBoard;
