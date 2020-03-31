import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdModeEdit, MdCancel, MdCached } from 'react-icons/md'; 
import {AlertDesativarEmpresa, AlertAtivarEmpresa} from '../AlertsEmpresas';

function ListagemEmpresas({empresas, retornoAtivacaoOuDesativacao}) {
    const handleDesativar = useCallback(
        empresa => {
            function desativarEmpresa(empresa) {
                AlertDesativarEmpresa(empresa, retornoAtivacaoOuDesativacao)
            }
            desativarEmpresa(empresa)
        },
        []
    )

    const handleAtivar = useCallback(
        empresa => {
            function ativarEmpresa(empresa) {
                AlertAtivarEmpresa(empresa, retornoAtivacaoOuDesativacao)
            }
            ativarEmpresa(empresa)
        },
        []
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
                                        <th>Razão Social</th>
                                        <th>Recefi</th>
                                        <th>Celular</th>
                                        <th>Ação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    empresas.map( empresa => (
                                        <tr key={empresa.id}  align="center">
                                            <th scope="row">{empresa.id}</th>
                                            <td>{empresa.st_nome}</td>
                                            <td>{empresa.st_recefi}</td>
                                            <td>{empresa.st_cel}</td>
                                            <td>
                                                {empresa.ch_ativo === 'S' &&
                                                <>
                                                    <Link to={`editar/${empresa.id}`} className="btn btn-success ml-1 mx-1">
                                                        <span>
                                                            <MdModeEdit size={20} />
                                                        </span>
                                                    </Link> 
                                                    <button type="button" className="btn btn-danger mx-1" value={empresa.id} onClick={() => handleDesativar(empresa)} >
                                                        <span>
                                                            <MdCancel size={20} />
                                                        </span>
                                                    </button>   
                                                </>    
                                                } 
                                                {empresa.ch_ativo === 'N' &&
                                                <button type="button" className="btn btn-info mx-1" value={empresa.id} onClick={() => handleAtivar(empresa) }>
                                                    <span>
                                                        <MdCached size={20} />
                                                    </span>
                                                </button>       
                                                }
                                            </td>
                                        </tr>
                                    ) )
                                }
                                </tbody>
                            </table>
                        </div>    
                    </div>
                </div>
            </div> 
        </div>
    )    
}

export default ListagemEmpresas;
