import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const GuessForm = (props) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const history = useHistory();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const isCorrect = userAnswer.toLowerCase() === props.correctAnswer.toLowerCase();
    setIsAnswerCorrect(isCorrect);
  };

  const handleNextQuestion = () => {
    setUserAnswer("");
    setIsAnswerCorrect(null);
    history.push("/game");
  };

  return (
    <div className="guess-form">
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={userAnswer}
          onChange={(event) => setUserAnswer(event.target.value)}
          className="guess-input"
        />
        <button type="submit" className="submit-button">Submit</button>
      </form>

      {isAnswerCorrect !== null && (
        <div className="answer-status">
          {isAnswerCorrect ? <p className="correct-answer">Correct answer!</p> : <p className="incorrect-answer">Incorrect answer!</p>}
          <button onClick={handleNextQuestion} className="next-button">Next Question</button>
        </div>
      )}
    </div>
  );
};

export default GuessForm;