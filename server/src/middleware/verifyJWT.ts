import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      admin?: any;
    }
  }
}

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1] || req.cookies?.token;

  if (!token) {
    const error = new Error('No token provided') as any;
    error.statusCode = 401;
    return next(error);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET || '');
    req.admin = decoded;
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      error.statusCode = 401;
      error.message = 'Token has expired';
    } else if (error.name === 'JsonWebTokenError') {
      error.statusCode = 401;
      error.message = 'Invalid token';
    }
    next(error);
  }
};

export default verifyJWT;
