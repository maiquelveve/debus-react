export const autenticado = () => {

    let token = localStorage.userToken

    if(token){
        //Valida aqui se o token eh valido...enviar para API para verificar
        return true
    } else {
        return false   
    }
}