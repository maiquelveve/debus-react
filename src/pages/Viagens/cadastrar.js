import React, { useEffect, useState, useCallback } from 'react';
import {withRouter, Link} from 'react-router-dom';

import AlertasResultados from '../../components/AlertasResultados';
import { AlertCatch } from '../../components/AlertasDefaultSistema';
import { validaToken }  from '../../services/auth';
import api from '../../services/api';

function Cadastrar() {
    const[idPaisOrigem, setIdPaisOrigem] = useState(0)
    const[idEstadoOrigem, setIdEstadoOrigem] = useState(0)
    const[idCidadeOrigem, setIdCidadeOrigem] = useState(0)
    const[idReferenciaOrigem, setIdReferenciaOrigem] = useState(0)
    const[resultado, setResultado] = useState([])
    const[paisOrigem, setPaisOrigem] = useState([])
    const[estadoOrigem, setEstadoOrigem] = useState([])
    const[cidadeOrigem, setCidadeOrigem] = useState([])
    const[referenciaOrigem, setReferenciaOrigem] = useState([])

    useEffect(
        () => {
            async function fetchData() {
                const token = await validaToken();
                if(!token) {
                    window.location.reload('/')
                } 

                //Carregando o combo de da tela
                try {
                    const retornoApi = await api.get(`/paises`)
                    setPaisOrigem(retornoApi.data)
                    
                } catch (error) {
                    AlertCatch('Ocorreu um erro ao buscar os Paises. Tente novamente mais tarde.')
                }
            }
            fetchData();
        },
        []
    )
    
    //UseEffects refernete ao local de ORIGEM DA VIAGEM INICIO
    useEffect(
        () => {
            setEstadoOrigem([])
            setCidadeOrigem([])
            setReferenciaOrigem([])
            setIdEstadoOrigem(0)
            setIdCidadeOrigem(0)
            setIdReferenciaOrigem(0)

            async function atualizarCombosOrigem() {
                try {
                    const retornoApi = await api.get(`/estados?id_pais=${idPaisOrigem}`)
                    setEstadoOrigem(retornoApi.data)

                } catch (error) {
                    AlertCatch('Ocorreu um erro ao buscar os estados do país selecionado. Tente novamente mais tarde.')
                }
            }

            if(idPaisOrigem !== 0) {
                atualizarCombosOrigem()
            }
        },
        [idPaisOrigem]
    )    

    useEffect(
        () => {
            setCidadeOrigem([])
            setReferenciaOrigem([])
            setIdCidadeOrigem(0)
            setIdReferenciaOrigem(0)

            async function atualizarCombosOrigem() {
                try {
                    const retornoApi = await api.get(`/cidades?id_estado=${idEstadoOrigem}`)
                    setCidadeOrigem(retornoApi.data)

                } catch (error) {
                    AlertCatch('Ocorreu um erro ao buscar as cidades do estado selecionado. Tente novamente mais tarde.')
                }
            }

            if(idEstadoOrigem !== 0) {
                atualizarCombosOrigem()
            }
        },
        [idEstadoOrigem]
    )

    useEffect(
        () => {
            setReferenciaOrigem([])
            setIdReferenciaOrigem(0)

            async function atualizarCombosOrigem() {
                try {
                    const retornoApi = await api.get(`/locaisReferencias?id_cidade=${idCidadeOrigem}`)
                    setReferenciaOrigem(retornoApi.data)

                } catch (error) {
                    AlertCatch('Ocorreu um erro ao buscar as referencias da cidade selecionada. Tente novamente mais tarde.')
                }
            }
            
            if(idCidadeOrigem !== 0) {
                atualizarCombosOrigem()
            } 
        },
        [idCidadeOrigem]
    )
    //UseEffects refernete ao local de ORIGEM DA VIAGEM FINAL


    const handleLimparMsg = useCallback(
        () => {
            setResultado([])
        },  
        [resultado]
    )

    const handleCadastrar = useCallback(
        e => {
            e.preventDefault()
            setResultado([])

            async function cadastrar() {
                alert('cadastrar viagem')
            }

            cadastrar()
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
                                                        <select 
                                                            className="form-control" 
                                                            value={idPaisOrigem} 
                                                            onChange={e => {setIdPaisOrigem(parseInt(e.target.value)); handleLimparMsg()}}
                                                        >
                                                            <option value={0}>Selecine País</option>
                                                            {
                                                                paisOrigem.map( pais => (
                                                                    <option key={pais.id} value={pais.id}>
                                                                        {pais.st_nome}
                                                                    </option>
                                                                ))
                                                            }
                                                        </select>    
                                                    </div>                                  
                                                    <div className="form-group col-lg-3 col-md-4">
                                                        <label>Estado</label>
                                                        <select 
                                                            className="form-control" 
                                                            value={idEstadoOrigem} 
                                                            onChange={e => {setIdEstadoOrigem(parseInt(e.target.value)); handleLimparMsg()}}
                                                        >
                                                            <option value={0}>Selecine Estado</option>
                                                            {
                                                                estadoOrigem.map( estado => (
                                                                    <option key={estado.id} value={estado.id}>
                                                                        {estado.st_nome}
                                                                    </option>
                                                                ))
                                                            }
                                                        </select>    
                                                    </div>
                                                    <div className="form-group col-lg-3 col-md-4">
                                                        <label>Cidade</label>
                                                        <select 
                                                            className="form-control" 
                                                            value={idCidadeOrigem} 
                                                            onChange={e => {setIdCidadeOrigem(parseInt(e.target.value)); handleLimparMsg()}}
                                                        >
                                                            <option value={0}>Selecine Cidade</option>
                                                            {
                                                                cidadeOrigem.map( cidade => (
                                                                    <option key={cidade.id} value={cidade.id}>
                                                                        {cidade.st_nome}
                                                                    </option>
                                                                ))
                                                            }
                                                        </select>    
                                                    </div>
                                                    <div className="form-group col-lg-3 col-md-12">
                                                        <label>Referencia</label>
                                                        <select 
                                                            className="form-control" 
                                                            value={idReferenciaOrigem} 
                                                            onChange={e => {setIdReferenciaOrigem(parseInt(e.target.value)); handleLimparMsg()}}
                                                        >
                                                            <option value={0}>Selecine Referencia</option>
                                                            {
                                                                referenciaOrigem.map( referencia => (
                                                                    <option key={referencia.id} value={referencia.id}>
                                                                        {referencia.st_dsc}
                                                                    </option>
                                                                ))
                                                            }
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