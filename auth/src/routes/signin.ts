import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { body } from "express-validator";
import { User } from '../models/user';
import { BadRequestError, validateRequest } from '@cwsource/common';
import { Password } from '../services/password';

const router = express.Router();

router.post('/api/users/signin',
    [
        body('email').isEmail().withMessage("Email must be valid"),
        body('password').trim()
            // .isLength({ min: 4, max: 20 })
            // .withMessage("Password must between 4 and 20 character")
            .notEmpty().withMessage("You must supply a password")
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            throw new BadRequestError("Invalid Credentials");
        }
        const passwordMatch = await Password.compare(
            existingUser.password,
            password);

        if (!passwordMatch) {
            throw new BadRequestError("Invalid Credentials");
        }
        //generate json web token
        const userJwt = jwt.sign({
            id: existingUser.id,
            email: existingUser.email
        }, process.env.JWT_KEY!);

        //store it on session object
        req.session = { jwt: userJwt };

        res.status(201).send(existingUser);


    });

export { router as signinRouter };