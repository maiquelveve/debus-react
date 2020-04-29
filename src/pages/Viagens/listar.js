import React, { useState, useCallback, useEffect } from 'react';
import {withRouter, Link} from 'react-router-dom';
import InputMask from 'react-input-mask';

import {validaToken} from '../../services/auth';
import api from '../../services/api';
import { AlertCatch } from '../../components/AlertasDefaultSistema';

import ListagemViaagens from './component/ListagemViagens';

function Listar() {
    const [viagens, setViagens] = useState([])
    const [empresasUsuario, setEmpresaUsuario] = useState([])
    const [id_empresa, setIdEmpresa] = useState(0)
    const [situacao, setSituacao] = useState('')
    const [placa, setPlaca] = useState('')
    const [data, setData] = useState('')

    //Simple, faz a validação do token
    useEffect(
        () => {
            async function fetchData() {
                const token = await validaToken();
                if(!token) {
                    window.location.reload('/')
                } 

                try {
                    const retornoApi = await api.get('/empresas/buscarDoUsuario', { headers:{'auth': localStorage.userToken}, validateStatus: status => status < 500});    
                    setEmpresaUsuario(retornoApi.data)

                } catch (error) {
                   await AlertCatch('Ocorreram erros ao carregar as empresas do usuário. Tente novamente mais tarde.') 
                }
            }
            fetchData()
        },
        []
    )

    const handleListar = useCallback(
        e => {
            e.preventDefault()
            setViagens([])

             async function listarViagens() {
                try {
                    const params = {
                        id_empresa, 
                        en_situacao: situacao, 
                        st_placa: placa.replace('-', ''), 
                        dt_data: data.split('/').reverse().join('-')
                    }
                    const retornoApi = await api.get('/viagens', {params, headers:{'auth': localStorage.userToken}, validateStatus: status => status < 500})
                    setViagens(retornoApi.data)
                    
                } catch (error) {
                    await AlertCatch('Houveram problemas ao listar as Viagens. Tente novamente.')                
                }
             }
             listarViagens()
        },
        [id_empresa, situacao, placa, data]
    )

    return (
        <div className="container-fluid mt-5">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card card-outline-secondary">
                        <div className="card-header">
                            <h3 className="mb-0">Minhas Viagens</h3>
                        </div>
                        <div className="card-body">
                            <form className="form" onSubmit={handleListar}>
                                <div className="form-row">
                                    <div className="form-group col-lg-2 col-md-4 col-sm-6">
                                        <label className="mr-sm-3">Empresa</label>
                                        <select 
                                            className="form-control mr-sm-4" 
                                            value={id_empresa} 
                                            onChange={e => setIdEmpresa(parseInt(e.target.value))}
                                        >
                                            <option value={0}>Selecione</option>
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
                                    <div className="form-group col-lg-2 col-md-3 col-sm-6">
                                        <label className="mr-sm-3">Situação</label>
                                        <select 
                                            className="form-control mr-sm-4" 
                                            value={situacao} 
                                            onChange={e => setSituacao(e.target.value)}
                                        >
                                            <option value="">Todas</option>
                                            <option value="aguardando confirmação">Aguardando Confirmação</option>
                                            <option value="confirmada">Confirmada</option>
                                            <option value="cancelada">Cancelada</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-lg-2 col-md-3 col-sm-6">
                                        <label className="mr-sm-3">Placa</label>
                                        <InputMask 
                                            className="form-control mr-sm-4" 
                                            value={placa} 
                                            placeholder="Informe Placa"
                                            onChange={e => setPlaca(e.target.value.toUpperCase())}
                                            mask="aaa-9*99"
                                            maskChar= '' 
                                        />
                                    </div>
                                    <div className="form-group col-lg-2 col-md-2 col-sm-6">
                                        <label className="mr-sm-3">Data Inicio</label>
                                        <InputMask 
                                            className="form-control" 
                                            value={data} 
                                            onChange={e => setData(e.target.value)} 
                                            placeholder="Informe a data" type="text"
                                            mask="99/99/9999"
                                            maskChar=''
                                        />
                                    </div>
                                    <div className="form-group col-sm-2">
                                        <label className="mr-sm-3"></label>
                                        <button type="submit" className="mt-2 form-control btn btn-success">Buscar</button>
                                    </div>
                                    <div className="form-group col-sm-2">
                                        <label className="mr-sm-3"></label>
                                        <Link className="mt-2 form-control btn btn-dark" to="/viagens/cadastrar">Cadastrar</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div> 
            </div>    
            {viagens.length !== 0 ?
                <ListagemViaagens viagens={viagens} />
            :
                <p className="mt-5" align="center">Não encotramos nenhuma Viagem.</p>
            }     
        </div> 
    );
}

export default withRouter(Listar);