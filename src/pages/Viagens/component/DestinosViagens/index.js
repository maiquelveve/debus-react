import React, {useState, useEffect} from 'react';

import { AlertCatch } from '../../../../components/AlertasDefaultSistema';
import api from '../../../../services/api';

function DestinosViagens(props) {

    const[pais, setPais] = useState([])
    const[estado, setEstado] = useState([])
    const[cidade, setCidade] = useState([])
    const[referencia, setReferencia] = useState([])

    useEffect(
        () => {
            async function fetchData() {
                //Carregando o combo de da tela
                try {
                    const retornoApi = await api.get(`/paises`)
                    setPais(retornoApi.data)

                } catch (error) {
                    AlertCatch('Ocorreu um erro ao buscar os dados no banco. Tente novamente mais tarde.')
                }
            }
            fetchData();
        },
        []
    )

    //UseEffects refernete ao local de  DA VIAGEM INICIO
    useEffect(
        () => {
            setEstado([])
            setCidade([])
            setReferencia([])
            props.setIdEstado(0)
            props.setIdCidade(0)
            props.setIdReferencia(0)

            async function atualizarCombos() {
                try {
                    const retornoApi = await api.get(`/estados?id_pais=${props.idPais}`)
                    setEstado(retornoApi.data)

                } catch (error) {
                    AlertCatch('Ocorreu um erro ao buscar os estados do país selecionado. Tente novamente mais tarde.')
                }
            }

            if(props.idPais !== 0) {
                atualizarCombos()
            }
        },
        [props]
    ) 

    useEffect(
        () => {
            setCidade([])
            setReferencia([])
            props.setIdCidade(0)
            props.setIdReferencia(0)

            async function atualizarCombos() {
                try {
                    const retornoApi = await api.get(`/cidades?id_estado=${props.idEstado}`)
                    setCidade(retornoApi.data)

                } catch (error) {
                    AlertCatch('Ocorreu um erro ao buscar as cidades do estado selecionado. Tente novamente mais tarde.')
                }
            }

            if(props.idEstado !== 0) {
                atualizarCombos()
            }
        },
        [props]
    )

    useEffect(
        () => {
            setReferencia([])
            props.setIdReferencia(0)

            async function atualizarCombos() {
                try {
                    const retornoApi = await api.get(`/locaisReferencias?id_cidade=${props.idCidade}`)
                    setReferencia(retornoApi.data)

                } catch (error) {
                    AlertCatch('Ocorreu um erro ao buscar as referencias da cidade selecionada. Tente novamente mais tarde.')
                }
            }
            
            if(props.idCidade !== 0) {
                atualizarCombos()
            } 
        },
        [props]
    )

    return(
        <div className="form-row">
            <div className="form-group col-12">
                <div className="card border-light mb-3">
                    <div className="card-header text-center">{props.deslocamento} da Viagem</div>
                    <div className="card-body">
                        <div className="form-row">
                            <div className="form-group col-lg-3 col-md-4">
                                <label>País</label>
                                <select 
                                    className="form-control" 
                                    value={props.idPais} 
                                    onChange={e => {props.setIdPais(parseInt(e.target.value)); props.handleLimparMsg()}}
                                >
                                    <option value={0}>Selecine País</option>
                                    {
                                        pais.map( pais => (
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
                                    value={props.idEstado} 
                                    onChange={e => {props.setIdEstado(parseInt(e.target.value)); props.handleLimparMsg()}}
                                >
                                    <option value={0}>Selecine Estado</option>
                                    {
                                        estado.map( estado => (
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
                                    value={props.idCidade} 
                                    onChange={e => {props.setIdCidade(parseInt(e.target.value)); props.handleLimparMsg()}}
                                >
                                    <option value={0}>Selecine Cidade</option>
                                    {
                                        cidade.map( cidade => (
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
                                    value={props.idReferencia} 
                                    onChange={e => {props.setIdReferencia(parseInt(e.target.value)); props.handleLimparMsg()}}
                                >
                                    <option value={0}>Selecine Referencia</option>
                                    {
                                        referencia.map( referencia => (
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
    )
}

export default DestinosViagens;