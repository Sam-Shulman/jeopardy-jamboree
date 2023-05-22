import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const GuessForm = (props) => {
  const [guess, setGuess] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [redirectToGameBoard, setRedirectToGameBoard] = useState(false);

  const handleChange = (event) => {
    setGuess(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isGuessCorrect = guess.toLowerCase() === props.answer.toLowerCase();
    setIsCorrect(isGuessCorrect);
  };

  const handleNextQuestion = () => {
    setRedirectToGameBoard(true);
  };

  if (redirectToGameBoard) {
    return <Redirect to={`/games/${props.gameId}`} />;
  }

  return (
    <div className="guess-form-container">
      <form className="guess-form" onSubmit={handleSubmit}>
        <input className="guess-input" type="text" value={guess} onChange={handleChange} />
        <button className="submit-button" type="submit">Submit</button>
        {isCorrect !== null && (
          <p>{isCorrect ? "Your guess is correct!" : "Your guess is incorrect."}</p>
        )}
      </form>
      <button className="next-question-button" onClick={handleNextQuestion}>Next Question</button>
    </div>
  );
};

export default GuessForm;
