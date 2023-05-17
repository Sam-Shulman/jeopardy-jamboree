import React, {useState, useEffect} from "react";

const QuestionBlock = (props) => {
    return (
        <h1>{props.location.state.questionText}</h1>
    )
}

export default QuestionBlock
