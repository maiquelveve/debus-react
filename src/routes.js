import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Usuarios/login';
import CadastrarUsuarios from './pages/Usuarios/cadastrar';
import ReservarViagens from './pages/Viagens/reservar';
import ListarViagens from './pages/Viagens/listar';
import CadastrarViagens from './pages/Viagens/cadastrar';
import EditarViagens from './pages/Viagens/editar';
import CadastrarEmpresas from './pages/Empresas/cadastrar';
import EditarEmpresas from './pages/Empresas/editar';
import ListarEmpresas from './pages/Empresas/listar';
import CadastrarVeiculos from './pages/Veiculos/cadastrar';
import EditarVeiculos from './pages/Veiculos/editar';
import ListarVeiculos from './pages/Veiculos/listar';
import CadastrarLocaisRefrencias from './pages/LocaisReferencias/cadastrar';
import EditarLocaisRefrencias from './pages/LocaisReferencias/editar';
import ListarLocaisReferencias from './pages/LocaisReferencias/listar';

import ExemploMaterialUi from './pages/ExemploMaterialUi/reservarExMaterialui';
import Erro from './pages/Erro';

import PrivateRoute from './services/PrivateRoute'

function Routes() {
    return(
        <Switch>
            <PrivateRoute exact path="/materialui/:id" component={ExemploMaterialUi} />{/* rota de exemplos do material UI */}

            <Route exact path="/" component={Home} />
            <PrivateRoute exact path="/locaisReferencias/cadastrar" component={CadastrarLocaisRefrencias} />
            <PrivateRoute exact path="/locaisReferencias/listar" component={ListarLocaisReferencias} />
            <PrivateRoute exact path="/locaisReferencias/editar/:id" component={EditarLocaisRefrencias} />
            <PrivateRoute exact path="/viagens/listar" component={ListarViagens} />
            <PrivateRoute exact path="/viagens/cadastrar" component={CadastrarViagens} />
            <PrivateRoute exact path="/viagens/editar/:id" component={EditarViagens} />
            <PrivateRoute exact path="/viagens/reservar/:id" component={ReservarViagens} />
            <PrivateRoute exact path="/empresas/editar/:id" component={EditarEmpresas} />
            <PrivateRoute exact path="/empresas/cadastrar" component={CadastrarEmpresas} />
            <PrivateRoute exact path="/empresas/listar" component={ListarEmpresas} />
            <PrivateRoute exact path="/veiculos/cadastrar" component={CadastrarVeiculos} />
            <PrivateRoute exact path="/veiculos/editar/:id" component={EditarVeiculos} />
            <PrivateRoute exact path="/veiculos/listar" component={ListarVeiculos} />
            <Route exact path="/usuarios/login" component={Login} />
            <Route exact path="/usuarios/cadastrar" component={CadastrarUsuarios} />
            <Route path="*" component={Erro} />
        </Switch>
    )
}

export default Routes;
