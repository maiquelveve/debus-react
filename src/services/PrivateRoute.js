import React from 'react'
import {Redirect, Route} from 'react-router-dom'

import { autenticado } from './auth'

//Rotas que alem de estar logado o usuario o tipo de perfil dele tbm será avaliado
export const ControleAcessoRoute = ({ component: Componente, perfilAutorizado, ...rest }) => {
    try {
        const perfilUserLogado = localStorage.perfil // buscar no redux

        if(!autenticado()){
            throw('Não Autorizado')
        }

        if(perfilUserLogado !== 'A') {
            if(perfilAutorizado !== perfilUserLogado) {
                throw('Não Autorizado')
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