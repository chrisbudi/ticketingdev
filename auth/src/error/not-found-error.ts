import { customError } from "./custom-error";

export class notFoundError extends customError {
    statusCode = 404;
    constructor() {
        super('Route not found');
        Object.setPrototypeOf(this, notFoundError.prototype);
    }

    serializeError(): { message: string; field?: string | undefined; }[] {
        return [{ message: "Not Found" }];
    }

}