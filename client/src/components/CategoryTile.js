import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const CategoryTile = (props) => {
  const { gameId, name, questions, addScore, score } = props;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [guess, setGuess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState([]);
  const [isGuessEmpty, setIsGuessEmpty] = useState(false);


  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  const removeHtmlTags = (text) => {
    return text.replace(/<\/?[^>]+(>|$)/g, "").replace(/[\\"]/g, "");
  };

  const removeNonTextSymbols = (text) => {
    const withoutHtmlTags = text.replace(/<\/?[^>]+(>|$)/g, "");
  
    const withoutQuotes = withoutHtmlTags.replace(/['"]/g, "");
  
    const withoutNonTextSymbols = withoutQuotes.replace(/[^\w\s]/g, "");
    const withoutArticles = withoutNonTextSymbols.replace(/\b(a|the)\b/gi, "");
  
    return withoutArticles.trim();
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestionIndex(index);
    setShowModal(true);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const question = questions[currentQuestionIndex];
    const answer = removeNonTextSymbols(question.answer.toLowerCase().trim());
    const guessFormatted = guess.toLowerCase().trim();
    const arrayOfCorrectAnswers = answer.split(" ");
    const isCorrect =
      guessFormatted === answer || arrayOfCorrectAnswers.includes(guessFormatted);
  
    if (guessFormatted === "") {
      setIsGuessEmpty(true);
      return;
    }
  
    setIsGuessEmpty(false);
  
    setIsAnswerCorrect((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestionIndex] = isCorrect;
  
      if (isCorrect) {
        addScore(question.value);
      }
  
      return updatedAnswers;
    });
    setGuess("");
    setTimeout(() => {
      setShowModal(false);
    }, 2000);
  };
    
  const renderQuestionForm = () => {
    const question = questions[currentQuestionIndex];
    const answerCorrect = isAnswerCorrect[currentQuestionIndex];

    if (question) {
      const answer = removeHtmlTags(question.answer)
      return (
        <div className="guess-form-container">
          <form className="guess-form" onSubmit={handleSubmit}>
            <p className="question-text">{question.question}</p>
            <input
              className="guess-input"
              type="text"
              value={guess}
              onChange={(event) => setGuess(event.target.value)}
              placeholder="Enter your guess"
            />
            {isGuessEmpty && (
              <p className="error-message">Please enter your guess.</p>
            )}
            {answerCorrect !== undefined && (
              <p className={`feedback-text ${answerCorrect ? "correct" : "incorrect"}`}>
                {answerCorrect ? "Correct!" : `Incorrect. The correct answer is ${answer}.`}
              </p>
            )}
          </form>
        </div>
      );
    }
    return null;
  };

  const renderQuestionBlocks = () => {
    return questions.map((question, index) => {
      const answerCorrect = isAnswerCorrect[index];
      const isAnswered = answerCorrect !== undefined;
  
      return (
        <div
          key={question.id}
          className={`question-block ${isAnswered ? 'answered' : ''}`}
          onClick={!isAnswered ? () => handleQuestionClick(index) : null}
        >
          <p className="question-text">{isAnswered ? '' : question.value}</p>
        </div>
      );
    });
  };
  const capitalizeEachWord = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="category-tile cell small-2">
      <h3 className="category">{capitalizeEachWord(name)}</h3>
      <div className="question-column">{renderQuestionBlocks()}</div>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        className="modal-content"
      >
        <div className="modal-header">
          <h2 className="modal-title">Question</h2>
        </div>
        <div className="modal-body">
          {renderQuestionForm()}
        </div>
        <div className="modal-footer">
          <button className="modal-button" onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button className="modal-button" type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </Modal>
    </div>

  );
};

export default CategoryTile;
