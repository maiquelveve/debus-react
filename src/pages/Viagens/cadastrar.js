import React, { useEffect, useState, useCallback } from 'react';
import {withRouter, Link} from 'react-router-dom';

import AlertasResultados from '../../components/AlertasResultados';
import { validaToken }  from '../../services/auth';

function Cadastrar() {
    const[resultado, setResultado] = useState([])

    useEffect(
        () => {
            async function fetchData() {
                const token = await validaToken();
                if(!token) {
                    window.location.reload('/')
                } 
            }
            fetchData();
        },
        []
    )
    

    const handleLimparMsg = useCallback(
        () => {
            setResultado([])
        },  
        [resultado]
    )

    const handleCadastrar = useCallback(
        () => {

        },
        []
    )

    return (  
        <div className="container-fluid h-100 mt-3">   
            <div className="justify-content-center align-items-center h-100">
                <div className="col-lg-12">
                    <span className="anchor" id="formLogin"></span>
                    <div className="card card-outline-secondary">
                        <div className="card-header">
                            <h3 className="mb-0">Cadastrar Viagem</h3>
                        </div>
                        <div className="card-body">
                            { resultado.length !== 0 &&
                                <div onClick={handleLimparMsg}>
                                    <AlertasResultados resultado={resultado} objeto="Viagem" acao="Cadastrado" />                   
                                </div>
                            }     
                            <form onSubmit={handleCadastrar}>
                                <div className="form-row">
                                    <div className="form-group col-12">
                                        <label>Empresa</label>
                                        <select className="form-control" value="" onChange={e => {handleLimparMsg()}}>
                                            <option value="">Selecine Empresa</option>
                                        </select>    
                                    </div>
                                </div>
                                <div className="form-row">    
                                    <div className="form-group col-lg-6 col-md-12">
                                        <label>Veículo</label>
                                        <select className="form-control" value="" onChange={e => {handleLimparMsg()}}>
                                            <option value="">Selecine Veículo</option>
                                        </select>    
                                    </div>
                                    <div className="form-group col-lg-3 col-md-6">
                                        <label>Vagas</label>
                                        <input className="form-control" value="" onChange={e => {handleLimparMsg()}} placeholder="Informe lugares" type="text" />
                                    </div>
                                    <div className="form-group col-lg-3 col-md-6">
                                        <label>Horário</label>
                                        <input className="form-control" value="" onChange={e => {handleLimparMsg()}} placeholder="Informe lugares" type="text" />
                                    </div>
                                </div>

                                <div className="form-row mt-2">
                                    <div className="form-group col-12">
                                        <div className="card border-light mb-3">
                                            <div className="card-header text-center">Origem da Viagem</div>
                                            <div className="card-body">
                                                <div className="form-row">
                                                    <div className="form-group col-lg-3 col-md-4">
                                                        <label>País</label>
                                                        <select className="form-control" value="" onChange={e => {handleLimparMsg()}}>
                                                            <option value="">Selecine País</option>
                                                        </select>    
                                                    </div>                                  
                                                    <div className="form-group col-lg-3 col-md-4">
                                                        <label>Estado</label>
                                                        <select className="form-control" value="" onChange={e => {handleLimparMsg()}}>
                                                            <option value="">Selecine Estado</option>
                                                        </select>    
                                                    </div>
                                                    <div className="form-group col-lg-3 col-md-4">
                                                        <label>Cidade</label>
                                                        <select className="form-control" value="" onChange={e => {handleLimparMsg()}}>
                                                            <option value="">Selecine Cidade</option>
                                                        </select>    
                                                    </div>
                                                    <div className="form-group col-lg-3 col-md-12">
                                                        <label>Referencia</label>
                                                        <select className="form-control" value="" onChange={e => {handleLimparMsg()}}>
                                                            <option value="">Selecine Referencia</option>
                                                        </select>    
                                                    </div>
                                                </div>    
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="form-row">
                                    <div className="form-group col-12">
                                        <div className="card border-light mb-3">
                                            <div className="card-header text-center">Destino da Viagem</div>
                                            <div className="card-body">
                                                <div className="form-row">
                                                    <div className="form-group col-lg-3 col-md-4">
                                                        <label>País</label>
                                                        <select className="form-control" value="" onChange={e => {handleLimparMsg()}}>
                                                            <option value="">Selecine País</option>
                                                        </select>    
                                                    </div>                                  
                                                    <div className="form-group col-lg-3 col-md-4">
                                                        <label>Estado</label>
                                                        <select className="form-control" value="" onChange={e => {handleLimparMsg()}}>
                                                            <option value="">Selecine Estado</option>
                                                        </select>    
                                                    </div>
                                                    <div className="form-group col-lg-3 col-md-4">
                                                        <label>Cidade</label>
                                                        <select className="form-control" value="" onChange={e => {handleLimparMsg()}}>
                                                            <option value="">Selecine Cidade</option>
                                                        </select>    
                                                    </div>
                                                    <div className="form-group col-lg-3 col-md-12">
                                                        <label>Referencia</label>
                                                        <select className="form-control" value="" onChange={e => {handleLimparMsg()}}>
                                                            <option value="">Selecine Referencia</option>
                                                        </select>    
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row mt-2">
                                    <div className="form-group col-sm-12">
                                        <button type="submit" className="btn btn-success btn-lg">Cadastrar</button>
                                        <Link className="btn btn-primary btn-lg ml-1" to="listar">Voltar</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Cadastrar);