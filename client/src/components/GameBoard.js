import React, {useEffect, useState} from "react";

const GameBoard = (props) => {

  const [categories, setCategories] = useState([])
  
  const getCategories = async () => {
    try {
      const response = await fetch(`/api/v1/categories`)
      if (!response.ok){
        const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw(error)
      }
      const data = await response.json()
      setCategories(data.categories)
    } catch (err) {
        console.log(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    getCategories();
  }, [])
  
  return ( 
    <div className="game-board">
      <div className="categories-row">
      {categories.length > 0 &&
        categories.map((category, index) => (
          <div className="category" key={index}>
            {category.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
