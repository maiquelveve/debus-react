import React from 'react';
import {Link} from 'react-router-dom'

import { autenticado } from '../../services/auth';

function Menus() {
    function sair() {
        localStorage.removeItem('userToken'); 
        window.location.reload('/')
    }

    return (
        <ul className="navbar-nav ml-auto">
            {/* Menus do usuario LOGADO */}
            { autenticado() &&
                <>
                    <li className="nav-item">
                        <Link className="nav-link active" to="/viagens/minhasViagens">Viagens</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" onClick={ sair } to="" >Sair</Link>
                    </li>
                </>    
            }

            {/* Menus do usuario DESLOGADO */}
            { !autenticado() &&
                <>
                    <li className="nav-item">
                        <Link className="nav-link active" to="/usuarios/cadastrar">Cadastre-se</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active"  to="/usuarios/login">Login</Link>
                    </li>
                </>
            }    
        </ul>
    );
}

export default Menus;