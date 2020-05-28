import React, { useState, useEffect } from 'react';
import { MdCancel } from 'react-icons/md'; 

import api from '../../../services/api';
import { AlertCatch } from '../../../components/AlertasDefaultSistema';

function MostrarPassageiros({id_viagem}) {
    const [passageiros, setPassageiros] = useState([])

    async function buscarPassageiros() {
        try {
            const params = { id_viagem }
            const retornoApi = await api.get('passageiros', { params, headers:{ auth: localStorage.userToken }, validateStatus: status => status < 500 })
            setPassageiros(retornoApi.data)

        } catch (error) {
            AlertCatch('Ocorreu um erro ao cadastrar os dados no banco. Tente novamente mais tarde.') 
        }
    }

    useEffect( ()=> { buscarPassageiros() }, [])

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
                                                <button type="button" className="btn btn-danger mx-1" onClick={() => {}}>
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