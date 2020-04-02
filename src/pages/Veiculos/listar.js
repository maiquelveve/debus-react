import React, { useState, useEffect, useCallback } from 'react';
import { withRouter, Link } from 'react-router-dom';

import { AlertCatch } from '../../components/AlertasDefaultSistema';
import api from '../../services/api';
import { validaToken } from '../../services/auth';

import ListagemVeiculos from './component/ListagemVeiculos';

function Listar() {
    const [ativo, setAtivo] = useState('')
    const [id_empresa, setIdEmpresa] = useState('')
    const [placa, setPlaca] = useState('')
    const [empresasUsuario, setEmpresasUsuario] = useState([])
    const [veiculos, setVeiculos] = useState([])
    const [retornoAtivaDesativacao, setRetornoAtivaDesativacao] = useState(0)

    const retornoAtivacaoOuDesativacao = () =>  setRetornoAtivaDesativacao(retornoAtivaDesativacao + 1)
    useEffect(
        () => {
            if(retornoAtivaDesativacao !== 0) {
                async function renovarPesquisar() {
                    try {
                        const params = {st_placa: placa, ch_ativo: ativo, id_empresa: id_empresa}
                        const retornoApi = await api.get('/veiculos', {params, headers:{'auth': localStorage.userToken}}, {validateStatus: status => status < 500});    
                        setVeiculos(retornoApi.data)    
        
                    } catch (error) {
                        AlertCatch('Erro na consulta. Tente novamente!')
                    }
                }
                renovarPesquisar()
            }
            setRetornoAtivaDesativacao(0)
        },
        [retornoAtivaDesativacao]
    )

    //Simple, faz a validação do token
    useEffect(
        () => {
            async function fetchData() {
                const token = await validaToken();
                if(!token) {
                    window.location.reload('/')
                } 

                try {
                    const retornoApi = await api.get('/empresas/buscarDoUsuario', { headers:{'auth': localStorage.userToken}}, {validateStatus: status => status < 500});    
                    setEmpresasUsuario(retornoApi.data)

                } catch (error) {
                    AlertCatch('Erro ao buscar as empresas do usuario. Tente novamente!')
                }
            }
            fetchData()
        },
        []
    )

    const handleListar = useCallback(
        e => {
            e.preventDefault()
            setVeiculos([])

            async function listar() {
                try {
                    const params = {st_placa: placa, ch_ativo: ativo, id_empresa: id_empresa}
                    const retornoApi = await api.get('/veiculos', {params, headers:{'auth': localStorage.userToken}}, {validateStatus: status => status < 500});    
                    setVeiculos(retornoApi.data)

                } catch (error) {
                    AlertCatch('Erro na pesquisa. Tente novamente!')
                }
            }
            listar()
        },
        [placa, ativo, id_empresa]
    )

    return(
        <div className="container-fluid mt-5">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card card-outline-secondary">
                        <div className="card-header">
                            <h3 className="mb-0">Meus Veículos</h3>
                        </div>
                        <div className="card-body">
                            <form className="form" onSubmit={handleListar}>
                                <div className="form-row">
                                    <div className="form-group col-lg-4 col-md-4 col-sm-4">
                                        <label className="mr-sm-3">Razão Social</label>
                                        <select className="form-control mr-sm-4" value={id_empresa} onChange={ e => setIdEmpresa(e.target.value) }>
                                            <option value="">Selecione</option>
                                            {
                                                empresasUsuario.map( empresa => {
                                                    return(
                                                        <option key={empresa.id} value={empresa.id}>
                                                            {empresa.st_nome}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group col-lg-2 col-md-3 col-sm-3">
                                        <label className="mr-sm-3">Situação</label>
                                        <select className="form-control mr-sm-4" value={ativo} onChange={ e => setAtivo(e.target.value) }>
                                            <option value="">Selecione</option>
                                            <option value="S">Ativa</option>
                                            <option value="N">Desativada</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-lg-2 col-md-3 col-sm-3">
                                        <label className="mr-sm-3">Placa</label>
                                        <input 
                                            type="text" 
                                            className="form-control mr-sm-4" 
                                            placeholder="Placa" 
                                            id="placa" 
                                            value={placa}
                                            onChange={e => setPlaca(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group col-sm-2">
                                        <label className="mr-sm-3"></label>
                                        <button type="submit" className="mt-2 form-control btn btn-success">Buscar</button>
                                    </div>
                                    <div className="form-group col-sm-2">
                                        <label className="mr-sm-3"></label>
                                        <Link className="mt-2 form-control btn btn-dark" to="/veiculos/cadastrar">Cadastrar</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div> 
            </div> 
            {
                veiculos.length !== 0 ?
                    <ListagemVeiculos veiculos={veiculos} retornoAtivacaoOuDesativacao={retornoAtivacaoOuDesativacao} />
                :   
                    <p className="mt-5" align="center">Não encotramos nenhum veículo.</p>
            }
        </div> 
    )
}

export default withRouter(Listar);