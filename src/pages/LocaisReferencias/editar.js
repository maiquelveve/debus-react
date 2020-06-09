import React, { useState, useCallback, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'

import api from '../../services/api';
import { validaToken }  from '../../services/auth';

import AlertasResultados from '../../components/AlertasResultados';
import { AlertCatch } from '../../components/AlertasDefaultSistema';

import { validacao } from './validacoes';
import ComboPaisEstadosCidades from '../../components/CombosPaisEstadosCidades';

function Editar(props) {

    const [resultado, setResultado] = useState([])
    const [localReferencia, setLocalReferencia] = useState('')
    const [idPais, setIdPais] = useState(0)
    const [idEstado, setIdEstado] = useState(0)
    const [idCidade, setIdCidade] = useState(0)

    useEffect(
        () => {
            async function fetchData() {
                const token = await validaToken();
                if(!token) {
                    window.location.reload('/')
                }

                try {
                    const { id } = props.match.params 
                    const retornoApi = await api.get(`/locaisReferencias/${id}`)
                    setLocalReferencia(retornoApi.data[0].st_dsc)
                    setIdPais(retornoApi.data[0].id_pais)
                    setIdEstado(retornoApi.data[0].id_estado)
                    setIdCidade(retornoApi.data[0].id_cidade)

                } catch (error) {
                    AlertCatch('Ocorreu um erro ao carregar o local de referencia. Tente novamente mais tarde.')
                }
            }
            fetchData();
        },
        [props.match.params]
    )

    const handleLimparMsg = useCallback(
        () => {   
            setResultado([])
        },
        []
    )

    const handleEditar = useCallback(
        e => {
            e.preventDefault()
            setResultado([])

            async function editar() {
                try {
                    const dados = await validacao({localReferencia, idCidade})                   
                    
                    if (dados.length > 0) {
                        setResultado(dados)
                    } else {
                        const { id } = props.match.params 
                        const retornoApi = await api.put(`/locaisReferencias/${id}`, dados, { headers:{auth: localStorage.userToken}, validateStatus: status => status < 500 })
                        setResultado(retornoApi.data)
                    }

                } catch (error) {
                    await AlertCatch('Hoveram problemas ao cadastrar o local de referencia. Tente novemente mais tarde.')
                }
            }
            editar()
        },
        [localReferencia, idCidade, props.match.params ]
    )

    return(
        <div className="container-fluid h-100 mt-3">   
            <div className="justify-content-center align-items-center h-100">
                <div className="col-lg-12">
                    <span className="anchor" id="formLogin"></span>
                    <div className="card card-outline-secondary">
                        <div className="card-header">
                            <h3 className="mb-0">Editar Local de Referencia</h3>
                        </div>
                        <div className="card-body">
                            { resultado.length !== 0 &&
                                <div onClick={handleLimparMsg}>
                                    <AlertasResultados resultado={resultado} objeto="Local de Referencia" acao="Cadastrado" />                   
                                </div>
                            }     
                            <form onSubmit={handleEditar}>
                                <div className="form-row">
                                    <div className="form-group col-12">
                                        <label>Local Referencia</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Informe o Local de Referencia" 
                                            value={localReferencia}
                                            onChange={ e => {setLocalReferencia(e.target.value); handleLimparMsg()} }
                                        />
                                    </div>
                                </div>
                                <ComboPaisEstadosCidades 
                                    handleLimparMsg = {handleLimparMsg}
                                    setIdPais = {setIdPais}
                                    idPais = {idPais}
                                    setIdEstado = {setIdEstado}
                                    idEstado = {idEstado}
                                    setIdCidade = {setIdCidade}   
                                    idCidade = {idCidade}
                                />
                                <div className="form-row mt-2">
                                    <div className="form-group col-sm-12">
                                        <button type="submit" className="btn btn-success btn-lg">Salvar</button>
                                        <Link className="btn btn-primary btn-lg ml-1" to="../listar">Voltar</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Editar)

