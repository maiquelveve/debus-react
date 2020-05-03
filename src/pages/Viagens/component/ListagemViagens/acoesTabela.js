import React from 'react';
import { Editar, Confirmar, Cancelar, Reativar } from './botoes';

function AcoesTabela({viagem}) {
    return(
        <>
            <Editar viagem={viagem} />
            <Confirmar viagem={viagem} />
            <Cancelar viagem={viagem} />
            <Reativar viagem={viagem} />
        </>    
    )
}

export default AcoesTabela;