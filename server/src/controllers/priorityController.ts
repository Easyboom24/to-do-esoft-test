import { Request } from "express";
import { PriorityModel } from "../models/priorityModel";
import priorityService from "../services/priorityService";
import { RequestWithBody, RequestWithParams, ResponseWithBody } from "../typing/types";

export default class PriorityController {
    public async getAll(req : Request, res: ResponseWithBody<PriorityModel[]>) {
        try{
            const priorities = await priorityService.getAllPriorities();
            return res.status(200).json(priorities);
        }
        catch(e) {
            return res.json({status:400,error_message:(e as Error).message}); 
        }
    }

    public async getOne(req: RequestWithParams<{id:number}>, res: ResponseWithBody<PriorityModel>) {
        try{
            const priority = await priorityService.getOnePriority(req.params.id);
            return res.status(200).json(priority);
        }
        catch(e) {
            return res.json({status:400,error_message:(e as Error).message}); 
        }
    }

    public async createPriority(req: RequestWithBody<PriorityModel>, res: ResponseWithBody<number>) {
        try {
            const id = await priorityService.createPriority(req.body);
            return res.status(200).json(id);
        }
        catch(e) {
            return res.json({status:400,error_message:(e as Error).message}); 
        }
    }
}