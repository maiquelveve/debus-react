import React from 'react';
import { RiArrowRightLine } from 'react-icons/ri';

import { ajustaDataFront, ajustaHoraFront, ajustaPlacaFront, ajusteValorFront } from '../../../../services/ajustesDados';

function InformacoesViagens(props) {    
    const viagem = props.viagem[0]
    
    return(
        <div className="card">
            <div className="card-header text-center">
                <div className="row mb-3 mt-4">
                    <h5 className="col-lg-5 col-sm-12"><strong>ORIGEM:</strong> {`${viagem.cidade_origem} - ${viagem.estado_sigla_origem}`} </h5>
                    <h5 className="col-lg-2 col-sm-12"> <RiArrowRightLine size={35} /> </h5>
                    <h5 className="col-lg-5 col-sm-12"><strong>DESTINO:</strong> {`${viagem.cidade_destino} - ${viagem.estado_sigla_destino}`} </h5>
                </div>  
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-lg-4 col-sm-6 text-center text-lg-left">
                        <p><strong>Empresa:</strong> {viagem.st_nome.toUpperCase()} </p>
                    </div>
                    <div className="col-lg-4 col-sm-6 text-center text-lg-center">
                        <p><strong>Placa:</strong> {ajustaPlacaFront(viagem.st_placa)} </p>
                    </div>
                    <div className="col-lg-4 col-sm-6 text-center text-lg-right">
                        <p><strong>Situação:</strong> {viagem.en_situacao.toUpperCase()} </p>
                    </div>
                    <div className="col-lg-4 col-sm-6 text-center text-lg-left">
                        <p><strong>Data:</strong> {ajustaDataFront(viagem.dt_data)} </p>
                    </div>
                    <div className="col-lg-4 col-sm-6 text-center text-lg-center">
                        <p><strong>Hora:</strong> {ajustaHoraFront(viagem.hh_horario, true, false)} </p>
                    </div>
                    <div className="col-lg-4 col-sm-6 text-center text-lg-right">
                        <p><strong>Valor:</strong> { ajusteValorFront(viagem.vl_valor) } </p>
                    </div>
                </div>
            </div>
            <div className="card-footer text-center">
                <div className="row">
                    <div className="col-sm-12">
                    <h3><strong>Vagas Disponíveis: </strong> {viagem.vagas_disponiveis} </h3>
                    </div>
                </div>  
            </div>
        </div> 
    )
}

export default InformacoesViagens;