import express from "express";
import auth, { AuthReq } from "./auths/auth";
import Post from "../models/Post";

const router = express.Router();

router.route("/posts")
    .get(async (req, res) => {
        if (req.query.id) {
            const posts = await Post.find({_id: req.query.id})
            res.json(posts)
        } else {
            const posts = await Post.find().sort({_id: -1})
            res.json(posts)
        }
    })
    .post(auth, async (req, res) => {
        const newpost = new Post({ title: req.body.title, content: req.body.content, authorId: (req as AuthReq).user.id })
        try {
            newpost.save();
            res.send("Success");
        } catch {
            res.status(500).send("An error occured");
        }
    })
    .patch(auth, async (req, res) => {
        if (!req.body._id) {
            res.status(400).send("Wrong Request")
        } else {
            const result = await Post.updateOne({ _id: req.body._id }, { title: req.body.title, content: req.body.content })
            if (result.acknowledged)
                res.send("Success")
            else
                res.status(500).send("There was an internal error")
        }
    })
    .delete(auth, async (req, res) => {
        if (!req.query.id) {
            res.status(400).send("Wrong Request")
        } else {
            const result = await Post.deleteOne({ _id: req.query.id })
            if (result.acknowledged)
                res.send("Success")
            else
                res.status(500).send("There was an internal error")
        }
    })

export default router;