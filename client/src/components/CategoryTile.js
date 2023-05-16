import React, { useState, useEffect } from "react";

const CategoryTile = (props) => {
    const [question, setQuestion] = useState({
        questionText: "",
        difficulty: "",
        answer: "",
    })

    // const questionId = props.match.id
    
    // const getQuestion = async () => {
    //     try{
    //         const response = await fetch (`/api/v1/questions/${questionId}`)
    //      if (!response.ok) {
    //         const errorMessage = `${response.status} (${response.statusText})`
    //         const error = new Error(errorMessage)
    //         throw error
    //       }
    //       const body = await response.json()
    //       setQuestion(body.question)
    //      } catch (err) {
    //         console.error(`Error in fetch: ${err.message}`)
    //     }
    // }
    // useEffect(() => {
    //     getQuestion()
    //   }, [])

    //   console.log(question)

  return (
    <div className="category-tile">
      <h3 className="category">{props.name}</h3>
      <div className="question-row">
        <div className="question-column">$100</div>
        <div className="question-column">$200</div>
        <div className="question-column">$300</div>
        <div className="question-column">$400</div>
        <div className="question-column">$500</div>
      </div>
    </div>
  );
};

export default CategoryTile;
