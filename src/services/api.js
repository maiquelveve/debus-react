import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080'
})
api.defaults.headers.common['auth'] = localStorage.userToken;    
export default api;