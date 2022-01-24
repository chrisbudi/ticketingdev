import { customError } from "./custom-error";

export class DatabaseConnectionError extends customError {
    statusCode = 500;
    reason = 'Error connecting to Database';
    constructor() {
        super('Error connecting to Database');

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeError() {
        return [
            { message: this.reason }
        ];
    }
}