import React, { useState, useCallback, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';

import api from '../../services/api';
import { validaToken }  from '../../services/auth';

import { AlertCatch } from '../../components/AlertasDefaultSistema';
import ComboPaisEstadosCidades from '../../components/CombosPaisEstadosCidades';
import ListagemLocaisReferencias from './component/ListagemLocaisReferencias';

function Listar() {
    const [localReferencia, setLocalReferencia] = useState('')
    const [idPais, setIdPais] = useState(0)
    const [idEstado, setIdEstado] = useState(0)
    const [idCidade, setIdCidade] = useState(0)
    const [locaisReferencias, setLocaisReferencias] = useState([])
    const [retornoCallback, setRetornoCallback] = useState(0)
    
    useEffect(
        () => {
            async function fetchData() {
                const token = await validaToken();
                if(!token) {
                    window.location.reload('/')
                } 
            }
            fetchData();
        },
        []
    )

    //USEEFFECT para renovar a pesquisa depois de alguma ação nos registros listados, ex: cancelar local de referencia
    useEffect(
        () => {
            async function renovarPesquisa() {
                try {
                    const params = {
                        id_pais: idPais,
                        id_estado: idEstado,
                        id_cidade: idCidade,
                        st_dsc: localReferencia
                    }

                    const retornoApi = await api.get('/locaisReferencias/listar', { params, headers:{'auth': localStorage.userToken}, validateStatus: status => status < 500 })
                    setLocaisReferencias(retornoApi.data)

                } catch (error) {
                    AlertCatch('Hoveram problemas ao realizar a pesquisa dos locais de referência. Tente novamente mais tarde.')
                }
            }

            if(retornoCallback > 0) {
                renovarPesquisa()
            }
        },
        [retornoCallback, idPais, idEstado, idCidade, localReferencia]
    )

    const handleListar = useCallback(
        e => {
            e.preventDefault()

            async function listar() {
                try {
                    const params = {
                        id_pais: idPais,
                        id_estado: idEstado,
                        id_cidade: idCidade,
                        st_dsc: localReferencia
                    }

                    const retornoApi = await api.get('/locaisReferencias/listar', { params, headers:{'auth': localStorage.userToken}, validateStatus: status => status < 500 })
                    setLocaisReferencias(retornoApi.data)

                } catch (error) {
                    AlertCatch('Hoveram problemas ao realizar a pesquisa dos locais de referência. Tente novamente mais tarde.')
                }
            }
            listar()
        },
        [idCidade, localReferencia, idPais, idEstado]
    )

    const retornoCallBackFunction = useCallback(
        () => setRetornoCallback(retornoCallback + 1),
        [retornoCallback]
    )

    return(
        <div className="container-fluid h-100 mt-3">   
            <div className="row">
                <div className="col-lg-12">
                    <div className="card card-outline-secondary">
                        <div className="card-header">
                            <h3 className="mb-0">Listar Meus Local de Referencia</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleListar}>
                                <div className="form-row">
                                    <div className="form-group col-12">
                                        <label>Local Referencia</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Informe o Local de Referencia" 
                                            value={localReferencia}
                                            onChange={ e => setLocalReferencia(e.target.value) }
                                        />
                                    </div>
                                </div>
                                <ComboPaisEstadosCidades 
                                    handleLimparMsg = {() => {}}
                                    setIdPais = {setIdPais}
                                    idPais = {idPais}
                                    setIdEstado = {setIdEstado}
                                    idEstado = {idEstado}
                                    setIdCidade = {setIdCidade}   
                                    idCidade = {idCidade}
                                />
                                <div className="form-row mt-2">
                                    <div className="form-group col-sm-12">
                                        <button type="submit" className="btn btn-success btn-lg">Buscar</button>
                                        <Link className="btn btn-dark btn-lg ml-1" to="cadastrar">Cadastrar</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {locaisReferencias.length > 0 ?
                <ListagemLocaisReferencias  locaisReferencias={locaisReferencias} retornoCallBackFunction={retornoCallBackFunction} />
             :
                <p className="mt-5" align="center">Não foram encontrados nenhum Local de Referência</p>   
            }
        </div>
    )
}

export default withRouter(Listar)