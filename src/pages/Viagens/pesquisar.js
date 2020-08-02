import React, { useEffect, useState, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import InputMask from 'react-input-mask';

import { validaToken }  from '../../services/auth';
import { AlertCatch } from '../../components/AlertasDefaultSistema';
import api from '../../services/api';

import ListagemViagensAdm from './component/ListagemViagensAdm';
import DestinosViagens from './component/DestinoProcurarViagem';

function Pesquisar() {

    const [viagens, setViagens] = useState([])
    const [data, setData] = useState('')
    const [empresa, setEmpresa] = useState('')
    const [situacao, setSituacao] = useState('')
    const [idPaisOrigem, setIdPaisOrigem] = useState(0)
    const [idEstadoOrigem, setIdEstadoOrigem] = useState(0)
    const [idCidadeOrigem, setIdCidadeOrigem] = useState(0)
    const [idPaisDestino, setIdPaisDestino] = useState(0)
    const [idEstadoDestino, setIdEstadoDestino] = useState(0)
    const [idCidadeDestino, setIdCidadeDestino] = useState(0)
    
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

    const handlePesquisar = useCallback(
        e => {
            e.preventDefault()
            setViagens([])

            async function pesquisarViagens() {
                try {
                    const params = {
                        en_situacao: situacao, 
                        dt_data: data.split('/').reverse().join('-'),
                        st_nome: empresa,
                        id_cidade_origem: idCidadeOrigem,
                        id_cidade_destino: idCidadeDestino
                        
                    }
                    const retornoApi = await api.get('/viagens/pesquisar', {params, headers:{'auth': localStorage.userToken}, validateStatus: status => status < 500})
                    setViagens(retornoApi.data)

                    //Faz scroll até o inicio do resultado da pesquisa
                    window.scroll(0,1317)
                    
                } catch (error) {
                    await AlertCatch('Houveram problemas ao pesquisar as Viagens. Tente novamente.')                
                }
             }
             pesquisarViagens()
        },
        [data, situacao, empresa, idCidadeOrigem, idCidadeDestino]
    )

    return (        
        <div className="container-fluid mt-5">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card card-outline-secondary">
                        <div className="card-header">
                            <h3 className="mb-0">Pesquisar Viagens</h3>
                        </div>
                        <div className="card-body">
                            <form className="form" onSubmit={handlePesquisar}>  
                                <div className="form-row text-center">
                                    <div className="form-group col-lg-6 col-md-2 col-sm-6">
                                        <label className="mr-sm-3">Empresa</label>
                                        <input
                                            className="form-control text-center" 
                                            value={empresa}
                                            onChange={e => setEmpresa(e.target.value)} 
                                            placeholder="Informe a Empresa" 
                                            type="text"
                                        />
                                    </div>
                                    <div className="form-group col-lg-3 col-md-3 col-sm-6" >
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
                                    <div className="form-group col-lg-3 col-md-2 col-sm-6">
                                        <label className="mr-sm-3">Data Inicio</label>
                                        <InputMask 
                                            className="form-control text-center" 
                                            value={data} 
                                            onChange={e => setData(e.target.value)} 
                                            placeholder="Informe a data" type="text"
                                            mask="99/99/9999"
                                            maskChar=''
                                        />
                                    </div>  
                                </div>
                                <DestinosViagens 
                                    handleLimparMsg = {() => {}}
                                    setIdPais = {setIdPaisOrigem}
                                    idPais = {idPaisOrigem}
                                    setIdEstado = {setIdEstadoOrigem}
                                    idEstado = {idEstadoOrigem}
                                    setIdCidade = {setIdCidadeOrigem}   
                                    idCidade = {idCidadeOrigem} 
                                    deslocamento = "Origem"                                                  
                                />

                                <DestinosViagens 
                                    handleLimparMsg = {() => {}}
                                    setIdPais = {setIdPaisDestino}
                                    idPais = {idPaisDestino}
                                    setIdEstado = {setIdEstadoDestino}
                                    idEstado = {idEstadoDestino}
                                    setIdCidade = {setIdCidadeDestino}   
                                    idCidade = {idCidadeDestino} 
                                    deslocamento = "Destino"                                                  
                                />
                                <div className="form-row text-center">
                                    <div className="form-group col-sm-2 text-center">
                                        <button type="submit" className="mt-2 form-control btn btn-success">
                                            Buscar
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div> 
            </div>    
            {viagens.length !== 0 ?
                <ListagemViagensAdm viagens={viagens} />
            :
                <p className="mt-5" align="center">Não encotramos nenhuma Viagem.</p>
            }  
        </div> 
    );
}

export default withRouter(Pesquisar);