import React, { useEffect, useState } from "react";
import GuessForm from "./GuessForm";

const QuestionShow = (props) => {
  const [questionObject, setQuestionObject] = useState({
  });

  const questionId = props.match.params.id

  useEffect(() => {
    getQuestion();
  }, []);

  const getQuestion = async () => {
    try {
      const response = await fetch(
        `/api/v1/apiGames/${questionId}`
      );
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const data = await response.json();
      setQuestionObject(data.question);
    } catch (err) {
      console.log(`Error in fetch: ${err.message}`);
    }
  };
  

  return (
    <div className="whole-question-show">
      <div className="question-show">
        <h1 className="question-title">{questionObject.question.question}</h1>
      </div>
        {/* <GuessForm
        answer={props.answer}
        userId={props.userId}
        questionId={props.id}
        score={props.score}
        gameId={props.gameId}
        /> */}
    </div>
  );
};

export default QuestionShow;
