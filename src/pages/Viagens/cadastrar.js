import React, { useEffect, useState, useCallback } from 'react';
import {withRouter, Link} from 'react-router-dom';

import AlertasResultados from '../../components/AlertasResultados';
import { AlertCatch } from '../../components/AlertasDefaultSistema';
import { validaToken }  from '../../services/auth';
import api from '../../services/api';

function Cadastrar() {
    //States para serem gravadas no banco
    const[idPaisOrigem, setIdPaisOrigem] = useState(0)
    const[idEstadoOrigem, setIdEstadoOrigem] = useState(0)
    const[idCidadeOrigem, setIdCidadeOrigem] = useState(0)
    const[idReferenciaOrigem, setIdReferenciaOrigem] = useState(0)
    const[vagas, setVagas] = useState('')
    const[horario, setHorario] = useState('')
    const[id_empresa, setIdEmpresa] = useState(0)
    const[id_veiculo, setIdVeiculo] = useState(0)

    //States dos combos
    const[veiculosEmpresa, setVeiculosEmpresa] =useState([])
    const[empresasUsuario, setEmpresasUsuario] = useState([])
    const[paisOrigem, setPaisOrigem] = useState([])
    const[estadoOrigem, setEstadoOrigem] = useState([])
    const[cidadeOrigem, setCidadeOrigem] = useState([])
    const[referenciaOrigem, setReferenciaOrigem] = useState([])
    const[idPaisDestino, setIdPaisDestino] = useState(0)
    const[idEstadoDestino, setIdEstadoDestino] = useState(0)
    const[idCidadeDestino, setIdCidadeDestino] = useState(0)
    const[idReferenciaDestino, setIdReferenciaDestino] = useState(0)
    const[paisDestino, setPaisDestino] = useState([])
    const[estadoDestino, setEstadoDestino] = useState([])
    const[cidadeDestino, setCidadeDestino] = useState([])
    const[referenciaDestino, setReferenciaDestino] = useState([])

    //States do resultado de erro ou sucesso
    const[resultado, setResultado] = useState([])

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
                    const empresasUsuarioApi = await api.get(`/empresas/buscarDoUsuario`)
                    setEmpresasUsuario(empresasUsuarioApi.data)
                    setPaisOrigem(retornoApi.data)
                    setPaisDestino(retornoApi.data)

                } catch (error) {
                    AlertCatch('Ocorreu um erro ao buscar os dados no banco. Tente novamente mais tarde.')
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


    //UseEffects refernete ao local de DESTINO DA VIAGEM INICIO
    useEffect(
        () => {
            setEstadoDestino([])
            setCidadeDestino([])
            setReferenciaDestino([])
            setIdEstadoDestino(0)
            setIdCidadeDestino(0)
            setIdReferenciaDestino(0)

            async function atualizarCombosDestino() {
                try {
                    const retornoApi = await api.get(`/estados?id_pais=${idPaisDestino}`)
                    setEstadoDestino(retornoApi.data)

                } catch (error) {
                    AlertCatch('Ocorreu um erro ao buscar os estados do país selecionado. Tente novamente mais tarde.')
                }
            }

            if(idPaisDestino !== 0) {
                atualizarCombosDestino()
            }
        },
        [idPaisDestino]
    )    

    useEffect(
        () => {
            setCidadeDestino([])
            setReferenciaDestino([])
            setIdCidadeDestino(0)
            setIdReferenciaDestino(0)

            async function atualizarCombosDestino() {
                try {
                    const retornoApi = await api.get(`/cidades?id_estado=${idEstadoDestino}`)
                    setCidadeDestino(retornoApi.data)

                } catch (error) {
                    AlertCatch('Ocorreu um erro ao buscar as cidades do estado selecionado. Tente novamente mais tarde.')
                }
            }

            if(idEstadoDestino !== 0) {
                atualizarCombosDestino()
            }
        },
        [idEstadoDestino]
    )

    useEffect(
        () => {
            setReferenciaDestino([])
            setIdReferenciaDestino(0)

            async function atualizarCombosDestino() {
                try {
                    const retornoApi = await api.get(`/locaisReferencias?id_cidade=${idCidadeDestino}`)
                    setReferenciaDestino(retornoApi.data)

                } catch (error) {
                    AlertCatch('Ocorreu um erro ao buscar as referencias da cidade selecionada. Tente novamente mais tarde.')
                }
            }
            
            if(idCidadeDestino !== 0) {
                atualizarCombosDestino()
            } 
        },
        [idCidadeDestino]
    )
    //UseEffects refernete ao local de DESTINO DA VIAGEM FINAL

    //UseEffect para buscar os veiculos conforme a empresa escolhida
    useEffect(
        () => {
            setVeiculosEmpresa([])
            
            async function buscarVeiculosEmpresa() {
                try {
                    const retornoApi = await api.get(`/veiculos/buscarVeiculosPorEmpresa?id_empresa=${id_empresa}`)
                    setVeiculosEmpresa(retornoApi.data)

                } catch (error) {
                    AlertCatch('Ocorreu um erro ao buscar os veículos referente a empresa selecionada')
                }
            }

            if(id_empresa !== 0) {
                buscarVeiculosEmpresa()
            }
        },
        [id_empresa]
    )


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
                                        <select 
                                            className="form-control" 
                                            value={id_empresa} 
                                            onChange={e => {setIdEmpresa(parseInt(e.target.value)); handleLimparMsg()}}
                                        >
                                            <option value={0}>Selecine Empresa</option>
                                            {
                                                empresasUsuario.map( empresa => (
                                                    <option key={empresa.id} value={empresa.id}>
                                                        {empresa.st_nome}
                                                    </option>
                                                ))
                                            }
                                        </select>    
                                    </div>
                                </div>
                                <div className="form-row">    
                                    <div className="form-group col-lg-6 col-md-12">
                                        <label>Veículo</label>
                                        <select 
                                            className="form-control" 
                                            value={id_veiculo} 
                                            onChange={e => {setIdVeiculo(parseInt(e.target.value)); handleLimparMsg()}}
                                        >
                                            <option value={0}>Selecine Veículo</option>
                                            {
                                                veiculosEmpresa.map( veiculo => (
                                                    <option key={veiculo.id} value={veiculo.id}>
                                                        {veiculo.st_placa}
                                                    </option>
                                                ))
                                            }
                                        </select>    
                                    </div>
                                    <div className="form-group col-lg-3 col-md-6">
                                        <label>Vagas</label>
                                        <input 
                                            className="form-control" 
                                            value={vagas} 
                                            onChange={e => {setVagas(e.target.value); 
                                            handleLimparMsg()}} 
                                            placeholder="Informe lugares" type="text" 
                                        />
                                    </div>
                                    <div className="form-group col-lg-3 col-md-6">
                                        <label>Horário</label>
                                        <input 
                                            className="form-control" 
                                            value={horario} 
                                            onChange={e => {setHorario(e.target.value); handleLimparMsg()}} 
                                            placeholder="Informe lugares" type="text" 
                                        />
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
                                                        <select 
                                                            className="form-control" 
                                                            value={idPaisDestino} 
                                                            onChange={e => {setIdPaisDestino(parseInt(e.target.value)); handleLimparMsg()}}
                                                        >
                                                            <option value={0}>Selecine País</option>
                                                            {
                                                                paisDestino.map( pais => (
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
                                                            value={idEstadoDestino} 
                                                            onChange={e => {setIdEstadoDestino(parseInt(e.target.value)); handleLimparMsg()}}
                                                        >
                                                            <option value={0}>Selecine Estado</option>
                                                            {
                                                                estadoDestino.map( estado => (
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
                                                            value={idCidadeDestino} 
                                                            onChange={e => {setIdCidadeDestino(parseInt(e.target.value)); handleLimparMsg()}}
                                                        >
                                                            <option value={0}>Selecine Cidade</option>
                                                            {
                                                                cidadeDestino.map( cidade => (
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
                                                            value={idReferenciaDestino} 
                                                            onChange={e => {setIdReferenciaDestino(parseInt(e.target.value)); handleLimparMsg()}}
                                                        >
                                                            <option value={0}>Selecine Referencia</option>
                                                            {
                                                                referenciaDestino.map( referencia => (
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