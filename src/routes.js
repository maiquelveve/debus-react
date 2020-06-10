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

import PrivateRoute, {ControleAcessoRoute} from './services/PrivateRoute'

function Routes() {
    return(
        <Switch>
            <PrivateRoute exact path="/materialui/:id" component={ExemploMaterialUi} />{/* rota de exemplos do material UI */}

            <Route exact path="/" component={Home} />
            
            <ControleAcessoRoute exact path="/locaisReferencias/cadastrar" perfilAutorizado='E' component={CadastrarLocaisRefrencias} />
            <ControleAcessoRoute exact path="/locaisReferencias/listar" perfilAutorizado='E' component={ListarLocaisReferencias} />
            <ControleAcessoRoute exact path="/locaisReferencias/editar/:id" perfilAutorizado='E' component={EditarLocaisRefrencias} />
            
            <ControleAcessoRoute exact path="/viagens/listar" perfilAutorizado='E' component={ListarViagens} />
            <ControleAcessoRoute exact path="/viagens/cadastrar" perfilAutorizado='E' component={CadastrarViagens} />
            <ControleAcessoRoute exact path="/viagens/editar/:id" perfilAutorizado='E' component={EditarViagens} />
            <PrivateRoute exact path="/viagens/reservar/:id" component={ReservarViagens} />
            
            <ControleAcessoRoute exact path="/empresas/listar" perfilAutorizado='E' component={ListarEmpresas} />
            <ControleAcessoRoute exact path="/empresas/editar/:id" perfilAutorizado='E' component={EditarEmpresas} />
            <ControleAcessoRoute exact path="/empresas/cadastrar" perfilAutorizado='E' component={CadastrarEmpresas} />
            
            <ControleAcessoRoute exact path="/veiculos/cadastrar" perfilAutorizado='E' component={CadastrarVeiculos} />
            <ControleAcessoRoute exact path="/veiculos/editar/:id" perfilAutorizado='E' component={EditarVeiculos} />
            <ControleAcessoRoute exact path="/veiculos/listar" perfilAutorizado='E' component={ListarVeiculos} />
            
            <Route exact path="/usuarios/login" component={Login} />
            <Route exact path="/usuarios/cadastrar" component={CadastrarUsuarios} />

            <Route path="*" component={Erro} />
        </Switch>
    )
}

export default Routes;
