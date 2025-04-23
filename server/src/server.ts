import express from 'express';
import cors from 'cors';
import path from 'path';
import db from './config/connection.js';
import { fileURLToPath } from 'url';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

import { typeDefs, resolvers } from './schemas/index.js';
import { authMiddleware } from './services/auth-service.js'; // JWT context helper

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Define Apollo Server only ONCE and pass typeDefs/resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();
  await db();

  const PORT = process.env.PORT || 5001;
  const app = express();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(
    cors({
      origin: ['https://frk-3w59.onrender.com', 'http://localhost:3080'],
      credentials: true,
    })
  );

  // ✅ Attach decoded user to context with middleware
  app.use(
    '/graphql',
    expressMiddleware(server as any, {
      context: async ({ req }) => authMiddleware(req),
    })
  );

  // ✅ Serve client files in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../client/dist')));

    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`🚀 API server running on port ${PORT}`);
    console.log(`🌐 GraphQL endpoint: http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();