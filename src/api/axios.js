import axios from "axios";

const token = localStorage.getItem("token");

const object = {
    baseURL: 'http://localhost:3000',
};
if(token){
    object.headers = {
        'x-auth-token': token
    };
}

export const axiosInstance = axios.create(object);

