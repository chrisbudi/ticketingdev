import { BadRequestError } from './../error/bad-request-error';
import { DatabaseConnectionError } from './../error/database-connection-error';
import { RequestValidationError } from './../error/request-validation-error';
import { User } from '../models/user';
import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { ExitStatus } from 'typescript';

const router = express.Router();

router.post('/api/users/signup', [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20 characters')
],
    async (req: Request, res: Response) => {
        console.log("testing 123");
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // return res.status(400).send(errors.array());
            // throw new Error('Invalid email or password');
            throw new RequestValidationError(errors.array());
        }

        const { email, password } = req.body;

        console.log(email, password);
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // console.log("email in use");
            // return res.send({});

            throw new BadRequestError('email in user');
        }
        const user = User.build({
            email, password
        });

        await user.save();
        res.status(201).send(user);
    });

export { router as signupRouter };