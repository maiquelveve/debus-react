import React, { useEffect, useState, useCallback } from 'react';
import { withRouter } from 'react-router-dom';

import { validaToken } from '../../services/auth';
import api from '../../services/api';
import { AlertCatch } from '../../components/AlertasDefaultSistema';

import { Loading, ExibirLoadingLayout } from '../../components/Loading';

import { DataConfirm, Data } from '../../components/FormComponents/datas';
import {InputTexto, InputTextoFilled, InputTextoOutLined} from '../../components/FormComponents/textos';

function Reservar(props) {
    const [viagem, setViagem] = useState([])
    const [load, setLoad] = useState(true)
    const [texto, setTexto] = useState('')
    const [texto2, setTexto2] = useState('')
    const [texto3, setTexto3] = useState('')
    const [data1, setData1] = useState(null)
    const [data2, setData2] = useState(null)
    
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
        
    const handleTexto = useCallback(
        e => {
            e.preventDefault()

            async function fetchData() {
                const dados = { texto, texto2, texto3, data1, data2 }
                const retorno = await api.post('exemploMaterialUi', dados)
                console.log(retorno)
            }
            fetchData()
        },
        [texto, texto2, texto3, data1, data2]
    )

    if(load) return(<Loading size={80} />) 

    return(
        <form onSubmit={handleTexto}>
            <div>
                <ExibirLoadingLayout size={95} />
                
                <p>{viagem.id}</p>

                <DataConfirm 
                    label="Data 1" 
                    value = {data1} 
                    setValue = {setData1}
                />
                
                <Data 
                    label="Data 2" 
                    value = {data2} 
                    setValue = {setData2}
                />

                <InputTexto 
                    label = "Texto 1" 
                    value = {texto} 
                    setValue = {e => setTexto(e.target.value)} 
                />
                
                <InputTextoOutLined 
                    label = "Texto 1" 
                    value = {texto2} 
                    setValue = {e => setTexto2(e.target.value)} 
                />

                <InputTextoFilled 
                    label = "Texto 1" 
                    value = {texto3} 
                    setValue = {e => setTexto3(e.target.value)} 
                />

                <button type="submit" className="mt-2 form-control btn btn-success">Buscar</button>
            </div>
        </form>
    )
}

export default withRouter(Reservar);

