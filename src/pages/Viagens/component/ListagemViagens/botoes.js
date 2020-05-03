import React from 'react';
import { Link } from 'react-router-dom';
import { MdModeEdit, MdCancel, MdSyncProblem } from 'react-icons/md'; 
import { IoMdCheckmarkCircle } from 'react-icons/io';

import { AlertCancelarViagem, AlertConfirmarViagem, AlertReativarViagem } from '../AlertsViagens';

const handleConfirmarViagem = async viagem => {
    //aqui chama o alert estilizado sim/não 
    AlertConfirmarViagem(viagem, ()=>{alert('callback CONFIRMAR')})
}

const handleCancelarViagem = async viagem => {
    //aqui chama o alert estilizado sim/não
    AlertCancelarViagem(viagem, ()=>{alert('callback CANCELAR')})
}

const handleReativarViagem = async viagem => {
    //aqui chama o alert estilizado sim/não
    AlertReativarViagem(viagem, ()=>{alert('callback REATIVAR')})
}

export const Editar = ({viagem}) => (
    <Link to={`editar/${viagem.id}`} className="btn btn-success ml-1 mx-1">
        <span>
            <MdModeEdit size={20} />
        </span>
    </Link>
)

export const Confirmar = ({viagem}) => (
    <button type="button" className="btn btn-primary mx-1" onClick={ () => {handleConfirmarViagem(viagem)} }>
        <span>
            <IoMdCheckmarkCircle size={20} />
        </span>
    </button>
)

export const Cancelar = ({viagem}) => (
    <button type="button" className="btn btn-danger mx-1" onClick={ () => {handleCancelarViagem(viagem)} }>
        <span>
            <MdCancel size={20} />
        </span>
    </button> 
)

export const Reativar = ({viagem}) => (
    <button type="button" className="btn btn-info mx-1" onClick={ () => {handleReativarViagem(viagem)} }>
        <span>
            <MdSyncProblem size={20} />
        </span>
    </button> 
)