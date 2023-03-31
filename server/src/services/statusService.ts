import { StatusModel } from "../models/statusModel";
import {db} from "../db/db"; 

class StatusService {
    public async createStatus(model: StatusModel): Promise<number> {
        const {status_name} = model;
        const [id] = await db('statuses').insert({status_name},['id']);
        return id;
    }

    public async getAllStatuses(): Promise<StatusModel[]> {
        return await db('statuses').select('id as status_id','status_name');
    }

    public async getOneStatus(id:number): Promise<StatusModel> {
        return await db('statuses').select().where('id',id).first();
    }
}

export default new StatusService();