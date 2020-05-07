import React from 'react';

import {Editar, Cancelar } from './botoes';

function AcoesTabela({localReferencia, retornoCallBackFunction}) {
    return(
        <>
            <Editar localReferencia={localReferencia} />
            <Cancelar localReferencia={localReferencia} retornoCallBackFunction={retornoCallBackFunction} />
        </>
    )
}

export default AcoesTabela;