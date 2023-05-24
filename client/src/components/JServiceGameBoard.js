import React, { useEffect, useState } from "react";
import CategoryTile from "./CategoryTile.js";

const JServiceGameBoard = (props) => {
  const [categories, setCategories] = useState([]);

  const getGame = async () => {
    try {
      const response = await fetch(`/api/v1/apiGames`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const data = await response.json();
      setCategories(data.game);
    } catch (err) {
      console.log(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    getGame();
  }, []);

  return (
    <div className="game-board">
      <div className="categories-row">
        {categories.map((category, index) => (
          <CategoryTile
            key={category[index]}
            name={category.category}
            questions={category.clues}
          />
        ))}
      </div>
    </div>
  );
};

export default JServiceGameBoard;
