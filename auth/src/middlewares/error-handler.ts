import { Request, Response, NextFunction } from "express";
import { customError } from "../error/custom-error";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    if (err instanceof customError) {
        res.status(err.statusCode).send({
            errors: err.serializeError()
        });
    }

    res.status(400).send({
        errors: [{ message: 'something went wrong!' }]
    });

};