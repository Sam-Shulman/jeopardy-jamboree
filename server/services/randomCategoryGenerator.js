import { Category } from "../src/models/index.js"
const getRandomCategoryId = async () => {
    const allCategories = await Category.query()
    const categoryLength = allCategories.length
  
    if (categoryLength === 0) {
        return null
    }
  
    const randomIndex = Math.floor(Math.random() * categoryLength)
    const randomCategory = allCategories[randomIndex]
  
    return randomCategory.id
  }

export default getRandomCategoryId