import { ApiException } from '../types/exceptions';

/**
 * Generic class for HTTP error's
 */
export class Exception implements ApiException {
  constructor(readonly error: any, readonly status: number) {}
}

/**
 * 404 Error
 */
export class NotFoundException extends Exception {
  constructor(error: any) {
    super(error, 404);
  }
}
