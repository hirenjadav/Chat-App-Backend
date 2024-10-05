const errorCodeDescription = require("../constants/errorCodeMessage.constant");
const BaseError = require("./BaseError");

class ErrorHandler {
  isTrustedError(error) {
    if (error instanceof BaseError) {
      return error.isOperational;
    }
    return false;
  }

  handleError(error, response) {
    const errorResponse = {
      status: "failure",
      data: {
        errorCode: error.errorCode,
        errorDescription: errorCodeDescription[error.errorCode] || "",
      },
    };
    if (error.errorData) errorResponse["data"]["errorData"] = error.errorData;
    return response.status(error.httpCode).json(errorResponse);
  }
}
const errorHandler = new ErrorHandler();

module.exports = errorHandler;
