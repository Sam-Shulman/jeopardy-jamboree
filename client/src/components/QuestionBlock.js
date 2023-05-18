import React from "react";
import GuessForm from "./GuessForm";


const QuestionBlock = (props) => {

  return (
    <div className="whole-question-block">
    <div className="question-block">
      <h2 className="question-title">Question:</h2>
      <p className="question-text">{props.location.state.questionText}</p>
      <GuessForm correctAnswer= {props.location.state.answer}/>
    </div>
    </div>
  );
};

export default QuestionBlock;