import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import api from '../../../../services/api';
import { FacebookProgressSimple } from '../../../../components/Loading';
import { AlertCatch } from '../../../../components/AlertasDefaultSistema';
import { ajusteValorFront } from '../../../../services/ajustesDados';

function ListagemViagensHome({viagens}) {
    return(
        <div className="row">
            {viagens.length > 0 ?
                viagens.map( viagem => (
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={viagem.id}>
                        <div className="card h-100">
                            <div className="card-header">
                                <h5 className="card-title"><strong>Origem:</strong> {`${viagem.cidade_origem}/${viagem.estado_sigla_origem}`}</h5>
                                <h5 className="card-title"><strong>Destino:</strong> {`${viagem.cidade_destino}/${viagem.estado_sigla_destino}`}</h5>
                            </div>
                            <div className="card-body text-center">
                                <p className="card-text"><strong>Empresa:</strong> {viagem.st_nome}</p>
                                <p className="card-text"><strong>Data:</strong> { viagem.dt_data.split('-').reverse().join('/') }</p>
                                <p className="card-text"><strong>Hora:</strong> { viagem.hh_horario.substring(0,5) } </p>
                                <p className="card-text"><strong>Valor:</strong> { ajusteValorFront(viagem.vl_valor) } </p>
                            </div>
                            <BtnResevas viagem={viagem} />
                        </div>
                    </div>
                ))
            :   
                <p> Não foram encontradas viagens.</p>
            }                        
        </div>
    )
}

function BtnResevas({viagem}) {
    const [qtPassageirosViagem, setQtPassageirosViagem] = useState(0)
    const [load, setLoad] = useState(true)

    useEffect(
        () => {
            async function fetchData(id_viagem) {
                try {
                    const retornoApi = await api.get('/viagens_passageiros', { params: { id_viagem } });
                    setQtPassageirosViagem(retornoApi.data.qt_passageiros_viagem)
                    setLoad(false)

                } catch (error) {
                    AlertCatch('Ocorreu um erro ao buscar a quantidade de vagas ocupadas no banco. Tente novamente mais tarde.')
                }
            }
            fetchData(viagem.id)
        },
        [viagem.id]
    )

    if(load) {
        return ( 
            <div className="card-footer text-center">
                <FacebookProgressSimple size={30} /> 
            </div>    
        )
    }    

    if(viagem.vagas - qtPassageirosViagem <= 0) {
        return(
            <div className="card-footer text-center">
                <Link className="btn-lg btn btn-danger disabled" to={""} >Esgotada</Link>
            </div>
        )    
    }

    return(
        <div className="card-footer text-center">
            <Link className="btn-lg btn btn-primary" to={`/viagens/reservar/${viagem.id}`}>Reservar</Link>
        </div>
    )
}

export default ListagemViagensHome;