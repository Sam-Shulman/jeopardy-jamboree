import React from "react";
import { Link } from "react-router-dom";

const CategoryTile = (props) => {
  const { gameId, name, questions } = props;

  return (
    <div className="category-tile">
      <h3 className="category">{name}</h3>
      <div className="question-row">
        {questions.map((question) => (
          <Link
            key={question.id}
            gameId={gameId}
            to={`/games/${gameId}/questions/${question.id}`}
            className="question-link"
          >
            <div className="question-block">
              <p className="question-text">{question.difficulty}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryTile;
