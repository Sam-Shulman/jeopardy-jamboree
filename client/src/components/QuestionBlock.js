import React, {useEffect, useState} from "react";

const QuestionBlock = (props) => {
  
  const [question, setQuestion] = useState({
    questionText: "",
    answer: "",
    difficulty: "",
    categoryId: ""
  })
  const questionId = props.match.params.id
  const gameId = props.gameId
  const getQuestion = async () => {
    try {
      const response = await fetch(`/api/v1/games/${gameId}/questions/${questionId}`)
      if (!response.ok){
        const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw(error)
      }
      const data = await response.json()
      setQuestion(data.question)
    } catch (err) {
        console.log(`Error in fetch: ${err.message}`)
    }
  }
  useEffect(() => {
    getQuestion()
  }, [])

  return (
    <div className="whole-question-block">
      <div className="question-block">
        <p className="question-text">{question.questionText}</p>
      </div>
    </div>
  );
};

export default QuestionBlock;