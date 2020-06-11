import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import { useSelector } from 'react-redux';

import { autenticado } from './auth'

//Rotas que alem de estar logado o usuario o tipo de perfil dele tbm será avaliado
export const ControleAcessoRoute = ({ component: Componente, perfilAutorizado, ...rest }) => {
    try {
        //pega o reducer
        const perfil = useSelector(state => state.usuarioReducer)
        const perfilUserLogado = perfil[0] // buscar no redux

        if(!autenticado()){
            throw new Error('Não Autorizado')
        }

        if(perfilUserLogado !== 'A') {
            if(perfilAutorizado !== perfilUserLogado) {
                throw new Error('Não Autorizado')
            }
        }

        return(
            <Route 
                {...rest} 
                render = {
                    props => (
                        <Componente {...props} />
                    )
                }
            />
        )

    } catch (error) {
        return(
            <Route 
                {...rest}
                render = {
                    props => (
                        <Redirect to={{pathname:"/", state: {from: props.location } }} />
                    )
                }
            />
        )
    }
}

//Rotas que so tem que estar logado o usuario
const PrivateRoute = ( {component: Componente,...rest} ) => (
    <Route 
        {...rest} 
            render = { 
                props => (
                    autenticado() ? (
                        <Componente {...props} /> 
                    ) : (
                        <Redirect to={{pathname:"/", state: {from: props.location } }} />
                    ) 
                ) 
            } 
    />
)

export default PrivateRoute;