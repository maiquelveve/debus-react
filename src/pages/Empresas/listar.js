import React, { useState, useCallback, useEffect } from 'react';
import {withRouter, Link, useHistory} from 'react-router-dom';

import { validaToken, validaPerfilAcesso } from '../../services/auth';
import api from '../../services/api';
import { AlertCatch } from '../../components/AlertasDefaultSistema';

import ListagemEmpresas from './component/ListagemEmpresas';

function Listar() {
    const[nome, setNome] = useState('')
    const[recefi, setRecefi] = useState('')
    const[ativa, setAtiva] = useState('')
    const[empresas, setEmpresas] = useState([])
    const[retornoAtivaDesativacao, setRetornoAtivaDesativacao] = useState(0);

    const history = useHistory()

    //Isso só serve para refazer a pesquisa depois que ativar ou desativar uma empresa
    const retornoAtivacaoOuDesativacao = () =>  setRetornoAtivaDesativacao(retornoAtivaDesativacao + 1)

    //Tem esse useEffect para refazer a pesquisa cada fez que retornar de uma Ativação ou Desativação
    useEffect(
        () => { 
            if(retornoAtivaDesativacao !== 0) {
                async function renovarPesquisar() {
                    try {
                        const params = {st_nome: nome, st_recefi: recefi, ch_ativo: ativa}
                        const retornoApi = await api.get('/empresas', { params, headers:{'auth': localStorage.userToken}},{validateStatus: status => status < 500});    
                        setEmpresas(retornoApi.data)    
        
                    } catch (error) {
                        AlertCatch('Erro na consulta. Tente novamente!')
                    }
                }
                renovarPesquisar()
            }
            setRetornoAtivaDesativacao(0)
        },
        [retornoAtivaDesativacao, nome, recefi, ativa]
    )

    //Simple, faz a validação do token
    useEffect(
        () => {
            async function fetchData() {
                const token = await validaToken();
                if(!token) {
                    window.location.reload('/')
                } 

                if(!await validaPerfilAcesso('E')) {
                    history.push('/')
                }
            }
            fetchData()
        },
        [history]
    )

    const handleListar = useCallback(
        e => {
            e.preventDefault()
            setEmpresas([])
            
            async function listarEmpresas() {
                try {
                    const params = {st_nome: nome, st_recefi: recefi, ch_ativo: ativa}
                    const retornoApi = await api.get('/empresas', { params, headers:{'auth': localStorage.userToken}},{validateStatus: status => status < 500});    
                    setEmpresas(retornoApi.data)    
    
                } catch (error) {
                    AlertCatch('Erro na consulta. Tente novamente!')
                }
            }
            listarEmpresas()
        },
        [nome, recefi, ativa]
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
                                    <div className="form-group col-lg-4 col-md-4 col-sm-4">
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
                                    <div className="form-group col-lg-2 col-md-3 col-sm-3">
                                        <label className="mr-sm-3">Situação</label>
                                        <select className="form-control mr-sm-4" value={ativa} onChange={ e => setAtiva(e.target.value) }>
                                            <option value="">Selecione</option>
                                            <option value="S">Ativa</option>
                                            <option value="N">Desativada</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-lg-2 col-md-3 col-sm-3">
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
            {empresas.length !== 0 ?
                <ListagemEmpresas empresas={empresas} retornoAtivacaoOuDesativacao = {retornoAtivacaoOuDesativacao} />
            :
                <p className="mt-5" align="center">Não encotramos nenhuma empresa.</p>
            }        
        </div> 
    );
}

export default withRouter(Listar);