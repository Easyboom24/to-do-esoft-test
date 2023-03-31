import { db } from "../db/db";
import { PriorityModel } from "../models/priorityModel";

class PriorityService {
    public async getAllPriorities(): Promise<PriorityModel[]> {
        return await db('priorities').select('id as priority_id', 'priority_name');
    }

    public async getOnePriority(id:number): Promise<PriorityModel> {
        return await db('priorities').select().where('id',id).first();
    }

    public async createPriority(model: PriorityModel): Promise<number> {
        const {priority_name} = model;
        const [id] = await db('priorities').insert({priority_name},['id']);
        return id;
    }
}

export default new PriorityService();