import express from "express";

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
    res.send("too much chasnge for 1 second");
});

export { router as currentUserRouter };