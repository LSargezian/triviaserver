# 🎯 Trivia Server

A Node.js server using **Express**, **GraphQL**, and **MongoDB** that serves trivia categories and questions using data fetched from the [Open Trivia Database](https://opentdb.com/). 
---

## 🚀 Features

- GraphQL API with Apollo Server
- Express backend
- MongoDB with Mongoose ODM
- Seed script to populate questions and categories from OpenTDB

---

## 🛠️ Tech Stack

- **Node.js**
- **Express**
- **Apollo Server (GraphQL)**
- **MongoDB + Mongoose**
- **Axios**
- **dotenv**

---

## 📦 Installation

1. Clone the repo:
   ```bash
   git clone 
   cd triviaserver

   Create a .env file in the root:

2. Create an .env file in the root directory:
  MONGODB_URI=your-mongodb-uri
  PORT=4000
  ENABLE_GRAPHIQL=true

3. Install dependencies
   npm install

4. Seed the database with trivia data
    npm run seed

5. Start the development server
    npm run dev
