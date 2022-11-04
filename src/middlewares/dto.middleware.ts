import { NextFunction, Request, RequestHandler, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { HttpException } from '../utils/exceptions';
import { sanitize } from 'class-sanitizer';

function dtoValidationMiddleware(type: any, skipMissingProperties: boolean = false): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const dtoObj = plainToInstance(type, req.body);
    validate(dtoObj, { skipMissingProperties })
      .then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          next(new HttpException(errors));
        } else {
          sanitize(dtoObj);
          req.body = dtoObj;
          next();
        }
      })
  }
}

export default dtoValidationMiddleware;