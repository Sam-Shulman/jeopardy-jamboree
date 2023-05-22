import React, { useEffect, useState } from "react";
import GuessForm from "./GuessForm";

const QuestionShow = (props) => {
  const [question, setQuestion] = useState({
    questionText: "",
    answer: "",
    difficulty: "",
    categoryId: "",
    id: ""
  });
  const questionId = props.match.params.id;
  const userId = props.userId
  const gameId = props.match.params.gameId

  useEffect(() => {
    getQuestion();
  }, []);

  const getQuestion = async () => {
    try {
      const response = await fetch(
        `/api/v1/games/${gameId}/questions/${questionId}`
      );
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const data = await response.json();
      setQuestion(data.question);
    } catch (err) {
      console.log(`Error in fetch: ${err.message}`);
    }
  };

  return (
    <div className="whole-question-show">
      <div className="question-show">
        <h1 className="question-title">{question.questionText}</h1>
      </div>
        <GuessForm
        answer={question.answer}
        userId={userId}
        questionId={question.id}
        score={props.score}
        gameId={gameId}
        />
    </div>
  );
};

export default QuestionShow;
