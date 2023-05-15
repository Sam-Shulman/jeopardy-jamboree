import { Category } from "../../models/index.js";

class CategorySeeder {
    static async seed() {
        const categoriesData = [
            {
                name: "State Capitals"
            },
            {
                name: "Game of Thrones Characters"
            },
            {
                name: "College to the NBA"
            },
            {
                name: "Recent Starting Quarterbacks"
            },
            {
                name: "Beatles Songs"
            },
            {
                name: "Boston Calling"
            }
        ]
        for (const singleCategoryData of categoriesData) {
            const currentCategory = await Category.query().findOne({ name: singleCategoryData.name })
            if(!currentCategory){
                await Category.query().insert(singleCategoryData)
            }
        }
    }
}

export default CategorySeeder