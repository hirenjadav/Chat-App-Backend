const HTTP_STATUS_CODE = require("../constants/httpStatusCode.constant");

const sendSuccessResponse = (responseRef, data) => {
  return responseRef.status(HTTP_STATUS_CODE.OK).send({
    status: "success",
    data,
  });
};

const sendFailureResponse = (responseRef, errorCode, extraDetails) => {
  return responseRef.status(HTTP_STATUS_CODE.OK).send({
    status: "failure",
    data: {
      errorCode,
      errorMessage: "",
      errorData: extraDetails || null,
    },
  });
};

const responseHandler = {
  sendSuccessResponse,
  sendFailureResponse,
};

module.exports = responseHandler;
