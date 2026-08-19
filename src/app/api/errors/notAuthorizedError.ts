import HttpStatus from 'http-status-codes';

import ErrorHandler from './errorHandler';

export default class NotAuthorizedError extends ErrorHandler {
  protected error_name = 'not authorized';

  protected httpCode = HttpStatus.FORBIDDEN;

  public constructor(message: string = 'Request is not authorized', error: Error | undefined = undefined, data: Record<string, unknown> | null = null) {
    super(message, error, data);
    Error.captureStackTrace(this, this.constructor);
  }
}
