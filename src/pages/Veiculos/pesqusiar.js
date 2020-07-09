import React, { useState, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import InputMask from 'react-input-mask';

import { AlertCatch } from '../../components/AlertasDefaultSistema';
import api from '../../services/api';
import { validaToken } from '../../services/auth';

import ListagemVeiculosAdm from './component/ListagemVeiculosAdm';

function Pesquisar() {
    const [ativo, setAtivo] = useState('')
    const [placa, setPlaca] = useState('')
    const [empresa, setEmpresa] = useState('')
    const [veiculos, setVeiculos] = useState([])
    const [retornoAtivaDesativacao, setRetornoAtivaDesativacao] = useState(0)

    const retornoAtivacaoOuDesativacao = () =>  setRetornoAtivaDesativacao(retornoAtivaDesativacao + 1)
    useEffect(
        () => {
            if(retornoAtivaDesativacao !== 0) {
                async function renovarPesquisar() {
                    try {
                        const params = {st_placa: placa, ch_ativo: ativo, st_nome: empresa}
                        const retornoApi = await api.get('/veiculos/pesquisar', {params, headers:{'auth': localStorage.userToken}, validateStatus: status => status < 500});    
                        setVeiculos(retornoApi.data)    
        
                    } catch (error) {
                        AlertCatch('Erro na consulta. Tente novamente!')
                    }
                }
                renovarPesquisar()
            }
            setRetornoAtivaDesativacao(0)
        },
        [retornoAtivaDesativacao, placa, ativo, empresa]
    )

    //Simple, faz a validação do token
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

    const handlePesquisar = useCallback(
        e => {
            e.preventDefault()
            setVeiculos([])

            async function pesquisar() {
                try {
                    const params = {st_placa: placa, ch_ativo: ativo, st_nome: empresa}
                    const retornoApi = await api.get('/veiculos/pesquisar', {params, headers:{'auth': localStorage.userToken}, validateStatus: status => status < 500});    
                    setVeiculos(retornoApi.data)

                } catch (error) {
                    AlertCatch('Erro na pesquisa. Tente novamente!')
                }
            }
            pesquisar()
        },
        [placa, ativo, empresa]
    )

    return(
        <div className="container-fluid mt-5">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card card-outline-secondary">
                        <div className="card-header">
                            <h3 className="mb-0">Pesquisar Veículos</h3>
                        </div>
                        <div className="card-body">
                            <form className="form" onSubmit={handlePesquisar}>
                                <div className="form-row">
                                    <div className="form-group col-lg-5 col-md-4 col-sm-4">
                                        <label className="mr-sm-3">Razão Social</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Nome da Empresa" 
                                            value={empresa}
                                            onChange={ e => setEmpresa(e.target.value) }
                                        />
                                    </div>
                                    <div className="form-group col-lg-3 col-md-3 col-sm-3">
                                        <label className="mr-sm-3">Situação</label>
                                        <select className="form-control mr-sm-4" value={ativo} onChange={ e => setAtivo(e.target.value) }>
                                            <option value="">Selecione</option>
                                            <option value="S">Ativa</option>
                                            <option value="N">Desativada</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-lg-2 col-md-3 col-sm-3">
                                        <label className="mr-sm-3">Placa</label>
                                        <InputMask 
                                            className="form-control mr-sm-4" 
                                            value={placa} 
                                            placeholder="Informe Placa"
                                            onChange={e => setPlaca(e.target.value.toUpperCase())}
                                            mask="aaa-9*99"
                                            maskChar= '_' // define o caracter da mask - esse já eh assim mesmo sem colocar isso
                                            alwaysShowMask={false} //se true fica aparendo a mask se não apararece placeholder
                                        />
                                    </div>
                                    <div className="form-group col-sm-2">
                                        <label className="mr-sm-3"></label>
                                        <button type="submit" className="mt-2 form-control btn btn-success">Buscar</button>
                                    </div>
                                    <div className="form-group col-sm-2">
                                        <label className="mr-sm-3"></label>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div> 
            </div> 
            {
                veiculos.length !== 0 ?
                    <ListagemVeiculosAdm veiculos={veiculos} retornoAtivacaoOuDesativacao={retornoAtivacaoOuDesativacao} />
                :   
                    <p className="mt-5" align="center">Não encotramos nenhum veículo.</p>
            }
        </div> 
    )
}

export default withRouter(Pesquisar);