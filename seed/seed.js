const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();
const Category = require('../models/Category');
const Question = require('../models/Question');

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function fetchWithRetry(url, retries = 5, backoff = 2000) {
    for (let i = 0; i < retries; i++) {
        try {
            return await axios.get(url);
        } catch (err) {
            const status = err.response?.status;
            if (status === 429 && i < retries - 1) {
                console.warn(`429 received for ${url}. Retrying in ${backoff}ms… (attempt ${i+1}/${retries})`);
                await sleep(backoff);
                backoff *= 1.5;  // exponential backoff
            } else {
                throw err;
            }
        }
    }
}

async function seed() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Seeding DB...');

    // Load categories
    const catRes = await fetchWithRetry('https://opentdb.com/api_category.php');
    const categories = catRes.data.trivia_categories;
    await Category.deleteMany();
    await Category.insertMany(categories);
    console.log(`Loaded ${categories.length} categories.`);

    // Load questions
    await Question.deleteMany();
    const difficulties = ['easy', 'medium', 'hard'];

    for (const { id: catId } of categories) {
        for (const diff of difficulties) {
            const url = `https://opentdb.com/api.php?amount=5&category=${catId}&difficulty=${diff}&type=multiple`;

            try {
                const qRes = await fetchWithRetry(url);
                const docs = (qRes.data.results || []).map(q => ({
                    category: catId,
                    difficulty: diff,
                    question: q.question,
                    correct_answer: q.correct_answer,
                    incorrect_answers: q.incorrect_answers,
                }));

                if (docs.length) {
                    await Question.insertMany(docs);
                    console.log(`Seeded ${docs.length} questions for category ${catId} (${diff})`);
                } else {
                    console.log(`No questions for category ${catId} (${diff})`);
                }

            } catch (err) {
                console.error(`Failed to fetch questions for category ${catId} (${diff}):`, err.message);
            }
            // throttle to avoid rate-limits
            await sleep(1000);
        }
    }

    console.log('Seeding complete.');
    process.exit(0);
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});

// npm run seed