import api from './api';
import { AlertCatch } from '../components/AlertasDefaultSistema';

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

        /*
            Essa linha abaixo vai setar esse token com default em todas as requisiçoes que forem para a API, mas antes se validaamm aqui.
            Para não ter que setar sempre o headers em cada chamada a api, use esse linha aqui se a pagina se validou previamente. 
            Mas se em cada chamada a api tu enviar novamente o header ele sobrescreverá conforme o setado na chamada a api em questão
            EX: as rotas "get" "buscarEmpresasDoUsuario", para popular o combo, não eh setado o header, pois ele esta como default aqui
                e como a tela de "viagens/cadastrar" passa por aqui antes de ser carregada eh setado o token como default nos headers
                das requisições, por isso não dá pau.
                Mas se nessa rota, "buscarEmpresasDoUsuario", tu setar o header como auth: 123 o valor será trocado e dará pau por
                token invalido
            OBSERVACOES: o metodo GET não possui body por isso antes do json do headers vai so a rota. Mas o POST, PUT, DELETE como
                         eles tem body depois da rota deve haver um body mesmo que vazio {} entre a rota e o json do headers.
                         const result = await api.post('/config/validaToken', {}, { headers: {auth: localStorage.userToken}, validateStatus: status => status < 500});    
        */
        api.defaults.headers['auth'] = localStorage.userToken;  
        const result = await api.post('/config/validaToken', {}, {validateStatus: status => status < 500});
        
        if(!result.data.success) {
            await AlertCatch('Sua sessão expirou. Faça login novamente.')
            logout()
        }

        return result.data.success;        

    } catch (error) {
        await AlertCatch('Ocorreu um erro na autenticação.')
        logout()
    }
}

export const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userActive');
}