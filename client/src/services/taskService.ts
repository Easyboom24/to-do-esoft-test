import { $authHost } from ".";
import { TaskView, PriorityType, StatusType, TaskTypeForCreate, ErrorType, OrderTasks, TaskTypeForUpdate} from "../types/types";
import { checkErrorType } from "../utils/checkErrorType";


export const fetchPriorities = async () => {
    const {data} = await $authHost.get<PriorityType[]>('api/priorities');
    return data;
}

export const fetchStatuses = async () => {
    const {data} = await $authHost.get<StatusType[]>('api/statuses');
    return data;
}

export const fetchTasks = async (userId:number,page:number=1,limit:number = 10, order:OrderTasks ='updated_at') => {
    const {data} = await $authHost.get<TaskView[] | ErrorType>
    (`api/tasks/?userId=${userId}&page=${page}&limit=${limit}&order=${order}`);
    if(checkErrorType(data))
        return data as ErrorType;
    
    return data as TaskView[]; 
}

export const fetchOneTask = async (id:number,userId:number) => {
    const {data} = await $authHost.get<TaskView>(`api/tasks/${id}?userId=${userId}`);
    return data;
}

export const getPagesCount = async (userId:number,limit:number = 10) => {
    const {data} = await $authHost.get<{countPages:number} | ErrorType>
    (`api/tasks/pages-count/?userId=${userId}&limit=${limit}`);
    if(checkErrorType(data))
        return data as ErrorType;
    return data as {countPages:number};
}

export const createTask = async (task: TaskTypeForCreate) => {
    const {data} = await $authHost.post<{task_id:number}>('api/tasks/create',task);
    return data;   
}

export const updateTask = async (task: 
    (TaskTypeForUpdate | Pick<TaskTypeForUpdate,'status_id'|'task_id'>) & {userId:number}) => {
    const {data} = await $authHost.patch<{task_id:number}>('api/tasks/update',task);
    return data;   
}