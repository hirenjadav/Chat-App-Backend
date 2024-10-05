const HTTP_STATUS_CODE = require("../constants/httpStatusCode.constant");

const sendSuccessResponse = (responseRef, data) => {
  return responseRef.status(HTTP_STATUS_CODE.OK).send({
    status: "success",
    data,
  });
};

const responseHandler = {
  sendSuccessResponse,
};

module.exports = responseHandler;
