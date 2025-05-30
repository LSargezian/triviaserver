const Question = require('../../models/Question');

const mutation = {
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

module.exports = mutation;
