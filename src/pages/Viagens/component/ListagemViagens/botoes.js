import React from 'react';
import { Link } from 'react-router-dom';
import { MdModeEdit, MdCancel, MdSyncProblem } from 'react-icons/md'; 
import { IoMdCheckmarkCircle } from 'react-icons/io';

const handleConfirmarViagem = async viagem => {
    //aqui chama o alert estilizado sim/não 
}

const handleCancelarViagem = async viagem => {
    //aqui chama o alert estilizado sim/não
}

const handleReativarViagem = async viagem => {
    //aqui chama o alert estilizado sim/não
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