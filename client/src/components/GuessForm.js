import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const GuessForm = (props) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const history = useHistory();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Compare user's answer with the correct answer
    const isCorrect = userAnswer === props.correctAnswer;
    setIsAnswerCorrect(isCorrect);
  };

  const handleNextQuestion = () => {
    // Reset form and answer status
    setUserAnswer("");
    setIsAnswerCorrect(null);

    // Redirect back to GameBoard
    history.push("/game");
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      {isAnswerCorrect !== null && (
        <div>
          {isAnswerCorrect ? <p>Correct answer!</p> : <p>Incorrect answer!</p>}
          <button onClick={handleNextQuestion}>Next Question</button>
        </div>
      )}
    </div>
  );
};

export default GuessForm;
