import React, {useEffect, useState} from "react";
import CategoryTile from "./CategoryTile.js";

const JServiceGameBoard = (props) => {

  const [game, setGame] = useState({
    score: "",
    userId: "",
    categories: [],
    id: ""
  })

  const gameId = props.match.params.id
  
  
  const getGame = async () => {
    try {
      const response = await fetch(`/api/v1/apiGames`)
      console.log(response)
      if (!response.ok){
        const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw(error)
      }
      const data = await response.json()
      console.log(data)
      setGame(data.game)
    } catch (err) {
        console.log(`Error in fetch: ${err.message}`)
    }
  }
//   const categoryTiles = game.category.map((category) => (
//     <CategoryTile
//     score={game.score}
//     gameId={gameId}
//     key={category.id}
//     id={category.id}
//     name={category.name}
//     questions={category.questions}
//     />
//   ))
  // remove conditional length logic
  useEffect(() => {
    // post to create game
    // router send game back (with score)
    // with associated category data
    // can remove categories router
    getGame();
  }, [])
  return ( 
    <div className="game-board">
      <div className="categories-row">
        {/* {categoryTiles} */}
      </div>
    </div>
  );
}

export default JServiceGameBoard