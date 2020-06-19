import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import api from '../../../../services/api';
import { AlertCatch } from '../../../../components/AlertasDefaultSistema';

import { Loading } from '../../../../components/Loading';
import InformacoesViagens from '../InformacoesViagens';
import MostrarPassageirosVisualizar from '../../../Passageiros/component/MostrarPassageirosVisualizar';

function ViagemVisualizada({id}) {
    const [load, setLoad] = useState(true)
    const [viagem, setViagem] = useState([])
    const [passageiros, setPassageiros] = useState([])

    useEffect(
        () => {
            async function fetchData() {
                try {
                    const retornoApi = await api.get(`/viagens/visualizar/${id}`)
                    setViagem(retornoApi.data)

                    const params = { id_viagem: id }
                    const retornoApiPassageiros = await api.get('passageiros', { params, headers:{ auth: localStorage.userToken }, validateStatus: status => status < 500 })
                    setPassageiros(retornoApiPassageiros.data)
                    
                    setLoad(false)

                } catch (error) {
                    AlertCatch('Ocorreu um erro ao buscar os dados no banco. Tente novamente mais tarde.')
                }
            }
            fetchData();
        },
        [id]
    )
        
    if(load) return(<Loading size={80} />) 

    return(
        <>
        {viagem.length > 0 &&
            <div className="container-fluid mt-2">                
                <InformacoesViagens viagem={viagem} />
                
                <div className="row">
                    <div className="col-12 mt-3">
                        <MostrarPassageirosVisualizar 
                            passageiros={passageiros} 
                        />
                    </div>
                </div> 
            </div>
        }
        </>
    )
}

export default withRouter(ViagemVisualizada);