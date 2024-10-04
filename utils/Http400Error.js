import { BaseError } from "./BaseError";
const { HTTP_STATUS_CODE } = require("../constants/httpStatusCode");

export class HTTP400Error extends BaseError {
  constructor(description = "bad request") {
    super("NOT FOUND", HTTP_STATUS_CODE.BAD_REQUEST, true, description);
  }
}
