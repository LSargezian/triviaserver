const {gql} = require('apollo-server-express');

    const typeDefs = gql`

        type Category {
            id: Int!
            name: String!
        }

        type Question { 
            id: ID! 
            category: Int! 
            difficulty: String! 
            question: String! 
            all_answers: [String!]! 
        }
        
        type QuizResponse { 
            questions: [Question!]! 
        }
        
        type ResultDetail { 
            question: String! 
            selected: String! 
            correct: String! 
            isCorrect: Boolean! 
        }
        
        type QuizScore { 
            score: Int! 
            total: Int! 
            detailed: [ResultDetail!]! 
        }

        input ScoreInput { 
            questionId: ID! 
            answer: String! 
        }

        type Query {
            categories: [Category!]!
            quiz(category: Int, difficulty: String, amount: Int = 5): QuizResponse!
        }

        type Mutation {
        scoreQuiz(answers: [ScoreInput!]!): QuizScore!
        }
    `;

module.exports = typeDefs;