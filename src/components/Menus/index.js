import React, { useCallback } from 'react';
import {Link} from 'react-router-dom'

import MenusLiberados from './MenusLiberados';
import { autenticado, logout } from '../../services/auth';

function Menus() {
    
    const handleSair = useCallback(
        () => {
            logout()
            window.location.reload('/')
        },
        []
    )

    return (
        <ul className="navbar-nav ml-auto">
            {/* Menus do usuario LOGADO */}
            { autenticado() &&
                <MenusLiberados handleSair={handleSair}/>
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