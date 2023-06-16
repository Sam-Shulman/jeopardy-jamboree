import React, { useEffect, useState } from "react";

const CustomGameBoard = (props) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

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

  const handleCategoryChange = (event) => {
    const categoryName = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked && selectedCategories.length >= 6) {
      return; // Limit the selection to six categories
    }

    setSelectedCategories((prevSelectedCategories) => {
      if (isChecked) {
        return [...prevSelectedCategories, categoryName];
      } else {
        return prevSelectedCategories.filter((category) => category !== categoryName);
      }
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault()
  };

  const categoriesList = categories.map((categoryItem) => {
    return (
      <li key={categoryItem.id}>
        <label className="categories-list">
          <input
            type="checkbox"
            value={categoryItem.name}
            checked={selectedCategories.includes(categoryItem.name)}
            onChange={handleCategoryChange}
          />
          {categoryItem.name}
        </label>
      </li>
    );
  });

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="categories-list">
        <h1>Pick Six Categories for Your Game!</h1>
      <form onSubmit={handleFormSubmit}>
        <ul>{categoriesList}</ul>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CustomGameBoard;
