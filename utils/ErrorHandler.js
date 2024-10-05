const errorCodeDescription = require("../constants/errorCodeMessage.constant");
const ERROR_CODES = require("../constants/errorCodes.constant");
const HTTP_STATUS_CODE = require("../constants/httpStatusCode.constant");
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

  handleApiError(error, response) {
    console.error("\n\n\n");
    console.error("Server Api Error at ", new Date().toUTCString());
    console.error("Server Api Error name: ", error.name);
    console.error("Server Api Error message: ", error.message);
    if (error.stack) console.error("Server Api Error stack:\n", error.stack);

    const errorResponse = {
      status: "failure",
      data: {
        errorCode: ERROR_CODES.INTERNAL_SERVER,
        errorDescription: "Internal Server Error",
      },
    };
    if (error.errorData) errorResponse["data"]["errorData"] = error.errorData;
    return response
      .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
      .json(errorResponse);
  }
}
const errorHandler = new ErrorHandler();

module.exports = errorHandler;
