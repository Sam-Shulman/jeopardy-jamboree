import React, { useEffect, useState } from "react"

import CategoryTile from "./CategoryTile.js"


const CustomGameBoard = (props) => {
    const [categories, setCategories] = useState([])
    const [amountOfAnsweredQuestions, setAmountOfAnsweredQuestions] = useState(0)
    const gameId = props.match.params.id
    const [totalScore, setTotalScore] = useState(0)
    const [loading, setLoading] = useState(true)
    
    const getCategories = async () => {
        try {
            const response = await fetch(`/api/v1/customGames/${gameId}`)
            if (!response.ok) {
            const errorMessage = `${response.status} (${response.statusText})`
            const error = new Error(errorMessage)
            throw error
            }
            const data = await response.json()
            setCategories(data.categories)
            setLoading(false)
        } catch (err) {
            console.log(`Error in fetch: ${err.message}`)
            }
    }
    console.log(categories)


      useEffect(() => {
        getCategories()
      }, [])

      const handleNewGame = async () => {
        try {
          const response = await fetch(`/api/v1/games/${gameId}`, {
            method: "POST",
            headers: new Headers({
              "Content-Type": "application/json"
            }),
            body: JSON.stringify({ score: totalScore })
          })
          setShouldRedirect(true)
        } catch (error) {
          console.error(`Error in fetch: ${error.message}`)
        }
      }

      const addScore = async (value) => {
        try {
          if (value && value > 0) {
            const response = await fetch(`/api/v1/customGames/${gameId}`, {
              method: "PATCH",
              headers: new Headers({
                "Content-Type": "application/json"
              }),
              body: JSON.stringify({ score: value })
            })
            const responseBody = await response.json()
            const newScore = responseBody.game.score
            setTotalScore(newScore)
          }
        } catch (error) {
          console.error(`Error in fetch: ${error.message}`)
        }
      }
    
      const handleQuestionAnswered = () => {
        setAmountOfAnsweredQuestions((prevCount) => prevCount + 1)
      }


  return ( <div className="game-board">
  {amountOfAnsweredQuestions >= 30 && (
    <div className="ending-button">
      <button className="end-game-button" onClick={handleNewGame}>
        End Game
      </button>
    </div>
  )}
  {!loading && (
    <div className="score-container">
      <p className="score">Total Score: {totalScore}</p>
    </div>
  )}
  {loading ? (
    <div className="loading-screen">Loading...</div>
  ) : (
    <div className="categories-row grid-x">
      {categories.map((category) => (
        <CategoryTile
          key={category.id}
          name={category.name}
          questions={category.clues}
          gameId={gameId}
          addScore={addScore}
          onQuestionAnswered={handleQuestionAnswered}
        />
      ))}
    </div>
  )}
</div>
)
}

export default CustomGameBoard
