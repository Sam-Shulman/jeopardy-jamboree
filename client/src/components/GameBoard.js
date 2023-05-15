import React from "react";

const GameBoard = (props) => {
  const handleQuestionClick = (event) => {
    // Handle question click logic
  };

  return (
    <div className="game-board">
      <div className="categories-row">
        <div className="category">
          Category 1
          <div className="question-row">
            <div className="question-value" onClick={handleQuestionClick}></div>
            <div className="question-value" onClick={handleQuestionClick}></div>
            <div className="question-value" onClick={handleQuestionClick}></div>
            <div className="question-value" onClick={handleQuestionClick}></div>
            <div className="question-value" onClick={handleQuestionClick}></div>
          </div>
        </div>
        <div className="category">
          Category 2
          <div className="question-row">
            <div className="question-value" onClick={handleQuestionClick}></div>
            <div className="question-value" onClick={handleQuestionClick}></div>
            <div className="question-value" onClick={handleQuestionClick}></div>
            <div className="question-value" onClick={handleQuestionClick}></div>
            <div className="question-value" onClick={handleQuestionClick}></div>
          </div>
        </div>
        <div className="category">
          Category 3
          <div className="question-row">
            <div className="question-value" onClick={handleQuestionClick}></div>
            <div className="question-value" onClick={handleQuestionClick}></div>
            <div className="question-value" onClick={handleQuestionClick}></div>
            <div className="question-value" onClick={handleQuestionClick}></div>
            <div className="question-value" onClick={handleQuestionClick}></div>
          </div>
        </div>
        <div className="category">
          Category 4
          <div className="question-row">
            <div className="question-value" onClick={handleQuestionClick}></div>
            <div className="question-value" onClick={handleQuestionClick}></div>
            <div className="question-value" onClick={handleQuestionClick}></div>
            <div className="question-value" onClick={handleQuestionClick}></div>
            <div className="question-value" onClick={handleQuestionClick}></div>
          </div>
        </div>
        <div className="category">
          Category 5
          <div className="question-row">
            <div className="question-value" onClick={handleQuestionClick}></div>
            <div className="question-value" onClick={handleQuestionClick}></div>
            <div className="question-value" onClick={handleQuestionClick}></div>
            <div className="question-value" onClick={handleQuestionClick}></div>
            <div className="question-value" onClick={handleQuestionClick}></div>
          </div>
        </div>
        <div className="category">
          Category 6
          <div className="question-row">
            <div className="question-value" onClick={handleQuestionClick}></div>
            <div className="question-value" onClick={handleQuestionClick}></div>
            <div className="question-value" onClick={handleQuestionClick}></div>
            <div className="question-value" onClick={handleQuestionClick}></div>
            <div className="question-value" onClick={handleQuestionClick}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
