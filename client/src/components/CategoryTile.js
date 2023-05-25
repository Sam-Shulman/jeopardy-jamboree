import React, { useState } from "react";

const CategoryTile = (props) => {
  const { gameId, name, questions, score } = props;
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [guess, setGuess] = useState("");

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
    setIsFormVisible(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform any necessary logic with the guess and selectedQuestion here
    // For simplicity, we'll just log them to the console
    console.log(selectedQuestion.question);
    console.log(guess);
    // Clear the input field, selected question, and hide the form
    setGuess("");
    setSelectedQuestion(null);
    setIsFormVisible(false);
  };

  const questionBlocks = questions.map((question) => (
    <div className="question-block" onClick={() => handleQuestionClick(question)}>
      <p className="question-text">{question.value}$</p>
    </div>
  ));

  return (
    <div className="category-tile">
      <h3 className="category">{name}</h3>
      <div className="question-row">
        {questionBlocks}
      </div>
      {isFormVisible && selectedQuestion && (
        <div className="guess-form-container">
          <form className="guess-form" onSubmit={handleSubmit}>
            <p className="question-text">{selectedQuestion.question}</p>
            <input
              className="guess-input"
              type="text"
              value={guess}
              onChange={(event) => setGuess(event.target.value)}
              placeholder="Enter your guess"
            />
            <button className="submit-button" type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CategoryTile;
