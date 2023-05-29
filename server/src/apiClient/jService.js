import got from 'got';

class JServiceClient {
    static async getStartingQuestions() {
        try {
          const url = 'https://jservice.io/api/random?&count=20';
          const apiResponse = await got(url);
          const responseBody = JSON.parse(apiResponse.body);
          const randomQuestionCatIds = responseBody.map((question) => question.category_id);
          return randomQuestionCatIds;
        } catch (error) {
          return { error: error.message };
        }
      }

  static async getCategory(categoryId) {
    try {
      const url = `http://jservice.io/api/category?id=${categoryId}`;
      const apiResponse = await got(url);
      const responseBody = JSON.parse(apiResponse.body);
      const clues = responseBody.clues;
      const clueValues = [200, 400, 600, 800, 1000];
      const categoryClues = [];

      for (const value of clueValues) {
        const clue = clues.find((c) => c.value === value);
        if (clue && !clue.question.toLowerCase().includes("seen") && !clue.question.toLowerCase().includes("heard") && !clue.question.toLowerCase().includes("shown"))
         {
          categoryClues.push(clue);
        }
      }

      return {
        category: responseBody.title,
        clues: categoryClues,
      };
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getCategories() {
    try {
      const arrayOfCategoryIds = await this.getStartingQuestions();
      const arrayOfPromises = arrayOfCategoryIds.map(async (categoryId) => {
        const categoryResponse = await this.getCategory(categoryId);
        return categoryResponse;
      });
      const arrayOfResponseBodies = await Promise.all(arrayOfPromises);
      const validCategories = arrayOfResponseBodies.filter((category) => {
        return category.clues.length === 5;
      });
      return validCategories.slice(0, 6);
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default JServiceClient;