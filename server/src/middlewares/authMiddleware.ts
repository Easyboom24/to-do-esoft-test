import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { RequestWithToken } from "../typing/types";
dotenv.config({ path: `${__dirname}/../../.env` });



export default function authMiddleware (req: Request,res: Response,next: NextFunction) {
    if(req.method === 'OPTIONS')
        next();
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if(!token) {
            return res.json({status:401,error_message:"Пользователь не авторизован"});
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY as jwt.Secret);
        (req as RequestWithToken).token = decoded;
        next();
    }
    catch(e) {
        const err = e as Error;
        return res.json({status:401,error_message:err.message});
    }
}