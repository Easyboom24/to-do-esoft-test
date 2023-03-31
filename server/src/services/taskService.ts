import dotenv from "dotenv";
dotenv.config({ path: `${__dirname}/../../.env` });
import {db} from "../db/db"; 
import { TaskModel } from "../models/taskModel";
import { QueriesForAllTasks, TaskViewModel } from "../typing/types";


class TaskService {
    public async createTask(task: TaskModel) {
        const {header,description,responsible_id,creator_id,date_end,priority_id,status_id} = task;
        const [newTask] = await db<TaskModel>('tasks').insert(
            {
            header:header,
            description:description,
            date_end:date_end,
            creator_id:creator_id,
            responsible_id:responsible_id,
            priority_id:priority_id, 
            status_id:status_id
        },['id']);
        return newTask.id;
    }

    public async getOneTask(id:number, userId: number) {
        const task: TaskViewModel = await db('tasks').select(
            't.id as task_id', 't.header', 't.description',
            't.date_end', 't.status_id', 't.priority_id',
            'p.priority_name', 's.status_name', 't.creator_id',
            'r.id as responsible_id',
            'r.surname as responsible_surname',
            'r.firstname as responsible_firstname',
            'r.patronymic as responsible_patronymic',
        ).from('tasks as t')
        .innerJoin('users as r','t.responsible_id','r.id')
        .innerJoin('statuses as s','t.status_id','s.id')
        .innerJoin('priorities as p','t.priority_id','p.id')
        .where({'t.id': Number(id)})
        .andWhere(function() { 
            this.where({'t.responsible_id':userId})
            .orWhere({'t.creator_id':userId})
        })
        .first();
        
        return task;
    }

    public async getAllTasks(query:QueriesForAllTasks) {
        const {userId, limit, page, order} = query;
        const tasksQuery = db('tasks').select(
            't.id as task_id', 't.header','t.date_end',
            'p.id as priority_id','s.id as status_id',
            't.creator_id','p.priority_name', 's.status_name', 
            'r.surname as responsible_surname',
            'r.firstname as responsible_firstname',
            'r.patronymic as responsible_patronymic',
        ).from('tasks as t')
        .innerJoin('users as r','t.responsible_id','r.id')
        .innerJoin('statuses as s','t.status_id','s.id')
        .innerJoin('priorities as p','t.priority_id','p.id')
        .where({'t.responsible_id':userId})
        .orWhere({'t.creator_id':userId});

        if(order === 'updated_at') {
            const tasks: TaskViewModel[] = await tasksQuery
            .orderBy(`t.${order}`,'desc')
            .limit(limit).offset((page-1)*limit);
            return tasks;
        }
        else {
            const tasks: TaskViewModel[] = await tasksQuery
            .orderBy(`t.${order}`)
            .limit(limit).offset((page-1)*limit);
            return tasks;
        }
    }


    public async getRowsCount(userId:number) {
        return await db('tasks').select().where({'responsible_id':userId})
        .orWhere({'creator_id':userId}).count('id').first();
    }

    public async updateTask(task: TaskModel & {userId:number}) {
        const {userId,task_id, header,description,responsible_id,date_end,priority_id,status_id} = task;
        const selectedTask: TaskModel = await db('tasks').select().where('id',task_id).first();
        if(userId===Number(selectedTask.creator_id)) {
            const updatedTaskId = await db<TaskModel>('tasks').where('id',task_id)
            .update({
                header:header,
                description:description,
                date_end:date_end,
                responsible_id:responsible_id,
                priority_id:priority_id, 
                status_id:status_id
            },['id as task_id']);
            return (updatedTaskId[0] as {task_id:number});
        }
        else {
            const updatedTaskId = await db<TaskModel>('tasks').where('id',task_id)
            .update({status_id:status_id},['id as task_id']);
            return (updatedTaskId[0] as {task_id:number});

        }
    }

    
}

export default new TaskService();