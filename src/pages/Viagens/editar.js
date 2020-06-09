import React, { useEffect, useState, useCallback } from 'react';
import InputMask from 'react-input-mask';
import CurrencyInput from 'react-currency-input';
import { withRouter, Link } from 'react-router-dom';

import AlertasResultados from '../../components/AlertasResultados';
import { AlertCatch } from '../../components/AlertasDefaultSistema';
import { validaToken }  from '../../services/auth';
import api from '../../services/api';

import DestinosViagens from './component/DestinosViagens/'
import { validacao } from './validacoes';
import { ajustaDataFront, ajustaHoraFront, ajustaValorFront } from '../../services/ajustesDados';
import { Loading ,ExibirLoadingLayout } from '../../components/Loading'

function Editar(props) {
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
    const[valor, setValor] = useState('')
    const[load, setLoad] = useState(true)

    //States dos combos
    const[veiculosEmpresa, setVeiculosEmpresa] = useState([])
    const[empresasUsuario, setEmpresasUsuario] = useState([])

    //States do resultado de erro ou sucesso
    const[resultado, setResultado] = useState([])

    //States para informar o valor ou não (à combinar)
    const[infoValor, setInfoValor] = useState(true)

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

                    const { id } = props.match.params
                    const retornoApi = await api.get(`/viagens/${id}`)
                    
                    setHorario(ajustaHoraFront(retornoApi.data.hh_horario, true, false))
                    setVagas(retornoApi.data.vagas)
                    setValor(ajustaValorFront(retornoApi.data.vl_valor))
                    setData(ajustaDataFront(retornoApi.data.dt_data))
                    setIdEmpresa(retornoApi.data.id_empresa)
                    setIdVeiculo(retornoApi.data.id_veiculo)
                    setIdPaisOrigem(retornoApi.data.pais_origem_id)
                    setIdEstadoOrigem(retornoApi.data.estado_origem_id)
                    setIdCidadeOrigem(retornoApi.data.cidade_origem_id)
                    setIdReferenciaOrigem(retornoApi.data.nr_id_local_referencia_origem)
                    setIdPaisDestino(retornoApi.data.pais_destino_id)
                    setIdEstadoDestino(retornoApi.data.estado_destino_id)
                    setIdCidadeDestino(retornoApi.data.cidade_destino_id)
                    setIdReferenciaDestino(retornoApi.data.nr_id_local_referencia_destino)
                    setLoad(false)

                } catch (error) {
                    AlertCatch('Ocorreu um erro ao buscar os dados no banco. Tente novamente mais tarde.')
                }
            }
            fetchData();
        },
        [props.match.params]
    )

    //UseEffect para buscar os veiculos conforme a empresa escolhida
    useEffect(
        () => {
            setVeiculosEmpresa([])
            
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
        []
    )

    const handleTrocaInfValor = useCallback(
        () => {
            setInfoValor(!infoValor)
            setValor('')
        },
        [infoValor]
    )

    const handleEditar = useCallback(
        e => {
            e.preventDefault()
            setResultado([])

            async function editar() {
                try {
                    const dadosViagem = await validacao({vagas, horario, idReferenciaOrigem, idReferenciaDestino, id_veiculo, data, valor})

                    if(dadosViagem.length > 0) {
                        setResultado(dadosViagem)

                    } else {
                        const { id } = props.match.params
                        const retornoApi = await api.put(`/viagens/${id}`, dadosViagem, {headers:{auth: localStorage.userToken}, validateStatus: status => status < 500})
                        setResultado(retornoApi.data)
                    }

                    //Faz o scroll para o topo da pagina para ler as messagens de sucesso ou erros
                    window.scrollTo(0, 0);

                } catch (error) {
                    AlertCatch('Ocorreu um erro ao editar a viagem, tente novamente mais tarde.')                    
                }
            }
            editar()
        },
        [vagas, horario, idReferenciaOrigem, idReferenciaDestino, id_veiculo, data, valor, props.match.params]
    )

    if(load) return <Loading size={80} />    

    return (  
        <>
        <ExibirLoadingLayout size={95} />
        <div className="container-fluid h-100 mt-3"> 
            <div className="justify-content-center align-items-center h-100">
                <div className="col-lg-12">
                    <span className="anchor" id="formLogin"></span>
                    <div className="card card-outline-secondary">
                        <div className="card-header">
                            <h3 className="mb-0">Editar Viagem</h3>
                        </div>
                        <div className="card-body">
                            { resultado.length !== 0 &&
                                <div onClick={handleLimparMsg}>
                                    <AlertasResultados resultado={resultado} objeto="Viagem" acao="Editada" />                   
                                </div>
                            }     
                            <form onSubmit={handleEditar}>
                                <div className="form-row">
                                    <div className="form-group col-12">
                                        <label>Empresa</label>
                                        <select 
                                            className="form-control" 
                                            value={id_empresa} 
                                            onChange={e => {setIdEmpresa(parseInt(e.target.value)); setIdVeiculo(0); handleLimparMsg()}}
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
                                    <div className="form-group col-lg-4 col-md-12">
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
                                    <div className="form-group col-lg-2 col-md-3">
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
                                    <div className="form-group col-lg-2 col-md-3">
                                        <label>
                                            <div className="custom-control custom-switch">
                                                <input 
                                                    type="checkbox" 
                                                    className="custom-control-input" 
                                                    id="infValor" 
                                                    onChange={handleTrocaInfValor}
                                                    checked={infoValor} 
                                                />
                                                <label className="custom-control-label" htmlFor="infValor">
                                                    {infoValor ? 'Valor unitário' : 'À combinar'}
                                                </label>
                                            </div>
                                        </label>
                                            { infoValor ?
                                                <CurrencyInput   
                                                    className="form-control" 
                                                    value={valor} 
                                                    onChangeEvent={e => {setValor(e.target.value); handleLimparMsg()}} 
                                                    placeholder="Informe o valor" type="text"
                                                    decimalSeparator="," 
                                                    thousandSeparator="."
                                                    precision="2"
                                                    prefix="R$ "
                                                    selectAllOnFocus={true}
                                                /> 
                                                : <del><input value="R$ 0,00" className="form-control-plaintext text-center" disabled/></del>
                                            }
                                    </div>
                                    <div className="form-group col-lg-2 col-md-3">
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
                                    <div className="form-group col-lg-2 col-md-3">
                                        <label>Horário</label>
                                        <InputMask 
                                            className="form-control" 
                                            value={horario} 
                                            onChange={e => {setHorario(e.target.value); handleLimparMsg()}} 
                                            placeholder="Informe Hora" type="text" 
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
                                        <Link className="btn btn-primary btn-lg ml-1" to="../listar">Voltar</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default withRouter(Editar);