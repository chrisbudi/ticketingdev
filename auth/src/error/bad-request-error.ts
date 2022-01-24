import { customError } from "./custom-error";


export class BadRequestError extends customError {
    statusCode: number = 400;

    constructor(public message: string) {
        super(message);

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeError(): { message: string; field?: string | undefined; }[] {
        return [{ message: this.message }];
    }

}