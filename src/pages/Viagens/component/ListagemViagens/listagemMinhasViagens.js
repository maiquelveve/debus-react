import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { MdBorderColor, MdDeleteForever } from 'react-icons/md';
import { RiInformationLine } from 'react-icons/ri';

import { AlertCatch } from '../../../../components/AlertasDefaultSistema';
import { AlertDeletarViagem } from '../AlertsViagens';
import Visualizar from '../Visualizar';

function ListagemMinhasViagens({viagens, handleCallbackDeletar}) {

    const [viagemId, setViagemId] = useState('')
    const [open, setOpen] = useState(false);

    const handleAbrirModalVisualizar = useCallback(
        viagemId =>  {
            setViagemId(viagemId)
            setOpen(true)
        },
        []
    )

    const handleDeletarViagemUsuario = useCallback(
        async viagem => {
            try {
                await AlertDeletarViagem(viagem, handleCallbackDeletar)

            } catch (error) {
                AlertCatch('Ocorreu um erro ao cancelar a viagem. Tente novamente mais tarde!')
            }
        },
        [handleCallbackDeletar]
    )

    return(
        <div className="row mt-4">
            <div className="col-lg-12">
                <div className="card card-outline-secondary">
                    <div className="card-header">
                        <h3 className="mb-0">Resultado da Pesquisa</h3>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr align="center">
                                        <th>#</th>
                                        <th>Origem</th>
                                        <th>Destino</th>
                                        <th>Data</th>
                                        <th>Valor</th>
                                        <th>Passsageiros</th>
                                        <th>Situação</th>
                                        <th>Ação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {viagens.map( viagem => (
                                        <tr key={viagem.id} align="center">
                                            <th scope="row">{viagem.id}</th>
                                            <td>{`${viagem.cidade_origem}/${viagem.estado_sigla_origem} - ${viagem.pais_sigla_origem}`}</td>
                                            <td>{`${viagem.cidade_destino}/${viagem.estado_sigla_destino} - ${viagem.pais_sigla_destino}`}</td>
                                            <td>{viagem.dt_data.split('-').reverse().join('/')}</td>
                                            <td>
                                                {
                                                    viagem.vl_valor === 0 
                                                    ? 
                                                        'À COMBINAR' 
                                                    : 
                                                    new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(viagem.vl_valor)
                                                }
                                            </td>
                                            <td>{viagem.qt_passageiro}</td>
                                            <td>{viagem.en_situacao.toUpperCase()}</td>
                                            <td>
                                                <Link className="btn btn-success mx-1" to={`/viagens/reservar/${viagem.id}`}>
                                                    <span>
                                                        <MdBorderColor size={20} />
                                                    </span>
                                                </Link>
                                                <button type="button" className="btn btn-info mx-1" onClick={ () => { handleAbrirModalVisualizar(viagem.id) } }>
                                                    <span>
                                                        <RiInformationLine size={20} />
                                                    </span>
                                                </button> 
                                                <button type="button" className="btn btn-danger mx-1" onClick={ () => { handleDeletarViagemUsuario(viagem) } }>
                                                    <span>
                                                        <MdDeleteForever size={20} />
                                                    </span>
                                                </button> 
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>    
                    </div>
                </div>
            </div> 
            <Visualizar  open={open} setOpen={setOpen} viagemId={viagemId} />   
        </div>
    )
}

export default ListagemMinhasViagens