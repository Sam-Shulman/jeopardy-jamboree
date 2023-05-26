import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const CategoryTile = (props) => {
  const { gameId, name, questions, score } = props;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [guess, setGuess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState([]);

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  const handleQuestionClick = (index) => {
    setCurrentQuestionIndex(index);
    setShowModal(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const question = questions[currentQuestionIndex];
    const isCorrect = guess.toLowerCase() === question.answer.toLowerCase()

    setIsAnswerCorrect((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestionIndex] = isCorrect;
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
            {answerCorrect !== undefined && (
              <p className={`feedback-text ${answerCorrect ? "correct" : "incorrect"}`}>
                {answerCorrect ? "Correct!" : `Incorrect. The correct answer is ${question.answer}.`}
              </p>
            )}
          </form>
        </div>
      );
    }
    return null;
  };

  const renderQuestionBlocks = () => {
    return questions.map((question, index) => (
      <div
        key={question.id}
        className="question-block"
        onClick={() => handleQuestionClick(index)}
      >
        <p className="question-text">{question.value}$</p>
      </div>
    ));
  };

  return (
    <div className="category-tile">
      <h3 className="category">{name}</h3>
      <div className="question-row">{renderQuestionBlocks()}</div>
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
