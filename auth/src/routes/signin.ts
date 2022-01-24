import express from "express";

const router = express.Router();

router.post('/api/users/signin', (req, res) => {
    res.send("hi there!, this is chris");
});

export { router as signinRouter };