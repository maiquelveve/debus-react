import React from 'react';
import { Editar, Confirmar, Cancelar, Reativar } from './botoes';

function AcoesTabela({viagem, callbackRetornoAcoes}) {
    return(
        <>
            {viagem.en_situacao === 'aguardando confirmação' &&
                <Editar viagem={viagem} />
            }
            
            {viagem.en_situacao === 'aguardando confirmação' &&
                <Confirmar viagem={viagem} callbackRetornoAcoes={callbackRetornoAcoes} />
            }

            {(viagem.en_situacao === 'aguardando confirmação' || viagem.en_situacao === 'confirmada') &&
                <Cancelar viagem={viagem} callbackRetornoAcoes={callbackRetornoAcoes} />
            }
        
            {viagem.en_situacao === 'cancelada' &&
                <Reativar viagem={viagem} callbackRetornoAcoes={callbackRetornoAcoes} />
            }
            
        </>    
    )
}

export default AcoesTabela;