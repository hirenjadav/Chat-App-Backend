const ERROR_CODES = require("../constants/errorCodes.constant");
const HTTP_STATUS_CODE = require("../constants/httpStatusCode.constant");
const BaseError = require("./BaseError");

class HTTP400Error extends BaseError {
  constructor() {
    super(HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODES.BAD_REQUEST, true);
  }
}

module.exports = HTTP400Error;
