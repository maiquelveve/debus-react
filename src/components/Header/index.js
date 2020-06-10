import React from 'react';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import api from '../../services/api';
import {AlertCatch} from '../AlertasDefaultSistema'

import Menus from '../Menus';

function Header() {
    const dispatch = useDispatch()

    const setPerfilUser = async () => {
        try {
        const token = localStorage.userToken
        if(token) {
            const retornoApi = await api.post('/buscarPerfilAcessoUsuario', {}, {headers: { auth: token } })            
            //Salvando o perfil no redux
            dispatch({
                type: 'PERFIL',
                ch_perfil: retornoApi.data
            })
        }
        } catch (error) {
        AlertCatch('Ocorreu um erro na autenticação.')
        }
    }   
    setPerfilUser()

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
            <div className="container">
                <Link className="navbar-brand" to="/">DeBus</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <Menus />
                </div>
            </div>
        </nav>
    );
}

export default Header