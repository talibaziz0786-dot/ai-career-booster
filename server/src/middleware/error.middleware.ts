import { Request, Response, NextFunction } from 'express';

// Middleware to handle 404 Not Found errors
const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // Pass the error to the next error handling middleware
};

// Centralized error handling middleware
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // Check if status code is already set, otherwise default to 500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  res.json({
    message: err.message,
    // Stack trace sirf development environment mein dikhao for debugging
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};

export { notFound, errorHandler };