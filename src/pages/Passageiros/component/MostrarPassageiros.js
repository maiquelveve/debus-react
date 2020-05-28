import React, { useCallback } from 'react';
import { MdCancel } from 'react-icons/md'; 

import api from '../../../services/api';
import { AlertCatch } from '../../../components/AlertasDefaultSistema';

function MostrarPassageiros({passageiros, refazerBuscaDosPassageiros}) {

    const handleDeletarPassageiro = useCallback(
        id => {
            async function deletePassageiro(id) {
                try {
                    await api.delete(`passageiros/${id}`, { headers:{ auth: localStorage.userToken }, validateStatus: status => status < 500 })
                    refazerBuscaDosPassageiros()

                } catch (error) {
                    AlertCatch('Ocorreu um erro ao deletar os dados no banco. Tente novamente mais tarde.') 
                }
            }
            deletePassageiro(id)
        },
        [refazerBuscaDosPassageiros]
    )

    return(
        <>
            {passageiros.length > 0 &&
                <div className="card card-outline-secondary">
                    <div className="card-header">
                        <h3 className="mb-0">Passageiros</h3>  
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-striped" id="tabela">
                                <thead>
                                    <tr align="center">
                                        <th>#</th>
                                        <th>Nome</th>
                                        <th>CPF</th>
                                        <th>Ação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {passageiros.map( (passageiro, index) => (
                                        <tr key={passageiro.id} align="center">
                                            <th>{index+1}</th>
                                            <td>{passageiro.st_nome}</td>
                                            <td>{passageiro.st_cpf}</td>
                                            <td>
                                                <button type="button" className="btn btn-danger mx-1" onClick={() => handleDeletarPassageiro(passageiro.id)}>
                                                    <span>
                                                        <MdCancel size={20} />
                                                    </span>
                                                </button> 
                                                <button type="button" className="btn btn-success mx-1" onClick={() => {} }>
                                                    <span>
                                                        <MdCancel size={20} />
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
            }  
        </>        
    )
}

export default MostrarPassageiros;