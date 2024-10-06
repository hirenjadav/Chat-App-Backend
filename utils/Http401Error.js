const ERROR_CODES = require("../constants/errorCodes.constant");
const HTTP_STATUS_CODE = require("../constants/httpStatusCode.constant");
const BaseError = require("./BaseError");

class HTTP401Error extends BaseError {
  constructor(isInvalidToken = false) {
    const errorCode = isInvalidToken
      ? ERROR_CODES.INVALID_ACCESS_TOKEN
      : ERROR_CODES.ACCESS_DENIED;
    super(HTTP_STATUS_CODE.ACCESS_DENIED, errorCode);
  }
}

module.exports = HTTP401Error;
