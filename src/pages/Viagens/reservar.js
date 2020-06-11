import React, { useEffect, useState, useCallback } from 'react';
import { withRouter } from 'react-router-dom';

import { validaToken } from '../../services/auth';
import api from '../../services/api';
import { AlertCatch } from '../../components/AlertasDefaultSistema';

import { Loading, ExibirLoadingLayout } from '../../components/Loading';
import InformacoesViagens from './component/InformacoesViagens';
import ModalAddPassageiros from '../Passageiros/component/ModalAddPassageiros';
import ModalEditarPassageiros from '../Passageiros/component/ModalEditarPassageiros';
import MostrarPassageiros from '../Passageiros/component/MostrarPassageiros';

import { AlertSuccess, AlertError } from '../../components/AlertasMaterialUi';

function Reservar(props) {
    const [load, setLoad] = useState(true)
    const [loadLayout, setLoadLayout] = useState(true)
    const [viagem, setViagem] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [openModalEditar, setOpenModalEditar] = useState(false)
    const [passageiros, setPassageiros] = useState([])
    const [passageiro, setPassageiro] = useState([])
    const [openAlertSuccess, setOpenAlertSuccess] = useState(false)
    const [openAlertError, setOpenAlertError] = useState(false)
    const [resultado, setResultado] = useState([])

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

    const abrirModalEditarPassageiro = useCallback(
        passageiro => {
            setOpenModalEditar(!openModalEditar)
            setPassageiro(passageiro)
        },
        [openModalEditar]
    )

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

    //Caso a viagem estaja em alguma situação que não possa mais ser cadastrado novos passageiros.
    if(viagem.length === 0 ) {
        return(
            <div>
                Esta viagem já esta encerrada....volta a HOME            
            </div>
        )
    }

    //Sei que fica no console um erro mas no layout ta funcionado..pensar um dia melhor...agora não eh hora...
    if(loadLayout) {
        setTimeout(() => setLoadLayout(false), 1500)
        return(<ExibirLoadingLayout size={95} />)
    }

    return(
        <>
        {viagem.length > 0 &&
            <div className="container-fluid mt-2">                
                <InformacoesViagens viagem={viagem} />
                
                <div className="row">
                    <div className="col-12 mt-3">
                        <MostrarPassageiros 
                            passageiros={passageiros} 
                            refazerBuscaDosPassageiros={refazerBuscaDosPassageiros} 
                            abrirModalEditarPassageiro={abrirModalEditarPassageiro} 
                        />
                    </div>
                    <div className="col-12 mt-3">
                        <button className='float-right btn btn-primary btn-lg' onClick={() => setOpenModal(!openModal) }>
                            + Passageiros
                        </button> 
                    </div>
                </div> 
                        
                <ModalAddPassageiros 
                    open={openModal} 
                    setOpen={setOpenModal} 
                    id_viagem={props.match.params.id} 
                    refazerBuscaDosPassageiros={refazerBuscaDosPassageiros} 
                    setOpenAlertSuccess = {setOpenAlertSuccess}
                    setOpenAlertError = {setOpenAlertError}
                    setResultado = {setResultado}
                />

                <ModalEditarPassageiros 
                    open={openModalEditar}
                    setOpen={setOpenModalEditar}
                    id_viagem={props.match.params.id} 
                    refazerBuscaDosPassageiros={refazerBuscaDosPassageiros}
                    passageiro={passageiro}
                    setOpenAlertSuccess = {setOpenAlertSuccess}
                    setOpenAlertError = {setOpenAlertError}
                    setResultado = {setResultado}
                />

                <AlertError open={openAlertError} setOpen={setOpenAlertError} messages={resultado} />
                <AlertSuccess open={openAlertSuccess} setOpen={setOpenAlertSuccess} messages={'Passageiro Salvo!'} />
            </div>
        }
        </>
    )
}

export default withRouter(Reservar);

