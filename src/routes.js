import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Usuarios/login';
import CadastrarUsuarios from './pages/Usuarios/cadastrar';
import MinhasViagens from './pages/Viagens';
import CadastrarEmpresas from './pages/Empresas/cadastrar';
import EditarEmpresas from './pages/Empresas/editar';
import ListarEmpresas from './pages/Empresas/listar';
import ListarVeiculos from './pages/Veiculos/listar';

import Erro from './pages/Erro';

import PrivateRoute from './services/PrivateRoute'

function Routes() {
    return(
        <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute exact path="/viagens/minhasViagens" component={MinhasViagens} />
            <PrivateRoute exact path="/empresas/editar/:id" component={EditarEmpresas} />
            <PrivateRoute exact path="/empresas/cadastrar" component={CadastrarEmpresas} />
            <PrivateRoute exact path="/empresas/listar" component={ListarEmpresas} />
            <PrivateRoute exact path="/veiculos/listar" component={ListarVeiculos} />
            <Route exact path="/usuarios/login" component={Login} />
            <Route exact path="/usuarios/cadastrar" component={CadastrarUsuarios} />
            <Route path="*" component={Erro} />
        </Switch>
    )
}

export default Routes;
