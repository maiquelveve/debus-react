import React from 'react';
import { CpfMaskFunction } from '../../../components/MaskInputs';

function MostrarPassageirosVisualizar({passageiros}) {

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
                                    </tr>
                                </thead>
                                <tbody>
                                    {passageiros.map( (passageiro, index) => (
                                        <tr key={passageiro.id} align="center">
                                            <th>{index+1}</th>
                                            <td>{passageiro.st_nome}</td>
                                            <td>{CpfMaskFunction(passageiro.st_cpf)}</td>
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

export default MostrarPassageirosVisualizar;