import QuestionSerializer from "./QuestionSerializer.js";
class CategorySerializer {
    static async getSummary(category) {
        const allowedAttributes = ["id", "name"]
        let serializedCategory = {}
        for (const attribute of allowedAttributes) {
            serializedCategory[attribute] = category[attribute]
        }
        const relatedQuestions = await category.$relatedQuery("questions")
        const serializedQuestions = await Promise.all(
            relatedQuestions.map((question) => {
                return  QuestionSerializer.getSummary(question)
            })
        )
        serializedCategory.questions = serializedQuestions
        return serializedCategory
    }
}

export default CategorySerializer