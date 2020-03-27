import React, { useState, useCallback, useEffect } from 'react';
import {withRouter, Link} from 'react-router-dom';

import {validaToken} from '../../services/auth';
import api from '../../services/api';

import ListagemEmpresas from './component/ListagemEmpresas';

function Listar() {

    const[nome, setNome] = useState('')
    const[recefi, setRecefi] = useState('')
    const[empresas, setEmpresas] = useState([])

    useEffect(
        () => {
            async function fetchData() {
                const token = await validaToken();
                if(!token) {
                    window.location.reload('/')
                } 
            }
            fetchData()
        },
        []
    )

    const handleListar = useCallback(
        e => {
            e.preventDefault()
            setEmpresas([])
            
            async function listarEmpresas() {
                try {
                    const params = {st_nome: nome, st_recefi: recefi}
                    const retornoApi = await api.get('/empresas', { params, headers:{'auth': localStorage.userToken}},{validateStatus: status => status < 500});    
                    console.log(retornoApi.data)
                    setEmpresas(retornoApi.data)    
    
                } catch (error) {
                    alert('Erro na consulta. Tente novamente!')
                }
            }
            listarEmpresas()
        },
        [nome, recefi]
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
                                        <label className="mr-sm-3">Razão Social</label>
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
                                        <label className="mr-sm-3">RECEFI</label>
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
                                        <label className="mr-sm-3"></label>
                                        <button type="submit" className="mt-2 form-control btn btn-success">Buscar</button>
                                    </div>
                                    <div className="form-group col-sm-2">
                                        <label className="mr-sm-3"></label>
                                        <Link className="mt-2 form-control btn btn-dark" to="/empresas/cadastrar">Cadastrar</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div> 
            </div> 
            {empresas.length !== 0 &&
                <ListagemEmpresas empresas={empresas} />
            }        
        </div> 
    );
}

export default withRouter(Listar);