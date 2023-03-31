import bcrypt from "bcrypt";
import { Request } from "express";
import { UserModel } from "../models/userModel";
import userService, { generateToken } from "../services/userService";
import { RequestWithToken, UserLoginType, RequestWithBody, ResponseWithBody,
UserCheckAuthType, TokenType, RequestWithQuery, UserResponsibleType, UserAndTokenType, ErrorType} from "../typing/types";
import {validationResult} from "express-validator";

export default class EmployeeController {
    public async checkIsLead(userId:number) {
        return await userService.isLead(userId);
    }

    public async registrationUser(req: RequestWithBody<UserModel>, res: ResponseWithBody<TokenType>) {
        const errorsValidation = validationResult(req);
        if(!errorsValidation.isEmpty()){
            const errors: ErrorType[] = errorsValidation.array()
                .map(e => {return {error_message:e.msg}});
            return res.json(errors);
        }
            
       try{
            const candidate = await userService.findUserByLogin(req.body.login);
            if(candidate) {
                const error: ErrorType = {error_message:"Пользователь с таким логином уже существует"};
                return res.json(error); 
            }
            
            const token: string  = await userService.createUser(req.body);
            return res.status(200).json({token});
       }
       catch(e) {
            const error: ErrorType = {status:400,error_message:(e as Error).message};
            return res.json(error); 
       }
    }

    public async login(req:RequestWithBody<UserLoginType>, res: ResponseWithBody<UserAndTokenType>) {
        try {
            const user = await userService.findUserByLogin(req.body.login);
            if(!user) {
                const error: ErrorType = {status:403,error_message:"Пользователя с таким логином не существует"}
                return res.json(error);
            }

            const comparePassword = bcrypt.compareSync(req.body.password,user.password);

            if(!comparePassword) {
                const error: ErrorType = {status:403,error_message:"Введен неверный пароль"};
                return res.json(error);
            }
            
            const isLead = await userService.isLead(user.id);
            const {password, ...userData } = user;

            const token: string  = generateToken(String(user.id), user.login);
            return res.status(200).json({user:{...userData,isLead:isLead},token});
        }
        catch(e) {
            const error: ErrorType = {status:400,error_message:(e as Error).message};
            return res.json(error); 
        }
    }

    public async getResponsibles(req: Request,res: ResponseWithBody<UserResponsibleType[]>) {
        try {
            const {userId, fio} = (req as unknown as RequestWithQuery<{userId:number,fio:string}>).query;
            if(!Number(userId)) {
                const error: ErrorType = {status:400,error_message:'Отсутствует query-параметр userId'};
                return res.json(error);
            }
            const listResponsibles = await userService.getResponsibles(userId, fio);
            return res.status(200).json(listResponsibles);
        }
        catch(e) {
            const error: ErrorType = {status:400,error_message:(e as Error).message};
            return res.json(error);
        }
    }

    public async checkAuth(req: Request, res: ResponseWithBody<UserAndTokenType>) {
        try {
            const payload = ((req as RequestWithToken).token as UserCheckAuthType);
            const user  = await userService.fundUserById(payload.id);
            if(!user) {
                const error: ErrorType = {status:403,error_message:"Пользователя не существует"};
                return res.json(error);
            }
            const isLead = await userService.isLead(user.id);
            const {password,...userData} = user;
            const token = generateToken(String(payload.id),payload.login);
            return res.status(200).json({user:{...userData,isLead:isLead},token});
        }
        catch (e) {
            const error: ErrorType = {status:400,error_message:(e as Error).message};
            return res.json(error);
        }
    }
}
