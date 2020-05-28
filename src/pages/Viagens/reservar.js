import React, { useEffect, useState, useCallback } from 'react';
import { withRouter } from 'react-router-dom';

import { validaToken } from '../../services/auth';
import api from '../../services/api';
import { AlertCatch } from '../../components/AlertasDefaultSistema';

import { Loading, ExibirLoadingLayout } from '../../components/Loading';
import InformacoesViagens from './component/InformacoesViagens';
import ModalAddPassageiros from '../Passageiros/component/ModalAddPassageiros';
import MostrarPassageiros from '../Passageiros/component/MostrarPassageiros';


function Reservar(props) {
    const [viagem, setViagem] = useState([])
    const [load, setLoad] = useState(true)
    const [openModal, setOpenModal] = useState(false);
    const [passageiros, setPassageiros] = useState([])

    async function buscarPassageiros() {
        try {
            const params = { id_viagem: props.match.params.id }
            const retornoApi = await api.get('passageiros', { params, headers:{ auth: localStorage.userToken }, validateStatus: status => status < 500 })
            setPassageiros(retornoApi.data)

        } catch (error) {
            AlertCatch('Ocorreu um erro ao cadastrar os dados no banco. Tente novamente mais tarde.') 
        }
    }

    const refazerBuscaDosPassageiros = useCallback(buscarPassageiros, [])

    useEffect(
        () => {
            async function fetchData() {
                const token = await validaToken();
                if(!token) {
                    window.location.reload('/')
                } 

                try {
                    const { id } = props.match.params
                    const retornoApi = await api.get(`/viagens/reservar/${id}`)
                    refazerBuscaDosPassageiros()
                    setViagem(retornoApi.data)
                    setLoad(false)

                } catch (error) {
                    AlertCatch('Ocorreu um erro ao buscar os dados no banco. Tente novamente mais tarde.')
                }
            }
            fetchData();
        },
        [props.match.params, refazerBuscaDosPassageiros]
    )
        
    if(load) return(<Loading size={80} />) 

    return(
        <div className="container-fluid mt-2">
            <ExibirLoadingLayout size={95} />
            <InformacoesViagens viagem={viagem} />
            
            <div className="row">
                <div className="col-12 mt-3">
                    <button className='float-right btn btn-primary btn-lg' onClick={() => setOpenModal(!openModal) }>
                        + Passageiros
                    </button> 
                </div>
                <div className="col-12 mt-3">
                    <MostrarPassageiros passageiros={passageiros} refazerBuscaDosPassageiros={refazerBuscaDosPassageiros} />
                </div>
            </div> 
                    
            <ModalAddPassageiros open={openModal} setOpen={setOpenModal} id_viagem={props.match.params.id} refazerBuscaDosPassageiros={refazerBuscaDosPassageiros} />
        </div>
    )
}

export default withRouter(Reservar);

