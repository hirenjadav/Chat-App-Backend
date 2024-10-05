const ERROR_CODES = require("../constants/errorCodes.constant");
const HTTP_STATUS_CODE = require("../constants/httpStatusCode.constant");
const BaseError = require("./BaseError");

class APIError extends BaseError {
  constructor() {
    super(HTTP_STATUS_CODE.INTERNAL_SERVER, ERROR_CODES.INTERNAL_SERVER, true);
  }
}

module.exports = APIError;
