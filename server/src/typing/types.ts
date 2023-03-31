import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { UserModel } from "../models/userModel";
import { PriorityModel } from "../models/priorityModel";
import { StatusModel } from "../models/statusModel";
import { TaskModel } from "../models/taskModel";

export type ErrorType = {status?: number, error_message:string};

export type RequestWithBody<T> = Request<{},{},T,{}> ;
export type RequestWithParams<T> = Request<T>;
export type RequestWithQuery<T> = Request<{},{},{},T>;
export type RequestWithBodyAndQuery<T,K> = Request<{},{},T,K>;
export type RequestWithParamsAndQuery<T,K> = Request<T,{},{},K>;

export type RequestWithToken = Request & {token: string | JwtPayload;}

export type QueriesForAllTasks = {
    userId:number,
    page:number,
    limit:number,
    order:'date_end'|'resbonsible_id'| 'updated_at'
}

export type ResponseWithBody<T> = Response<T | ErrorType | ErrorType[]>;

export type UserLoginType = Pick<UserModel,'login'|'password'>;
export type UserCheckAuthType = Pick<UserModel,'login'|'id'>;
export type UserResponsibleType = Pick<UserModel,'id'|'surname'|'firstname'|'patronymic'>;
export type UserCreatorType = UserResponsibleType;

export type TaskViewModel = TaskModel &  StatusModel & PriorityModel & {
    responsible_surname: string,
    responsible_firstname: string,
    responsible_patronymic: string | null,
};

export type TokenType = {token:string};

export type UserAndTokenType = {user: Omit<UserModel,'password'>& {isLead:boolean}} & TokenType;
