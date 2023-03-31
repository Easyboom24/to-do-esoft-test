import { TaskModel } from "../models/taskModel";
import taskService from "../services/taskService";
import { QueriesForAllTasks, RequestWithBody, RequestWithParamsAndQuery, 
    RequestWithQuery, ResponseWithBody, TaskViewModel } from "../typing/types";


class TaskController {

    public async createTask(req: RequestWithBody<TaskModel>, res: ResponseWithBody<{task_id:number}>) {
        try {
            const taskId = await taskService.createTask(req.body);
            return res.status(200).json({task_id:taskId});
        }
        catch (e) {
            console.log((e as Error).message);
            return res.json({status:400,error_message:(e as Error).message});
        }
    }

    public async getTask(req: RequestWithParamsAndQuery<{id:number},{userId:number}>, res: ResponseWithBody<TaskViewModel>) {
        try {
            const task: TaskViewModel = await taskService.getOneTask(req.params.id, req.query.userId);
            return res.status(200).json(task);
        }
        catch (e) {
            return res.json({status:400,error_message:(e as Error).message});
        }   
    }

    public async getAllTasks(req: RequestWithQuery<QueriesForAllTasks>,
         res: ResponseWithBody<TaskModel[]>) {
            
        try{
            if(!Number(req.query.userId))
                return res.json({status:400,error_message:"userId должен быть числом"})
            const tasks: TaskModel[] = await taskService.getAllTasks(req.query);
            return res.status(200).json(tasks);
        }
        catch (e) {
            return res.json({status:400,error_message:(e as Error).message});
        }
    }

    public async getPagesCount(req: RequestWithQuery<{userId:number,limit:number}>, res: ResponseWithBody<{countPages:number}>) {
        try {
            if(!Number(req.query.userId))
                return res.json({status:400,error_message:"userId должен быть числом"})
            const {userId,limit} = req.query;
            const countRows = (await taskService.getRowsCount(userId) as {count:string});
            const countPages = Math.ceil(Number(countRows.count) / limit);
           
            return res.status(200).json({countPages:countPages})
        }
        catch(e) {
            return res.json({status:400,error_message:(e as Error).message});
        }
    }

    public async updateTask(req: RequestWithBody<TaskModel&{userId:number}>, res: ResponseWithBody<{task_id:number}>) {
        try{
            const updatedTask: {task_id:number} = await taskService.updateTask(req.body);
            return res.json({task_id:updatedTask.task_id});
        }
        catch (e) {
            return res.json({status:400,error_message:(e as Error).message});
        }
    }
}

export default new TaskController();