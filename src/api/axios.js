import axios from "axios";
// const token = localStorage.getItem("token");
// const token = useSelector(state => state.user.data.token);


const object = {
    baseURL: 'http://localhost:3000',
};
// if(token){
//     object.headers = {
//         'x-auth-token': token
//     };
// }
let axiosInstance = axios.create(object);
axiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers['x-auth-token'] =  token ? token : '';
    return config;
});
export {axiosInstance};

