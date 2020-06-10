function usuario(state = [], action) {
    switch(action.type) {
        case 'PERFIL':
            return [...state, {
                ch_perfil: action.ch_perfil
            }]
        default:
            return state    
    }
}

export default usuario;