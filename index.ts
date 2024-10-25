import express from "express";
import registerRoute from "./routes/auths/registerRoute"
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import loginRoute from "./routes/auths/loginRoute"
import postsRoute from "./routes/postsRoute";

import auth, { AuthReq } from "./routes/auths/auth";

import * as dotenv from 'dotenv';
import userRoute from "./routes/userRoute";
dotenv.config()

const app = express();

const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());
mongoose.connect(process.env.MONGOOSE_URL || "")

app.use(registerRoute);
app.use(loginRoute);
app.use(userRoute);
app.use(postsRoute);

app.get("/", (req, res) => {
    res.send("Hello from express from typescript");
})

app.get("/user", auth, (req, res) => {
    res.json((req as AuthReq).user)
})

app.listen(port, () => {
    console.log("App started on port " + port);
})