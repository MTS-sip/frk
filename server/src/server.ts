import express from 'express';
import cors from 'cors';
import path from 'path';
import db from './config/connection.js';
import { fileURLToPath } from 'url';

// Import the ApolloServer class
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

// Import the two parts of a GraphQL schema
import { typeDefs, resolvers } from './schemas/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {

  await server.start();
  await db();

  const PORT = process.env.PORT || 5001;
  const app = express();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(cors({
    origin: ['https://frk-3w59.onrender.com', 'http://localhost:3080'],
    credentials: true,
  }));

  app.use('/graphql', expressMiddleware(server as any));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../client/dist')));

    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

// Call the async function to start the server
startApolloServer();
