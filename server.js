const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const typeDefs = require('./graphql/typedefs');
const resolvers = require('./graphql/resolvers');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

async function startServer() {
    await connectDB();
    const app = express();
    app.use(cors());
    app.use(express.json());

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        playground: process.env.ENABLE_GRAPHIQL === 'true'
    });
    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });

    app.use(errorHandler);

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    });
}

startServer().catch(err => console.error(err));