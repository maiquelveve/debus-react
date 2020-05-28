import React from 'react';

function MostrarPassageiros({passageiros}) {
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
                                        {/* <th>Ação</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {passageiros.map( (passageiro, index) => (
                                        <tr key={index} align="center">
                                            <th>{index+1}</th>
                                            <td>{passageiro.nome}</td>
                                            <td>{passageiro.cpf}</td>
                                            <td>
                                                {/* <AcoesTabela viagem={viagem} callbackRetornoAcoes={callbackRetornoAcoes} /> */}
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