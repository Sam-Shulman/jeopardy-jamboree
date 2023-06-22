import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import CategoryTile from "./CategoryTile.js"
import { Redirect } from "react-router-dom"

const CustomGameBoard = (props) => {
    const [categories, setCategories] = useState([])
    const [amountOfAnsweredQuestions, setAmountOfAnsweredQuestions] = useState(0)
    const gameId = props.match.params.id
    
    
    const getCategories = async () => {
        try {
          const response = await fetch(`/api/v1/customGames/${gameId}`)
          if (!response.ok) {
            const errorMessage = `${response.status} (${response.statusText})`
            const error = new Error(errorMessage)
            throw error
          }
          const data = await response.json()
          console.log(data)
          setCategories(data.game.categories)
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


  return (
    <div className="game-board">
      {amountOfAnsweredQuestions >= 30 && (
        <div className="ending-button">
          <button className="end-game-button" onClick={handleNewGame}>
            End Game
          </button>
        </div>
      )} Hey!
    </div>
  )
}

export default CustomGameBoard
