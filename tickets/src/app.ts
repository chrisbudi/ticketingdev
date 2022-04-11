import express from "express";
import 'express-async-errors';
import { json } from "body-parser";

import cookieSession from "cookie-session";

import { errorHandler, notFoundError } from '@cwsource/common';




const app = express();

app.set('trust proxy', true);

app.use(json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test"
}));

//use router


app.all('*', async () => {
    throw new notFoundError();
});

app.use(errorHandler);

export { app };