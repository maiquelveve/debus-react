import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import { validaToken } from '../../services/auth';
import api from '../../services/api';
import { AlertCatch } from '../../components/AlertasDefaultSistema';

import { Loading, ExibirLoadingLayout } from '../../components/Loading'


import { ButtonEX, DataEX } from '../../components/FormComponents'

import {Grid, IconButton, Button, Container } from '@material-ui/core';
import {Delete} from '@material-ui/icons';

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
            <p>{viagem.id}</p>
            <Container>
                <Grid container spacing={3} direction="row" justify="center" alignItems="center">
                    <Grid item xs={4} >
                        <ButtonEX titulo="OLA" />  
                    </Grid>
                    <Grid item xs={4}>
                        <DataEX/>
                    </Grid>
                    <Grid item xs={4} >
                        <IconButton>
                            <Delete />
                        </IconButton> 
                    </Grid>
                </Grid> 
            </Container>
        </div>
    )
}

export default withRouter(Reservar);

