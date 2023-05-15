/* eslint-disable no-console */
import { connection } from "../boot.js"
import CategorySeeder from "./Seeders/CategorySeeder.js"

class Seeder {
  static async seed() {
    await CategorySeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder