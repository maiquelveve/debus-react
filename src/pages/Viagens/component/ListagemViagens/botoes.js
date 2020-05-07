import React from 'react';
import { Link } from 'react-router-dom';
import { MdModeEdit, MdCancel, MdSyncProblem } from 'react-icons/md'; 
import { IoMdCheckmarkCircle } from 'react-icons/io';

import { AlertCancelarViagem, AlertConfirmarViagem, AlertReativarViagem } from '../AlertsViagens';

const handleConfirmarViagem = async (viagem, callbackRetornoAcoes) => {
    //aqui chama o alert estilizado sim/não 
    await AlertConfirmarViagem(viagem, callbackRetornoAcoes)
}

const handleCancelarViagem = async (viagem, callbackRetornoAcoes) => {
    //aqui chama o alert estilizado sim/não
    await AlertCancelarViagem(viagem, callbackRetornoAcoes)
}

const handleReativarViagem = async (viagem, callbackRetornoAcoes) => {
    //aqui chama o alert estilizado sim/não
    await AlertReativarViagem(viagem, callbackRetornoAcoes)
}

export const Editar = ({viagem}) => (
    <Link to={`editar/${viagem.id}`} className="btn btn-success ml-1 mx-1">
        <span>
            <MdModeEdit size={20} />
        </span>
    </Link>
)

export const Confirmar = ({viagem, callbackRetornoAcoes}) => (
    <button type="button" className="btn btn-primary mx-1" onClick={ () => {handleConfirmarViagem(viagem, callbackRetornoAcoes)} }>
        <span>
            <IoMdCheckmarkCircle size={20} />
        </span>
    </button>
)

export const Cancelar = ({viagem, callbackRetornoAcoes}) => (
    <button type="button" className="btn btn-danger mx-1" onClick={ () => {handleCancelarViagem(viagem, callbackRetornoAcoes)} }>
        <span>
            <MdCancel size={20} />
        </span>
    </button> 
)

export const Reativar = ({viagem, callbackRetornoAcoes}) => (
    <button type="button" className="btn btn-info mx-1" onClick={ () => {handleReativarViagem(viagem, callbackRetornoAcoes)} }>
        <span>
            <MdSyncProblem size={20} />
        </span>
    </button> 
)