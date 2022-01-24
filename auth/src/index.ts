import express from "express";
import 'express-async-errors';
import { json } from "body-parser";

import mongoose from "mongoose";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from './middlewares/error-handler';
import { notFoundError } from './error/not-found-error';

const app = express();
app.use(json());


//use router
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);


app.all('*', async () => {
    throw new notFoundError();
});

app.use(errorHandler);

const start = async () => {
    try {
        await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
            autoIndex: true,
        });
        console.log("connected to mongodb");
        // await mongoose.createConnection('mongodb://auth-mongo-srv:27017/auth');
    } catch (error) {
        console.error(error);
    }
    app.listen(3000, () => {
        console.log("Listening on port 3000 !!!!");
    });
};

start();


