import { NextFunction, Request, Response } from 'express';
import { ERRORS } from '../enums/errors.enum';

/**
 * Global error handling middleware
 *
 * @param {any} err - Express error
 * @param {Request} req Initial request
 * @param {Response} res  response
 * @param {NextFunction} next  Allows you to switch to the next middleware if existing
 *
 * @see https://expressjs.com/en/guide/error-handling.html
 */
export const ErrorsInterceptor = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  /**
   *  When you add a custom error handler, you must delegate to the default Express error handler,
   *  When the headers have already been sent to the client
   *  Note that the default error handler can get triggered if you call next()
   *  with an error in your code more than once, even if custom error handling middleware is in place.
   */
  if (res.headersSent) {
    return next(err);
  }

  /**
   * Error from api, service, etc...
   */
  if (err.status && err.error) {
    return res.status(err.status).json({ error: err.error });
  }

  /**
   * In the other cases, we return a 500
   */
  return res.status(500).json({ error: ERRORS.INTERNAL });
};
