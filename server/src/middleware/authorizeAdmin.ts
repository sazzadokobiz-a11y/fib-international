import { Request, Response, NextFunction } from 'express';

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.admin?.role !== 'admin') {
    const error = new Error('Insufficient permissions') as any;
    error.statusCode = 403;
    return next(error);
  }
  next();
};

export default authorizeAdmin;
