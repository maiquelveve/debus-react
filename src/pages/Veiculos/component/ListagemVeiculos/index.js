import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { MdModeEdit, MdCancel, MdCached } from 'react-icons/md';
import InputMask from 'react-input-mask';
import { AlertDesativarVeiculo, AlertAtivarVeiculo } from '../AlertsVeiculos';

function ListagemVeiculos({veiculos, retornoAtivacaoOuDesativacao}) {

    const handleDesativar = useCallback(
        veiculo => {
            function desativarVeiculo(veiculo) {
                AlertDesativarVeiculo(veiculo, retornoAtivacaoOuDesativacao)
            }
            desativarVeiculo(veiculo)
        },
        []
    )

    const handleAtivar = useCallback(
        veiculo => {
            function ativarVeiculo(veiculo) {
                AlertAtivarVeiculo(veiculo, retornoAtivacaoOuDesativacao)
            }
            ativarVeiculo(veiculo)
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
                                        <th>Placa</th>
                                        <th>Lugares</th>
                                        <th>Situação</th>
                                        <th>Ação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    veiculos.map( veiculo => (
                                        <tr key={veiculo.id}  align="center">
                                            <th scope="row">{veiculo.id}</th>
                                            <td>{veiculo.st_nome}</td>
                                            <td>
                                                {   /*Foi colocado para ter a mascara na listagem, 
                                                      foi add class e disabed para ter o mesmo efeito 
                                                      que se fosse so o valor dentro da TD*/
                                                    <InputMask 
                                                        value={veiculo.st_placa} 
                                                        mask="aaa-9*99" 
                                                        className="form-control-plaintext text-center" 
                                                        disabled
                                                    />
                                                }
                                            </td>
                                            <td>{veiculo.nr_lugares}</td>
                                            <td>{veiculo.ch_ativo === 'S' ? 'Ativo' : 'Desativado'}</td>
                                            <td>
                                                {veiculo.ch_ativo === 'S' &&
                                                <>
                                                    <Link to={`editar/${veiculo.id}`} className="btn btn-success ml-1 mx-1">
                                                        <span>
                                                            <MdModeEdit size={20} />
                                                        </span>
                                                    </Link> 
                                                    <button type="button" className="btn btn-danger mx-1" value={veiculo.id} onClick={() => handleDesativar(veiculo) } >
                                                        <span>
                                                            <MdCancel size={20} />
                                                        </span>
                                                    </button>   
                                                </>    
                                                } 
                                                {veiculo.ch_ativo === 'N' &&
                                                <button type="button" className="btn btn-info mx-1" value={veiculo.id} onClick={() => handleAtivar(veiculo)} >
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

export default ListagemVeiculos;