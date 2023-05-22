import React from "react";
import { Link } from "react-router-dom";

const CategoryTile = (props) => {
  const { gameId, name, questions, score } = props

  const questionBlocks = questions.map((question) => (
    <Link
      to={`/games/${gameId}/questions/${question.id}`}
      key={question.id}
      id={question.id}
      gameId={gameId}
      score={score}
      className="question-link"
    >
      <div className="question-block">
        <p className="question-text">{question.difficulty}</p>
      </div>
    </Link>
  ));

  return (
    <div className="category-tile">
      <h3 className="category">{name}</h3>
      <div className="question-row">
        {questionBlocks}
      </div>
    </div>
  );
};

export default CategoryTile;
