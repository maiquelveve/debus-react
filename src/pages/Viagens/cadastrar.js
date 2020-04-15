import React, { useEffect, useState, useCallback } from 'react';
import InputMask from 'react-input-mask';
import {withRouter, Link} from 'react-router-dom';

import AlertasResultados from '../../components/AlertasResultados';
import { AlertCatch } from '../../components/AlertasDefaultSistema';
import { validaToken }  from '../../services/auth';
import api from '../../services/api';

import DestinosViagens from './component/DestinosViagens/'
import { validacao } from './validacoes';

function Cadastrar() {
    //States para serem gravadas no banco
    const[id_empresa, setIdEmpresa] = useState(0)
    const[id_veiculo, setIdVeiculo] = useState(0)
    const[idPaisOrigem, setIdPaisOrigem] = useState(0)
    const[idEstadoOrigem, setIdEstadoOrigem] = useState(0)
    const[idCidadeOrigem, setIdCidadeOrigem] = useState(0)
    const[idReferenciaOrigem, setIdReferenciaOrigem] = useState(0)
    const[idPaisDestino, setIdPaisDestino] = useState(0)
    const[idEstadoDestino, setIdEstadoDestino] = useState(0)
    const[idCidadeDestino, setIdCidadeDestino] = useState(0)
    const[idReferenciaDestino, setIdReferenciaDestino] = useState(0)
    const[vagas, setVagas] = useState('')
    const[horario, setHorario] = useState('')
    const[data, setData] = useState('')

    //States dos combos
    const[veiculosEmpresa, setVeiculosEmpresa] = useState([])
    const[empresasUsuario, setEmpresasUsuario] = useState([])

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
                    const empresasUsuarioApi = await api.get(`/empresas/buscarDoUsuario`)
                    setEmpresasUsuario(empresasUsuarioApi.data)

                } catch (error) {
                    AlertCatch('Ocorreu um erro ao buscar os dados no banco. Tente novamente mais tarde.')
                }
            }
            fetchData();
        },
        []
    )
    
    //UseEffect para buscar os veiculos conforme a empresa escolhida
    useEffect(
        () => {
            setVeiculosEmpresa([])
            setIdVeiculo(0)
            
            async function buscarVeiculosEmpresa() {
                try {
                    const retornoApi = await api.get(`/veiculos/buscarVeiculosPorEmpresa?id_empresa=${id_empresa}`, {headers:{auth: localStorage.userToken}})
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
                try {
                    const dadosViagem = await validacao({vagas, horario, idReferenciaOrigem, idReferenciaDestino, id_veiculo, data})

                    if(dadosViagem.length > 0) {
                        setResultado(dadosViagem)

                    } else {
                        const retornoApi = await api.post('/viagens', dadosViagem, {headers:{auth: localStorage.userToken}})
                        setResultado(retornoApi.data)
                        setIdEmpresa(0)
                        setIdVeiculo(0)
                        setIdPaisOrigem(0)
                        setIdEstadoOrigem(0)
                        setIdCidadeOrigem(0)
                        setIdReferenciaOrigem(0)
                        setIdPaisDestino(0)
                        setIdEstadoDestino(0)
                        setIdCidadeDestino(0)
                        setIdReferenciaDestino(0)
                        setVagas('')
                        setHorario('')
                        setData('')
                        setVeiculosEmpresa([])
                    }

                    //Faz o scroll para o topo da pagina para ler as messagens de sucesso ou erros
                    window.scrollTo(0, 0);

                } catch (error) {
                    AlertCatch('Ocorreu um erro ao cadastrar a viagem, tente novamente mais tarde.')                    
                }
            }
            cadastrar()
        },
        [vagas, horario, idReferenciaOrigem, idReferenciaDestino, id_veiculo, data]
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
                                    <div className="form-group col-lg-2 col-md-4">
                                        <label>Vagas</label>
                                        <InputMask 
                                            className="form-control" 
                                            value={vagas} 
                                            onChange={e => {setVagas(parseInt(e.target.value)); handleLimparMsg()}} 
                                            placeholder="Informe lugares" type="text"
                                            mask="99"
                                            maskChar=''
                                        />
                                    </div>
                                    <div className="form-group col-lg-2 col-md-4">
                                        <label>Data</label>
                                        <InputMask 
                                            className="form-control" 
                                            value={data} 
                                            onChange={e => {setData(e.target.value); handleLimparMsg()}} 
                                            placeholder="Informe a data" type="text"
                                            mask="99/99/9999"
                                            maskChar=''
                                        />
                                    </div>
                                    <div className="form-group col-lg-2 col-md-4">
                                        <label>Horário</label>
                                        <InputMask 
                                            className="form-control" 
                                            value={horario} 
                                            onChange={e => {setHorario(e.target.value); handleLimparMsg()}} 
                                            placeholder="Informe lugares" type="text" 
                                            mask="99:99"
                                            maskChar=''
                                        />
                                    </div>
                                </div>
                                
                                <DestinosViagens 
                                    handleLimparMsg = {handleLimparMsg}
                                    setIdPais = {setIdPaisOrigem}
                                    idPais = {idPaisOrigem}
                                    setIdEstado = {setIdEstadoOrigem}
                                    idEstado = {idEstadoOrigem}
                                    setIdCidade = {setIdCidadeOrigem}   
                                    idCidade = {idCidadeOrigem} 
                                    idReferencia = {idReferenciaOrigem}
                                    setIdReferencia = {setIdReferenciaOrigem}     
                                    deslocamento = "Origem"                                                  
                                />

                                <DestinosViagens 
                                    handleLimparMsg = {handleLimparMsg}
                                    setIdPais = {setIdPaisDestino}
                                    idPais = {idPaisDestino}
                                    setIdEstado = {setIdEstadoDestino}
                                    idEstado = {idEstadoDestino}
                                    setIdCidade = {setIdCidadeDestino}   
                                    idCidade = {idCidadeDestino} 
                                    idReferencia = {idReferenciaDestino}
                                    setIdReferencia = {setIdReferenciaDestino}     
                                    deslocamento = "Destino"                                                  
                                />

                                <div className="form-row mt-2">
                                    <div className="form-group col-sm-12">
                                        <button type="submit" className="btn btn-success btn-lg">Salvar</button>
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