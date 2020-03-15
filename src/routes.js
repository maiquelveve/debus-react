import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import MinhasViagens from './pages/Viagens';
import Login from './pages/Usuarios/login';
import CadastrarUsuarios from './pages/Usuarios/cadastrar';
import Erro from './pages/Erro';

import PrivateRoute from './services/PrivateRoute'

function Routes() {
    return(
        <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute exact path="/viagens/minhasViagens" component={MinhasViagens} />
            <Route exact path="/usuarios/login" component={Login} />
            <Route exact path="/usuarios/cadastrar" component={CadastrarUsuarios} />
            <Route path="*" component={Erro} />
        </Switch>
    )
}

export default Routes;
