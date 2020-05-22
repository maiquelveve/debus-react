import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import { validaToken } from '../../services/auth';
import api from '../../services/api';
import { AlertCatch } from '../../components/AlertasDefaultSistema';

import { Loading, ExibirLoadingLayout } from '../../components/Loading';
import InformacoesViagens from './component/InformacoesViagens';

function Reservar(props) {
    const [viagem, setViagem] = useState([])
    const [load, setLoad] = useState(true)
    
    useEffect(
        () => {
            async function fetchData() {
                const token = await validaToken();
                if(!token) {
                    window.location.reload('/')
                } 

                try {
                    const { id } = props.match.params
                    const retornoApi = await api.get(`/viagens/${id}`)
                    setViagem(retornoApi.data)
                    setLoad(false)

                } catch (error) {
                    AlertCatch('Ocorreu um erro ao buscar os dados no banco. Tente novamente mais tarde.')
                }
            }
            fetchData();
        },
        [props.match.params]
    )
        
    if(load) return(<Loading size={80} />) 

    return(
        <div>
            {/* <ExibirLoadingLayout size={95} /> */}
            <InformacoesViagens /> 
        </div>
    )
}

export default withRouter(Reservar);

