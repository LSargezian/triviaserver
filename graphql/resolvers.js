const Category = require('../models/Category');
const Question = require('../models/Question');

const resolvers = {
    Query: {
        categories: async () => {
            return await Category.find().sort('name').exec();
        },

        quiz: async (_, { category, difficulty, amount }) => {
            const filter = {};
            if (category) filter.category = category;
            if (difficulty) filter.difficulty = difficulty;

            const docs = await Question.aggregate([
                { $match: filter },
                { $sample: { size: amount } },
                { $project: {
                        question: 1,
                        difficulty: 1,
                        category: 1,
                        incorrect_answers: 1,
                        correct_answer: 1
                    }
                }
            ]);

            const questions = docs.map(q => {
                const all_answers = [...q.incorrect_answers, q.correct_answer]
                    .sort(() => Math.random() - 0.5);
                return {
                    id: q._id,
                    category: q.category,
                    difficulty: q.difficulty,
                    question: q.question,
                    all_answers
                };
            });

            return { questions };
        }
    },

    Mutation: {
        scoreQuiz: async (_, { answers }) => {
            let score = 0;
            const detailed = [];

            for (const { questionId, answer } of answers) {
                const q = await Question.findById(questionId).lean();
                if (!q) continue;
                const isCorrect = q.correct_answer === answer;
                if (isCorrect) score++;
                detailed.push({
                    question: q.question,
                    selected: answer,
                    correct: q.correct_answer,
                    isCorrect
                });
            }

            return { score, total: answers.length, detailed };
        }
    }
};

module.exports = resolvers;
