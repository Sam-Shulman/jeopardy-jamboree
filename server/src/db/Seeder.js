/* eslint-disable no-console */
import { connection } from "../boot.js"
import CategorySeeder from "./Seeders/CategorySeeder.js"
import QuestionSeeder from "./Seeders/QuestionSeeder.js"

class Seeder {
  static async seed() {
    await CategorySeeder.seed()
    await QuestionSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder