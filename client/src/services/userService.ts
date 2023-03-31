import { $authHost, $host } from ".";
import { ErrorType, ResponseWithUserAndToken, ResponsibleUser } from "../types/types";
import { checkErrorType } from "../utils/checkErrorType";


export const authorization = async (login: string,password: string) => {
    const {data} = await $host.post<ResponseWithUserAndToken | ErrorType>
    ('api/users/login',{login,password});
    if(checkErrorType(data)) {
        const error = (data as ErrorType);
        return error;
    } 
    const {token, user} = data as ResponseWithUserAndToken;
    localStorage.setItem('token',token);
    return user; 
}

export const checkAuth = async () => {
    const {data} = await $authHost.get<ResponseWithUserAndToken | ErrorType>('api/users/auth')
    if(checkErrorType(data)) {
        const error = (data as ErrorType);
        return error;
    } 
    const {token, user} = (data as ResponseWithUserAndToken);
    localStorage.setItem('token',token);
    return user;
}

export const fetchResponsiblesList = async (userId:number, fio: string) => {
    const {data} = await $authHost.get<ResponsibleUser[]>
    (`api/users/responsibles?userId=${userId}&fio=${fio}`);
    return data;
}