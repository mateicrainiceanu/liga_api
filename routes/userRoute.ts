
import express from 'express';
import User from '../models/User';
import { manageCreateUser } from './auths/registerRoute';

const router = express.Router();

router.route("/users")
    .get(async (req, res) => {

        const users = await User.find({});

        res.json(users.map(user => ({ ...(user as any)._doc, hash: "xxx" })))
    })
    .post(manageCreateUser)
    .patch(async (req, res) => {
        if (!req.body._id) {
            res.status(400).send("Wrong Request")
        } else {
            const result = await User.updateOne({ _id: req.body._id }, { name: req.body.name, email: req.body.email })
            if (result.acknowledged)
                res.send("Success")
            else
                res.status(500).send("There was an internal error")
        }
    })
    .delete(async (req, res) => {
        if (!req.query.id) {
            res.status(400).send("Wrong Request")
        } else {
            const result = await User.deleteOne({ _id: req.query.id })
            if (result.acknowledged)
                res.send("Success")
            else
                res.status(500).send("There was an internal error")
        }
    })


export default router

