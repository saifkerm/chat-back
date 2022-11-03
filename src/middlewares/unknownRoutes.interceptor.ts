import { NotFoundException } from '../utils/exceptions';
import { ERRORS } from '../enums/errors.enum';

/**
 * For all other undefined routes, an error is returned (404)
 */
export const UnknownRoutesInterceptor = () => {
  throw new NotFoundException(ERRORS.UNKNOWN_ROUTES);
};
