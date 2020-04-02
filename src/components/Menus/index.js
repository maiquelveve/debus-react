import React, { useCallback } from 'react';
import {Link} from 'react-router-dom'

import { autenticado } from '../../services/auth';

function Menus() {
    
    const handleSair = useCallback(
        () => {
            function sair() {
                localStorage.removeItem('userToken'); 
                localStorage.removeItem('userActive'); 
                window.location.reload('/')
            }

            sair()
        },
        []
    )

    return (
        <ul className="navbar-nav ml-auto">
            {/* Menus do usuario LOGADO */}
            { autenticado() &&
                <>
                    <li className="nav-item">
                        <Link className="nav-link active" to="/veiculos/listar">Veículos</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to="/empresas/listar">Empresas</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to="/viagens/minhasViagens">Viagens</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" onClick={ handleSair } to="" >Sair</Link>
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