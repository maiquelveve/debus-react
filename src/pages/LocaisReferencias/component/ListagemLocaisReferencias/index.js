import React from 'react'

import AcoesTabela from './acoesTabela';

function ListagemLocaisReferencias({locaisReferencias, retornoCallBackFunction}) {
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
                                        <th>Descrição</th>
                                        <th>País</th>
                                        <th>Estado</th>
                                        <th>Cidade</th>
                                        <th>Ação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {locaisReferencias.map( localReferencia => (
                                        <tr key={localReferencia.id} align="center">
                                            <th scope="row">{localReferencia.id}</th>
                                            <td>{localReferencia.st_dsc}</td>
                                            <td>{localReferencia.st_pais}</td>
                                            <td>{localReferencia.ch_sigla_estado}</td>
                                            <td>{localReferencia.st_nome}</td>
                                            <td>
                                                {<AcoesTabela  localReferencia={localReferencia} retornoCallBackFunction={retornoCallBackFunction} />}
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

export default ListagemLocaisReferencias;