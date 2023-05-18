import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

const CategoryTile = (props) => {
  const [category, setCategory] = useState({
    name: "",
    questions: []
  });
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const getCategory = async () => {
    const categoryId = props.id;
    try {
      const response = await fetch(`/api/v1/categories/${categoryId}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      setCategory(body.category);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
    setShouldRedirect(true)
  };

  if (shouldRedirect) {
    return (
      <Redirect
        to={{
          pathname: "/clue",
          state: { questionText: selectedQuestion.questionText,
          answer: selectedQuestion.answer,
          difficulty: selectedQuestion.difficulty }
        }}
        />
    )
  }

  return (
    <div className="category-tile">
      <h3 className="category">{category.name}</h3>
      <div className="question-row">
        {category.questions.map((question) => (
          <div
            className="question-column"
            key={question.id}
            onClick={() => handleQuestionClick(question)}
          >
            {`${question.difficulty}`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryTile;
