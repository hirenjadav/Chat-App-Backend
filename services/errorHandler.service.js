const HTTP_STATUS_CODE = require("../constants/httpStatusCode.constant");

const throwBadRequestError = (responseRef) => {
  return responseRef
    .status(HTTP_STATUS_CODE.BAD_REQUEST)
    .send({ message: "Required fields are missing" });
};

const throwServerError = (responseRef) => {
  return responseRef
    .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
    .send({ message: "Internal Server Error" });
};

const errorHandler = {
  throwServerError,
  throwBadRequestError,
};

module.exports = errorHandler;
