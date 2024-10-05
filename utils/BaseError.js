class BaseError extends Error {
  httpCode;
  errorCode;
  errorData;
  isOperational;

  constructor(httpCode, errorCode, isOperational = true, errorData = null) {
    super();
    Object.setPrototypeOf(this, new.target.prototype);

    this.httpCode = httpCode;
    this.errorCode = errorCode;
    this.errorData = errorData;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}

module.exports = BaseError;
