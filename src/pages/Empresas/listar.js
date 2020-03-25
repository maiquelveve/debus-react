import React, { useState, useCallback, useEffect } from 'react';
import {withRouter, Link} from 'react-router-dom';

import {validaToken} from '../../services/auth';
import api from '../../services/api';

function Listar() {

    const[nome, setNome] = useState('')
    const[recefi, setRecefi] = useState('')
    const[empresas, setEmpresas] = useState([])

    const handleListar = useCallback(
        e => {
            e.preventDefault()
            setEmpresas([])
            const empresa = {'nome':'minha empresa'}
            setEmpresas(empresa)
        },
        []
    )

    return (
        <div className="container-fluid mt-5">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card card-outline-secondary">
                        <div className="card-header">
                            <h3 className="mb-0">Minhas Empresas</h3>
                        </div>
                        <div className="card-body">
                            <form className="form" onSubmit={handleListar}>
                                <div className="form-row">
                                    <div className="form-group col-lg-6 col-md-4 col-sm-5">
                                        <label for="nome" className="mr-sm-3">Razão Social</label>
                                        <input 
                                            type="text" 
                                            className="form-control mr-sm-4" 
                                            placeholder="Nome de Empresa" 
                                            id="nome" 
                                            value={nome}
                                            onChange={e => setNome(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group col-lg-2 col-md-4 col-sm-3">
                                        <label for="recefi" className="mr-sm-3">RECEFI</label>
                                        <input 
                                            type="text" 
                                            className="form-control mr-sm-4" 
                                            placeholder="RECEFI" 
                                            id="recefi" 
                                            value={recefi}
                                            onChange={e => setRecefi(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group col-sm-2">
                                        <label for="" className="mr-sm-3"></label>
                                        <button type="submit" className="mt-2 form-control btn btn-success">Buscar</button>
                                    </div>
                                    <div className="form-group col-sm-2">
                                        <label for="" className="mr-sm-3"></label>
                                        <Link className="mt-2 form-control btn btn-dark" to="/empresas/cadastrar">Cadastrar</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div> 
            </div> 

            {empresas.length !== 0 &&
                <div className="row mt-4">
                    <div className="col-lg-12">
                        <div className="card card-outline-secondary">
                            <div className="card-header">
                                <h3 className="mb-0">Resultado da Pesquisa</h3>
                            </div>
                            <div className="card-body">
                                <div class="table-responsive">
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Surname</th>
                                                <th>Country</th>
                                                <th>City</th>
                                                <th>Position</th>
                                                <th>Age</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="table-info">
                                                <th scope="row">1</th>
                                                <td>Kate</td>
                                                <td>Moss</td>
                                                <td>USA</td>
                                                <td>New York City</td>
                                                <td>Web Designer</td>
                                                <td>23</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">2</th>
                                                <td>Anna</td>
                                                <td>Wintour</td>
                                                <td>United Kingdom</td>
                                                <td>London</td>
                                                <td>Frontend Developer</td>
                                                <td>36</td>
                                            </tr>
                                            <tr class="table-info">
                                                <th scope="row">3</th>
                                                <td>Tom</td>
                                                <td>Bond</td>
                                                <td>Spain</td>
                                                <td>Madrid</td>
                                                <td>Photographer</td>
                                                <td>25</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">4</th>
                                                <td>Jerry</td>
                                                <td>Horwitz</td>
                                                <td>Italy</td>
                                                <td>Bari</td>
                                                <td>Editor-in-chief</td>
                                                <td>41</td>
                                            </tr>
                                            <tr class="table-info">
                                                <th scope="row">5</th>
                                                <td>Janis</td>
                                                <td>Joplin</td>
                                                <td>Poland</td>
                                                <td>Warsaw</td>
                                                <td>Video Maker</td>
                                                <td>39</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>    
                            </div>
                        </div>
                    </div> 
                </div>
            }        
        </div> 
    );
}

export default withRouter(Listar);