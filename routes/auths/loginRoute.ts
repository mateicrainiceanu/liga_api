
import express from "express";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

import * as dotenv from 'dotenv';
dotenv.config()

router.post("/login", async (req, res) => {
    const { email, password } = req.body

    const users = await User.find({ email: email })

    if (users.length == 0) {
        res.status(400).send("Wrong username")
        return
    } else {
        let [user] = users

        bcrypt.compare(password, user.hash, async (err, result) => {
            if (err || !result)
                res.status(400).send("Wrong password!")
            else {
                let token = await jwt.sign({ id: user._id, email: user.email }, process.env.JWT_KEY || "")
                res.status(200).json({ token })
            }
        })
    }
})

export default router

