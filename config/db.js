require('dotenv').config();
const mongoose = require("mongoose");

async function connectDB() {
    if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI missing');
    }
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('MongoDB connected');
}

module.exports = connectDB;