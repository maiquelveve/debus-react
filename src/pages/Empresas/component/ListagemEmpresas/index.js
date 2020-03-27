import React from 'react';

function ListagemEmpresas({empresas}) {
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
                                    <tr>
                                        <th>#</th>
                                        <th>Razão Social</th>
                                        <th>Recefi</th>
                                        <th>Celular</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    empresas.map( empresa => (
                                        <tr key={empresa.id}>
                                            <th scope="row">{empresa.id}</th>
                                            <td>{empresa.st_nome}</td>
                                            <td>{empresa.st_recefi}</td>
                                            <td>{empresa.st_cel}</td>
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
