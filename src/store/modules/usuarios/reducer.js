import produce from 'immer';

function usuario(state = [], action) {
    switch(action.type) {
        case 'PERFIL':
            return produce(state, draft => {
                draft.push(action.ch_perfil)
            })
        default:
            return state    
    }
}

export default usuario;