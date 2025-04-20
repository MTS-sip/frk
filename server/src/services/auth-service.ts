import type { Request } from 'express';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';
dotenv.config();

interface JwtPayload {
  _id: unknown;
  username: string;
}

//  Middleware to extract user from JWT token
export const authMiddleware = (req: Request) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.split(' ')[1];

  if (!token) return {};

  try {
    const { data }: any = jwt.verify(token, process.env.JWT_SECRET_KEY || '', { maxAge: '2h' });
    return { user: data as JwtPayload };
  } catch (err) {
    console.error('JWT verification failed:', err);
    return {};
  }
};

//  Utility to sign a new JWT token for a user
export const signToken = (username: string, _id: unknown) => {
  const payload = { username, _id };
  const secretKey: any = process.env.JWT_SECRET_KEY;

  return jwt.sign({ data: payload }, secretKey, { expiresIn: '2h' });
};

// Custom GraphQL Authentication error
export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, undefined, undefined, undefined, ['UNAUTHENTICATED']);
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
}
