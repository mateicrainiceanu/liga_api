import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

import * as dotenv from 'dotenv';
dotenv.config()

export default async function auth(req: Request, res: Response, next: NextFunction){
    const token = req.body.token || req.query.token || req.query.tok || req.query.t

    if (!token){
        res.status(403).send("User is not logged in")
        return
    }

    var decoded = await jwt.verify(token, process.env.JWT_KEY || "");
    
    if (decoded) {
        (req as AuthReq).user = decoded as {id: string, email:string}
        return next();
    } else 
        res.status(403).send("User is not logged in")
}

export interface AuthReq extends Request {
    user: {
        id: string,
        email: string
    }
}