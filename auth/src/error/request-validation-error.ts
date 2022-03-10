import { ValidationError } from "express-validator";
import { customError } from "./custom-error";

export class RequestValidationError extends customError {
    statusCode = 400;
    constructor(public errors: ValidationError[]) {
        super('Invalid request parameter');

        //only extended build in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeError() {
        return this.errors.map(err => {
            return { message: err.msg, field: err.param };
        });
    }
}