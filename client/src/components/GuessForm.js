import React, { useState } from "react";

const GuessForm = (props) => {
  const [guess, setGuess] = useState("");

  const handleInputChange = (event) => {
    setGuess(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const gameId = props.gameId;
    const questionId = props.questionId;
    const answer = props.answer;

    // Compare the user's guess with the correct answer
    const isCorrect = guess === answer;

    // Send the answer to the backend to update the score
    try {
      const response = await fetch(`/api/v1/games/${gameId}/questions/${questionId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ guess: guess, isCorrect: isCorrect }),
      });

      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        throw new Error(errorMessage);
      }

      // Handle the response from the backend if needed
      // For example, you can update the user's score on the frontend

      // Reset the guess input
      setGuess("");
    } catch (err) {
      console.log(`Error in fetch: ${err.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={guess} onChange={handleInputChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default GuessForm;
