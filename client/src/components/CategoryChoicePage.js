import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'

const CategoryChoicePage = (props) => {
  const [categories, setCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [gameId, setGameId] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
  const checkedIcon = <CheckBoxIcon fontSize="small" />

  const getCategories = async () => {
    try {
      const response = await fetch(`/api/v1/customGames`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const data = await response.json()
      setCategories(data.categories)
    } catch (err) {
      console.log(`Error in fetch: ${err.message}`)
    }
  }

  const createNewGame = async () => {
    try {
      const response = await fetch("/api/v1/customGames", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ categories: selectedCategories })
      })

      const data = await response.json()
      const gameId = data.game.id
      setGameId(gameId)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const handleCategoryChange = (event, value) => {
    const selected = value.map((category) => ({
      name: category.name,
      id: category.id
    }))

    setSelectedCategories(selected.slice(0, 6))
  }


  const capitalizeEachWord = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  useEffect(() => {
    getCategories()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (selectedCategories.length !== 6) {
      setErrorMessage("Please select exactly six categories.")
      return
    }

    await createNewGame()
  }

  return (
    <div className="categories-list" style={{ textAlign: "center", color: "#fff" }}>
      <h1>Pick Six Categories for Your Game!</h1>
      <div className="dropdown">
        <form onSubmit={handleSubmit}>
          <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={categories}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.name}
              </li>
            )}
            style={{ width: 500, backgroundColor: "#fff", marginBottom: 40 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label=""
                placeholder="Categories"
                style={{ backgroundColor: "#fff" }}
              />
            )}
            onChange={(event, value) => setSelectedCategories(value)}
            value={selectedCategories}
          />
          {errorMessage && <p>{errorMessage}</p>}
          {gameId ? (
            <Link to={`/customGames/${gameId}`}>
              <button type="submit" className="play-button">
                Go to Game
              </button>
            </Link>
          ) : (
            <button type="submit" className="play-button" onSubmit={handleSubmit}>
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  )
}

export default CategoryChoicePage