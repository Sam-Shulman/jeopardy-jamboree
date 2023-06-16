import React, { useEffect, useState } from "react"

const CustomGameBoard = (props) => {
  const [categories, setCategories] = useState([])


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

  const categoriesList = categories.map(categoryItem => {
    return (
        <li>{categoryItem.name}</li>
    )
  })

  useEffect(() => {
    getCategories()
  }, [])



  return (
 <div className="categories-list">
    {categoriesList}
 </div>
  )
}

export default CustomGameBoard
