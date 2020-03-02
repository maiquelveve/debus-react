import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import MinhasViagens from './pages/Viagens';
import Login from './pages/Usuarios/login';
import CadastrarUsuarios from './pages/Usuarios/cadastrar'
import Erro from './pages/Erro';

function Routes() {
    return(
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/MinhasViagens" component={MinhasViagens} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/cadastrarUsuarios" component={CadastrarUsuarios} />
            <Route path="*" component={Erro} />
        </Switch>
    )
}

export default Routes;
