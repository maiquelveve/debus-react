import api from './api';

export const autenticado = () => {

    let token = localStorage.userToken

    if(token){
        return true
    } else {
        return false   
    }
}

export const validaToken = async () => {

    try {
        let token = localStorage.userToken
        if(!token) {
            return false;
        } 

        const result = await api.post('/config/validaToken', {}, {validateStatus: status => status < 500});
        
        if(!result.data.success) {
            localStorage.removeItem('userToken');
            localStorage.removeItem('userActive');
        }

        return result.data.success;        

    } catch (error) {
        alert('errors')
    }
}