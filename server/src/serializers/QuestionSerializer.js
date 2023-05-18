class QuestionSerializer {
  static getSummary(question) {
    const allowedAttributes = ["id", "questionText", "difficulty", "answer", "categoryId"];
    let serializedQuestion = {};
    for (const attribute of allowedAttributes) {
      serializedQuestion[attribute] = question[attribute];
    }
    return serializedQuestion;
  }
}

export default QuestionSerializer;


