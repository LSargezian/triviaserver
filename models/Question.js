const { Schema, model } = require('mongoose');

const QuestionSchema = new Schema({
    category: { type: Number, required: true },
    difficulty: { type: String, enum: ['easy','medium','hard'], required: true },
    question: { type: String, required: true },
    correct_answer: { type: String, required: true },
    incorrect_answers: { type: [String], required: true }
});

module.exports = model('Question', QuestionSchema);