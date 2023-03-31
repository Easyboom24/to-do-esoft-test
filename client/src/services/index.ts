import axios  from "axios";


const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL 
});

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL 
});


$authHost.interceptors.request.use(
    request => {
        request.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        return request;
    },
    error => {
        return Promise.reject(error);
    }
)


export {
    $authHost,
    $host
}