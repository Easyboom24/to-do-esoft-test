
export interface IUser {
    id: number,
    login: string,
    surname: string,
    firstname: string,
    patronymic?: string
    lead_id: number,
    isLead: boolean
}

export interface ErrorType {status:number,error_message:string}
export type ResponseWithUserAndToken = {user:IUser} & {token:string};

export type ResponsibleUser = Omit<IUser,'lead_id'|'login'|'isLead'>;

export type StatusType = { status_id: number,status_name: string};
export type PriorityType = { priority_id: number, priority_name: string};
export type TaskTypeForCreate = {
    header: string,
    description: string,
    date_end: Date,
    creator_id: number,
    responsible_id: number,
    priority_id: number,
    status_id: number,
};

export type TaskTypeForUpdate = {
    header?: string,
    description?: string,
    date_end?: Date,
    creator_id?: number,
    responsible_id?: number,
    priority_id?: number,
    status_id?: number,
    task_id: number
}

export type OrderTasks = 'date_end'|'responsible_id'| 'updated_at';

export type TaskView = {task_id:number} & TaskTypeForCreate & PriorityType & StatusType & {
    responsible_surname: string, responsible_firstname: string, responsible_patronymic: string};
