import { Clue } from "../../models/index.js";

class QuestionSeeder {
    static async seed() {
        const questionsData = [
            {
                question: "What is the capital of California?", 
                value: 200,
                answer: "Sacramento",
                categoryId: 1
            },
            {
                question: "What is the capital of Florida?", 
                value: 400,
                answer: "Tallahassee",
                categoryId: 1            
            },
            {
                question: "What is the capital of Maryland?", 
                value: 600,
                answer: "Annapolis",
                categoryId: 1
            },
            {
                question: "What is the capital of Pennsylvania?", 
                value: 800,
                answer: "Harrisburg",
                categoryId: 1
            },
            {
                question: "What is the capital of Oregon?", 
                value: 1000,
                answer: "Salem",
                categoryId: 1
            },
            {
                question: "What is the name of The Beatles' primary drummer", 
                value: 200,
                answer: "Ringo Starr",
                categoryId: 5
            },
            {
                question: "Who wrote the song Yesterday", 
                value: 600,
                answer: "Paul McCartney",
                categoryId: 5
            },
            {
                question: "On what album is the song Love Me Do", 
                value: 800,
                answer: "Please Please Me",
                categoryId: 5
            },
            {
                question: "Which love of John Lennon's is credited with breaking up The Beatles", 
                value: 400,
                answer: "Yoko Ono",
                categoryId: 5
            },
            {
                question: "Where is there a barber showing photographs?", 
                value: 1000,
                answer: "Penny Lane",
                categoryId: 5
            },
            {
                question: "What is the name of Cersei Lannister's first born son?", 
                value: 200,
                answer: "Joffrey",
                categoryId: 2
            },
            {
                question: "When the television show starts, who is the ruler of the seven kingdoms?", 
                value: 400,
                answer: "Robert Baratheon",
                categoryId: 2
            },
            {
                question: "What is the name of the master of coin in the early seasons of the show?", 
                value: 600,
                answer: "Petyr Baelish",
                categoryId: 2
            },
            {
                question: "What is the name of Robert Baratheon's bastard son who works in a blacksmith when we first meet him?", 
                value: 800,
                answer: "Gendry",
                categoryId: 2
            },
            {
                question: "Who gives Arya the iron coin of the Faceless Men?", 
                value: 1000,
                answer: "Jaqen H'Ghar",
                categoryId: 2
            },
            {
                question: "Where did Kevin Durant go to school?", 
                value: 200,
                answer: "Texas",
                categoryId: 3
            },
            {
                question: "Where did Anthony Davis go to school?", 
                value: 400,
                answer: "Kentucky",
                categoryId: 3
            },
            {
                question: "Where did Hakeem Olajuwon go to school?", 
                value: 600,
                answer: "Houston",
                categoryId: 3
            },
            {
                question: "Where did Shaquille O'Neal go to school?", 
                value: 800,
                answer: "LSU",
                categoryId: 3
            },
            {
                question: "Where did Ja Morant go to school?", 
                value: 1000,
                answer: "Murray State",
                categoryId: 3
            },
            {
                question: "Who quarterbacked the Atlanta Falcons to their most recent Super Bowl appearance?", 
                value: 200,
                answer: "Matt Ryan",
                categoryId: 4
            },
            {
                question: "Who was the starting QB of the Denver Broncos in their most recent Super Bowl victory?", 
                value: 400,
                answer: "Peyton Manning",
                categoryId: 4
            },
            {
                question: "This New York Jets QB lead the Jets to two straight AFC Championship games from 2010-2011?", 
                value: 600,
                answer: "Mark Sanchez",
                categoryId: 4
            },
            {
                question: "This quarterback's injury in 2001 gave Tom Brady his first chance to start in the NFL?", 
                value: 800,
                answer: "Drew Bledsoe",
                categoryId: 4
            },
            {
                question: "Which Houston Texans QB holds the NFL record for most consecutive games with a pick-six?", 
                value: 1000,
                answer: "Matt Schaub",
                categoryId: 4
            },
            {
                question: "What is the name of the Train Station attached to the TD Garden?", 
                value: 200,
                answer: "North Station",
                categoryId: 6
            },
            {
                question: "What is the name of the oldest park in Boston?", 
                value: 400,
                answer: "Boston Common",
                categoryId: 6
            },
            {
                question: "What is the tallest building in Boston?", 
                value: 600,
                answer: "John Hancock Tower",
                categoryId: 6
            },
            {
                question: "What was the name of the Celtics stadium prior to it being re-named to the TD Garden?", 
                value: 800,
                answer: "Fleet Center",
                categoryId: 6
            },
            {
                question: "Where is Paul Revere buried?", 
                value: 1000,
                answer: "Granary Burial Ground",
                categoryId: 6
            },

        ]
        for (const singleQuestionData of questionsData) {
            const currentQuestion = await Clue.query().findOne({ question: singleQuestionData.question })
            if(!currentQuestion){
                await Clue.query().insert(singleQuestionData)
            }
        }
    }
}

export default QuestionSeeder