import request from 'supertest';
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import jwt from 'jsonwebtoken';

declare global {
    var signin: () => string[];
}


let mongo: any;
beforeAll(async () => {
    process.env.JWT_KEY = "asdf";
    mongo = await MongoMemoryServer.create();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
        autoIndex: true
    });
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});


afterAll(async () => {
    mongo.stop();
    await mongoose.connection.close();
});

global.signin = () => {
    // build JWT payload {id, email}
    const payload = {
        id: new mongoose.Types.ObjectId().toHexString(),
        email: "test@test.com"
    };
    // create jwt
    const token = jwt.sign(payload, process.env.JWT_KEY!);


    // build session object {jwt: jwt}
    const session = {
        jwt: token
    };


    // turn session into JSON
    const sessionJSON = JSON.stringify(session);

    // take json and encode as base 64
    const base64 = Buffer.from(sessionJSON).toString('base64');
    // return a string thats a cookies with encode data
    return [`session=${base64}`];

};