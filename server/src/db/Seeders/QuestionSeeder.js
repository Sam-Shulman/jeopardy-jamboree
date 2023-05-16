import { Question } from "../../models/index.js";

class QuestionSeeder {
    static async seed() {
        const questionsData = [
            {
                questionText: "What is the capital of California?", 
                difficulty: "easy",
                answer: "Sacramento",
                categoryId: 1
            },
            {
                questionText: "What is the capital of Florida?", 
                difficulty: "easy",
                answer: "Tallahassee",
                categoryId: 1            
            },
            {
                questionText: "What is the capital of Maryland?", 
                difficulty: "medium",
                answer: "Annapolis",
                categoryId: 1
            },
            {
                questionText: "What is the capital of Pennsylvania?", 
                difficulty: "medium",
                answer: "Harrisburg",
                categoryId: 1
            },
            {
                questionText: "What is the capital of Oregon?", 
                difficulty: "hard",
                answer: "Salem",
                categoryId: 1
            },
            {
                questionText: "What is the name of The Beatles' primary drummer", 
                difficulty: "easy",
                answer: "Ringo Starr",
                categoryId: 5
            },
            {
                questionText: "Who wrote the song Yesterday", 
                difficulty: "medium",
                answer: "Paul McCartney",
                categoryId: 5
            },
            {
                questionText: "On what album is the song Love Me Do", 
                difficulty: "medium",
                answer: "Please Please Me",
                categoryId: 5
            },
            {
                questionText: "Which love of John Lennon's is credited with breaking up The Beatles", 
                difficulty: "easy",
                answer: "Yoko Ono",
                categoryId: 5
            },
            {
                questionText: "Where is there a barber showing photographs?", 
                difficulty: "hard",
                answer: "Penny Lane",
                categoryId: 5
            },
            {
                questionText: "What is the name of Cersei Lannister's first born son?", 
                difficulty: "easy",
                answer: "Joffrey",
                categoryId: 2
            },
            {
                questionText: "When the television show starts, who is the ruler of the seven kingdoms?", 
                difficulty: "easy",
                answer: "Robert Baratheon",
                categoryId: 2
            },
            {
                questionText: "What is the name of the master of coin in the early seasons of the show?", 
                difficulty: "medium",
                answer: "Petyr Baelish",
                categoryId: 2
            },
            {
                questionText: "What is the name of Robert Baratheon's bastard son who works in a blacksmith when we first meet him?", 
                difficulty: "medium",
                answer: "Gendry",
                categoryId: 2
            },
            {
                questionText: "Who gives Arya the iron coin of the Faceless Men?", 
                difficulty: "hard",
                answer: "Jaqen H'Ghar",
                categoryId: 2
            },
            {
                questionText: "Where did Kevin Durant go to school?", 
                difficulty: "easy",
                answer: "Texas",
                categoryId: 3
            },
            {
                questionText: "Where did Anthony Davis go to school?", 
                difficulty: "easy",
                answer: "Kentucky",
                categoryId: 3
            },
            {
                questionText: "Where did Hakeem Olajuwon go to school?", 
                difficulty: "medium",
                answer: "Houston",
                categoryId: 3
            },
            {
                questionText: "Where did Shaquille O'Neal go to school?", 
                difficulty: "medium",
                answer: "LSU",
                categoryId: 3
            },
            {
                questionText: "Where did Ja Morant go to school?", 
                difficulty: "hard",
                answer: "Murray State",
                categoryId: 3
            },
            {
                questionText: "Who quarterbacked the Atlanta Falcons to their most recent Super Bowl appearance?", 
                difficulty: "easy",
                answer: "Matt Ryan",
                categoryId: 4
            },
            {
                questionText: "Who was the starting QB of the Denver Broncos in their most recent Super Bowl victory?", 
                difficulty: "easy",
                answer: "Peyton Manning",
                categoryId: 4
            },
            {
                questionText: "This New York Jets QB lead the Jets to two straight AFC Championship games from 2010-2011?", 
                difficulty: "medium",
                answer: "Mark Sanchez",
                categoryId: 4
            },
            {
                questionText: "This quarterback's injury in 2001 gave Tom Brady his first chance to start in the NFL?", 
                difficulty: "medium",
                answer: "Drew Bledsoe",
                categoryId: 4
            },
            {
                questionText: "Which Houston Texan's QB holds the NFL record for most consecutive games with a pick-six?", 
                difficulty: "hard",
                answer: "Matt Schaub",
                categoryId: 4
            },
            {
                questionText: "What is the name of the Train Station attached to the TD Garden?", 
                difficulty: "easy",
                answer: "North Station",
                categoryId: 6
            },
            {
                questionText: "What is the name of the oldest park in Boston?", 
                difficulty: "easy",
                answer: "Boston Common",
                categoryId: 6
            },
            {
                questionText: "What is the tallest building in Boston?", 
                difficulty: "medium",
                answer: "John Hancock Tower",
                categoryId: 6
            },
            {
                questionText: "What was the name of the Celtics stadium prior to it being re-named to the TD Garden?", 
                difficulty: "medium",
                answer: "Fleet Center",
                categoryId: 6
            },
            {
                questionText: "Where is Paul Revere buried?", 
                difficulty: "hard",
                answer: "Granary Burial Ground",
                categoryId: 6
            },

        ]
        for (const singleQuestionData of questionsData) {
            const currentQuestion = await Question.query().findOne({ questionText: singleQuestionData.questionText })
            if(!currentQuestion){
                await Question.query().insert(singleQuestionData)
            }
        }
    }
}

export default QuestionSeeder