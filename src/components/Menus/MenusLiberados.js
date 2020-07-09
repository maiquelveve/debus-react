import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {MdMoreVert} from 'react-icons/md';

import { FacebookProgressMenus } from '../Loading';

function MenusLiberados({handleSair}) {

    const ususarioLogado = localStorage.userNameDebus.split(' ')
    const NomeUsusario = ususarioLogado[0]
                            .substring(0,1)
                            .toUpperCase()
                            .concat(
                                ususarioLogado[0]
                                .substring(1,)
                            )

    
    const MenusAdministrador = () => (
        <>
            <li className="nav-item">
                <Link className="nav-link active" to="/veiculos/pesquisar">Veículos</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" to="/empresas/pesquisar">Empresas</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" to="/viagens/pesquisar">Viagens</Link>
            </li>
            <li className="nav-item">
                <div className="dropdown">
                    <a className="nav-link active" href="/" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <MdMoreVert size={20} />                        
                    </a>
                    <div className="dropdown-menu dropdown-menu-right text-center" aria-labelledby="dropdownMenuButton">
                        <h6 class="dropdown-header">{NomeUsusario}</h6>
                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" to="/viagens/minhas_viagens">Minhas Viagens</Link>
                        <Link className="dropdown-item" to="/usuarios/perfil" >Meu Perfil</Link> 
                        <Link className="dropdown-item" to="/usuarios/trocar_senha" >Trocar Senha</Link> 
                        <Link className="dropdown-item" onClick={ handleSair } to="" >Sair</Link> 
                    </div>
                </div>
            </li>
        </>         
    )

    const MenusEmpresas = () => (
        <>
            <li className="nav-item">
                <Link className="nav-link active" to="/veiculos/listar">Veículos</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" to="/empresas/listar">Empresas</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" to="/viagens/listar">Viagens</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" to="/locaisReferencias/listar">Locais</Link>
            </li>
            <li className="nav-item">
                <div className="dropdown">
                    <a className="nav-link active" href="/" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <MdMoreVert size={20} />
                    </a>
                    <div className="dropdown-menu dropdown-menu-right text-center" aria-labelledby="dropdownMenuButton">
                        <h6 class="dropdown-header">{NomeUsusario}</h6>
                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" to="/viagens/minhas_viagens">Minhas Viagens</Link>
                        <Link className="dropdown-item" to="/usuarios/perfil" >Meu Perfil</Link> 
                        <Link className="dropdown-item" to="/usuarios/trocar_senha" >Trocar Senha</Link> 
                        <Link className="dropdown-item" onClick={ handleSair } to="" >Sair</Link> 
                    </div>
                </div>
            </li>
        </>       
    )

    const MenusComum = () => (
        <>
            <li className="nav-item">
                <Link className="nav-link active" to="/viagens/minhas_viagens">Viagens</Link>
            </li>
            <li className="nav-item">
                <div className="dropdown">
                    <a className="nav-link active" href="/" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <MdMoreVert size={20} />
                    </a>
                    <div className="dropdown-menu dropdown-menu-right text-center" aria-labelledby="dropdownMenuButton">
                        <h6 class="dropdown-header">{NomeUsusario}</h6>
                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" to="/usuarios/perfil" >Meu Perfil</Link> 
                        <Link className="dropdown-item" to="/usuarios/trocar_senha" >Trocar Senha</Link> 
                        <Link className="dropdown-item" onClick={ handleSair } to="" >Sair</Link> 
                    </div>
                </div>
            </li>
        </>       
    )

    let Menus
    const perfil = useSelector(state => state.usuarioReducer)
    
    switch(perfil[0]) {
        case 'A':
            Menus = MenusAdministrador
            break;
            
        case 'E':
            Menus = MenusEmpresas
            break;

        case 'C': 
            Menus = MenusComum
            break;
        default:
            Menus = () => (<FacebookProgressMenus size={20}/>)
    }

    return Menus()  
}

export default MenusLiberados;