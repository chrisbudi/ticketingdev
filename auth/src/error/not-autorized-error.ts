import { customError } from "./custom-error";


export class NotAuthorizedError extends customError {
    statusCode: number = 401;

    /**
     *
     */
    constructor() {
        super("Not Authorize");

        Object.setPrototypeOf(this, NotAuthorizedError.prototype);

    }


    serializeError(): { message: string; field?: string | undefined; }[] {
        return [{ message: "Not Authorized" }];
    }
}