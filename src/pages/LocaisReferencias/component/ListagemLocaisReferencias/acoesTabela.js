import React from 'react';

import {Editar, Cancelar } from './botoes';

function AcoesTabela({localReferencia}) {
    return(
        <>
            <Editar localReferencia={localReferencia} />
            <Cancelar localReferencia={localReferencia} />
        </>
    )
}

export default AcoesTabela;