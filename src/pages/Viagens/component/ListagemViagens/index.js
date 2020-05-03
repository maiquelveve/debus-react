import React from 'react'
import AcoesTabela from './acoesTabela'

function ListagemViagens({viagens, callbackRetornoAcoes}) {
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
                                        <th>Empresa</th>
                                        <th>Veiculo</th>
                                        <th>Origem</th>
                                        <th>Destino</th>
                                        <th>Data</th>
                                        <th>Situação</th>
                                        <th>Ação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {viagens.map( viagem => (
                                        <tr key={viagem.id} align="center">
                                            <th scope="row">{viagem.id}</th>
                                            <td>{viagem.st_nome}</td>
                                            <td>{`${viagem.st_placa.substring(0,3)}-${viagem.st_placa.substring(3)}`}</td>
                                            <td>{`${viagem.cidade_origem}/${viagem.estado_sigla_origem} - ${viagem.pais_sigla_origem}`}</td>
                                            <td>{`${viagem.cidade_destino}/${viagem.estado_sigla_destino} - ${viagem.pais_sigla_destino}`}</td>
                                            <td>{viagem.dt_data.split('-').reverse().join('/')}</td>
                                            <td>{viagem.en_situacao}</td>
                                            <td>
                                                <AcoesTabela viagem={viagem} callbackRetornoAcoes={callbackRetornoAcoes} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>    
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default ListagemViagens