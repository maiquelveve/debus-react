import React from 'react'
import {Redirect, Route} from 'react-router-dom'

import { autenticado } from './auth'

const PrivateRoute = ( {component: Componente,...rest}) => (
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