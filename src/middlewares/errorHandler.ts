import type { NextFunction, Request, Response } from 'express';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const isDev = process.env.NODE_ENV === 'development';

  if (isDev) console.error('Error:', err.message);

  res.status(500).json({
    message: isDev
      ? `Error: ${err.message}`
      : 'Internal Server Error. Please try again later',
  });
};
