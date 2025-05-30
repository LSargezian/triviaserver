const { gql } = require('apollo-server-express');

const typeDefs = gql`
    enum Difficulty {
        EASY
        MEDIUM
        HARD
    }

    type Category {
        id: Int!
        name: String!
    }

    type Question {
        id: ID!
        category: Int!
        difficulty: Difficulty!
        question: String!
        all_answers: [String!]!
    }

    type QuizResponse {
        questions: [Question!]!
    }

    input ScoreInput {
        questionId: ID!
        answer: String!
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

    type Query {
        categories: [Category!]!
        quiz(category: Int, difficulty: Difficulty, amount: Int = 5): QuizResponse!
    }

    type Mutation {
        scoreQuiz(answers: [ScoreInput!]!): QuizScore!
    }
`;

module.exports = typeDefs;
