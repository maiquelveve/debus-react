import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Loading } from '../Loading'

function MenusLiberados({handleSair}) {

    const MenusAdministrador = () => (
        <>
            <li className="nav-item">
                <Link className="nav-link active" to="/veiculos/listar">ADM</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" onClick={ handleSair } to="" >Sair</Link>
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
                <Link className="nav-link active" onClick={ handleSair } to="" >Sair</Link>
            </li>
        </>       
    )

    const MenusComum = () => (
        <>
            <li className="nav-item">
                <Link className="nav-link active" to="/veiculos/listar">Minhas Viagens</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" onClick={ handleSair } to="" >Sair</Link>
            </li>
        </>       
    )

    let Menus
    const perfil = useSelector(state => state.usuarioReducer)
    
    if(perfil.length > 0) {
        //return (<li>carregando.....</li>)
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
        }

        return Menus()  
    } else {
        return ('careegando....')
    }    
}

export default MenusLiberados;