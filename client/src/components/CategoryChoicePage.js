import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";



const CategoryChoicePage = (props) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const history = useHistory();


  const getCategories = async () => {
    try {
      const response = await fetch(`/api/v1/customGames`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const data = await response.json();
      setCategories(data.categories);
    } catch (err) {
      console.log(`Error in fetch: ${err.message}`);
    }
  };

  const createNewGame = async () => {
    try {
      const response = await fetch("/api/v1/customGames", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({ categories: selectedCategories })
      });
      const data = await response.json();
      console.log(data)
      const gameId = data.game.id;
      history.push(`/customGames/${gameId}`);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };
  const handleCategoryChange = (event) => {
    const categoryId = event.target.id;
    const isChecked = event.target.checked;
    const categoryName = event.target.value;
    const categoryObject = { categoryName, categoryId };
  
    if (isChecked && selectedCategories.length >= 6) {
      return;
    }
  
    setSelectedCategories((prevSelectedCategories) => {
      if (isChecked) {
        // Check if category with the same categoryId already exists
        const categoryExists = prevSelectedCategories.some(
          (category) => category.categoryId === categoryId
        );
  
        if (categoryExists) {
          return prevSelectedCategories;
        }
  
        return [...prevSelectedCategories, categoryObject];
      } else {
        return prevSelectedCategories.filter(
          (category) => category.categoryId !== categoryId
        );
      }
    });
  };
  
  
  
  
  useEffect(() => {
    getCategories();
  }, []);


  const categoriesList = categories.map((categoryItem) => {
    const isChecked = selectedCategories.some(
      (category) => category.categoryId === categoryItem.id
    );
  
    return (
      <li key={categoryItem.id}>
        <label className="categories-list">
          <input
            id={categoryItem.id}
            type="checkbox"
            value={categoryItem.name}
            checked={isChecked}
            onChange={handleCategoryChange}
          />
          {categoryItem.name}
        </label>
      </li>
    );
  });
  


  return (
    <div className="categories-list">
        <h1>Pick Six Categories for Your Game!</h1>
      <form onSubmit={createNewGame}>
        <ul>{categoriesList}</ul>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CategoryChoicePage;
