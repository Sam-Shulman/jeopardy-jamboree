import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import QuestionShow from "./QuestionShow";
const CategoryTile = (props) => {
  const { gameId, name, questions, score } = props

  const [questionId, setQuestionId ] = useState(null)

  const [redirect, setRedirect] = useState(false)

  const postSelectedQuestion = async (question) => {
    setQuestionId(question.id)
    try {
      const response = await fetch(`/api/v1/apiGames/${question.id}`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
      }),
      body: JSON.stringify({ question: question })
      })
      if(!response.ok){
        const errorMessage = await response.json()
        throw new Error(errorMessage)
      }
      setRedirect(true)
    } catch (err){
      console.error("Error in fetch", err.message)
    } 
  }

  if(redirect){
    return <Redirect to={`random/${questionId}`} />
  }

  const questionBlocks = questions.map((question) => (
    <div
      
    onClick={ ()=> {postSelectedQuestion(question)}}
    >
      <div className="question-block">
        <p className="question-text">{question.value}$</p>
      </div>
    </div>
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
