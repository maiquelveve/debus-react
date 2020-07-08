import React, { useCallback, useState } from 'react';
import { MdCancel, MdCached } from 'react-icons/md'; 
import { RiInformationLine } from 'react-icons/ri';
import {AlertDesativarEmpresa, AlertAtivarEmpresa} from '../AlertsEmpresas';

import Visualizar from '../Visualizar';

function ListagemEmpresasAdm({empresas, retornoAtivacaoOuDesativacao}) {
    const [empresaId,setEmpresaId] = useState('')
    const [open, setOpen] = useState(false);

    const handleDesativar = useCallback(
        empresa => {
            function desativarEmpresa(empresa) {
                AlertDesativarEmpresa(empresa, retornoAtivacaoOuDesativacao)
            }
            desativarEmpresa(empresa)
        },
        [retornoAtivacaoOuDesativacao]
    )

    const handleAtivar = useCallback(
        empresa => {
            function ativarEmpresa(empresa) {
                AlertAtivarEmpresa(empresa, retornoAtivacaoOuDesativacao)
            }
            ativarEmpresa(empresa)
        },
        [retornoAtivacaoOuDesativacao]
    )

    const handleAbrirModalVisualizar = useCallback(
        id_empresa => {
            setEmpresaId(id_empresa)
            setOpen(true)
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
                                                <button type="button" className="btn btn-success mx-1" onClick={ () => { handleAbrirModalVisualizar(empresa.id) } }>
                                                    <span>
                                                        <RiInformationLine size={20} />
                                                    </span>
                                                </button>
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
            <Visualizar  open={open} setOpen={setOpen} empresaId={empresaId} />   
        </div>
    )    
}

export default ListagemEmpresasAdm;
