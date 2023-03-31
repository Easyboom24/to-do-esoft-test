import { Request, Response } from "express";
import { StatusModel } from "../models/statusModel";
import statusService from "../services/statusService";
import { RequestWithBody,RequestWithParams, ResponseWithBody } from "../typing/types";

export default class StatusController {
    public async createStatus(req: RequestWithBody<StatusModel>, res: ResponseWithBody<number>) {
        try {
            const id =  await statusService.createStatus(req.body);
            return res.status(200).json(id);
        }
        catch(e) {
            return res.json({status:400,error_message:(e as Error).message}); 
        }
    }

    public async getAll(req: Request, res: ResponseWithBody<StatusModel[]>) {
        try {
            const statuses : StatusModel[] = await statusService.getAllStatuses();
            return res.status(200).json(statuses);
        }
        catch(e) {
            return res.json({status:400,error_message:(e as Error).message}); 
        }
    }

    public async getOne(req: RequestWithParams<{id:number}>, res: ResponseWithBody<StatusModel>) {
        try {
            const status : StatusModel = await statusService.getOneStatus(req.params.id);
            return res.status(200).json(status);
        }
        catch(e) {
            return res.json({status:400,error_message:(e as Error).message}); 
        }
    }
}