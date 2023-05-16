import React from "react";

const QuestionTile = ({ question, onClick }) => {
  return (
    <div className="question-tile" onClick={onClick}>
      {question.questionText}
    </div>
  );
};

export default QuestionTile;
