import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import CategoryTile from "./CategoryTile.js"
import { Redirect } from "react-router-dom"

const JServiceGameBoard = (props) => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const gameId = props.match.params.id
  const history = useHistory()
  const [totalScore, setTotalScore] = useState(0)
  const [amountOfAnsweredQuestions, setAmountOfAnsweredQuestions] = useState(0)
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const getCategories = async () => {
    try {
      const response = await fetch(`/api/v1/games/${gameId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const data = await response.json()
      console.log(data)
      setCategories(data.game.categories)
      setLoading(false)
    } catch (err) {
      if (
        err.response &&
        (err.response.status === 429 ||
          err.message.includes("categories.map is not a function"))
      ) {
        alert(
          "Cannot create a new game so quickly. Please wait, refresh the home page and try again in 15 seconds."
        )
        history.push("/")
      } else {
        console.log(`Error in fetch: ${err.message}`)
      }
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  const addScore = async (value) => {
    try {
      if (value && value > 0) {
        const response = await fetch(`/api/v1/games/${gameId}`, {
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

  if (shouldRedirect) {
    return <Redirect push to="/" />
  }

  return (
    <div className="game-board">
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
              name={category.category || category.name}
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

export default JServiceGameBoard
